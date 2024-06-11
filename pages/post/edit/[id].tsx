import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../../../components/PostForm';

interface Post {
  id: number;
  title: string;
  content: string;
}

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`)
        .then(response => setPost(response.data))
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [id]);

  return (
    <div>
      <h1>Edit Post</h1>
      {post ? <PostForm post={post} /> : <div>Loading...</div>}
    </div>
  );
};

export default EditPostPage;
