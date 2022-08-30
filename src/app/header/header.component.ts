import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  dropdown() {
    const dp = document.querySelector('.settings-menu');
    dp?.classList.toggle('settings-menu-height');
  }
}
