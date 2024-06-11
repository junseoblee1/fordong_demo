import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './PostList.module.css';

interface Post {
  id: number;
  title: string;
  author: string;
  timestamp: string;
  comments: number;
  image?: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      if (response.data.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...response.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) return;
    setPage(prevPage => prevPage + 1);
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>포동 community</h1>
        <button className={styles.searchButton}>
          <img src="/search-icon.svg" alt="Search" className={styles.searchIcon} />
        </button>
      </header>
      <ul className={styles.postList}>
        {posts.map(post => (
          <li key={post.id} className={styles.post}>
            <Link href={`/post/${post.id}`} legacyBehavior>
              <a className={styles.postLink}>
                <div className={styles.postContent}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <div className={styles.postMeta}>
                    <span className={styles.metaText}>{post.author}</span>
                    <span className={styles.metaText}>{post.timestamp}</span>
                    <span className={styles.metaText}>👁️ viewers</span>
                    <span className={styles.metaText}>❤️ likes</span>
                  </div>
                </div>
                {post.image && <img src={post.image} alt={post.title} className={styles.postImage} />}
                <div className={styles.comments}>
                  <span className={styles.commentsText}>{post.comments} 댓글</span>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {loading && <p>Loading more posts...</p>}
      <Link href="/post/new" legacyBehavior>
        <a className={styles.floatingButton}>
          <img src="/create-icon.svg" alt="Create" className={styles.createIcon} />
        </a>
      </Link>
      <nav className={styles.bottomNav}>
        <Link href="/home" legacyBehavior>
          <a className={styles.navItem}><img src="/home-icon.svg" alt="Home" /></a>
        </Link>
        <Link href="/list" legacyBehavior>
          <a className={styles.navItem}><img src="/list-icon.svg" alt="List" /></a>
        </Link>
        <Link href="/comments" legacyBehavior>
          <a className={styles.navItem}><img src="/comment-icon.svg" alt="Comments" /></a>
        </Link>
        <Link href="/gifts" legacyBehavior>
          <a className={styles.navItem}><img src="/gift-icon.svg" alt="Gifts" /></a>
        </Link>
        <Link href="/menu" legacyBehavior>
          <a className={styles.navItem}><img src="/menu-icon.svg" alt="Menu" /></a>
        </Link>
      </nav>
    </div>
  );
};

export default PostList;
