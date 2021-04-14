import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { ComponentsModule } from './components/components.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, AngularMaterialModule, ComponentsModule, NgPrimeModule],
})
export class ReportsModule {}
