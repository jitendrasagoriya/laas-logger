import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";

@Injectable()
export class ConfigurationService {

  public readonly localBase = 'http://localhost:8084/api/';
  public readonly serverBase = 'https://www.logasservice.online/api/'

  public baseProdUrl = this.serverBase +'db/ui/log/';
  public baseDevUrl = this.localBase +'db/ui/log/';

  public baseAuthenticationProdUrl = this.serverBase +'authentication/';
  public baseAuthenticationDevUrl = this.localBase +'authentication/';

  public adminLocalUrl = this.localBase + 'admin/'
  public adminServerUrl = this.serverBase + 'admin/'

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

  public getAdminUrl(): string {
    if ( this.isProd ) {
      return this.adminServerUrl;
    } else {
      return this.adminLocalUrl;
    }
  }

  public getUtilityUrl(): string {
    return this.getBaseUrl() + 'utility/';
  }

}
