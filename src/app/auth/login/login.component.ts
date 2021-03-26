import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastMessageService } from '../../services/toast-message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Formulario para login reactivo
   */
  public loginForm: FormGroup;
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
   * contador de intentos
   */
  public count: number;
  public myRecaptcha = new FormControl(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastService: ToastMessageService
  ) {
    this.createLoginForm();
    this.hide = true;
    this.count = 0;
  }

  ngOnInit(): void {
    this.existsParams();
  }

  get emailIsInvalid(): boolean {
    return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  get passwordIsInvalid(): boolean {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  get captchaIsInvalid(): boolean {
    return this.loginForm.get('captcha').invalid && this.loginForm.get('captcha').touched;
  }

  /**
   * Segundo factor de validación para cuentas
   */
  private existsParams(): void {
    if (this.router.url.match('uid' && 'tkn')) {
      this.uid = this.activatedRouter.snapshot.params.uid;
      this.tkn = this.activatedRouter.snapshot.params.tkn;
      this.authService.activateMyAccount(this.uid, this.tkn).subscribe((res) => {
        if (this.authService.getMessageConfirmation.match(res.message)) {
          Swal.fire({
            title: 'Cuenta confirmada',
            icon: 'warning',
            text: 'Esta cuenta ya ha sido activada.',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            title: 'ACTIVACIÓN EXITOSA',
            text: 'Su cuenta ha sido confirmada, por favor inicie sesión.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
      });
    }
  }

  /* Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') */

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
    });
  }

  /**
   * Acceso al sistema
   */
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Iniciando sesión...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      this.authService.login(this.loginForm.value).subscribe(
        (__) => {
          this.router.navigateByUrl('/dashboard');
          Swal.close();
        },
        (err) => {
          this.count++;
          Swal.close();
          if (err.error.__all__[0] === 'Datos incorrectos') {
            this.toastService.showErrorMessage2('ERROR AL AUTENTICAR', `Usuario y/o contraseña incorrectos`);
          } else {
            this.toastService.showErrorMessage2('ERROR AL AUTENTICAR', `La cuenta está inhabilitada`);
          }
          if (this.count === 4) {
            this.router.navigateByUrl('/recover/failed');
          }
        }
      );
    }
  }

  /**
   * Verificacion de captcha
   */
  showResponse(response) {
    this.loginForm.get('captcha').setValue(response);
  }
}
