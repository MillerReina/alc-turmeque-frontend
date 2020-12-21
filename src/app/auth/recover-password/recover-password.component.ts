import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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

  login() {
    console.log(this.recoveryForm);
    if (this.recoveryForm.invalid) {
      this.recoveryForm.markAllAsTouched();
    }
  }
}
