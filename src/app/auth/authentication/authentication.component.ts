import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignInReqPayload } from './requestPayload/reqSignInPayload';
import { SignUpReqPayload } from './requestPayload/reqSignUpPayload';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  hidden: boolean = true;
  signInReqPayload!: SignInReqPayload;
  SignUpReqPayload!: SignUpReqPayload;
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initSigInPayload(this.signInForm);
    this.initSignUpPayload(this.signUpForm);
  }

  ngOnInit(): void {
    this.signInForm = this.getSignInDataFromDOM();
    this.signUpForm = this.getSignUpDataFromDOM();
  }

  areYouOneOfUs(e: Event) {

    if (this.hidden == true) {
      this.hidden = false
    }
  }
  goAheadSignin(e: Event) {
    if (this.hidden == false) {
      this.hidden = true
    }

  }
  //TODO: signIn functionality
  doSignIn() {
    this.signInReqPayload = this.initSigInPayload(this.signInForm);
    this.authService.signInService(this.signInReqPayload).subscribe(data => {
      console.table(data);

    })
  }
  //TODO: signUp functionality
  doSignUp() {
    this.SignUpReqPayload = this.initSignUpPayload(this.signUpForm);
    this.authService.signUpService(this.SignUpReqPayload).subscribe(data => {
      console.table(data);

    })

  }

  getSignInDataFromDOM(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      secret: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  getSignUpDataFromDOM(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      secret: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  initSigInPayload(signInForm: FormGroup | undefined): SignInReqPayload {
    return (this.signInReqPayload = {
      username: signInForm?.value.username,
      password: signInForm?.value.secret,
    });
  }
  initSignUpPayload(signUpForm: FormGroup<any>): SignUpReqPayload {
    return (this.SignUpReqPayload = {
      email: signUpForm?.value.email,
      username: signUpForm?.value.username,
      password: signUpForm?.value.secret,
    });
  }
} // class ends
