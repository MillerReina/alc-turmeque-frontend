import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtensionsService } from '../../../../services/extensions.service';
import Swal from 'sweetalert2';
import { ToastMessageService } from '../../../../../services/toast-message.service';

@Component({
  selector: 'app-extension-document-dialog',
  templateUrl: './extension-document-dialog.component.html',
  styleUrls: ['./extension-document-dialog.component.scss'],
})
export class ExtensionDocumentDialogComponent implements OnInit {
  /**
   * Variable para la dependencia actual
   */
  public actualDocument: IDocumentDetail;
  /**
   * Formulario reactivo para crear dependencia
   */
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private extensionService: ExtensionsService,
    public dialogRef: MatDialogRef<ExtensionDocumentDialogComponent>,
    private toastService: ToastMessageService,
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail
  ) {
    this.createRegisterForm();
    this.actualDocument = data;
  }

  ngOnInit(): void {}

  get daysAssignIsInvalid(): boolean {
    return this.registerForm.get('days').invalid && this.registerForm.get('days').touched;
  }

  get subjectIsInvalid(): boolean {
    return this.registerForm.get('description').invalid && this.registerForm.get('description').touched;
  }

  /**
   * Instancia el formulario reacitvo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      document: [''],
      description: ['', [Validators.required, Validators.max(120)]],
      days: ['', [Validators.required, Validators.max(5)]],
    });
  }

  /**
   * Solicita la prorroga
   */
  requestDocumentExtension(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.registerForm.get('document').setValue(this.actualDocument.id);
      const formData = new FormData();
      formData.append('document', this.registerForm.get('document').value);
      formData.append('description', this.registerForm.get('description').value);
      formData.append('days', this.registerForm.get('days').value);

      this.extensionService.generateExtensionToDocument(formData).subscribe(
        (res) => {
          this.cancel();
          this.toastService.showWarningMessage('PRÓRROGA SOLICITADA', res.message);
        },
        (err) => {
          Swal.fire({
            title: '¡No se pudo generar la prórroga!',
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
}
