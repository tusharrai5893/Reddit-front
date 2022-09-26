import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _localStorage: LocalStorageService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this._localStorage.clear();
    this._router.navigate(['/']);
  }
}
