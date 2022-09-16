import { SubredditResponse } from './../dto/community-subreddit-payload/subreddit.resp';
import { CommunitySubredditService } from './../community-sidebar-right/view-community-subreddit/shared/community.subreddit.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blur, EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Notyf } from 'notyf';
import { NOTYF } from '../notification';
import { PostRequestPayload } from './../dto/post-payload/post-req';
import { NewPostService } from './shared/new.post.service';
import { throwError } from 'rxjs';

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

      ['link', 'image', 'video'], // link and image, video
    ],
  };

  editorText = '';
  urlArr = new Array();
  createPostGp!: FormGroup;
  postReqPayload!: PostRequestPayload;

  communityList!: SubredditResponse[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postServc: NewPostService,
    @Inject(NOTYF) private notification: Notyf,
    private subreddit: CommunitySubredditService
  ) {}

  // getting values from post form and creating object using post dto
  initCreatePostPayload(createPostGp: FormGroup): PostRequestPayload {
    return (this.postReqPayload = {
      postName: createPostGp?.value.postName,
      postDescription: createPostGp?.value.postDescription,
      url: this.urlArr[0] ? this.urlArr[0] : '',
      subredditName: createPostGp?.value.subredditName,
    });
  }

  ngOnInit(): void {
    this.createPostGp = this.getCreatePostPayloadFromDOM();
    this.subreddit.getAllSubreddit().subscribe(
      (data) => {
        this.communityList = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  getCreatePostPayloadFromDOM(): FormGroup {
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

  createPost() {
    this.postReqPayload = this.initCreatePostPayload(this.createPostGp);
    this.postServc.createNewPost(this.postReqPayload).subscribe(
      (data) => {
        if (data) {
          this.notification.success('New post created');
          this.router.navigate(['feed']);
        } else {
          this.notification.error(`Something wrong`);
        }
      },
      (error) => {
        document.querySelector('#editor')?.classList.add('is-disabled');
        this.notification.error(`You have to log in to post`);
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
