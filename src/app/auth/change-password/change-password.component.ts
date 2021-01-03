import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit(): void {}

  get passwordOneIsInvalid(): boolean {
    return this.recoveryForm.get('passwordOne').invalid && this.recoveryForm.get('passwordOne').touched;
  }

  createForm(): void {
    this.recoveryForm = this.fb.group({
      passwordOne: ['', [Validators.required]],
      passwordTwo: ['', [Validators.required]],
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
