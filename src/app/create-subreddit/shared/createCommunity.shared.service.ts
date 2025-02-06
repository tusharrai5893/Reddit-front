import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubredditRequestPayload } from 'src/app/dto/community-subreddit-payload/subreddit.req';
import { environment } from 'src/environments/environment';
import { SubredditResponse } from 'src/app/dto/community-subreddit-payload/subreddit.resp';

@Injectable({
  providedIn: 'root',
})
export class CreateCommunitySharedService {
  BASE_URL = environment.base_url;
  constructor(private _http: HttpClient) {}

  createNewCommunity(communityPayloadToAPI: SubredditRequestPayload): Observable<SubredditResponse> {
    return this._http.post<SubredditResponse>(
      this.BASE_URL + 'subreddit/add-subreddit',
      communityPayloadToAPI
    );
  }
}
