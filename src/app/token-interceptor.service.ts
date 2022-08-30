import { ResSignInPayload } from './auth/authentication/requestPayload/resSignInPayload';
import { AuthService } from './auth/shared/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefershing = false;
  refershTokenBehaviourSubject: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.indexOf('refreshToken') !== -1 ||
      req.url.indexOf('login') !== -1
    ) {
      return next.handle(req);
    }
    const jwtToken = this._authService.getJwtTokenFromLocalStorage();
    if (jwtToken) {
      this.addTokenInHeader(req, jwtToken);
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          return this.handle403Errors(req, next);
        } else {
          return throwError(err);
        }
      })
    );
  }

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
    }
    return next.handle(req);
  }

  addTokenInHeader(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }
} // interceptor class ends
