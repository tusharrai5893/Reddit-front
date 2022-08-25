import { SignUpReqPayload } from './../authentication/requestPayload/reqSignUpPayload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInReqPayload } from '../authentication/requestPayload/reqSignInPayload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = "http://localhost:8080/api/"

  constructor(private _http: HttpClient) { }

  signUpService(signUpReqPayload: SignUpReqPayload): Observable<any> {
    return this._http.post(this.BASE_URL + "auth/signup", signUpReqPayload, { responseType: 'json' });
  }
  signInService(signInReqPayload: SignInReqPayload): Observable<any> {
    return this._http.post(this.BASE_URL + "auth/login", signInReqPayload, { responseType: 'json' });
  }
}
