import { useRouter } from 'next/router';
import PostDetail from '../../components/PostDetail';

const PostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <PostDetail postId={Number(id)} />
    </div>
  );
};

export default PostPage;
