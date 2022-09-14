import { Component, OnInit } from '@angular/core';
import { Blur, EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  editorText = '';
  url = new Array();
  urlBool: boolean = false;

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

  constructor() {}

  ngOnInit(): void {}

  changedEditor(event: EditorChangeContent | EditorChangeSelection | Blur) {
    this.editorText = event['editor']['root']['innerHTML'];
    this.isUrlPresent(event);
    console.log(this.editorText);
  }

  isUrlPresent(e: EditorChangeContent | EditorChangeSelection | Blur) {
    if (this.editorText.match('<a href')) {
      console.log('link is present');
      const htmlArr = e['editor']['root']['children'];
      for (var i = 0; i < htmlArr.length; i++) {
        if (htmlArr[i]['innerHTML'].match('<a href')) {
          var child = htmlArr[i]['innerHTML'];
          this.url.push(child);
          this.urlBool = true;
          break;
        }
      }
    }
  }
  changedEditorr(e: Event) {
    e.preventDefault();
    console.log(this.url);
  }
}
