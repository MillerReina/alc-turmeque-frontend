import { ToastMessageService } from './../../../../services/toast-message.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateService } from '../services/create.service';
import { DatePipe } from '@angular/common';
import { ValidatorsService } from '../services/validators.service';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import Swal from 'sweetalert2';
import { IOfficer } from 'src/app/interfaces/registered-officers.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnDestroy {
  /**
   * Preload
   */
  public preload: boolean;
  /**
   * Preload de editar
   */
  public preloadEdit: boolean;
  /**
   * Preload despues de crear
   */
  public postCreate: boolean;
  /**
   * Formulario reactivo para crear usuario de funcionario
   */
  public registerForm: FormGroup;
  /**
   * Lista de tipos de ID
   */
  public listIDTypes: ITypeID[];
  /**
   * Id del usuario que se va a editar
   */
  public idUser: string;
  /**
   * estado de editar
   */
  public editState: boolean;
  /**
   * informacion del usuario actual
   */
  public actualUser: IOfficer;

  constructor(
    private fb: FormBuilder,
    private createService: CreateService,
    private router: Router,
    private toastService: ToastMessageService
  ) {
    this.createRegisterForm();
    this.isEditingUser();
    this.preload = true;
    this.postCreate = false;
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getTypesOfID();
  }

  get nameIsInvalid(): boolean {
    return this.registerForm.get('first_name').invalid && this.registerForm.get('first_name').touched;
  }

  get lastNameIsInvalid(): boolean {
    return this.registerForm.get('last_name').invalid && this.registerForm.get('last_name').touched;
  }

  get emailIsInvalid(): boolean {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get phoneIsInvalid(): boolean {
    return this.registerForm.get('phone_number').invalid && this.registerForm.get('phone_number').touched;
  }

  get idIsInvalid(): boolean {
    return this.registerForm.get('identification').invalid && this.registerForm.get('identification').touched;
  }

  get typeIdIsInvalid(): boolean {
    return this.registerForm.get('type_identification').invalid && this.registerForm.get('type_identification').touched;
  }

  /**
   * Obtiene los tipos de identificación
   */
  getTypesOfID(): void {
    this.createService.getListOfID().subscribe((res) => {
      this.listIDTypes = res;
      this.preload = false;
    });
  }
  /**
   * Realizar la construcción del formulario
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      id: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      identification: ['', [Validators.required]],
      type_identification: [, [Validators.required]],
    });
  }

  createUser(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.postCreate = true;
      this.createService.createUser(this.registerForm.value).subscribe(
        (res) => {
          this.toastService.showSuccessMessage(
            `REGISTRO ${this.registerForm.get('first_name').value} CREADO`,
            `Beneficiario creado satisfactoriamente`
          );
          this.router.navigate([`dashboard/users`]);
        },
        (err) => {
          console.log(err);
          if (err.error.identification) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al crear beneficiario',
              icon: 'error',
              text: err.error.identification,
              confirmButtonText: 'Aceptar',
            });
          } else {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al crear beneficiario',
              icon: 'error',
              text: err.error.username,
              confirmButtonText: 'Aceptar',
            });
          }
          this.postCreate = false;
        }
      );
    }
  }

  /**
   * Regresa al listado de funcionarios
   */
  goToBack(): void {
    this.router.navigate([`dashboard/users`]);
  }

  isEditingUser(): void {
    if (this.router.url.match('edit')) {
      this.preload = true;
      this.editState = true;
      this.idUser = this.router.url.split('/')[4];
      this.createService.getUserById(this.idUser).subscribe(
        (res) => {
          this.actualUser = res.user;
          this.loadInfoToForm();
          this.preload = false;
        },
        (__) => {
          this.router.navigate([`dashboard/users`]);
        }
      );
    } else {
      this.editState = false;
    }
  }

  loadInfoToForm(): void {
    this.registerForm.reset({
      id: this.actualUser.identification,
      first_name: this.actualUser.first_name,
      last_name: this.actualUser.last_name,
      email: this.actualUser.email,
      phone_number: this.actualUser.phone_number,
      identification: this.actualUser.identification,
      type_identification: this.actualUser.type_identification,
    });
  }

  saveChanges(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.postCreate = true;
      this.createService.updateUserById(this.registerForm.value).subscribe(
        (res) => {
          console.log(res);

          this.toastService.showSuccessMessage(
            `REGISTRO ${this.registerForm.get('first_name').value} ACTUALIZADO`,
            `Beneficiario actualizado satisfactoriamente`
          );
          this.router.navigate([`dashboard/users`]);
        },
        (err) => {
          console.log(err);
          if (err.error.identification) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al actualizar beneficiario',
              icon: 'error',
              text: err.error.identification,
              confirmButtonText: 'Aceptar',
            });
          } else {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al actualizar beneficiario',
              icon: 'error',
              text: err.error.username,
              confirmButtonText: 'Aceptar',
            });
          }
          this.postCreate = false;
        }
      );
    }
  }
}
