import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgjLoggerService} from "../../../../projects/ngj-logger/src/lib/ngj-logger.service";
import {SuperAdminService} from "../../services/super-admin.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private superAdmin: SuperAdminService,
              private logger: NgjLoggerService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['jitendra.sagoriya@yahoo.co.in', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const email
      = this.registerForm.get('email').value;
    const password
      = this.registerForm.get('password').value;

    this.superAdmin.getAdmin(email, password).subscribe((admin) => {
      // store username and jwt token in local storage to keep user logged in between page refreshes
      console.log(admin);
      if (admin.exception && admin.exception.code && admin.exception.code !== 200) {
        console.log('error');
      } else {
        localStorage.setItem('currentUser', JSON.stringify(
          {
            appname: 'SUPER ADMIN',
            token: 'NA',
            onBoardTime: admin.registrationDate,
            email: admin.emailId,
            type: admin.adminType,
            active: admin.active,
            id: admin.id,
            superAdmin: true
          }
        ));
        this.router.navigate(['super-admin/home']);
      }
    });
  }

}
