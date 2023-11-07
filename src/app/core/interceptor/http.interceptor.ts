import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import { SpinnerState } from 'src/app/store/state/spinner.state';
// import { hideSpinner } from 'src/app/store/actions/spinner.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { refreshTokenResponce } from 'src/app/modules/auth/interfaces/auth-interface';
// import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    // private store: Store<{ spinner: SpinnerState }>,
    private toaster: ToastrService,
    private router: Router,
    private authservice: AuthService,
    // private organizationService:OrganizationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    const token = localStorage.getItem('token'); // replace with your auth token

    const hasLogin = request.url.includes('/api/auth/signin');
    const hasRefresh = request.url.includes('/api/auth/refreshtoken');

    if (token != null && hasRefresh === false) {
      request = this.addTokenHeader(request, token);
    }
    // Add the token to the request's headers

    if (hasLogin == true || hasRefresh == true) {
      request = request.clone({
        headers: request.headers,
      });
    }

    return next.handle(request).pipe(
      tap((data: HttpEvent<any>) => {
        if (data instanceof HttpResponse) {
          if (data.body) {
            this.toaster.success(data.body.message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // this.organizationService.errorLoader.emit(true);
        // this.store.dispatch(hideSpinner());

        if (error.status == 401) {
          if (hasLogin == false) {
            return this.handle401Error(request, next);
          }
        }

        if (error.status == 403) {
          // this.toastrService.warning("Your session expired please login again");
          if (error.error.message) {
            this.toaster.error('Session Expired. Please login in again.');
          }
          localStorage.clear();
          this.router.navigateByUrl('/auth/signIn');
        }

        if (error?.status === 500) {
          if (error.error.error === 'Internal Server Error') {
            this.toaster.error('Something went wrong. Please try again');
          }
        }

        if (
          error.error.message &&
          error.error.message !== 'No Data Found' &&
          error.error.message !== 'Invalid JWT token' &&
          error.error.message !== 'Bad credentials'
        ) {
          this.toaster.error(error.error.message);
        }

        if (error.error.message == 'Bad credentials') {
          this.toaster.error(
            'Invalid credentials. Please check your username and password.'
          );
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = localStorage.getItem('token');

      if (token)
        return this.authservice.getRefreshToken().pipe(
          switchMap((token: refreshTokenResponce) => {
            this.isRefreshing = false;
            const {
              data: { accessToken, refreshToken },
            } = token;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            this.refreshTokenSubject.next(token?.data?.accessToken);

            return next.handle(
              this.addTokenHeader(request, token?.data?.accessToken)
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;

            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token: any) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
