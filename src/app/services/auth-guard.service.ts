import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {NgjLoggerService} from "../../../projects/ngj-logger/src/lib/ngj-logger.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private logger:NgjLoggerService) { }

    canActivate() {
      if (localStorage.getItem('currentUser')) {
            this.logger.info('currentuser ' + localStorage.getItem('currentUser') );
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['login']);
        return false;
    }

}
