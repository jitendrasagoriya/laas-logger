import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from "./http-error-handler.service";
import {Admin} from "../models/admin";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ConfigurationService} from "./configuration.service";
import {ExceptionService} from "./exception.service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Log} from "../models/log";
import {logger} from "codelyzer/util/logger";
import {Application} from "../models/application";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private handleError: HandleError;

  public admin: Admin;

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler,
              private configurationService: ConfigurationService,
              private exceptionService: ExceptionService) {

    this.handleError = httpErrorHandler.createHandleError('SuperAdminService');
  }

  /** GET: get admin to the database */
  getAdmin(email: string, password: string): Observable<Admin> {
    // tslint:disable-next-line:prefer-const
    console.log(this.configurationService.getAdminUrl())
    const options = { params: new HttpParams().set('email', email.trim()).set('password', password.trim()),
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control':'no-cache, no-store, must-revalidate',
        'Pragma':'no-cache',
        'Expires':'0'
      }) };
    return this.http.get<Admin>(this.configurationService.getAdminUrl()+"admin-login/", options)
      .pipe(
        catchError(this.handleError('getAdmin', this.admin))
      );
  }

  getAllAdmin(): Observable<Application[]>{
    return  this.http.get<Application[]>(this.configurationService.getAdminUrl()+"all/")
      .pipe(
        catchError(this.handleError<Application[]>('getAllAdmin', []))
      );
  }



}
