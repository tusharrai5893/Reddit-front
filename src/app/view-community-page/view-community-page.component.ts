import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe, map } from 'rxjs';
import { PostResponsePayload } from './../dto/post-payload/post-res';
import { SharedPostServices } from './../feed/post-view/shared/shared-post-services.service';

@Component({
  selector: 'app-view-community-page',
  templateUrl: './view-community-page.component.html',
  styleUrls: ['./view-community-page.component.css'],
})
export class ViewCommunityPageComponent implements OnInit {
  pageTitle?: string;
  subredditId!: number;
  postId!: number;

  postResList = new Array<PostResponsePayload>();

  isPostFromPostViewChildLength!: number;

  constructor(
    private route: ActivatedRoute,
    private _postServc: SharedPostServices
  ) {
    this.route.paramMap.subscribe((param) => {
      this.subredditId = Number(param.get('id'));
      this.postId = Number(param.get('postId'));
      this.pageTitle = param.get('communityPage')?.toString();

      [NaN, 0].includes(this.subredditId)
        ? this.callGetOnePostByPostID()
        : this.callGetAllPostBySubredditID();
    });
  }

  ngOnInit(): void {}
  callGetOnePostByPostID() {
    this._postServc.getOnePostByPostID(this.postId).subscribe((e) => {
      const addingSingleObjInArray = [e];
      this.postResList = addingSingleObjInArray;
    });
  }

  callGetAllPostBySubredditID() {
    this._postServc
      .getAllPostBySubredditID(this.subredditId)
      .subscribe((res) => {
        Object.assign(this.postResList, res);
      });
  }

  postlength(q: any) {
    this.isPostFromPostViewChildLength =
      this.postResList.length !== 0 ? this.postResList.length : -1;
  }
} //class ends here
