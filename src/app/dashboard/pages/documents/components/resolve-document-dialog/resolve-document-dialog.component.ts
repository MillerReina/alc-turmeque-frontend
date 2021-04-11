import { Component, OnInit, Inject } from '@angular/core';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastMessageService } from '../../../../../services/toast-message.service';
import { DocumentsService } from '../../../../services/documents.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resolve-document-dialog',
  templateUrl: './resolve-document-dialog.component.html',
  styleUrls: ['./resolve-document-dialog.component.scss'],
})
export class ResolveDocumentDialogComponent implements OnInit {
  /**
   * Preload
   */
  public preload: boolean;
  /**
   * Variable para la dependencia actual
   */
  public actualDocument: IDocumentDetail;
  /**
   * Formulario reactivo para crear dependencia
   */
  public registerForm: FormGroup;
  /**
   * Archivo de subida
   */
  public files: File[] = [];
  /**
   * Es documento externo o interno
   */
  public documentKind: boolean;

  constructor(
    private fb: FormBuilder,
    private documentsService: DocumentsService,
    public dialogRef: MatDialogRef<ResolveDocumentDialogComponent>,
    private toastService: ToastMessageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail
  ) {
    this.createRegisterForm();
    this.actualDocument = data;
    this.typeOfDocument();
    this.preload = false;
  }

  ngOnInit(): void {}

  get subjectIsInvalid(): boolean {
    return this.registerForm.get('observations').invalid && this.registerForm.get('observations').touched;
  }

  get getFiles() {
    return this.registerForm.get('annex') as FormArray;
  }

  /**
   * Instancia el formulario reacitvo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      document: [''],
      observations: ['', [Validators.required, Validators.max(200)]],
      annex: [''],
    });
  }

  /**
   * Identifica el tipo de documento si es externo o interno
   */
  typeOfDocument(): void {
    this.actualDocument.user_assign ? (this.documentKind = true) : (this.documentKind = false);
  }

  /**
   * Envia los documentos para solucion del requerimiento
   */
  resolveDocument(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else if (this.files.length === 0) {
      Swal.fire({
        title: '¡Olvidaste cargar los documentos!',
        icon: 'warning',
        text: 'Por favor adjunta al menos un (1) archivo',
        confirmButtonText: 'Aceptar',
      });
    } else {
      this.registerForm.get('document').setValue(this.actualDocument.id);
      const formData = new FormData();

      formData.append('document', this.registerForm.get('document').value);
      formData.append('observations', this.registerForm.get('observations').value);
      formData.append('annex', this.files[0]);
      formData.append('annex', this.files[1]);
      formData.append('annex', this.files[2]);
      this.preload = true;
      this.documentsService.resolveDocument(formData).subscribe(
        (res) => {
          this.cancel();
          if (this.documentKind) {
            this.router.navigate([`dashboard/all`]);
            this.toastService.showSuccessMessageDocuments('REQUERIMIENTO RESUELTO', res.message);
          } else {
            this.router.navigate([`dashboard/external`]);
            this.toastService.showSuccessMessageDocuments('SOLICITUD EXTERNA RESUELTA', res.message);
          }
        },
        (err) => {
          this.preload = false;
          Swal.fire({
            title: '¡No se pudo resolver el requerimiento!',
            icon: 'error',
            text: err.error.error,
            confirmButtonText: 'Aceptar',
          });
          if (err.error.observations) {
            Swal.fire({
              title: '¡No se pudo resolver el requerimiento!',
              icon: 'error',
              text: err.error.observations,
              confirmButtonText: 'Aceptar',
            });
          }
          if (err.error.file_document) {
            Swal.fire({
              title: '¡No se pudo resolver el requerimiento!',
              icon: 'error',
              text: err.error.file_document,
              confirmButtonText: 'Aceptar',
            });
          }
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
    if (this.files.length < 3) {
      this.files.push(...event.addedFiles);
      this.registerForm.get('annex').setValue(this.files);
    }
  }
  /**
   * Remueve el archivo de la zona de arrastre
   */
  onRemove(event): void {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
