import { Component, OnInit, Inject } from '@angular/core';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { DocumentsService } from '../../../../services/documents.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastMessageService } from '../../../../../services/toast-message.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finish-document-dialog',
  templateUrl: './finish-document-dialog.component.html',
  styleUrls: ['./finish-document-dialog.component.scss'],
})
export class FinishDocumentDialogComponent implements OnInit {
  /**
   * Preload
   */
  public preload: boolean;
  /**
   * Variable para la dependencia actual
   */
  public actualDocument: IDocumentDetail;
  /**
   * Archivo de subida
   */
  public files: File[] = [];

  constructor(
    private documentsService: DocumentsService,
    public dialogRef: MatDialogRef<FinishDocumentDialogComponent>,
    private toastService: ToastMessageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail
  ) {
    this.actualDocument = data;
    this.preload = false;
  }

  ngOnInit(): void {}

  /**
   * Envia los documentos para solucion del requerimiento
   */
  finishDocument(): void {
    if (this.files.length === 0) {
      Swal.fire({
        title: '¡Olvidaste cargar los documentos!',
        icon: 'warning',
        text: 'Por favor adjunta el comprobante de entrega',
        confirmButtonText: 'Aceptar',
      });
    } else {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      this.preload = true;
      this.documentsService.finishDocument(this.actualDocument.id, formData).subscribe(
        (res) => {
          this.cancel();
          this.router.navigate([`dashboard/all`]);
          this.toastService.showSuccessMessageDocuments('REQUERIMIENTO FINALIZADO', res.message);
        },
        (err) => {
          this.preload = false;
          console.log(err);
          Swal.fire({
            title: '¡No se pudo finalizar el requerimiento!',
            icon: 'error',
            text: err.error.error,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  /**
   * Cierra el dialog
   */
  cancel(): void {
    this.dialogRef.close();
  }

  /**
   * Agrega a la cola el archivo a subir
   */
  onSelect(event): void {
    if (this.files.length < 1) {
      this.files.push(...event.addedFiles);
    }
  }
  /**
   * Remueve el archivo de la zona de arrastre
   */
  onRemove(event): void {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
