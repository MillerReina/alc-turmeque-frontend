import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements AfterViewInit, OnChanges {
  @Input() tab1: any[];
  public chart: any;
  /**
   * Grafico seleccionado
   */
  public anioSelected: FormControl;

  constructor() {
    this.anioSelected = new FormControl();
  }

  ngAfterViewInit(): void {
    this.createGraphic();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tab1.currentValue != changes.tab1.previousValue) {
    }
  }

  changeAnio() {
    console.log(this.anioSelected.value);
  }

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
    title.text = 'Radicados asignados por dependencia';
    title.fontSize = 25;

    chart.cursor = new am4charts.XYCursor();

    series.columns.template.adapter.add('fill', function (__, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
    this.chart = chart;
    categoryAxis.sortBySeries = series;
  }
}
