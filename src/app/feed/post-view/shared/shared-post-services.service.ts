import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from '../../payload/post.dto';
import { SubredditResponse } from '../../payload/subreddit.resp';

@Injectable({
  providedIn: 'root',
})
export class SharedPostServices {
  BASE_URL: string = environment.base_url;
  constructor(private _http: HttpClient) {}

  getAllSubreddit(): Observable<Array<SubredditResponse>> {
    return this._http.get<Array<SubredditResponse>>(
      this.BASE_URL + 'subreddit/fetchAll-subreddit'
    );
  }

  getAllPosts(): Observable<Array<PostDTO>> {
    return this._http.get<PostDTO[]>(this.BASE_URL + 'post/fetchAll-post');
  }
} //service ends
