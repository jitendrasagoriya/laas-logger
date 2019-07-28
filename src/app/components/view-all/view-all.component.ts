import { Component, OnInit } from '@angular/core';
import {Log} from "../../models/log";
import {NgjLoggerService} from "../../../../projects/ngj-logger/src/lib/ngj-logger.service";
import {FormBuilder} from "@angular/forms";
import {LogService} from "../../services/log.service";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  public logs: Log[];

  constructor(private logger: NgjLoggerService,
              private logService: LogService) { }

  ngOnInit() {
    this.logService.search('', '', '','' ,0,0)
      .subscribe((logs) => {
        this.logs = logs;
      });
  }

}
