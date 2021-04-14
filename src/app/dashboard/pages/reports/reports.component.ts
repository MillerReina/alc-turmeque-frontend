import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from './services/reports.service';
import { IDocumentReport } from '../../../interfaces/document-report-interface';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  public selectedIndex: number;
  public preload: boolean;
  public tab1: IDocumentReport;
  public preloadTab1: boolean;

  /**
   * Grafica
   */
  public chart: any;
  @ViewChild('tabGroup') tabGroup;

  constructor(private reportService: ReportsService) {
    this.preload = true;
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.firstTab();
    this.secondTab();
    this.thirdTab();
  }

  public nextTab() {
    this.selectedIndex = this.tabGroup.selectedIndex;
  }

  firstTab(): void {
    const anio = moment().format('YYYY');
    this.reportService.getMyDocumentsReport('', '', anio, 'PR').subscribe((res) => {
      this.tab1 = res;
    });
  }

  secondTab(): void {
    const anio = moment().format('YYYY');
    this.reportService.getMyDocumentsReport('', '', anio, '').subscribe((__) => {});
  }

  thirdTab(): void {
    const anio = moment().format('YYYY');
    this.reportService.getMyDocumentsReport('', '', anio, '').subscribe((__) => {
      this.preload = false;
    });
  }
}
