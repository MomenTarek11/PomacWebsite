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
        if(err.status == 500){
            Swal.fire('Oops...', 'An unexpected error has occurred!', 'error')
          return
        }
        const error = err.error.messages || err.statusText;
        for (var i in err.error.messages) {
            Swal.fire('Oops...', err.error.messages[i], 'error')
        }
        return throwError(error);
      })
    );
  }
}
