import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-links-panel-left',
  templateUrl: './links-panel-left.component.html',
  styleUrls: ['./links-panel-left.component.css'],
})
export class LinksPanelLeftComponent implements OnInit {
  path!: any;
  constructor(private ar: ActivatedRoute) {
    this.path = ar.snapshot.url[0].path;
  }

  ngOnInit(): void {
    document.querySelectorAll('#link').forEach((e) => {
      if (this.path == 'post') {
        e.children[0].classList.add('active');
      } else if (this.path == 'feed') {
        e.children[1].classList.add('active');
      }
    });
  }
}
