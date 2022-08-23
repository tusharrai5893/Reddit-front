import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSignIn(e: Event) {
    e.preventDefault();

    // const signIn = document.getElementById("signIn");
    // signIn?.classList.add("hidden")

    // const signUp = document.getElementById('signUp');
    // signUp?.classList.remove("hidden");
    // signUp?.classList.add("block");

  }

}
