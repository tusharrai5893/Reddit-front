import { ResSignInPayload } from './dto/auth-payload/resSignInPayload';
import { AuthService } from './auth/shared/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable()
export class MyTokenInterceptor implements HttpInterceptor {
  isTokenRefershing = false;
  setTokenHeaderInReqMody!: HttpRequest<any>;
  refershTokenBehaviourSubject: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  jwtToken = '';
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.indexOf('refreshToken') !== -1 ||
      req.url.indexOf('login') !== -1 ||
      req.url.indexOf('signup') !== -1
    ) {
      return next.handle(req);
    }
    this.jwtToken = this._authService.getJwtTokenFromLocalStorage();
    if (this.jwtToken) {
      // console.log('jwt ', req);
      this.setTokenHeaderInReqMody = this.addTokenInHeader(req, this.jwtToken);
    }
    return next.handle(this.setTokenHeaderInReqMody).pipe(
      catchError((err) => {
        // console.log('refresh ', req);
        if (err instanceof HttpErrorResponse && err.status === 403) {
          return this.handle403Errors(req, next);
        } else {
          return throwError(err);
        }
      })
    );
  } //intercept ends

  private handle403Errors(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isTokenRefershing) {
      this.isTokenRefershing = true;
      this.refershTokenBehaviourSubject.next(null);
      return this._authService.getRefreshTokenfromLocalStorage().pipe(
        switchMap((refreshTokenRes: ResSignInPayload) => {
          this.isTokenRefershing = false;
          this.refershTokenBehaviourSubject.next(refreshTokenRes.jwtToken);
          return next.handle(
            this.addTokenInHeader(req, refreshTokenRes.jwtToken)
          );
        })
      );
    } else {
      return this.refershTokenBehaviourSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addTokenInHeader(req, this.jwtToken));
        })
      );
    }
  }

  addTokenInHeader(req: HttpRequest<any>, jwtToken: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`),
    });
  }
} // interceptor class ends
