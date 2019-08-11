import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Log } from './../../models/log';
import { LogService } from './../../services/log.service';
import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import {NgjLoggerService} from "../../../../projects/ngj-logger/src/lib/ngj-logger.service";


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, AfterViewInit ,  AfterContentInit {

  public infoCount: number;
  public errorCount: number;
  public debugCount: number;
  public yesterDay: number;
  public logs: Log[];
  private i: number;
  private j: number;
  private k: number;
  private loadAllLogs = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['2019-01-27', '2019-01-26', '2019-01-21'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [11, 4, 1], label: 'INFO' },
    { data: [0, 0, 0], label: 'DEBUG' },
    { data: [8, 2, 1], label: 'ERROR' }
  ];


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Info'], ['Debug'], 'Error'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private logService: LogService, private logger: NgjLoggerService) {

  }
  ngOnInit() {
    this.logger.log('Test Successful......')

    this.getLogs();
    this.getYesterdayTotalCount();
    this.i = this.getInfoCount();
    this.j = this.getDebugCount();
    this.k = this.getErrorCount();

    this.pieChartData = [ this.i, this.j, this.k ];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
  }

  getLogs(): void {
    this.logService.getLogs()
      .subscribe(logs => (this.logs = logs));
  }

  ngAfterViewInit() {
  }

  getErrorCount(): number {
    this.logService.getCount('ERROR').subscribe(count => {
      this.errorCount = count;
      this.loadAllLogs = true;
      this.pieChartData[2] = count;
      return count;
    });
    return 0;
  }

  getDebugCount(): number {
    this.logService.getCount('DEBUG').subscribe(count => {
      this.debugCount = count;
      this.loadAllLogs = true;
      this.pieChartData[1] = count;
      return count;
    });
    return 0;
  }

  getInfoCount(): number {
    this.logService.getCount('INFO').subscribe(count => {
      this.infoCount = count;
      this.loadAllLogs = true;
      this.pieChartData[0] = count;
      return count;
    });
    return 0;
  }

  getYesterdayTotalCount() {
     this.logService.getYesterDayCount('1').subscribe(count => {
         this.yesterDay = count;
    });
  }

}
