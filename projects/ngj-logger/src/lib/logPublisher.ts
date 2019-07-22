import { LogEntry } from './ngj-logger.service';
import 'rxjs/add/observable/of';
import { Observable, of } from 'rxjs';
export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}


export class LogConsole extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
      // Log to console
      console.log(entry.buildLogString());
      return Observable.of(true);
    }
    clear(): Observable<boolean> {
      console.clear();
      return Observable.of(true);
    }
  }
