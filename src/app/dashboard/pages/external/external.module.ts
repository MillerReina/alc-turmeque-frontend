import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalComponent } from './external.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [ExternalComponent],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule, FormsModule, ReactiveFormsModule, ComponentsModule],
})
export class ExternalModule {}
