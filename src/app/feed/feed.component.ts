import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthenticationComponent } from '../auth/authentication/authentication.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  isloggedIn!: boolean;
  authComponent!: AuthenticationComponent;
  isPostFromPostViewChildLength!: number;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorage.retrieve('AUTH_JWT_TOKEN') !== null
      ? (this.isloggedIn = true)
      : (this.isloggedIn = false);
  }

  postlength(q: any) {
    this.isPostFromPostViewChildLength = q.length > 0 ? q.length : -1;
  }
} //feed ends
