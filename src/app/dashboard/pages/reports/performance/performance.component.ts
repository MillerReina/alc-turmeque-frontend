import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from './../services/reports.service';
import * as moment from 'moment';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent implements OnInit {
  public selectedIndex: number;
  public preload: boolean;
  public tab1: any;
  public preloadTab1: boolean;

  /**
   * Grafica
   */
  public chart: any;
  @ViewChild('tabGroup') tabGroup;

  constructor(private reportService: ReportsService) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.firstTab();
  }

  firstTab(): void {
    const anio = moment().format('YYYY');
    this.reportService.getDependenciesPercent('', '', anio).subscribe((__) => {
      this.tab1 = this.reportService.performanceReport;
      this.preload = false;
    });
  }
}
