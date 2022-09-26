import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubredditRequestPayload } from 'src/app/dto/community-subreddit-payload/subreddit.req';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateCommunitySharedService {
  BASE_URL = environment.base_url;
  constructor(private _http: HttpClient) {}

  createNewCommunity(communityPayloadToAPI: SubredditRequestPayload) {
    return this._http.post<SubredditRequestPayload>(
      `${this.BASE_URL}${'subreddit/add-subreddit'}`,
      communityPayloadToAPI
    );
  }
}
