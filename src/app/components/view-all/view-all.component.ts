import { Component, OnInit } from '@angular/core';
import {Log} from "../../models/log";
import {NgjLoggerService} from "../../../../projects/ngj-logger/src/lib/ngj-logger.service";
import {FormBuilder} from "@angular/forms";
import {LogService} from "../../services/log.service";
// @ts-ignore
import {SearchResult} from "../../models/searchresult";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  public logs: Log[];
  public result = {} as SearchResult;
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public level: string = "";
  public keyword: string = "";


  constructor(private logger: NgjLoggerService,
              private logService: LogService) { }

  ngOnInit() {
    this.logService.search('', '', '','' ,0,0)
      .subscribe((result) => {
        this.result = result;
        this.logs = this.result.list;
      });
  }

  public getNext(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.search();
  }

  public changePageSize(size:string) {
    this.pageSize = parseInt(size);
    this.search();
  }

  private search() {
    this.logService.search(this.keyword, this.level, '', '',this.pageNumber ,this.pageSize)
      .subscribe((result) => {
        this.logger.info("search",["result",this.result])
        this.result = result;
        this.logs = this.result.list;
      });
  }

  public filterByLevel(level: string){
     this.level = level;
     this.search();
  }

  public previous() {
    this.pageNumber = 0;
    this.pageNumber = this.result.currentPageNumber-1;
    if(this.pageNumber < 1)
      this.pageNumber = 1;

    this.search();
  }

  public next() {
    this.pageNumber = 0;
    this.pageNumber = this.result.currentPageNumber + 1;
    if(this.pageNumber > this.result.totalCount)
      this.pageNumber = this.result.totalCount;

    this.search();
  }

  public totalPage(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

}