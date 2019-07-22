import { LogEntry } from './ngj-logger.service';
import { LogPublisher } from './logPublisher';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';

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