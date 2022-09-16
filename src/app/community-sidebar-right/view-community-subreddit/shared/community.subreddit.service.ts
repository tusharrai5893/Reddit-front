import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { SubredditResponse } from 'src/app/dto/community-subreddit-payload/subreddit.resp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunitySubredditService {
  BASE_URL = environment.base_url;

  constructor(private _http: HttpClient, private auth: AuthService) {}

  getAllSubreddit(): Observable<any> {
    return this._http.get<any>(
      `${this.BASE_URL}${'subreddit/fetchAll-subreddit'}`
    );
  }
}
