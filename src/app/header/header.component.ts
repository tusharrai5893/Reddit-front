import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _localStorage: LocalStorageService,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('redndering header');
  }

  logout() {
    this.authService.clearLS();
    this.authService.logout();
    this._router.navigate(['/']);
  }
}
