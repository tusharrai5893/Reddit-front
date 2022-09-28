import { Component, OnInit } from '@angular/core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-community-page',
  templateUrl: './view-community-page.component.html',
  styleUrls: ['./view-community-page.component.css'],
})
export class ViewCommunityPageComponent implements OnInit {
  faMessage = faMessage;
  singlePost: any;

  constructor() {}

  ngOnInit(): void {}
}
