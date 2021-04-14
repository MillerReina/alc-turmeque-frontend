import { MONTHS } from './../../consts/const-months';
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { ANIOS } from '../../consts/const-anios';
import * as moment from 'moment';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements AfterViewInit, OnChanges, OnDestroy {
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

  public currentMonth: any;
  public currentYear: any;

  constructor(private reportsService: ReportsService) {
    this.addYears();
    this.anioSelected = new FormControl();
    this.monthSelected = new FormControl();
  }

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
    this.reportsService.getMyDocumentsReport('', '', anio, '').subscribe((res) => {
      this.chart.data = res;
      console.log(this.chart.data);
    });
  }

  addYears() {
    const initialYear = moment(this.anios[0].toString());
    let result = initialYear.diff(moment(), 'years');
    result = result * -1;
    for (let index = 1; index <= result; index++) {
      this.anios.push(this.anios[0] + index);
    }
  }

  changeMonth() {
    const month = this.monthSelected.value;
    console.log(month);
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
