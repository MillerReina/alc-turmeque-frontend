import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, timeout } from 'rxjs/operators';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.hide = true;
    this.createLoginForm();
  }

  ngOnInit(): void {
    this.existsParams();
  }

  private existsParams(): void {
    if (this.router.url.match('uid' && 'tkn')) {
      this.uid = this.activatedRouter.snapshot.params['uid'];
      this.tkn = this.activatedRouter.snapshot.params['tkn'];
      Swal.fire({
        title: 'ACTIVACIÓN EXITOSA',
        text: 'Su cuenta ha sido confirmada, por favor inicie sesión',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  get emailIsInvalid(): boolean {
    return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  get passwordIsInvalid(): boolean {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  /* Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') */

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['fabian', [Validators.required]],
      password: ['fabian123', [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((res) => {
        this.router.navigateByUrl('/dashboard');
        console.log('go to dashboard');
        console.log(this.authService.getToken);
        console.log(this.authService.getHeaders);
      });
      /* setTimeout(() => {
        this.authService.getMyDetails().subscribe((res) => {
          console.log(res);
        });
      }, 3000); */
    }
  }
}
