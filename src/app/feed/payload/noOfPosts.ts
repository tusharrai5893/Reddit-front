export interface PostDTO {
  postId: number;
  postName: string;
  url: string;
  postDescription: string;
  voteCount: number;

  userName: string;
  subredditName: string;

  commentCount: number;
  duration: string;
}
