import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDocType } from '../../../../../interfaces/doc-type-interface';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DocTypeService } from '../../../../services/doc-type.service';
import { ToastMessageService } from '../../../../../services/toast-message.service';
import { MatDialog } from '@angular/material/dialog';
import { DocTypeDialogService } from 'src/app/dashboard/services/doc-type-dialog.service';
import { DocTypesDialogComponent } from '../doc-types-dialog/doc-types-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-types-table',
  templateUrl: './doc-types-table.component.html',
  styleUrls: ['./doc-types-table.component.scss'],
})
export class DocTypesTableComponent implements OnInit, OnDestroy {
  /**
   * Estado de carga
   */
  public preload: boolean;
  public displayedColumns: string[] = ['tipo', 'dias', 'editar', 'estado', 'borrar'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IDocType>;
  /**
   * Arreglo de dependencias registradas en el sistema
   */
  public docTypes: IDocType[];
  /**
   * Subscripcion hacia el evento del dialog
   */
  public docTypeCreateSubscription: Subscription;
  /**
   * Subscripcion hacia el evento del dialog
   */
  public docTypeUpdateSubscription: Subscription;

  constructor(
    private docTypeService: DocTypeService,
    private toastService: ToastMessageService,
    private docTypeDialogService: DocTypeDialogService,
    public dialog: MatDialog
  ) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.loadDocTypes();
    this.valueChanges();
  }

  ngOnDestroy(): void {
    this.docTypeCreateSubscription.unsubscribe();
    this.docTypeUpdateSubscription.unsubscribe();
  }

  /**
   * Suscripcion al dialog cuando hay cambios
   */

  valueChanges(): void {
    this.docTypeCreateSubscription = this.docTypeDialogService.newDocType.subscribe((res) => {
      this.preload = true;
      this.toastService.showSuccessMessage('TIPO DE DOCUMENTO CREADO', `Tipo: ${res.toUpperCase()} ha sido agregado`);
      this.loadDocTypes();
    });
    this.docTypeUpdateSubscription = this.docTypeDialogService.updateDocType.subscribe((res) => {
      this.preload = true;
      this.toastService.showInfoMessage(
        'TIPO DE DOCUMENTO ACTUALIZADO',
        `Tipo: ${res.toUpperCase()} ha sido actualizado`
      );
      this.loadDocTypes();
    });
  }

  /**
   * Carga los tipos de documento desde servicio
   */
  loadDocTypes(): void {
    this.docTypeService.getAllDocTypes().subscribe((res) => {
      this.docTypes = res;
      this.refreshTable();
    });
  }
  /**
   * Refresca la tabla con cada acción
   */
  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.docTypes);
    this.preload = false;
  }
  /**
   * Abre el dialogo para crear o editar
   */
  openDialog(element): void {
    const dialogRef = this.dialog.open(DocTypesDialogComponent, {
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
    if (element.is_active) {
      this.docTypeService.activateDocType(element.id).subscribe((__) => {
        Swal.fire({
          title: 'TIPO DE DOCUMENTO DESACTIVADO',
          text: `El tipo: ${element.name_dependency} ha sido desactivado`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadDocTypes();
      });
    } else {
      this.docTypeService.activateDocType(element.id).subscribe((__) => {
        Swal.fire({
          title: 'TIPO DE DOCUMENTO ACTIVADO',
          text: `El tipo: ${element.name_dependency} ha sido activado`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadDocTypes();
      });
    }
  }
  /**
   * Borra una dependencia sin antes solicitar confirmación
   */
  deleteDependency(element: IDocType): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar: ${element.name_document_type}?`,
      text: 'No vas a poder revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d59c9',
      cancelButtonColor: '#ff007d',
      confirmButtonText: '¡Sí, borrarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.docTypeService.deleteDocTypeById(element.id).subscribe(
          (__) => {
            this.preload = true;
            this.toastService.showWarningMessage(
              'TIPO DE DOCUMENTO BORRADO',
              `El tipo: ${element.name_document_type.toUpperCase()} fue eliminado satisfactoriamente`
            );
            this.loadDocTypes();
          },
          (__) => {
            Swal.fire({
              title: '¡No se puede borrar!',
              icon: 'error',
              text: 'El tipo de documento tiene registros asociados.',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    });
  }
}
