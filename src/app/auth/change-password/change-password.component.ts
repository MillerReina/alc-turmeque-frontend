import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidatorsService } from 'src/app/dashboard/services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  /**
   * Formulario reactivo para cambiar la contraseña
   */
  public recoveryForm: FormGroup;
  /**
   * Estado de ocultación para contraseña
   */
  public hide: boolean;
  /**
   * Parametro uidb64
   */
  public uid = '';
  /**
   * Parametro para token de activación
   */
  public tkn = '';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.existsParams();
    this.createForm();
    this.hide = true;
  }

  ngOnInit(): void {}

  get passwordOneIsInvalid(): boolean {
    return this.recoveryForm.get('password').invalid && this.recoveryForm.get('password').touched;
  }

  get passwordTwoIsEmpty(): boolean {
    return this.recoveryForm.get('password_2').touched;
  }

  get passwordTwoIsInvalid(): boolean {
    const passOne = this.recoveryForm.get('password').value;
    const passTwo = this.recoveryForm.get('password_2').value;
    return passOne === passTwo ? false : true;
  }

  /**
   * Segundo factor de validación para cuentas
   */
  private existsParams(): void {
    if (this.router.url.match('uid' && 'tkn')) {
      this.uid = this.activatedRouter.snapshot.params.uid;
      this.tkn = this.activatedRouter.snapshot.params.tkn;
      this.authService.checkTime(this.uid, this.tkn).subscribe((res) => {
        if (!res) {
          this.router.navigate([`/login`]);
          Swal.fire({
            title: '¡Tiempo agotado!',
            icon: 'error',
            text: 'Tu link para cambio de contraseña ya expiró',
            confirmButtonText: 'Aceptar',
          });
        }
      });
    }
  }

  createForm(): void {
    this.recoveryForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_2: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.validatorsService.passwordIsInvalid('password', 'password_2'),
      }
    );
  }
  /**
   * Envia petición para recuperar contraseña
   */
  changePassword(): void {
    if (this.recoveryForm.invalid) {
      this.recoveryForm.markAllAsTouched();
    } else {
      this.authService.changeMyPassword(this.uid, this.tkn, this.recoveryForm.value).subscribe((__) => {
        Swal.fire({
          title: '¡Contraseña actualizada!',
          icon: 'success',
          text: 'Puedes iniciar sesión ahora con tu nueva contraseña',
          confirmButtonText: 'Aceptar',
        });
        this.router.navigate([`/login`]);
      });
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
