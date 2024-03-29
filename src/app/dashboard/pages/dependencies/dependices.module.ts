import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependicesComponent } from './dependices.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DependencyComponentsModule } from './components/components.module';

@NgModule({
  declarations: [DependicesComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DependencyComponentsModule,
  ],
})
export class DependicesModule {}
