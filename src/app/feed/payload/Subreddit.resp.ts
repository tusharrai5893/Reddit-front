import { PostDTO } from './noOfPosts';
export interface SubredditResponse {
  subredditId: number;
  subredditName: string;
  subredditDescription: string;
  noOfPosts: Array<PostDTO>;
}
