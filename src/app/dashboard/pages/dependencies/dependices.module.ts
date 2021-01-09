import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependicesRoutingModule } from './dependices-routing.module';
import { DependicesComponent } from './dependices.component';
import { CreateDependencyComponent } from './create-dependency/create-dependency.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [DependicesComponent, CreateDependencyComponent],
  imports: [
    CommonModule,
    DependicesRoutingModule,
    AngularMaterialModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class DependicesModule {}
