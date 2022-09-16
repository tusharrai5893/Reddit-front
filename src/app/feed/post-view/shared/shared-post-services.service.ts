import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponsePayload } from '../../../dto/post-payload/post-res';
import { SubredditResponse } from '../../../dto/community-subreddit-payload/subreddit.resp';

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

  getAllPosts(): Observable<Array<PostResponsePayload>> {
    return this._http.get<PostResponsePayload[]>(
      this.BASE_URL + 'post/fetchAll-post'
    );
  }
} //service ends
