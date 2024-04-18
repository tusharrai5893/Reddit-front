import { Component, OnInit } from '@angular/core';

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
