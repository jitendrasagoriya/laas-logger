import { LogEntry } from './ngj-logger.service';
import { HttpClient } from '@angular/common/http';
import { LogPublisher } from './logPublisher';
import { Observable, of } from 'rxjs';

export class LogWebApi extends LogPublisher {
    constructor(private http: HttpClient) {
      // Must call super() from derived classes
      super();
      // Set location
      this.location = '/api/log';
    }

    // Add log entry to back end data store
    log(entry: LogEntry): Observable<boolean> {
        const headers = new Headers(
        { 'Content-Type': 'application/json' });

        return of(true);
    }

    // Clear all log entries from local storage
    clear(): Observable<boolean> {
      // TODO: Call Web API to clear all values
      return of(true);
    }

    private handleErrors(error: any):
                   Observable<any> {
      const errors: string[] = [];
      let msg = '';

      msg = 'Status: ' + error.status;
      msg += ' - Status Text: ' + error.statusText;
      if (error.json()) {
        msg += ' - Exception Message: ' +
               error.json().exceptionMessage;
      }
      errors.push(msg);

      console.error('An error occurred', errors);
      return Observable.throw(errors);
    }
  }
