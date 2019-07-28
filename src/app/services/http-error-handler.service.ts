import { NgjLoggerService } from './../../../projects/ngj-logger/src/lib/ngj-logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Exception } from './../models/exception';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';

// tslint:disable-next-line:import-blacklist
import { Observable, of } from 'rxjs';


/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private messageService: MessageService, private logger: NgjLoggerService) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      if (error.status !== 200) {
        const exception = {} as Exception;
        const message = (error.error instanceof HttpErrorResponse) ?
        error.error.message : `server returned code ${error.status} with body "${error.error}"`;


      // TODO: better job of transforming error for user consumption
        this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);

        exception.code = error.status;
        exception.message = error.error;
        this.logger.error(serviceName +' '+operation,[`server returned code ${error.status} with body "${error.error}"`]);
        console.log('Inside error instance');
        console.log('Inside application instance');
        const responce = result as any;
        responce.exception = exception;
      }

      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }
}
