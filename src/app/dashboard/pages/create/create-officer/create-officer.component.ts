import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import { IDepedency } from '../../../../interfaces/dependency-interface';
import { IRole } from 'src/app/interfaces/role-interface';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-officer',
  templateUrl: './create-officer.component.html',
  styleUrls: ['./create-officer.component.scss'],
})
export class CreateOfficerComponent implements OnInit {
  /**
   * fecha minima de hoy
   */
  public max_date: Date;
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

  constructor(
    private fb: FormBuilder,
    private createService: CreateService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.createRegisterForm();
    this.max_date = new Date(Date.now() - 568036800000);
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
    return this.registerForm.get('name').invalid && this.registerForm.get('name').touched;
  }

  get lastNameIsInvalid(): boolean {
    return this.registerForm.get('lastName').invalid && this.registerForm.get('lastName').touched;
  }

  get emailIsInvalid(): boolean {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get birthDateIsInvalid(): boolean {
    return this.registerForm.get('birthDate').invalid && this.registerForm.get('birthDate').touched;
  }

  get phoneIsInvalid(): boolean {
    return this.registerForm.get('phone').invalid && this.registerForm.get('phone').touched;
  }

  get idIsInvalid(): boolean {
    return this.registerForm.get('id').invalid && this.registerForm.get('id').touched;
  }

  get typeIdIsInvalid(): boolean {
    return this.registerForm.get('typeId').invalid && this.registerForm.get('typeId').touched;
  }

  get dependencyIsInvalid(): boolean {
    return this.registerForm.get('dependency').invalid && this.registerForm.get('dependency').touched;
  }

  get roleIsInvalid(): boolean {
    return this.registerForm.get('role').invalid && this.registerForm.get('role').touched;
  }

  get passwordOneIsInvalid(): boolean {
    return this.registerForm.get('passwordOne').invalid && this.registerForm.get('passwordOne').touched;
  }

  get passwordTwoIsInvalid(): boolean {
    return this.registerForm.get('passwordTwo').invalid && this.registerForm.get('passwordTwo').touched;
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
    this.createService.getListOfRoles().subscribe((res) => (this.listRoles = res));
  }
  /**
   * Realizar la construcción del formulario
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      id: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      dependency: ['', [Validators.required]],
      role: ['', [Validators.required]],
      passwordOne: ['', [Validators.required, Validators.minLength(6)]],
      passwordTwo: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  /**
   * Crea la cuenta de un funcionario
   */
  createOfficer(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const date = this.registerForm.get('birthDate').value;
      const newDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.registerForm.get('birthDate').setValue(newDate);
    }
  }

  goToBack(): void {
    this.router.navigate([`dashboard/officers`]);
  }
}
