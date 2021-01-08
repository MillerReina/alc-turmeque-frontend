import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRoutingModule } from './create-routing.module';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { CreateOfficerComponent } from './create-officer/create-officer.component';
import { CreateComponent } from './create.component';
import { AlphabetOnlyDirective } from './directives/alphabet-only-directive.directive';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [CreateOfficerComponent, CreateComponent, AlphabetOnlyDirective, CreateUserComponent],
  imports: [CommonModule, CreateRoutingModule, AngularMaterialModule, NgPrimeModule, FormsModule, ReactiveFormsModule],
})
export class CreateModule {}
