import { Log } from './../../models/log';
import { LogService } from './../../services/log.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { logging } from 'protractor';
import { NgjLoggerService } from './../../../../projects/ngj-logger/src/lib/ngj-logger.service';
import { Component, OnInit } from '@angular/core';

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

  searchForm: FormGroup;
  public logs: Log[];

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

    this.logService.search(this.keyword, this.level, this.todate, this.fromDate)
         .subscribe((logs) => {
            this.logs = logs;
     });
  }

}
