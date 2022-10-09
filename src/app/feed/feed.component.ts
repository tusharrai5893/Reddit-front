import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Optional } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthenticationComponent } from '../auth/authentication/authentication.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  isPostFromPostViewChildLength!: number;

  ngOnInit(): void {}

  postlength(q: any) {
    this.isPostFromPostViewChildLength = q.length > 0 ? q.length : -1;
  }
} //feed ends
