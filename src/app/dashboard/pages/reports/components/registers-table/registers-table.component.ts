import { ANIOS } from './../../consts/const-anios';
/* import { ToastMessageService } from './../../../../../services/toast-message.service'; */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { ReportsService } from '../../services/reports.service';
import { IUserReport } from '../../../../../interfaces/user-report-interface';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { DepenciesService } from 'src/app/dashboard/services/depencies.service';
import { MONTHS } from '../../consts/const-months';

@Component({
  selector: 'app-registers-table',
  templateUrl: './registers-table.component.html',
  styleUrls: ['./registers-table.component.scss'],
})
export class RegistersTableComponent implements OnInit, OnDestroy {
  /**
   * Estado de carga
   */
  public preload: boolean;
  /**
   * Columnas
   */
  public displayedColumns: string[] = ['usuario', 'solucionados', 'no_solucionados', 'en_tiempo', 'des_tiempo'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IUserReport>;
  /**
   * Arreglo de dependencias registradas en el sistema
   */
  public reportOfficers: IUserReport[];
  /**
   * Control de formulario para el anio
   */
  public monthSelected: FormControl;
  /**
   * Control de formulario para el anio
   */
  public dependencySelected: FormControl;
  /**
   * Control de formulario para el anio
   */
  public anioSelected: FormControl;
  /**
   * Constante de anios
   */
  public anios = ANIOS;
  /**
   * Constante de meses
   */
  public months = MONTHS;
  /**
   * Año seleccionado en el momento
   */
  public actualAnio: any;
  /**
   * Mes seleccionado en el momento
   */
  public actualMonth: any;
  /**
   * Dependencia selecionada en el momento
   */
  public actualDependency: any;
  /**
   * Constante de meses
   */
  public dependencies: any;

  constructor(
    private reportService: ReportsService,
    public dialog: MatDialog,
    private dependencyService: DepenciesService
  ) {
    this.addYears();
    this.preload = true;
    this.actualMonth = '';
    this.actualDependency = '';
    this.actualAnio = moment().format('YYYY');
    this.monthSelected = new FormControl();
    this.dependencySelected = new FormControl();
    this.anioSelected = new FormControl();
    this.anioSelected.setValue(parseInt(moment().format('YYYYY')));
  }

  ngOnInit(): void {
    this.dependencyService.getAllDependecies().subscribe((res) => {
      const data = {
        id: '',
        name_dependency: 'Todas',
      };
      this.dependencies = res;
      this.dependencies.unshift(data);
    });
    this.loadReports();
  }

  ngOnDestroy(): void {}

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
   * Carga el reporte de funcionarios desde servicio
   */
  loadReports(): void {
    this.reportService.getOfficersReport('', '', this.anioSelected.value).subscribe((res) => {
      this.reportOfficers = res;
      this.refreshTable();
    });
  }

  /**
   * Refresca la tabla con cada acción
   */
  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.reportOfficers);
    this.preload = false;
  }

  changeDependency() {
    const dependency = this.dependencySelected.value;
    this.actualDependency = dependency;
    this.reportService.getOfficersReport(this.actualMonth, this.actualDependency, this.actualAnio).subscribe((res) => {
      this.reportOfficers = res;
      this.refreshTable();
    });
  }

  changeMonth() {
    const month = this.monthSelected.value;
    this.actualMonth = month;
    this.reportService.getOfficersReport(this.actualMonth, this.actualDependency, this.actualAnio).subscribe((res) => {
      this.reportOfficers = res;
      this.refreshTable();
    });
  }

  changeAnio() {
    const anio = this.anioSelected.value;
    this.actualAnio = anio;
    this.reportService.getOfficersReport(this.actualMonth, this.actualDependency, this.actualAnio).subscribe((res) => {
      this.reportOfficers = res;
      this.refreshTable();
    });
  }
}
