import { Log } from './../../models/log';
import { LogService } from './../../services/log.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { logging } from 'protractor';
import { NgjLoggerService } from './../../../../projects/ngj-logger/src/lib/ngj-logger.service';
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {SearchResult} from "../../models/searchresult";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Observable} from "rxjs";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public level: string;
  public keyword: string;
  public todate: string;
  public fromDate: string;
  public pageSize: number = 0;
  public pageNumber: number = 0;

  searchForm: FormGroup;
  public logs: Log[];
  public result = {} as SearchResult;
  private state: Observable<object>;

  constructor(private logger: NgjLoggerService,
              private formBuilder: FormBuilder,
              private logService: LogService,
              private route: ActivatedRoute,
              private router: Router) {



  }

  ngOnInit() {

    this.route.data.subscribe(data => {
       this.logger.info("Search Data" ,[data]);
    })


    this.searchForm = this.formBuilder.group({
      level: [''],
      keyword: [''],
      todate: [''],
      fromDate: ['']
    });
  }

  get f() { return this.searchForm.controls; }

  public onSubmit() {

    this.level = this.searchForm.get('level').value;
    this.keyword = this.searchForm.get('keyword').value;
    this.todate = this.searchForm.get('todate').value;
    this.fromDate = this.searchForm.get('fromDate').value;

    this.logService.search(this.keyword, this.level, this.todate, this.fromDate,this.pageNumber,this.pageSize)
         .subscribe((result) => {
            this.result = result;
            this.logs = this.result.list;
     });
  }

  public getNext(pageNumber: number) {
    this.logService.search(this.keyword, this.level, this.todate, this.fromDate,pageNumber,this.pageSize)
      .subscribe((result) => {
        this.result = result;
        this.logs = this.result.list;
    });
  }

  public changePageSize(size:string) {
    this.pageSize = parseInt(size);
    this.getNext(this.pageNumber);
  }

  public previous() {
    this.pageNumber = 0;
    this.pageNumber = this.result.currentPageNumber-1;
    if(this.pageNumber < 1)
      this.pageNumber = 1;
    this.getNext(this.pageNumber);
  }

  public next() {
    this.pageNumber = 0;
    this.pageNumber = this.result.currentPageNumber + 1;
    if(this.pageNumber > this.result.totalCount)
      this.pageNumber = this.result.totalCount;
    this.getNext(this.pageNumber);
  }

  public totalPage(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

}
