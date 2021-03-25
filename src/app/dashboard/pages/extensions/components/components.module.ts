import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtensionsTableComponent } from './extensions-table/extensions-table.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [ExtensionsTableComponent],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule, FormsModule, ReactiveFormsModule, PipesModule],
  exports: [ExtensionsTableComponent],
})
export class ExtensionComponentsModule {}
