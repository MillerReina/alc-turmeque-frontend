import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependenciesTableComponent } from './dependencies-table/dependencies-table.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { DependencyDialogComponent } from './dependency-dialog/dependency-dialog.component';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';

@NgModule({
  declarations: [DependenciesTableComponent, DependencyDialogComponent],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule],
  exports: [DependenciesTableComponent],
})
export class ComponentsModule {}
