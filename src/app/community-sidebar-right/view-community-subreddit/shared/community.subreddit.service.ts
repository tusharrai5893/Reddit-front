import { SubredditResponse } from '../../../dto/community-subreddit-payload/subreddit.resp';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunitySubredditService {
  BASE_URL = environment.base_url;

  constructor(private _http: HttpClient) {}

  getAllSubreddit(): Observable<SubredditResponse> {
    return this._http.get<SubredditResponse>(
      `${this.BASE_URL}${'subreddit/fetchAll-subreddit'}`
    );
  }
}
