import { Component, Input, OnInit } from '@angular/core';
import {
  faSquareCaretDown, faSquareCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { PostDTO } from '../payload/post.dto';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;
  @Input() postToVoteView!: PostDTO;
  voteCount!: number;
  constructor() {}

  ngOnInit(): void {
    this.voteCount = this.postToVoteView.voteCount;
  }
  voteDown() {
    console.log('down ', this.postToVoteView);
  }
  voteUp() {
    console.log('up ', this.postToVoteView);
  }
}
