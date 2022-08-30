import { LocalStorageService } from 'ngx-webstorage';
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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {
    this.initSigInPayload(this.signInForm);
    this.initSignUpPayload(this.signUpForm);
  }

  ngOnInit(): void {
    this.localStorage.clear();
    this.signInForm = this.getSignInDataFromDOM();
    this.signUpForm = this.getSignUpDataFromDOM();
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
          this.toastr.success('Logged In, Yayy');
          this.router.navigate(['feed']);
        } else {
          this.toastr.error('Wrong Credentials, Retry Again');
        }
      },
      (error) => {
        document.querySelector('#signIn')?.classList.add('is-disabled');
        this.toastr.error(`Uhh Ohh, Try Again Later 🙏🏼`);
      }
    );
    this.toastr.clear();
  }
  //TODO: signUp functionality
  doSignUp() {
    this.SignUpReqPayload = this.initSignUpPayload(this.signUpForm);
    this.authService.signUpService(this.SignUpReqPayload).subscribe(
      (next) => {
        console.log('success');

        this.toastr.success('Welcome To Our Community', '', {
          disableTimeOut: false,
          closeButton: true,
          easeTime: 300,
        });
        this.toastr.info(
          'Activation Email Has been sent to your Mail',
          'Activation Notification',
          {
            disableTimeOut: true,
            closeButton: true,
            easeTime: 2000,
          }
        );
        this.goAheadSignin();
      },
      (error) => {
        console.log('failed');
        document.querySelector('#signUp')?.classList.add('is-disabled');
        this.toastr.error('Sign Up failed! Please Try Again', '', {
          closeButton: true,
          easeTime: 300,
        });
      }
    );

    this.toastr.clear();
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
