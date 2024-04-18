import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostResponsePayload } from './../../dto/post-payload/post-res';

import { ActivatedRoute, Router } from '@angular/router';
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

  acParam!: any;
  subredditId!: number;
  postId!: number;

  @Input('post-view-page') postViewPage = new Array<PostResponsePayload>();
  @Output() isPostThere: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _postServc: SharedPostServices,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((param) => (this.acParam = param));
  }

  ngOnInit(): void {
    this.getAllPostsFromService();
  }

  goToCommunityViewPage(communityName: PostResponsePayload) {
    this.router.navigate([
      `${communityName.subredditName}/community/${communityName.postId}`,
    ]);
  }
  getAllPostsFromService() {
    this._postServc.getAllPosts().subscribe({
      next: (v) => {
        if (this.acParam.has('id')) {
          console.log('<post-view-sub>', this.postViewPage);
          Object.assign(this.post, this.postViewPage);
        } else if (this.acParam.has('postId')) {
          console.log('<post-view>', this.postViewPage);
          Object.assign(this.post, this.postViewPage);
        } else {
          Object.assign(this.post, v);
        }
      },
      error: (e) => alert(e),
      complete: () => this.isPostThere.emit(this.post),
    });
  }

  commentPage(post: PostResponsePayload) {
    this.router.navigate([`comment/${post.postId}`]);
  }
}
