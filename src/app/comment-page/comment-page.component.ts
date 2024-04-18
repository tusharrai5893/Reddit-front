import { PostResponsePayload } from 'src/app/dto/post-payload/post-res';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedPostServices } from '../feed/post-view/shared/shared-post-services.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css'],
})
export class CommentPageComponent implements OnInit {
  postId!: number;
  post!: any;

  constructor(
    private _postServc: SharedPostServices,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(
      (param) => (this.postId = Number(param.get('postid')))
    );
  }

  ngOnInit(): void {
    // this._postServc.getAllPosts().subscribe((e) => {
    //   this.post = e;
    // });

    this._postServc.fetchCommentByPost(this.postId).subscribe((e) => {
      this.post = e;
      console.log(e);
    });
  }
}
