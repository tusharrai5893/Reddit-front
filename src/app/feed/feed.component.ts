import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from '../auth/authentication/authentication.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  isloggedIn!: boolean;
  isPostThere!: number;
  authComponent!: AuthenticationComponent;
  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorage.retrieve('AUTH_JWT_TOKEN') == null
      ? (this.isloggedIn = false)
      : (this.isloggedIn = true);

    console.log(this.isPostThere);
  }
} //feed ends
