import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Reddit';
  isAuthenticated: Boolean = false;
  ngOnInit(): void {
    console.log('redndering header');
  }
}
