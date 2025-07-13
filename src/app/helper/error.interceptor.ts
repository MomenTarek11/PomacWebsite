import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 404) {
          this.router.navigate(['/home']);
          Swal.fire(
            'Not Found',
            'The requested resource was not found.',
            'warning'
          );
          return throwError(() => new Error('404 Not Found'));
        }
        if (err.status === 500) {
          Swal.fire('Oops...', 'An unexpected error has occurred!', 'error');
          return throwError(() => new Error('Internal Server Error'));
        }
        const error = err.error.messages || err.statusText;

        if (err.error.messages && typeof err.error.messages === 'object') {
          for (const i in err.error.messages) {
            if (err.error.messages.hasOwnProperty(i)) {
              Swal.fire('Oops...', err.error.messages[i], 'error');
            }
          }
        } else {
          Swal.fire('Oops...', error, 'error');
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
