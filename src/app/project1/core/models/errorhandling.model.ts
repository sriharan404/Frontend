import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


export class Errorhandling implements HttpInterceptor {

 // constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request)
          .pipe(
              retry(1),
              catchError((error: HttpErrorResponse) => {
                  //const rollbar = this.injector.get(RollbarService);
                  let errorMessage = '';
                  if (error.error instanceof ErrorEvent) {
                      // client-side error
                      errorMessage = `Error: ${error.error.message}`;
                      //console.log(errorMessage);

                  } else {
                      // server-side error
                      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    //  console.log(errorMessage);

                  }
                  window.alert(errorMessage);
                 // rollbar.error(error)
                  return throwError(errorMessage);
              })
          )
  }

}
