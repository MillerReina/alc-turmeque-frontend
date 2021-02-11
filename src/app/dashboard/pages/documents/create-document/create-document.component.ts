import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITypeID } from '../../../../interfaces/type-id.interface';
import { CreateService } from '../../../services/create.service';
import { IDepedency } from '../../../../interfaces/dependency-interface';
import { DocTypeService } from 'src/app/dashboard/services/doc-type.service';
import { IDocType } from 'src/app/interfaces/doc-type-interface';

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

  constructor(
    private fb: FormBuilder,
    private createService: CreateService,
    private documentTypeService: DocTypeService
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

  /**
   * Radica nuevo documento en el sistema
   */
  registerDocument(): void {}

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      sender_first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      sender_last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sender_email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      institution_name: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      address: ['', [Validators.required, Validators.minLength(15)]],
      sender_identification: ['', [Validators.required]],
      identification_type: [, [Validators.required]],
      dependency: [, [Validators.required]],
      subject: [, [Validators.required]],
      document_type: [, [Validators.required]],
    });
  }
}
