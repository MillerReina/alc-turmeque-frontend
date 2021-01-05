import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import { IDepedency } from '../../../../interfaces/dependency-interface';
import { IRole } from 'src/app/interfaces/role-interface';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ValidatorsService } from '../services/validators.service';

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

  constructor(
    private fb: FormBuilder,
    private createService: CreateService,
    private router: Router,
    private datePipe: DatePipe,
    private validatorsService: ValidatorsService
  ) {
    this.createRegisterForm();
    this.maxDate = new Date(Date.now() - 568036800000);
    this.counter = 0;
    this.preload = true;
    this.hide = true;
  }

  ngOnInit(): void {
    this.getTypesOfID();
    this.getRoles();
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
    return this.registerForm.get('roles').invalid && this.registerForm.get('roles').touched;
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
        username: ['', [Validators.required], this.validatorsService.existeUsuario],
        first_name: ['asdasdasd', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        last_name: ['asdasdasdasd', [Validators.required]],
        email: [
          'asdasdasd@gmail.com',
          [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
        ],
        birthdate: ['', [Validators.required]],
        phone_number: ['3213808302', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        identification: ['11111111', [Validators.required]],
        type_identification: ['', [Validators.required]],
        dependency: ['', [Validators.required]],
        roles: this.fb.array([this.role()]),
        password: ['111111', [Validators.required, Validators.minLength(6)]],
        password_2: ['111111', [Validators.required, Validators.minLength(6)]],
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
      this.registerForm.get('roles').markAllAsTouched();
    } else {
      const date = this.registerForm.get('birthdate').value;
      const newDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.registerForm.get('birthdate').setValue(newDate);
      console.log(this.registerForm.value);
      /* this.createService.createOfficer(this.registerForm.value).subscribe((res) => {
        console.log(res);
      }); */
    }
  }
  /**
   * Regresa al listado de funcionarios
   */
  goToBack(): void {
    this.router.navigate([`dashboard/officers`]);
  }
  /**
   * Obtiene el array de roles para el Form
   */
  roles(): FormArray {
    return this.registerForm.get('roles') as FormArray;
  }
  /**
   * Agrega un espacio de rol
   */
  addRol(): void {
    this.counter = this.counter + 1;
    this.roles().push(this.newRol());
  }
  /**
   * Instancia un form control para un rol
   */
  newRol(): FormGroup {
    return this.fb.group({
      rol: ['', [Validators.required]],
    });
  }
  /**
   *
   */
  role(): FormGroup {
    return this.fb.group({
      rol: ['', [Validators.required]],
    });
  }
  /**
   * Remueve un espacio de rol
   */
  removeQuantity(i: number): void {
    this.counter--;
    this.roles().removeAt(i);
  }
}
