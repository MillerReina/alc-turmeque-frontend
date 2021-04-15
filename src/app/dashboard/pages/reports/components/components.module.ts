import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from './graphic/graphic.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistersTableComponent } from './registers-table/registers-table.component';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';

@NgModule({
  declarations: [GraphicComponent, RegistersTableComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule, NgPrimeModule],
  exports: [GraphicComponent, RegistersTableComponent],
})
export class ComponentsModule {}
