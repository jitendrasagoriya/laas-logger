import { Component, OnInit } from '@angular/core';
import {Log} from "../../models/log";
import {Application} from "../../models/application";
import {ApplicationResult} from "../../models/application-result";
import {NgjLoggerService} from "../../../../projects/ngj-logger/src/lib/ngj-logger.service";
import {SuperAdminService} from "../../services/super-admin.service";
import {Admin} from "../../models/admin";

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  public applications: Application[];
  public result = {} as ApplicationResult;
  public pageSize: number = 0;
  public pageNumber: number = 0;

  constructor(private logger: NgjLoggerService, private adminService: SuperAdminService) { }

  ngOnInit() {
    this.adminService.getAllAdmin().subscribe((applications)=>{
      this.applications = applications;
    })
  }


  public getNext(pageNumber: number) {

  }

  public changePageSize(size:string) {

  }

  public previous() {

  }

  public next() {

  }

  public totalPage(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

}
