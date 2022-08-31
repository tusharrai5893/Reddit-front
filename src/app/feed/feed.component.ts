import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  faCoffee,
  faComment,
  faMessage,
  faSquareCaretDown,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;
  faMessage = faMessage;
  constructor(
    private _http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.localStorage.retrieve('AUTH_JWT_TOKEN')}`,
    });
    this._http
      .get(environment.base_url + 'subreddit/fetchAll-subreddit', {
        headers: headers,
      })
      .forEach((res) => document.writeln(JSON.stringify(res)));
  }
}
