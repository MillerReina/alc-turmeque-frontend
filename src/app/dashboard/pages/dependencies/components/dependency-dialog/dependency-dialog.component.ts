import { Component, OnInit, Inject } from '@angular/core';
import { IDepedency } from '../../../../../interfaces/dependency-interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepenciesService } from '../../../../services/depencies.service';
import { DependecyDialogService } from '../../../../services/dependecy-dialog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dependency-dialog',
  templateUrl: './dependency-dialog.component.html',
  styleUrls: ['./dependency-dialog.component.scss'],
})
export class DependencyDialogComponent implements OnInit {
  /**
   * Variable para la dependencia actual
   */
  public actualDependency: IDepedency;
  /**
   * Bandera que indica si se esta editando o creando
   */
  public isEditing: boolean;
  /**
   * Formulario reactivo para crear dependencia
   */
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dependenciesService: DepenciesService,
    public dialogRef: MatDialogRef<DependencyDialogComponent>,
    public dependecyDialogService: DependecyDialogService,
    @Inject(MAT_DIALOG_DATA) public data: IDepedency
  ) {
    this.isEditing = false;
    this.createRegisterForm();
    this.activateEditing();
  }

  ngOnInit(): void {}

  get dependecyIsInvalid(): boolean {
    return this.registerForm.get('name_dependency').invalid && this.registerForm.get('name_dependency').touched;
  }

  /**
   * Activa el estado de editar
   */
  activateEditing(): void {
    this.actualDependency = this.data;
    if (this.actualDependency) {
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
      name_dependency: ['', [Validators.required]],
    });
  }
  /**
   * Registra una nueva dependencia
   */
  registerDependency(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.dependenciesService.createDependency(this.registerForm.value).subscribe(
        (__) => {
          this.dependecyDialogService.newDependecy.emit(this.registerForm.get('name_dependency').value);
          this.cancel();
        },
        (err) => {
          Swal.fire({
            title: '¡No se pudo crear!',
            icon: 'error',
            text: err.error.name_dependency,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  loadInfoToForm(): void {
    this.registerForm.reset({
      id: this.actualDependency.id,
      name_dependency: this.actualDependency.name_dependency,
    });
  }

  /**
   * Guarda los cambios cuando se edita dependencia
   */
  saveChanges(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.dependenciesService.updateDependencyById(this.registerForm.value).subscribe(
        (__) => {
          this.dependecyDialogService.updateDependecy.emit(this.registerForm.get('name_dependency').value);
          this.cancel();
        },
        (err) => {
          Swal.fire({
            title: '¡No se pudo actualizar!',
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
