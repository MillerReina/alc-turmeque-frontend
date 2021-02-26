import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocument } from '../../../../../interfaces/documents-interface';
import { DependencyDialogComponent } from '../../../dependencies/components/dependency-dialog/dependency-dialog.component';
import { DocumentsService } from '../../../../services/documents.service';
import { INewAssign } from '../../../../../interfaces/assign-user-interface';
import { IDepedency } from '../../../../../interfaces/dependency-interface';
import { CreateService } from '../../../../services/create.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-document-dialog',
  templateUrl: './return-document-dialog.component.html',
  styleUrls: ['./return-document-dialog.component.scss'],
})
export class ReturnDocumentDialogComponent implements OnInit {
  /**
   * Variable para la dependencia actual
   */
  public actualDocument: IDocument;
  /**
   * Formulario reactivo para crear dependencia
   */
  public registerForm: FormGroup;
  /**
   * Lista de usuarios para asignar
   */
  public listDependencies: IDepedency[];
  /**
   * Nueva asignacion de radicado
   */
  public newAssign: INewAssign = null;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentsService,
    private createService: CreateService,
    public dialogRef: MatDialogRef<DependencyDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: IDocument
  ) {
    this.createRegisterForm();
    this.actualDocument = data;
  }

  ngOnInit(): void {
    this.getDependencies();
  }

  get officerAssignIsInvalid(): boolean {
    return this.registerForm.get('dependency').invalid && this.registerForm.get('dependency').touched;
  }

  get subjectIsInvalid(): boolean {
    return this.registerForm.get('comment').invalid && this.registerForm.get('comment').touched;
  }

  /**
   * Instancia el formulario reacitvo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      document: [''],
      dependency: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  /**
   * Carga la lista de dependencias disponibles
   */
  getDependencies(): void {
    this.createService.getListOfDependencies().subscribe((res) => {
      this.listDependencies = res;
    });
  }

  /**
   * Devolver el radicado a una dependencia
   */
  assignDocumentToDependency(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.registerForm.get('document').setValue(this.data.id);
      console.log(this.registerForm.value);

      this.documentService.returnDocument(this.registerForm.value).subscribe(
        (__) => {
          console.log(__);
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: '¡No se pudo devolver el radicado!',
            icon: 'error',
            text: err.error.name_dependency,
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
