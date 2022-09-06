import { PostDTO } from './payload/noOfPosts';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubredditResponse } from './payload/Subreddit.resp';
import { finalize, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  faMessage,
  faSquareCaretDown,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;
  faMessage = faMessage;

  allSubReddit!: Array<SubredditResponse>;
  post!: PostDTO[];
  constructor(private _authService: AuthService, private _http: HttpClient) {}

  ngOnInit(): void {
    this.getAllSubredditFromService();
  }
  getAllSubredditFromService() {
    this._authService.getAllPosts().subscribe((res) => {
      console.log(res);

      this.post = res;
    });
  }
}
