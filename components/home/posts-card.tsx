import { PostItem } from '@/components/blog';
import { Post } from '@/models';
import { Card, CardContent } from '@mui/material';


export interface IPostCardProps {
    post: Post
}


export function PostCard ({post}: IPostCardProps) {
    if(!post) return null
  return (
    <Card>
      <CardContent>
        <PostItem post={post} />
      </CardContent>
    </Card>
  );
}
