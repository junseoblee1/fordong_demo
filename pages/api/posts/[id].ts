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
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const post = posts.find(post => post.id === parseInt(id as string));

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (req.method === 'GET') {
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const updatedPost = { ...post, ...req.body };
    posts = posts.map(p => (p.id === parseInt(id as string) ? updatedPost : p));
    res.status(200).json(updatedPost);
  } else if (req.method === 'DELETE') {
    posts = posts.filter(p => p.id !== parseInt(id as string));
    res.status(204).end();
  }
}

