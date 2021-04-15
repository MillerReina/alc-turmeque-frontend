import { ToastMessageService } from './../../../../../services/toast-message.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepenciesService } from 'src/app/dashboard/services/depencies.service';
import { IDepedency } from 'src/app/interfaces/dependency-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DependecyDialogService } from 'src/app/dashboard/services/dependecy-dialog.service';
import { DependencyDialogComponent } from '../../../dependencies/components/dependency-dialog/dependency-dialog.component';
import Swal from 'sweetalert2';
import { ReportsService } from '../../services/reports.service';
import { IUserReport } from '../../../../../interfaces/user-report-interface';

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
   * Subscripcion hacia el evento del dialog
   */
  public dependecyCreateSubscription: Subscription;
  /**
   * Subscripcion hacia el evento del dialog
   */
  public dependecyUpdateSubscription: Subscription;

  constructor(
    private reportService: ReportsService,
    private dependeciesService: DepenciesService,
    private toastService: ToastMessageService,
    private dependencyDialogService: DependecyDialogService,
    public dialog: MatDialog
  ) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.loadDependencies();
    this.valueChanges();
  }

  ngOnDestroy(): void {
    this.dependecyCreateSubscription.unsubscribe();
    this.dependecyUpdateSubscription.unsubscribe();
  }

  /**
   * Suscripcion al dialog cuando hay cambios
   */

  valueChanges(): void {
    this.dependecyCreateSubscription = this.dependencyDialogService.newDependecy.subscribe((res) => {
      this.preload = true;
      this.toastService.showSuccessMessage('DEPENDENCIA CREADA', `Dependencia: ${res.toUpperCase()} ha sido agregada`);
      this.loadDependencies();
    });
    this.dependecyUpdateSubscription = this.dependencyDialogService.updateDependecy.subscribe((res) => {
      this.preload = true;
      this.toastService.showInfoMessage(
        'DEPENDENCIA ACTUALIZADA',
        `Dependencia: ${res.toUpperCase()} ha sido actualizada`
      );
      this.loadDependencies();
    });
  }

  /**
   * Carga las dependencias desde servicio
   */
  loadDependencies(): void {
    this.reportService.getOfficersReport('', '', 2021).subscribe((res) => {
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

  /**
   * Abre el dialogo para crear o editar
   */
  openDialog(element): void {
    const dialogRef = this.dialog.open(DependencyDialogComponent, {
      width: '500px',
      height: '300px',
      data: element,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((__) => {});
  }

  /**
   *  Activa una dependencia
   */
  activateDependency(element): void {
    this.preload = true;
    if (!element.state_dependency) {
      this.dependeciesService.activateDependency(element.id).subscribe((__) => {
        Swal.fire({
          title: 'DEPENDENCIA ACTIVADA',
          text: `La dependencia: ${element.name_dependency} ha sido activada`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadDependencies();
      });
    } else {
      this.dependeciesService.activateDependency(element.id).subscribe((__) => {
        Swal.fire({
          title: 'DEPENDENCIA DESACTIVADA',
          text: `La dependencia: ${element.name_dependency} ha sido desactivada`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadDependencies();
      });
    }
  }
  /**
   * Borra una dependencia sin antes solicitar confirmación
   */
  deleteDependency(element: IDepedency): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar: ${element.name_dependency}?`,
      text: 'No vas a poder revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d59c9',
      cancelButtonColor: '#ff007d',
      confirmButtonText: '¡Sí, borrarla!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dependeciesService.deleteDependencyById(element.id).subscribe(
          (__) => {
            this.preload = true;
            this.toastService.showWarningMessage(
              'DEPENDENCIA BORRADA',
              `La dependencia: ${element.name_dependency.toUpperCase()} fue eliminada satisfactoriamente`
            );
            this.loadDependencies();
          },
          (__) => {
            Swal.fire({
              title: '¡No se puede borrar!',
              icon: 'error',
              text: 'La dependencia tiene funcionarios asociados.',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    });
  }
}
