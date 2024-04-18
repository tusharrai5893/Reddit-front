import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { SubredditResponse } from '../../dto/community-subreddit-payload/subreddit.resp';
import { CommunitySubredditService } from './shared/community.subreddit.service';

@Component({
  selector: 'app-view-community',
  templateUrl: './view-community-subreddit.component.html',
  styleUrls: ['./view-community-subreddit.component.css'],
})
export class ViewCommunitySubredditComponent implements OnInit, OnDestroy {
  subredditList = new Array<SubredditResponse>();
  redditId!: SubredditResponse[];

  constructor(
    private _subredditSerc: CommunitySubredditService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._subredditSerc.getAllSubreddit().subscribe((data) => {
      Object.assign(this.subredditList, data);
    });
  }

  goToViewCommunityPage(link: string) {
    let urlParam = link.split('/')[1];
    this.redditId = this.subredditList.filter((e) => {
      return e.subredditName.split('/')[1] == urlParam;
    });

    this._router.navigate([
      `r/${urlParam + '/' + this.redditId[0].subredditId}`,
    ]);
  }

  ngOnDestroy(): void {}
}
