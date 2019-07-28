import { Log } from './../../models/log';
import { LogService } from './../../services/log.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { logging } from 'protractor';
import { NgjLoggerService } from './../../../../projects/ngj-logger/src/lib/ngj-logger.service';
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {SearchResult} from "../../models/searchresult";


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

  constructor(private logger: NgjLoggerService,
              private formBuilder: FormBuilder,
              private logService: LogService) { }

  ngOnInit() {

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
        this.logger.info('Result',JSON.stringify(result))
        this.result = result;
        this.logs = this.result.list;
    });
  }

  public previous() {
    let pageNumber = 0;
    pageNumber = this.result.currentPageNumber-1;
    if(pageNumber < 1)
      pageNumber = 1;

    this.getNext(pageNumber);
  }

  public next() {
    let pageNumber = 0;
    pageNumber = this.result.currentPageNumber + 1;
    if(pageNumber > this.result.totalCount)
      pageNumber = this.result.totalCount;
    this.getNext(pageNumber);
  }

  public totalPage(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

}
