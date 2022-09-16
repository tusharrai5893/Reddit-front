import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { NOTYF } from './../../notification';
import { AuthService } from './../shared/auth.service';

import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { SignInReqPayload } from 'src/app/dto/auth-payload/reqSignInPayload';
import { SignUpReqPayload } from 'src/app/dto/auth-payload/reqSignUpPayload';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  hidden: boolean = true;
  isloggedIn!: boolean;
  signInReqPayload!: SignInReqPayload;
  SignUpReqPayload!: SignUpReqPayload;
  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService,
    @Inject(NOTYF) private notification: Notyf
  ) {
    this.initSigInPayload(this.signInForm);
    this.initSignUpPayload(this.signUpForm);
  }

  ngOnInit(): void {
    this.localStorage.clear();
    this.signInForm = this.getSignInDataFromDOM();
    this.signUpForm = this.getSignUpDataFromDOM();
    this.authService.getJwtTokenFromLocalStorage() == null
      ? (this.isloggedIn = false)
      : (this.isloggedIn = true);
  }

  areYouOneOfUs() {
    if (this.hidden == true) {
      this.hidden = false;
    }
  }
  goAheadSignin() {
    if (this.hidden == false) {
      this.hidden = true;
    }
  }
  //TODO: signIn functionality
  //FIXME: Add reset form and validation
  doSignIn() {
    this.signInReqPayload = this.initSigInPayload(this.signInForm);
    this.authService.signInService(this.signInReqPayload).subscribe(
      (data) => {
        if (data) {
          this.notification.success('Logged In, Yayy');
          this.router.navigate(['feed']);
        } else {
          this.notification.error('Wrong Credentials, Retry Again');
        }
      },
      (error) => {
        document.querySelector('#signIn')?.classList.add('is-disabled');
        this.notification.error(`Are you registered, with us ?`);
        setTimeout(() => {
          document.querySelector('#signIn')?.classList.remove('is-disabled');
        }, 1000);
      }
    );
    this.notification.dismissAll();
  }
  //TODO: signUp functionality
  doSignUp() {
    this.SignUpReqPayload = this.initSignUpPayload(this.signUpForm);
    this.authService.signUpService(this.SignUpReqPayload).subscribe(
      (next) => {
        console.log('success');

        this.notification.success('Welcome To Our Community');
        this.notification.open({
          type: 'warning',
          message: 'Activation Email Has been sent to your Mail',
        });
        this.goAheadSignin();
      },
      (error) => {
        console.log(`failed ${error.status}`);
        document.querySelector('#signUp')?.classList.add('is-disabled');
        setTimeout(() => {
          document.querySelector('#signUp')?.classList.remove('is-disabled');
        }, 100);
        this.notification.error('Sign Up failed! Please Try Again');
      }
    );

    this.notification.dismissAll();
  }

  getSignInDataFromDOM(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      secret: ['', [Validators.required]],
    });
  }
  getSignUpDataFromDOM(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required]],
      secret: ['', [Validators.required]],
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
