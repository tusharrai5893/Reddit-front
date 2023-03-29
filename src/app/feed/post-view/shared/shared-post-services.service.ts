import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponsePayload } from '../../../dto/post-payload/post-res';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedPostServices {
  BASE_URL: string = environment.base_url;
  constructor(private _http: HttpClient) {}

  getAllPosts(): Observable<Array<PostResponsePayload>> {
    return this._http.get<PostResponsePayload[]>(
      this.BASE_URL + 'post/fetchAll-post'
    );
  }

  getAllPostBySubredditID(
    communityId: number
  ): Observable<Array<PostResponsePayload>> {
    return this._http.get<PostResponsePayload[]>(
      this.BASE_URL + 'post/fetchPostBySubreddit-post/' + communityId
    );
  }

  getOnePostByPostID(postId: number): Observable<PostResponsePayload> {
    return this._http.get<PostResponsePayload>(
      this.BASE_URL + 'post/fetchOne-post/' + postId
    );
  }

  getAllComments(): Observable<Array<any>> {
    return this._http.get<any[]>(this.BASE_URL + 'comment/fetchAll-comment');
  }
  fetchCommentByPost(postId: number): Observable<Array<any>> {
    return this._http.get<any[]>(
      this.BASE_URL + `comment/fetchCommentByPost-comment/${postId}`
    );
  }
} //service ends
