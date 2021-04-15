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
import { ExportToExcelService } from '../../services/export-to-excel.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
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

  constructor(
    private reportsService: ReportsService,
    private dependencyService: DepenciesService,
    private exportExcelService: ExportToExcelService
  ) {
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
    this.graphicSelected = new FormControl('Bars');
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
    this.chart.dispose();
    am4core.disposeAllCharts();
  }

  /**
   * Crea despues de haber sido construido
   */
  ngAfterViewInit(): void {
    this.createGraphic();
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
      .subscribe((res) => {
        this.report = res;
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
    this.reportsService
      .getMyDocumentsReport(month, this.currentDependency, this.currentYear, this.currentState)
      .subscribe((res) => {
        this.report = res;
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
    this.reportsService
      .getMyDocumentsReport(this.currentMonth, dependency, this.currentYear, this.currentState)
      .subscribe((res) => {
        this.report = res;
        this.createGraphic();
      });
  }

  /**
   * Selección del estado del documento
   */
  changeState() {
    this.preload = true;
    const state = this.stateDocumentSelectd.value;
    this.currentState = state;
    this.reportsService
      .getMyDocumentsReport(this.currentMonth, this.currentDependency, this.currentYear, state)
      .subscribe((res) => {
        this.report = res;
        this.createGraphic();
      });
  }

  /**
   * Selección de gráfica
   */
  changeGraphic() {
    this.preload = true;
    this.reportsService
      .getMyDocumentsReport(this.currentMonth, this.currentDependency, this.currentYear, this.currentState)
      .subscribe((res) => {
        this.report = res;
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
    if (this.graphicSelected.value == 'Bars') {
      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.data = this.report;
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

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = 'name_dependency';
      series.dataFields.valueY = 'total';
      series.tooltipText = '{valueY.value}';
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;

      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.verticalCenter = 'bottom';
      labelBullet.label.dy = -10;
      labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

      let title = chart.titles.create();
      title.text = `Cant. Radicados / Dependencia: ${this.currentDependencyName}`;
      title.fontSize = 17;

      chart.cursor = new am4charts.XYCursor();

      series.columns.template.adapter.add('fill', function (__, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });
      this.chart = chart;
      categoryAxis.sortBySeries = series;
    } else if (this.graphicSelected.value == 'Semi pie') {
      if (this.chart) {
        this.chart.dispose();
        am4core.disposeAllCharts();
      }
      let chart = am4core.create('chartdiv', am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.data = this.report;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = 'total';
      series.dataFields.radiusValue = 'total';
      series.dataFields.category = 'name_dependency';
      series.slices.template.cornerRadius = 6;
      series.colors.step = 3;

      series.hiddenState.properties.endAngle = -90;

      let title = chart.titles.create();
      title.text = `Cant. Radicados / Dependencia: ${this.currentDependencyName}`;
      title.fontSize = 17;

      chart.legend = new am4charts.Legend();
      this.chart = chart;
    } else if ((this, this.graphicSelected.value == 'Piramid')) {
      if (this.chart) {
        this.chart.dispose();
        am4core.disposeAllCharts();
      }
      let chart = am4core.create('chartdiv', am4charts.SlicedChart);
      chart.data = this.report;
      let series2 = chart.series.push(new am4charts.PyramidSeries());
      series2.dataFields.value = 'total';
      series2.dataFields.category = 'name_dependency';
      series2.labels.template.disabled = true;

      let title = chart.titles.create();
      title.text = `Cant. Radicados / Dependencia: ${this.currentDependencyName}`;
      title.fontSize = 17;
    }
    this.preload = false;
  }

  /**
   * Descargra excel con los datos
   */
  downloadExcel() {
    this.exportExcelService.exportAsExcelFile(
      this.report,
      `Dependencia_${this.currentDependencyName}-Año_${this.currentYear}`
    );
  }
}
