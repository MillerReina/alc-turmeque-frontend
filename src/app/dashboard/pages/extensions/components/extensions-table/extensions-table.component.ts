import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IExtensionDetail } from '../../../../../interfaces/extension-detail-interface';
import { ExtensionsService } from '../../../../services/extensions.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../../services/toast-message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-extensions-table',
  templateUrl: './extensions-table.component.html',
  styleUrls: ['./extensions-table.component.scss'],
})
export class ExtensionsTableComponent implements OnInit {
  /**
   * Estado de carga
   */
  public preload: boolean;
  public displayedColumns: string[] = ['documento', 'funcionario', 'asunto', 'estado', 'fecha', 'acciones'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IExtensionDetail>;
  /**
   * Arreglo de dependencias registradas en el sistema
   */
  public extensions: IExtensionDetail[];

  constructor(
    private extensionService: ExtensionsService,
    private router: Router,
    private toastService: ToastMessageService
  ) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.loadExtensions();
  }

  /**
   * Carga las prorrogas desde servicio
   */
  loadExtensions(): void {
    this.extensionService.getAllExtensions().subscribe((res) => {
      this.extensions = res;
      this.refreshTable();
    });
  }

  /**
   * Refresca la tabla con cada acción
   */
  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.extensions);
    this.preload = false;
  }

  /**
   * Abre documento en especifico por id
   */
  getDocument(element): void {
    this.router.navigate([`/dashboard/detail/${element.document.id}/document`]);
  }

  /**
   * Aprueba la prórroga
   */
  approveExtension(element) {
    Swal.fire({
      title: `Confirme su acción de aprobación`,
      text: 'Aprobar prórroga',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d59c9',
      cancelButtonColor: '#ff007d',
      confirmButtonText: '¡Sí, aprobar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.extensionService.approveExtension(element.id).subscribe((res) => {
          this.preload = true;
          this.toastService.showSuccessMessage('PRÓRROGA APROBADA', res.message);
          this.loadExtensions();
        });
      }
    });
  }

  /**
   * Rechaza la prórroga
   */
  rejectExtension(element) {
    Swal.fire({
      title: `Confirme su acción de rechazo`,
      text: 'Justifique el rechazo por favor:',
      icon: 'warning',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#1d59c9',
      cancelButtonColor: '#ff007d',
      confirmButtonText: '¡Rechazar!',
      cancelButtonText: 'Cancelar',
      preConfirm: (res) => {
        this.preload = true;
        const formData = new FormData();
        formData.append('observations', res);
        this.extensionService.rejectExtension(element.id, formData).subscribe((res) => {
          this.toastService.showInfoMessage('PRÓRROGA RECHAZADA', res.message);
          this.loadExtensions();
        });
      },
    });
  }
}
