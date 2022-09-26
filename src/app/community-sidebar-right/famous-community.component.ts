import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-famous-community',
  templateUrl: './famous-community.component.html',
  styleUrls: ['./famous-community.component.css'],
})
export class FamousCommunityComponent implements OnInit {
  isloggedIn!: boolean;
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.localStorage.retrieve('AUTH_JWT_TOKEN') == null
      ? (this.isloggedIn = false)
      : (this.isloggedIn = true);
  }

  goToCreatePost() {
    this.router.navigate(['feed/new-post']);
  }
  goToCreateSubreddit() {
    this.router.navigate(['feed/new-community']);
  }
}
