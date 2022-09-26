import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { PostResponsePayload } from './../../dto/post-payload/post-res';

import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { SharedPostServices } from './shared/shared-post-services.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  faMessage = faMessage;
  post = new Array<PostResponsePayload>();

  @Output() isPostThere: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _postServc: SharedPostServices) {}

  ngOnInit(): void {
    this.getAllPostsFromService();
  }
  getAllPostsFromService() {
    this._postServc.getAllPosts().subscribe({
      next: (v) => {
        Object.assign(this.post, v);
        this.isPostThere.emit(this.post);
      },
      error: (e) => throwError((e: any) => new Error(e)),
      complete: () => console.info(),
    });
  }
}
