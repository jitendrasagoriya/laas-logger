import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public application: string;

  constructor(private router: Router) {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.application =  user.appname;
    }
   }

  ngOnInit() {
  }

  searchByKeyword(searchKeyword: string) {
    this.router.navigate(['search', {keyword: searchKeyword}]);
    //this.router.navigateByUrl('admin/search', { state: { keyword:searchKeyword } });
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }

}
