import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './PostDetail.module.css';

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  author: string;
  timestamp: string;
}

interface PostDetailProps {
  postId: number;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get(`/api/posts/${postId}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>뒤로</button>
      </header>
      <article className={styles.post}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <div className={styles.postMeta}>
          <span>{post.author}</span>
          <span>{post.timestamp}</span>
          <span>👁️ viewers</span>
          <span>❤️ likes</span>
        </div>
        {post.image && <img src={post.image} alt={post.title} className={styles.postImage} />}
        <p className={styles.postContent}>{post.content}</p>
        <div className={styles.actions}>
          <button onClick={() => router.push(`/post/edit/${post.id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
