import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../shared-module/angular-material/angular-material.module';

/* Componentes */
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AuthComponent } from './auth.component';
import { NgPrimeModule } from '../shared-module/ng-prime/ng-prime.module';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [LoginComponent, RecoverPasswordComponent, AuthComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    NgPrimeModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
