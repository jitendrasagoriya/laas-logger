import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";

@Injectable()
export class ConfigurationService {

  public baseProdUrl = 'https://log-as-service.herokuapp.com/api/db/ui/log/';
  public baseDevUrl = 'http://localhost:8084/api/db/ui/log/';

  public baseAuthenticationProdUrl = 'https://log-as-service.herokuapp.com/api/authentication/';
  public baseAuthenticationDevUrl = 'http://localhost:8084/api/authentication/';

  public isProd = environment.production;
  constructor() { }

  public getBaseUrl(): string {
    if ( this.isProd ) {
      return this.baseProdUrl;
    } else {
      return this.baseDevUrl;
    }
  }

  public getAuthenticateUrl(): string {
    if ( this.isProd ) {
      return this.baseAuthenticationProdUrl;
    } else {
      return this.baseAuthenticationDevUrl;
    }
  }

  public getUtilityUrl(): string {
    return this.getBaseUrl() + 'utility/';
  }

}
