import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot} from '@angular/router';
import {NgjLoggerService} from "../../../projects/ngj-logger/src/lib/ngj-logger.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private logger:NgjLoggerService) { }

    canActivate() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && !user.superAdmin) {
           // this.logger.info('currentuser ' + localStorage.getItem('currentUser') );
            return true;
      }
      // not logged in so redirect to login page
      this.router.navigate(['login']);
      return false;
    }

}
