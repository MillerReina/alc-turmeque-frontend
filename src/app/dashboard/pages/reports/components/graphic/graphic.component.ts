import { MONTHS } from './../../consts/const-months';
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { ANIOS } from '../../consts/const-anios';
import { DepenciesService } from '../../../../services/depencies.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as moment from 'moment';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  /**
   * Variable de entrada
   */
  @Input() tab1: any[];

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
   *
   */
  public currentMonth: any;
  public currentYear: any;
  public currentDependency: any;

  constructor(private reportsService: ReportsService, private dependencyService: DepenciesService) {
    this.addYears();
    console.log(this.anios);

    this.currentMonth = '';
    this.currentYear = moment().format('YYYY');
    this.anioSelected = new FormControl();
    this.monthSelected = new FormControl();
    this.dependencySelected = new FormControl();
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
  }

  /**
   * Destruye el chart
   */
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  /**
   * Crea despues de haber sido construido
   */
  ngAfterViewInit(): void {
    console.log(this.tab1);
    this.createGraphic();
  }

  /**
   * Detecta cambios en el ciclo de vida
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tab1.currentValue != changes.tab1.previousValue) {
    }
  }

  /**
   * Cambia de año
   */
  changeAnio() {
    const anio = this.anioSelected.value;
    this.currentYear = anio;
    this.reportsService.getMyDocumentsReport(this.currentMonth, '', anio, 'PR').subscribe((res) => {
      this.chart.data = res;
      console.log(this.chart.data);
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
    const month = this.monthSelected.value;
    this.currentMonth = month;
    this.reportsService.getMyDocumentsReport(month, '', this.currentYear, 'PR').subscribe((res) => {
      this.chart.data = res;
      console.log(this.chart.data);
    });
  }

  /**
   * Selección de la dependencia
   */
  changeDependency() {
    const dependency = this.dependencySelected.value;
    this.currentDependency = dependency;
    this.reportsService.getMyDocumentsReport(this.currentMonth, dependency, this.currentYear, 'PR').subscribe((res) => {
      this.chart.data = res;
      console.log(this.chart.data);
    });
  }

  /**
   * Crea la gráfica
   */
  createGraphic() {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create('chartdiv', am4charts.XYChart);

    chart.data = this.tab1;
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'name_dependency';
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'name_dependency';
    series.dataFields.valueY = 'total';
    series.tooltipText = '{valueY.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;

    //series.interpolationDuration = 1500;
    //series.interpolationEasing = am4core.ease.linear;
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = 'bottom';
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    let title = chart.titles.create();
    title.text = 'Radicados asignados/dependencia';
    title.fontSize = 17;

    chart.cursor = new am4charts.XYCursor();

    series.columns.template.adapter.add('fill', function (__, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
    this.chart = chart;
    categoryAxis.sortBySeries = series;
  }
}
