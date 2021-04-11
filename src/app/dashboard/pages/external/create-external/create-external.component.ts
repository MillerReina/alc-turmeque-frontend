import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import { IDepedency } from '../../../../interfaces/dependency-interface';
import { DocTypeService } from 'src/app/dashboard/services/doc-type.service';
import { IDocType } from 'src/app/interfaces/doc-type-interface';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastMessageService } from '../../../../services/toast-message.service';
import Swal from 'sweetalert2';
import { ExternalDocumentsService } from '../../../services/external-documents.service';

@Component({
  selector: 'app-create-external',
  templateUrl: './create-external.component.html',
  styleUrls: ['./create-external.component.scss'],
})
export class CreateExternalComponent implements OnInit {
  /**
   * Preload
   */
  public preload: boolean;
  /**
   * Preload despues de crear
   */
  public postCreate: boolean;
  /**
   * Formulario reactivo para crear documento
   */
  public registerForm: FormGroup;
  /**
   * Lista de tipos de ID
   */
  public listIDTypes: ITypeID[];
  /**
   * Lista de dependencias
   */
  public listDependencies: IDepedency[];
  /**
   * Lista de tipos de documento
   */
  public listDocumentType: IDocType[];
  /**
   * Archivo de subida
   */
  public files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private documentTypeService: DocTypeService,
    private router: Router,
    private externalDocumentService: ExternalDocumentsService,
    private toastService: ToastMessageService
  ) {
    this.createRegisterForm();
    this.preload = true;
    this.postCreate = false;
  }

  ngOnInit(): void {
    this.getDocTypes();
  }

  get subjectIsInvalid(): boolean {
    return this.registerForm.get('subject').invalid && this.registerForm.get('subject').touched;
  }

  get documentTypeIsInvalid(): boolean {
    return this.registerForm.get('document_type').invalid && this.registerForm.get('document_type').touched;
  }

  get fileIsInvalid(): boolean {
    return this.registerForm.get('file_document').invalid && this.registerForm.get('file_document').touched;
  }

  /**
   * Obtiene los tipos de documento
   */
  getDocTypes(): void {
    this.documentTypeService.getAllDocTypes().subscribe((res) => {
      this.listDocumentType = res;
      this.preload = false;
    });
  }

  /**
   * Crea la instancia del formulario reactivo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      subject: ['Prueba de concepto solicitud externa', [Validators.required]],
      document_type: [1, [Validators.required]],
      file_document: ['', RxwebValidators.file({ minFiles: 1, maxFiles: 1 })],
    });
  }

  /**
   * Radica nuevo documento en el sistema
   */
  registerDocument(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else if (this.files.length === 0) {
      Swal.fire({
        title: '¡Olvidaste cargar el documento!',
        icon: 'warning',
        text: 'Por favor adjunta el archivo',
        confirmButtonText: 'Aceptar',
      });
    } else {
      this.postCreate = true;
      const formData = new FormData();
      formData.append('subject', this.registerForm.get('subject').value);
      formData.append('document_type', this.registerForm.get('document_type').value);
      formData.append('file_document', this.registerForm.get('file_document').value);

      this.externalDocumentService.createDocument(formData).subscribe(
        (res) => {
          this.toastService.showSuccessMessageDocuments(`SOLICITUD EXTERNA GENERADA`, res.message);
          this.router.navigate([`dashboard/external`]);
        },
        (err) => {
          this.postCreate = false;
          if (err.error.file_document) {
            Swal.fire({
              title: '¡Error al crear solicitud!',
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
   * Agrega a la cola el archivo a subir
   */
  onSelect(event): void {
    if (this.files.length < 1) {
      this.files.push(...event.addedFiles);
      this.registerForm.get('file_document').setValue(this.files[0]);
    }
  }
  /**
   * Remueve el archivo de la zona de arrastre
   */
  onRemove(event): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  /**
   * Regresa al listado de solicitudes externas
   */
  goToBack(): void {
    this.router.navigate([`dashboard/external`]);
  }
}
