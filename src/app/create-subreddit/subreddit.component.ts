import { CreateCommunitySharedService } from './shared/createCommunity.shared.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SubredditRequestPayload } from '../dto/community-subreddit-payload/subreddit.req';
import { Notyf } from 'notyf';
import { NOTYF } from '../notification';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css'],
})
export class SubredditComponent implements OnInit {
  close = faClose;

  btnCreateCommunityLbl = 'Create Community';
  btnDiscardLbl = 'Cancel';

  createCommunityGp!: FormGroup;
  subredditReqPayload!: SubredditRequestPayload;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private subredditServc: CreateCommunitySharedService,
    @Inject(NOTYF) private notification: Notyf
  ) {
    // this.route.paramMap.subscribe((param) => {
    //   this.user = param.get('user');
    // });
    this.createCommunityGp = this.getFieldDataFromDOM();
  }
  getFieldDataFromDOM(): any {
    return this.fb.group({
      subredditName: [
        '',
        [
          Validators.maxLength(21),
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]+'),
        ],
      ],
    });
  }
  initCreateCommunityPayloadToAPI(
    communityFG: FormGroup
  ): SubredditRequestPayload {
    return (this.subredditReqPayload = {
      subredditName: 'r/' + communityFG?.value.subredditName,
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
  createCommunity(event: any) {
    const communityPayloadToAPI = this.initCreateCommunityPayloadToAPI(
      this.createCommunityGp
    );
    this.subredditServc.createNewCommunity(communityPayloadToAPI).subscribe(
      (data) => {
        if (data) {
          this.notification.success('New Community created');
          this.router.navigate(['feed']);
        }
      },
      (error) => {
        document
          .querySelector('.community-modal')
          ?.classList.add('is-disabled');

        this.notification.error('Server is down');

        setTimeout(() => {
          document
            .querySelector('.community-modal')
            ?.classList.remove('is-disabled');
        }, 1000);
      }
    );
  }
}
