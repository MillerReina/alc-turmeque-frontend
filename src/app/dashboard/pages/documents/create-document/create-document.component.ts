import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import { CreateService } from '../../../services/create.service';
import { IDepedency } from '../../../../interfaces/dependency-interface';
import { DocTypeService } from 'src/app/dashboard/services/doc-type.service';
import { IDocType } from 'src/app/interfaces/doc-type-interface';
import { Router } from '@angular/router';
import { DocumentsService } from '../../../services/documents.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import { ToastMessageService } from '../../../../services/toast-message.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss'],
})
export class CreateDocumentComponent implements OnInit {
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
    private createService: CreateService,
    private documentTypeService: DocTypeService,
    private router: Router,
    private documentService: DocumentsService,
    private toastService: ToastMessageService
  ) {
    this.createRegisterForm();
    this.preload = true;
    this.postCreate = false;
  }

  ngOnInit(): void {
    this.getDocTypes();
    this.getTypesOfID();
    this.getDependencies();
  }

  get senderFirstNameIsInvalid(): boolean {
    return this.registerForm.get('sender_first_name').invalid && this.registerForm.get('sender_first_name').touched;
  }

  get senderLastNameIsInvalid(): boolean {
    return this.registerForm.get('sender_last_name').invalid && this.registerForm.get('sender_last_name').touched;
  }

  get phoneNumberIsInvalid(): boolean {
    return this.registerForm.get('phone_number').invalid && this.registerForm.get('phone_number').touched;
  }

  get senderEmailIsInvalid(): boolean {
    return this.registerForm.get('sender_email').invalid && this.registerForm.get('sender_email').touched;
  }

  get institutionNameIsInvalid(): boolean {
    return this.registerForm.get('institution_name').invalid && this.registerForm.get('institution_name').touched;
  }

  get addressIsInvalid(): boolean {
    return this.registerForm.get('address').invalid && this.registerForm.get('address').touched;
  }

  get senderIdentificationIsInvalid(): boolean {
    return (
      this.registerForm.get('sender_identification').invalid && this.registerForm.get('sender_identification').touched
    );
  }

  get identificationTypeIsInvalid(): boolean {
    return this.registerForm.get('identification_type').invalid && this.registerForm.get('identification_type').touched;
  }

  get dependencyIsInvalid(): boolean {
    return this.registerForm.get('dependency').invalid && this.registerForm.get('dependency').touched;
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
   * Obtiene los tipos de identificación
   */
  getTypesOfID(): void {
    this.createService.getListOfID().subscribe((res) => (this.listIDTypes = res));
  }

  /**
   * Obtiene las dependencias
   */
  getDependencies(): void {
    this.createService.getListOfDependencies().subscribe((res) => {
      this.listDependencies = res;
      this.preload = false;
    });
  }

  /**
   * Obtiene los tipos de documento
   */
  getDocTypes(): void {
    this.documentTypeService.getAllDocTypes().subscribe((res) => {
      this.listDocumentType = res;
    });
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      sender_first_name: ['Miller', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      sender_last_name: ['Uchamocha', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      phone_number: ['3213808302', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sender_email: [
        'miller-reina@hotmail.com',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
      ],
      institution_name: ['Acerias paz del rio', [Validators.pattern('^[a-zA-Z ]*$')]],
      address: ['Carrera 10#27-22', [Validators.required, Validators.minLength(15)]],
      sender_identification: ['1057603823', [Validators.required]],
      identification_type: [1, [Validators.required]],
      dependency: [, [Validators.required]],
      subject: ['Prueba de concepto', [Validators.required]],
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
      formData.append('sender_first_name', this.registerForm.get('sender_first_name').value);
      formData.append('sender_last_name', this.registerForm.get('sender_last_name').value);
      formData.append('phone_number', this.registerForm.get('phone_number').value);
      formData.append('sender_email', this.registerForm.get('sender_email').value);
      formData.append('institution_name', this.registerForm.get('institution_name').value);
      formData.append('address', this.registerForm.get('address').value);
      formData.append('sender_identification', this.registerForm.get('sender_identification').value);
      formData.append('identification_type', this.registerForm.get('identification_type').value);
      formData.append('dependency', this.registerForm.get('dependency').value);
      formData.append('subject', this.registerForm.get('subject').value);
      formData.append('document_type', this.registerForm.get('document_type').value);
      formData.append('file_document', this.registerForm.get('file_document').value);
      this.documentService.createDocument(formData).subscribe(
        (res) => {
          this.toastService.showSuccessMessageDocuments(`RADICADO GENERADO`, res.message);
          this.router.navigate([`dashboard/all`]);
        },
        (err) => {
          Swal.fire({
            title: 'Error al crear radicado',
            icon: 'error',
            text: err,
            confirmButtonText: 'Aceptar',
          });
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
   * Regresa al listado de funcionarios
   */
  goToBack(): void {
    this.router.navigate([`dashboard/all`]);
  }
}
