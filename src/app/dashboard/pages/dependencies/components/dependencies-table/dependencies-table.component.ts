import { ToastMessageService } from './../../../../../services/toast-message.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepenciesService } from 'src/app/dashboard/services/depencies.service';
import { IDepedency } from 'src/app/interfaces/dependency-interface';
import Swal from 'sweetalert2';
import { DependencyDialogComponent } from '../dependency-dialog/dependency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DependecyDialogService } from 'src/app/dashboard/services/dependecy-dialog.service';

@Component({
  selector: 'app-dependencies-table',
  templateUrl: './dependencies-table.component.html',
  styleUrls: ['./dependencies-table.component.scss'],
})
export class DependenciesTableComponent implements OnInit, OnDestroy {
  /**
   * Estado de carga
   */
  public preload: boolean;
  public displayedColumns: string[] = ['dependencia', 'editar', 'borrar'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IDepedency>;
  /**
   * Arreglo de dependencias registradas en el sistema
   */
  public dependencies: IDepedency[];
  /**
   * Subscripcion hacia el evento del dialog
   */
  public dependecyCreateSubscription: Subscription;
  /**
   * Subscripcion hacia el evento del dialog
   */
  public dependecyUpdateSubscription: Subscription;

  constructor(
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
      this.toastService.showSuccessMessage('DEPENDENCIA CREADA', `Dependencia: ${res} ha sido agregada`);
      this.loadDependencies();
    });
    this.dependecyUpdateSubscription = this.dependencyDialogService.updateDependecy.subscribe((res) => {
      this.preload = true;
      this.toastService.showInfoMessage('DEPENDENCIA ACTUALIZADA', `Dependencia: ${res} ha sido actualizada`);
      this.loadDependencies();
    });
  }

  /**
   * Carga las dependencias desde servicio
   */
  loadDependencies(): void {
    this.dependeciesService.getAllDependecies().subscribe((res) => {
      this.dependencies = res;
      this.refreshTable();
    });
  }
  /**
   * Refresca la tabla con cada acción
   */
  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.dependencies);
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
   * Borra una dependencia sin antes solicitar confirmación
   */
  deleteDependency(element: IDepedency): void {
    Swal.fire({
      title: `Estas seguro de eliminar ${element.name_dependency}`,
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
            this.toastService.showSuccessMessage(
              'DEPENDENCIA BORRADA',
              `La dependencia: ${element.name_dependency} fue eliminada satisfactoriamente`
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
