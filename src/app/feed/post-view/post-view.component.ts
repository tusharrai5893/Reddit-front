import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { PostResponsePayload } from './../../dto/post-payload/post-res';

import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { SharedPostServices } from './shared/shared-post-services.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit, AfterViewInit {
  faMessage = faMessage;
  post = new Array<PostResponsePayload>();

  @Output() isPostThere: EventEmitter<number> = new EventEmitter();

  constructor(private _postServc: SharedPostServices) {}
  ngAfterViewInit(): void {
    this.getAllPostsFromService();
    this.isPostThere.emit(this.post.length == 0 ? 0 : -1);
  }

  ngOnInit(): void {}
  getAllPostsFromService() {
    this._postServc.getAllPosts().subscribe((res) => {
      this.post = res;
    });
  }
}
