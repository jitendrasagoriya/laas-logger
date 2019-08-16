import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {NgjLoggerService} from "../../../projects/ngj-logger/src/lib/ngj-logger.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardGuard implements CanActivate  {

  constructor(private router: Router,
              private logger:NgjLoggerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.superAdmin) {
        //this.logger.info('currentuser ' + localStorage.getItem('currentUser') );
        return true;
      }
      // not logged in so redirect to login page
      this.router.navigate(['/admin-login']);
      return false;
    }
}
