import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import { IDepedency } from '../../../../interfaces/dependency-interface';
import { IRole } from 'src/app/interfaces/role-interface';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ValidatorsService } from '../../../services/validators.service';
import { ToastMessageService } from '../../../../services/toast-message.service';
import { IOfficer } from '../../../../interfaces/registered-officers.interface';
import { CreateService } from 'src/app/dashboard/services/create.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-officer',
  templateUrl: './create-officer.component.html',
  styleUrls: ['./create-officer.component.scss'],
})
export class CreateOfficerComponent implements OnInit {
  /**
   * Preload
   */
  public preload: boolean;
  /**
   * Preload despues de crear
   */
  public postCreate: boolean;
  /**
   * Preload de editar
   */
  public preloadEdit: boolean;
  /**
   * fecha minima de hoy
   */
  public maxDate: Date;
  /**
   * Formulario reactivo para crear usuario de funcionario
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
   * Lista de roles
   */
  public listRoles: IRole[];
  /**
   * contador
   */
  public counter: number;
  /**
   * Estado de ocultación para contraseña
   */
  public hide: boolean;
  /**
   * Id del usuario que se va a editar
   */
  public idUser: string;
  /**
   * Estado de editar
   */
  public editState: boolean;
  /**
   * Informacion del usuario actual
   */
  public actualUser: IOfficer;
  /**
   * Estado mayúsculas
   */
  public mayus: boolean;
  /**
   * Estado mayúsculas
   */
  public minus: boolean;
  /**
   * Estado mayúsculas
   */
  public number: boolean;
  /**
   * Constante de asignación
   */
  private passwordConstant = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  constructor(
    private fb: FormBuilder,
    private createService: CreateService,
    private router: Router,
    private datePipe: DatePipe,
    private validatorsService: ValidatorsService,
    private toastService: ToastMessageService
  ) {
    this.createRegisterForm();
    this.isEditingUser();
    this.maxDate = new Date(Date.now() - 568036800000);
    this.counter = 0;
    this.preload = true;
    this.postCreate = false;
    this.hide = true;
    this.mayus = false;
    this.minus = false;
    this.number = false;
  }

  ngOnInit(): void {
    this.getRoles();
    this.getTypesOfID();
    this.getDependencies();
  }

  get userNameIsInvalid(): boolean {
    return this.registerForm.get('username').invalid && this.registerForm.get('username').touched;
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

  get birthDateIsInvalid(): boolean {
    return this.registerForm.get('birthdate').invalid && this.registerForm.get('birthdate').touched;
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

  get dependencyIsInvalid(): boolean {
    return this.registerForm.get('dependency').invalid && this.registerForm.get('dependency').touched;
  }

  get roleIsInvalid(): boolean {
    return this.registerForm.get('role').invalid && this.registerForm.get('role').touched;
  }

  get passwordOneIsInvalid(): boolean {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }

  get passwordTwoIsEmpty(): boolean {
    return this.registerForm.get('password_2').touched;
  }

  get passwordTwoIsInvalid(): boolean {
    const passOne = this.registerForm.get('password').value;
    const passTwo = this.registerForm.get('password_2').value;
    return passOne === passTwo ? false : true;
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
    this.createService.getListOfDependencies().subscribe((res) => (this.listDependencies = res));
  }
  /**
   * Obtiene los roles
   */
  getRoles(): void {
    this.createService.getListOfRoles().subscribe((res) => {
      this.listRoles = res;
      this.preload = false;
    });
  }
  /**
   * Realizar la construcción del formulario
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        id: [''],
        username: ['', [Validators.required]],
        first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
        birthdate: ['', [Validators.required]],
        phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        identification: ['', [Validators.required]],
        type_identification: [, [Validators.required]],
        dependency: [, [Validators.required]],
        role: [, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_2: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.validatorsService.passwordIsInvalid('password', 'password_2'),
      }
    );
  }
  /**
   * Crea la cuenta de un funcionario
   */
  createOfficer(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.postCreate = true;
      const date = this.registerForm.get('birthdate').value;
      const newDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.registerForm.get('birthdate').setValue(newDate);
      this.createService.createOfficer(this.registerForm.value).subscribe(
        (__) => {
          this.toastService.showSuccessMessage(
            `USUARIO: ${this.registerForm.get('username').value.toUpperCase()} CREADO`,
            `Cuenta creada satisfactoriamente`
          );
          this.router.navigate([`dashboard/officers`]);
        },
        (err) => {
          this.registerForm.patchValue({
            birthdate: date,
          });
          if (err.error.identification) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al crear usuario',
              icon: 'error',
              text: err.error.identification,
              confirmButtonText: 'Aceptar',
            });
          } else if (err.error.username) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al crear usuario',
              icon: 'error',
              text: err.error.username,
              confirmButtonText: 'Aceptar',
            });
          } else if (err.error.password) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al crear usuario',
              icon: 'error',
              text: err.error.password,
              confirmButtonText: 'Aceptar',
            });
          } else if (err.error.__all__) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al crear usuario',
              icon: 'error',
              text: err.error.__all__,
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
    this.router.navigate([`dashboard/officers`]);
  }
  /**
   * Estado para saber si se está editando un usuario
   */
  isEditingUser(): void {
    if (this.router.url.match('edit')) {
      this.preload = true;
      this.editState = true;
      this.idUser = this.router.url.split('/')[3];
      this.createService.getUserById(this.idUser).subscribe(
        (res) => {
          this.actualUser = res.user;
          this.loadInfoToForm();
          setTimeout(() => {
            this.preload = false;
          }, 500);
        },
        (__) => {
          this.router.navigate([`dashboard/officers`]);
        }
      );
    } else {
      this.editState = false;
    }
  }
  /**
   * Carga el formulario y le setea la información
   */
  loadInfoToForm(): void {
    this.registerForm.reset({
      id: this.actualUser.id,
      username: this.actualUser.username,
      first_name: this.actualUser.first_name,
      last_name: this.actualUser.last_name,
      email: this.actualUser.email,
      birthdate: this.addDays(1),
      phone_number: this.actualUser.phone_number,
      identification: this.actualUser.identification,
      type_identification: this.actualUser.type_identification,
      dependency: this.actualUser.dependency,
      role: this.actualUser.role,
      password: this.passwordConstant,
      password_2: this.passwordConstant,
    });
  }
  /**
   * Metodo para agregar dias a un date
   */
  addDays(days: number): Date {
    const futureDate = new Date(this.actualUser.birthdate);
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }
  /**
   * Guarda los cambios cuando se edita un usuario
   */
  saveChanges(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.postCreate = true;
      const date = this.registerForm.get('birthdate').value;
      const newDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.registerForm.get('birthdate').setValue(newDate);
      this.createService.updateOfficerById(this.registerForm.value).subscribe(
        (__) => {
          this.toastService.showSuccessMessage(
            `USUARIO: ${this.registerForm.get('username').value.toUpperCase()} ACTUALIZADO`,
            `Cuenta actualizada satisfactoriamente`
          );
          this.router.navigate([`dashboard/officers`]);
        },
        (err) => {
          this.registerForm.patchValue({
            birthdate: date,
          });
          if (err.error.identification) {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al actualizar usuario',
              icon: 'error',
              text: err.error.identification,
              confirmButtonText: 'Aceptar',
            });
          } else {
            this.registerForm.setErrors({ invalid: true });
            Swal.fire({
              title: 'Error al actualizar usuario',
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
   * Detector de cambios al momento de ingresar la contraseña
   */
  changeStatePassword(event: string): void {
    const regexNumber = new RegExp(/[0-9]/);
    const regexMinus = new RegExp(/[a-z]/);
    const regexMayus = new RegExp(/[A-Z]/);
    regexNumber.test(event) ? (this.number = true) : (this.number = false);
    regexMinus.test(event) ? (this.minus = true) : (this.minus = false);
    regexMayus.test(event) ? (this.mayus = true) : (this.mayus = false);
  }
}
