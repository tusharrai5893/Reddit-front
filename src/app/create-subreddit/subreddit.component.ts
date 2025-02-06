import { ResSignInPayload } from './../dto/auth-payload/resSignInPayload';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Notyf } from 'notyf';
import { SubredditRequestPayload } from '../dto/community-subreddit-payload/subreddit.req';
import { NOTYF } from '../notification';
import { CreateCommunitySharedService } from './shared/createCommunity.shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubredditResponse } from '../dto/community-subreddit-payload/subreddit.resp';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css'],
})
export class SubredditComponent implements OnInit {
  close = faClose;
  err = 21;
  btnCreateCommunityLbl = 'Create Community';
  btnDiscardLbl = 'Cancel';

  createCommunityGp!: FormGroup;
  subredditReqPayload!: SubredditRequestPayload;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private subredditServc: CreateCommunitySharedService,
    @Inject(NOTYF) private notification: Notyf
  ) {
    this.createCommunityGp = this.getFieldDataFromDOM();
    this.checkCharacter21();
  }
  checkCharacter21() {
    this.community.valueChanges.subscribe((val) => {
      if (val.length >= 21) {
        console.log(val.length);
        this.community.setErrors({ maxlength: true });
      }
      this.err = 21 - val.length;
    });
  }

  getFieldDataFromDOM(): any {
    return this.fb.group({
      subredditName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')],
      ],
    });
  }

  initCreateCommunityPayloadToAPI(
    communityFG: FormGroup
  ): SubredditRequestPayload {
    return (this.subredditReqPayload = {
      subredditName: 'r/' + communityFG?.value.subredditName,
      subredditDescription: '',
    });
  }
  get community() {
    return this.createCommunityGp.get('subredditName') as FormControl;
  }
  ngOnInit(): void {}

  goBackToFeed(event: any) {
    this.router.navigate(['feed']);
  }

  checkCommuityExist() {
    console.log(this.createCommunityGp.valueChanges);
  }
  createCommunity() {
    const communityPayloadToAPI = this.initCreateCommunityPayloadToAPI(
      this.createCommunityGp
    );
    this.subredditServc.createNewCommunity(communityPayloadToAPI).subscribe(
      (res:SubredditResponse) => {
          this.notification.success(`Community ${res.subredditName} created successfully`);
          this.router.navigate(['feed']);
      },
      (error:HttpErrorResponse) => {
        error.status === 500 ? this.notification.error(`Community ${this.createCommunityGp.value.subredditName} already exist`) : this.notification.error('Something went wrong');
        document
          .querySelector('.community-modal')
          ?.classList.add('is-disabled');

        setTimeout(() => {
          document
            .querySelector('.community-modal')
            ?.classList.remove('is-disabled');
        }, 1000);
      },
      // complete => {
      //   console.log('completed', complete);
      // }
    );

    this.router
      .navigateByUrl('listViewCommunity', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([decodeURI(window.location.pathname)]);
      });
  }
}
