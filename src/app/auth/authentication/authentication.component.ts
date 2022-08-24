import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInReqPayload } from './requestPayload/reqSignInPayload';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signInReqPayload!: SignInReqPayload;
  signInForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.initSiginPayload(this.signInForm);
  }

  ngOnInit(): void {
    this.signInForm = this.getSignInDataFromDOM();
  }
  areYouOneOfUs(e: Event) {
    const signIn = document.getElementById("signIn");
    const signUp = document.getElementById('signUp');
    signIn?.classList.add("hidden");
    signUp?.classList.add("block");
  }
  goAheadSignin(e: Event) {
    const signUp = document.getElementById('signUp');
    const signIn = document.getElementById("signIn");
    signUp?.classList.add("hidden");
    signIn?.classList.add("block");
  }
  doSignIn() {
    const { username, password } = this.initSiginPayload(this.signInForm);



  }

  getSignInDataFromDOM(): FormGroup {
    return this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      secret: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  initSiginPayload(signInForm: FormGroup | undefined): SignInReqPayload {
    return this.signInReqPayload = {
      username: signInForm?.value.username,
      password: signInForm?.value.secret,
    };

  }
}// class ends




