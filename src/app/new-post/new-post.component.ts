import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blur, EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Notyf } from 'notyf';
import { map, Observable } from 'rxjs';
import { NOTYF } from '../notification';
import { CommunitySubredditService } from '../community-sidebar-right/view-community-subreddit/shared/community.subreddit.service';
import { SubredditResponse } from './../dto/community-subreddit-payload/subreddit.resp';
import { PostRequestPayload } from './../dto/post-payload/post-req';
import { NewPostService } from './shared/new.post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      // ['link', 'image', 'video'], // link and image, video
    ],
  };

  editorText = '';
  urlArr = new Array();
  createPostGp!: FormGroup;
  postReqPayload!: PostRequestPayload;

  communityList$ = new Array<SubredditResponse>();
  btnlabelPost = 'Post';
  btnlabelDiscard = 'Discard';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postServc: NewPostService,
    @Inject(NOTYF) private notification: Notyf,
    private subreddit: CommunitySubredditService
  ) {
    this.createPostGp = this.getFieldDataFromDOM();
  }
  ngOnInit(): void {
    this.fetchAllCommunityName();
  }

  fetchAllCommunityName() {
    this.subreddit.getAllSubreddit().subscribe((data) => {
      Object.assign(this.communityList$, data);
    });
  }

  // getting values from post form and creating object using post dto
  initCreatePostPayloadToAPI(createPostGp: FormGroup): PostRequestPayload {
    return (this.postReqPayload = {
      postName: createPostGp?.value.postName,
      postDescription: createPostGp?.value.postDescription,
      url: this.urlArr[0] ? this.urlArr[0] : '',
      subredditName: createPostGp?.value.subredditName,
    });
  }

  getFieldDataFromDOM(): FormGroup {
    return this.fb.group({
      postName: ['', [Validators.required]],
      postDescription: ['', [Validators.required]],
      subredditName: ['', [Validators.required]],
    });
  }
  onContentChanged(event: EditorChangeContent | EditorChangeSelection | Blur) {
    this.editorText = event['editor']['root']['innerHTML'];
    this.isUrlPresent(event);
  }

  isUrlPresent(e: EditorChangeContent | EditorChangeSelection | Blur) {
    if (this.editorText.match('<a href')) {
      const htmlArr = e['editor']['root']['children'];
      for (var i = 0; i < htmlArr.length; i++) {
        if (htmlArr[i]['innerHTML'].match('<a href')) {
          let child = htmlArr[i]['innerHTML'];
          console.log(htmlArr[i]);
          this.urlArr.push(child);
          break;
        }
      }
    }
  }

  createPost(event: any) {
    this.postReqPayload = this.initCreatePostPayloadToAPI(this.createPostGp);
    this.postServc.createNewPost(this.postReqPayload).subscribe(
      (data) => {
        if (data) {
          this.notification.success('New post created');
          // this.router.navigate(['feed']);
          this.goBackToFeed();
        } else {
          this.notification.error(`Something wrong`);
        }
      },
      (error) => {
        document.querySelector('#editor')?.classList.add('is-disabled');
        if (error.status === 500) {
          this.notification.error(`Community choosen is invalid`);
          console.log(error);
        }
        setTimeout(() => {
          document.querySelector('#editor')?.classList.remove('is-disabled');
        }, 1000);
      }
    );
  }

  goBackToFeed() {
    this.router.navigateByUrl('feed');
  }
}
