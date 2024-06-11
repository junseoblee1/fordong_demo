// pages/api/posts/index.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface Post {
  id: number;
  title: string;
  author: string;
  timestamp: string;
  content: string;
  comments: number;
  image?: string;
}

let posts: Post[] = [
  { id: 1, title: 'Post 1', author: 'Author 1', timestamp: '2m ago', content: 'This is the first post', comments: 0 },
  { id: 2, title: 'Post 2', author: 'Author 2', timestamp: '5m ago', content: 'This is the second post', comments: 0, image: '/some-image.jpg' },
  // Add more posts for testing
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  
  if (req.method === 'GET') {
    res.status(200).json(posts.slice(startIndex, endIndex));
  } else if (req.method === 'POST') {
    const newPost: Post = { id: Date.now(), ...req.body, comments: 0, timestamp: 'just now' };
    posts.push(newPost);
    res.status(201).json(newPost);
  }
}
