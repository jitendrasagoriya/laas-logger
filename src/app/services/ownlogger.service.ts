import { Injectable } from '@angular/core';
import {LogWebApi} from "../../../dist/ngj-logger/lib/log-web-api";
import {HttpClient} from "@angular/common/http";
import {LogEntry} from "../../../dist/ngj-logger";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OwnloggerService extends LogWebApi{

  constructor(private httpRequest:HttpClient) {
    super(httpRequest,'','')
  }


  log(entry: LogEntry): Observable<boolean> {
    return undefined;
  }

  clear(): Observable<boolean> {
    return undefined;
  }
}
