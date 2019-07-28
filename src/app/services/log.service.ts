import { Log } from './../models/log';
import { ExceptionService } from './exception.service';
import { ConfigurationService } from './configuration.service';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StringDecoder } from 'string_decoder';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-AUTH-LOG-HEADER': 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106'
  })
};


@Injectable()
export class LogService {


  private handleError: HandleError;
  private token: string;

  constructor(private http: HttpClient,
              private httpErrorHandler: HttpErrorHandler,
              private configurationService: ConfigurationService,
              private exceptionService: ExceptionService) {
      this.handleError = httpErrorHandler.createHandleError('LogService');

      if (localStorage.getItem('currentUser')) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.token =  user.token;
      }
    }

  getCount(logType: string): Observable<any> {
    const apiUrl = this.configurationService.getBaseUrl() + `level/${logType}/count`;
    httpOptions.headers =
      httpOptions.headers.set('X-AUTH-LOG-HEADER', this.token);

    return this.http.get<any >(apiUrl, httpOptions)
      .pipe(catchError(this.handleError('get count +' + logType))
    );
  }


  getYesterDayCount(past: string): Observable<any> {
    const apiUrl = this.configurationService.getBaseUrl() + `level/total/${past}`;
    httpOptions.headers =
    httpOptions.headers.set('X-AUTH-LOG-HEADER', this.token);
    return this.http.get<any >(apiUrl, httpOptions)
      .pipe(catchError(this.handleError('get count +' + past))
    );
  }


  /** GET heroes from the server */
  getLogs(): Observable<Log[]> {
    const apiUrl = this.configurationService.getBaseUrl();

    httpOptions.headers =
    httpOptions.headers.set('X-AUTH-LOG-HEADER', this.token);
    return this.http.get<Log[]>(apiUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchLogs(term: string): Observable<Log[]> {
    term = term.trim();

    const apiUrl = this.configurationService.getBaseUrl();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term),
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AUTH-LOG-HEADER': this.token
      }) } : {};

    return this.http.get<Log[]>(apiUrl, options)
      .pipe(
        catchError(this.handleError<Log[]>('searchHeroes', []))
      );
  }

  search(keyword: string, level: string, toDate: string, fromDate: string, pageNumber: number, pageSize: number): Observable<Log[]> {
    keyword = keyword.trim();
    level = level.trim();
    toDate = toDate.trim();
    fromDate = fromDate.trim();
    if(pageNumber === 0) {
      pageNumber = 1;
    }

    if(pageSize === 0) {
      pageSize = 10;
    }
    const apiUrl = this.configurationService.getBaseUrl() + 'search';

    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams()
    .set('level', level.trim())
    .set('keyword', keyword.trim())
    .set('toDate', toDate.trim())
    .set('fromDate', fromDate.trim())
    .set('page', pageNumber.toString())
    .set('size', pageSize.toString()),

    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-AUTH-LOG-HEADER': this.token
    }) };

    return this.http.get<Log[]>(apiUrl, options)
      .pipe(
        catchError(this.handleError<Log[]>('search', []))
      );
  }


}
