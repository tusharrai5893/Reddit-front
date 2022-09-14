import { PostDTO } from './post.dto';
export interface SubredditResponse {
  subredditId: number;
  subredditName: string;
  subredditDescription: string;
  noOfPosts: Array<PostDTO>;
}
