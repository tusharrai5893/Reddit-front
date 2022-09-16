import { PostResponsePayload } from './../post-payload/post-res';
export interface SubredditResponse {
  subredditId: number;
  subredditName: string;
  subredditDescription: string;
  noOfPosts: Array<PostResponsePayload>;
}
