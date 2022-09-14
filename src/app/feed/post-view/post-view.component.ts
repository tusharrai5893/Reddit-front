import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { PostDTO } from '../payload/post.dto';
import { SubredditResponse } from '../payload/subreddit.resp';
import { SharedPostServices } from './shared/shared-post-services.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  faMessage = faMessage;

  allSubReddit!: Array<SubredditResponse>;
  post!: PostDTO[];

  @Output() isPostThere: EventEmitter<boolean> = new EventEmitter();

  constructor(private _postServc: SharedPostServices) {}

  ngOnInit(): void {
    this.getAllPostsFromService();
  }
  getAllPostsFromService() {
    this._postServc.getAllPosts().subscribe((res) => {
      this.post = res;
      this.isPostThere.emit(res.length > 0);
    });
  }
}
