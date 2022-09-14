import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  @ViewChild('isPostThere') isPostThere!: boolean;
  constructor() {}

  ngOnInit(): void {
    // typeof this.isPostThere == undefined ? false : true;
    // console.log(this.isPostThere);
  }
} //feed ends
