import { LocalStorageService } from 'ngx-webstorage';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-by-user',
  templateUrl: './post-by-user.component.html',
  styleUrls: ['./post-by-user.component.css'],
})
export class PostByUserComponent implements OnInit {
  username!: any;
  constructor(private ls: LocalStorageService) {}
  ngOnInit(): void {
    this.username = this.ls.retrieve('AUTH_USER_NAME');
  }
}
