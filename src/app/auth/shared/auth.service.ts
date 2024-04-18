import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { ResSignInPayload } from '../../dto/auth-payload/resSignInPayload';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { SignInReqPayload } from 'src/app/dto/auth-payload/reqSignInPayload';
import { SignUpReqPayload } from 'src/app/dto/auth-payload/reqSignUpPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = environment.base_url;

  constructor(
    private _http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsernameFromLocalStorage(),
  };

  signUpService(signUpReqPayload: SignUpReqPayload): Observable<any> {
    return this._http.post(this.BASE_URL + 'auth/signup', signUpReqPayload, {
      responseType: 'text',
    });
  }
  signInService(signInReqPayload: SignInReqPayload): Observable<boolean> {
    return this._http
      .post<ResSignInPayload>(this.BASE_URL + 'auth/login', signInReqPayload)
      .pipe(
        map((resSignIn) => {
          this.localStorage.store('AUTH_JWT_TOKEN', resSignIn.jwtToken);
          this.localStorage.store('AUTH_USER_NAME', resSignIn.userName);
          this.localStorage.store('AUTH_REFRESH_TOKEN', resSignIn.refreshToken);
          this.localStorage.store('AUTH_EXIPIRES_AT', resSignIn.expiresAt);

          return true;
        })
      );
  }

  getJwtTokenFromLocalStorage(): string {
    console.warn('AUTH_JWT_TOKEN called');
    return this.localStorage.retrieve('AUTH_JWT_TOKEN');
  }

  getRefreshTokenfromLocalStorage() {
    return this._http
      .post<ResSignInPayload>(
        this.BASE_URL + 'auth/refreshToken',
        this.refreshTokenPayload
      )
      .pipe(
        tap((res) => {
          console.warn('REFERESH_API called');
          this.localStorage.clear('AUTH_JWT_TOKEN');
          this.localStorage.clear('AUTH_EXIPIRES_AT');
          this.localStorage.store('AUTH_JWT_TOKEN', res.jwtToken);
          this.localStorage.store('AUTH_EXIPIRES_AT', res.expiresAt);
        })
      );
  }

  getRefreshToken() {
    return this.localStorage.retrieve('AUTH_REFRESH_TOKEN');
  }
  getUsernameFromLocalStorage() {
    return this.localStorage.retrieve('AUTH_USER_NAME');
  }
} // service class ends
