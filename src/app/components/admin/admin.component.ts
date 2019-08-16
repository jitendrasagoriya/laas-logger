import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  email: String;
  constructor(private router: Router) {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.email =  user.email;
    }
  }

  ngOnInit() {
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.clear();
      this.router.navigate(['admin-login']);
    }
  }

}
