import { MONTHS } from './../../consts/const-months';
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { ANIOS } from '../../consts/const-anios';
import { DepenciesService } from '../../../../services/depencies.service';

import * as moment from 'moment';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-graphic-performance',
  templateUrl: './graphic-performance.component.html',
  styleUrls: ['./graphic-performance.component.scss'],
})
export class GraphicPerformanceComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  /**
   * Precarga del componente
   */
  public preload: boolean;
  /**
   * Variable de entrada
   */
  @Input() report: any[];

  /**
   * Variable para el gráfico
   */
  public chart: any;
  /**
   * Control de formulario para el anio
   */
  public anioSelected: FormControl;
  /**
   * Constante de anios
   */
  public anios = ANIOS;
  /**
   * Control de formulario para el anio
   */
  public monthSelected: FormControl;
  /**
   * Constante de meses
   */
  public months = MONTHS;
  /**
   * Control de formulario para el anio
   */
  public dependencySelected: FormControl;
  /**
   * Constante de meses
   */
  public dependencies: any;
  /**
   * Control de formulario para el anio
   */
  public stateDocumentSelectd: FormControl;
  /**
   * Control de formulario para el anio
   */
  public graphicSelected: FormControl;
  /**
   * Mes en selección actual
   */
  public currentMonth: any;
  /**
   * Año en selección actual
   */
  public currentYear: any;
  /**
   * Dependencia en selección actual
   */
  public currentDependency: any;
  /**
   * Nombre de la deependencia en selección actual
   */
  public currentDependencyName: any;
  /**
   * Estado actual de documento
   */
  public currentState: any;

  constructor(private reportsService: ReportsService, private dependencyService: DepenciesService) {
    this.preload = false;
    this.addYears();
    this.currentMonth = '';
    this.currentState = '';
    this.currentDependency = '';
    this.currentYear = moment().format('YYYY');
    this.anioSelected = new FormControl();
    this.monthSelected = new FormControl();
    this.dependencySelected = new FormControl();
    this.stateDocumentSelectd = new FormControl();
    this.graphicSelected = new FormControl();
  }

  /**
   * Llamado al servicio de dependencias y agregación
   */
  ngOnInit(): void {
    this.dependencyService.getAllDependecies().subscribe((res) => {
      const data = {
        id: '',
        name_dependency: 'Todas',
      };
      this.dependencies = res;
      this.dependencies.unshift(data);
    });
    console.log(this.report);
  }

  /**
   * Destruye el chart
   */
  ngOnDestroy(): void {
    this.chart.dispose();
    am4core.disposeAllCharts();
  }

  /**
   * Crea despues de haber sido construido
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createGraphic();
    }, 100);
  }

  /**
   * Detecta cambios en el ciclo de vida
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.report.currentValue != changes.report.previousValue) {
    }
  }

  /**
   * Cambia de año
   */
  changeAnio() {
    this.preload = true;
    const anio = this.anioSelected.value;
    this.currentYear = anio;
    this.reportsService
      .getMyDocumentsReport(this.currentMonth, this.currentDependency, anio, this.currentState)
      .subscribe((__) => {
        this.report = this.reportsService.performanceReport;
        this.createGraphic();
      });
  }

  /**
   * Actualización de años desde el inicio
   */
  addYears() {
    const initialYear = moment(this.anios[0].toString());
    let result = initialYear.diff(moment(), 'years');
    result = result * -1;
    for (let index = 1; index <= result; index++) {
      this.anios.push(this.anios[0] + index);
    }
    const unicos = this.anios.filter((valor, indice) => {
      return this.anios.indexOf(valor) === indice;
    });
    this.anios = unicos;
  }

  /**
   * Selección del mes
   */
  changeMonth() {
    this.preload = true;
    const month = this.monthSelected.value;
    this.currentMonth = month;
    this.reportsService.getDependenciesPercent(month, this.currentDependency, this.currentYear).subscribe((__) => {
      this.report = this.reportsService.performanceReport;
      this.createGraphic();
    });
  }

  /**
   * Selección de la dependencia
   */
  changeDependency() {
    this.preload = true;
    const dependency = this.dependencySelected.value;
    this.currentDependency = dependency;
    this.reportsService.getDependenciesPercent(this.currentMonth, dependency, this.currentYear).subscribe((__) => {
      this.report = this.reportsService.performanceReport;
      this.createGraphic();
    });
  }

  /**
   * Nombre de la dependencia
   */
  dependencyName() {
    if (this.currentDependency === '') {
      this.currentDependencyName = 'Todas';
    } else {
      this.dependencies.forEach((element) => {
        if (element.id == this.currentDependency) {
          this.currentDependencyName = element.name_dependency;
        }
      });
    }
  }

  /**
   * Crea la gráfica
   */
  createGraphic() {
    this.dependencyName();
    if (this.chart) {
      this.anioSelected.setValue(parseInt(this.currentYear));
      this.chart.dispose();
      am4core.disposeAllCharts();
    }
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = this.report;

    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name_dependency';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = 'Solucionados';
    series1.dataFields.categoryX = 'name_dependency';
    series1.dataFields.valueY = 'yes';
    series1.dataFields.valueYShow = 'totalPercent';
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = 'vertical';

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color('#ffffff');
    bullet1.locationY = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = 'No solucionados';
    series2.dataFields.categoryX = 'name_dependency';
    series2.dataFields.valueY = 'no';
    series2.dataFields.valueYShow = 'totalPercent';
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = 'vertical';

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color('#ffffff');

    let title = chart.titles.create();
    title.text = `Desempeño / Dependencia: ${this.currentDependencyName}`;
    title.fontSize = 17;

    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items = [
      {
        label: '...',
        menu: [
          { type: 'png', label: 'PNG' },
          { type: 'jpg', label: 'JPG' },
        ],
      },
    ];

    this.chart = chart;

    this.preload = false;
  }
}
