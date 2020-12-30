import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  /**
   * Formulario para recuperar contraseña reactivo
   */
  public recoveryForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createLoginForm();
  }

  ngOnInit(): void {}

  get emailIsInvalid(): boolean {
    return this.recoveryForm.get('email').invalid && this.recoveryForm.get('email').touched;
  }

  createLoginForm(): void {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    });
  }
  /**
   * Envia petición para recuperar contraseña
   */
  recoverPassword(): void {
    if (this.recoveryForm.invalid) {
      this.recoveryForm.markAllAsTouched();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Enviando e-mail...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      this.authService.recoverPassword(this.recoveryForm.value).subscribe((__) => {
        Swal.close();
        Swal.fire({
          title: '¡Correo enviado!',
          icon: 'success',
          text: 'Revisa tu bandeja de entrada y/o spam',
          confirmButtonText: 'Aceptar',
        });
      });
    }
  }
}
