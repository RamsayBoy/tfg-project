import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoaderService } from '../loader/services/loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
  ) {}

  // TODO: Add here the popup or error notification
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = error.error ? error.error.message : "Ha ocurrido un error.";
          } else {
            // server-side error
            if (error.status === 0 || error.status === 504) {
              errorMessage = "Ha habido un error de conexión."
            }
            else {
              errorMessage = error.error ? error.error.message : "Ha ocurrido un error.";
            }
          }

          this.loaderService.setLoader(false);

          return throwError(errorMessage);
        })
      );
  }
}
