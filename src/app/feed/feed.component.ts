import { SharedPostServices } from './post-view/shared/shared-post-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  isPostFromPostViewChildLength!: number;

  constructor(private sharedPostServices:SharedPostServices){}

  ngOnInit(): void {
    this.sharedPostServices.getAllPosts();
  }

  postlength(q: any) {
    this.isPostFromPostViewChildLength = q.length > 0 ? q.length : -1;
  }
} //feed ends
