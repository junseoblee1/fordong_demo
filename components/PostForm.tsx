import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './PostForm.module.css';

interface Post {
  id?: number;
  title: string;
  content: string;
  image?: string;
}

interface PostFormProps {
  post?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [image, setImage] = useState<string | undefined>(post ? post.image : '');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (post) {
        await axios.put(`/api/posts/${post.id}`, { title, content, image });
      } else {
        await axios.post('/api/posts', { title, content, image });
      }
      router.push('/');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.cancelButton}>취소</button>
        <button onClick={handleSubmit} className={styles.submitButton}>등록</button>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className={styles.input}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          className={styles.textarea}
          required
        ></textarea>
        <label className={styles.imageLabel}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.imageInput}
          />
          <img src="/upload-icon.svg" alt="Upload" className={styles.uploadIcon} />
        </label>
        {image && <img src={image} alt="Preview" className={styles.imagePreview} />}
      </form>
    </div>
  );
};

export default PostForm;
