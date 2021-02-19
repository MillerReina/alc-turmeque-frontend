import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DependencyDialogComponent } from '../../../dependencies/components/dependency-dialog/dependency-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocument } from '../../../../../interfaces/documents-interface';
import { IAssignUser, INewAssign } from '../../../../../interfaces/assign-user-interface';
import { DocumentsService } from '../../../../services/documents.service';
import { AssignUserDialogService } from '../../../../services/assign-user-dialog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assing-document-dialog',
  templateUrl: './assing-document-dialog.component.html',
  styleUrls: ['./assing-document-dialog.component.scss'],
})
export class AssingDocumentDialogComponent implements OnInit {
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
  public listAssignUsers: IAssignUser[];
  /**
   * Nueva asignacion de radicado
   */
  public newAssign: INewAssign = null;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentsService,
    public dialogRef: MatDialogRef<DependencyDialogComponent>,
    private assingUserDialogService: AssignUserDialogService,
    @Inject(MAT_DIALOG_DATA) public data: IDocument
  ) {
    this.createRegisterForm();
    this.actualDocument = data;
  }

  ngOnInit(): void {
    this.loadAssignUsers();
  }

  get officerAssignIsInvalid(): boolean {
    return this.registerForm.get('user_id').invalid && this.registerForm.get('user_id').touched;
  }

  /**
   * Instancia el formulario reacitvo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      doc_id: [''],
      user_id: ['', [Validators.required]],
    });
  }

  /**
   * Carga la lista de funcionarios disponibles de la dependencia
   */
  loadAssignUsers(): void {
    this.documentService.getOfficersToAssign().subscribe((res) => (this.listAssignUsers = res));
  }

  /**
   * Asigna el radicado a un funcionario
   */
  assignOfficer(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.registerForm.get('doc_id').setValue(this.data.id);
      this.documentService.assignOfficerToDocument(this.registerForm.value).subscribe(
        (__) => {
          const newAssign = {
            name_dependency: this.actualDocument.name_dependency,
            user_name: this.getUserName(),
          };
          this.assingUserDialogService.newAssign.emit(newAssign);
          this.cancel();
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: '¡No se pudo asignar radicado!',
            icon: 'error',
            text: err.error.name_dependency,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  /**
   * Obtiene el nombre del funcionario
   */
  getUserName(): string {
    let user = '';
    this.listAssignUsers.forEach((element) => {
      if (element.id === this.registerForm.get('user_id').value) {
        user = `${element.first_name} ${element.last_name}`;
      }
    });
    return user;
  }

  /**
   * Cierra el dialog
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
