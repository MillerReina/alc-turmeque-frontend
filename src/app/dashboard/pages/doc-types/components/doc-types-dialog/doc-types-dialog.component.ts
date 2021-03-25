import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IDocType } from 'src/app/interfaces/doc-type-interface';
import { DocTypeService } from '../../../../services/doc-type.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocTypeDialogService } from '../../../../services/doc-type-dialog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-types-dialog',
  templateUrl: './doc-types-dialog.component.html',
  styleUrls: ['./doc-types-dialog.component.scss'],
})
export class DocTypesDialogComponent implements OnInit {
  /**
   * Variable para el tipo de documento actual
   */
  public actualDocType: IDocType;
  /**
   * Bandera que indica si se esta editando o creando
   */
  public isEditing: boolean;
  /**
   * Formulario reactivo para crear tipo de documento
   */
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private docTypeService: DocTypeService,
    public dialogRef: MatDialogRef<DocTypesDialogComponent>,
    public docTypeDialogService: DocTypeDialogService,
    @Inject(MAT_DIALOG_DATA) public data: IDocType
  ) {
    this.isEditing = false;
    this.createRegisterForm();
    this.activateEditing();
  }

  ngOnInit(): void {}

  get docTypeIsInvalid(): boolean {
    return this.registerForm.get('name_document_type').invalid && this.registerForm.get('name_document_type').touched;
  }

  get daysAssignIsInvalid(): boolean {
    return (
      this.registerForm.get('suggested_working_days').invalid && this.registerForm.get('suggested_working_days').touched
    );
  }

  /**
   * Activa el estado de editar
   */
  activateEditing(): void {
    this.actualDocType = this.data;
    if (this.actualDocType) {
      this.isEditing = true;
      this.loadInfoToForm();
    }
  }
  /**
   * Instancia el formulario reacitvo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      id: [''],
      name_document_type: ['', [Validators.required]],
      suggested_working_days: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.max(40)],
      ],
    });
  }
  /**
   * Registra un nuevo tipo de documento
   */
  registerDoctype(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.docTypeService.createDocType(this.registerForm.value).subscribe(
        (__) => {
          this.docTypeDialogService.newDocType.emit(this.registerForm.get('name_document_type').value);
          this.cancel();
        },
        (err) => {
          Swal.fire({
            title: '¡No se pudo crear!',
            icon: 'error',
            text: err.error.name_document_type,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  loadInfoToForm(): void {
    this.registerForm.reset({
      id: this.actualDocType.id,
      name_document_type: this.actualDocType.name_document_type,
      suggested_working_days: this.actualDocType.suggested_working_days,
    });
  }

  /**
   * Guarda los cambios cuando se edita el tipo de documento
   */
  saveChanges(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.docTypeService.updateDocTypeById(this.registerForm.value).subscribe(
        (__) => {
          this.docTypeDialogService.updateDocType.emit(this.registerForm.get('name_document_type').value);
          this.cancel();
        },
        (err) => {
          Swal.fire({
            title: '¡No se pudo actualizar!',
            icon: 'error',
            text: err.error.name_document_type,
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
