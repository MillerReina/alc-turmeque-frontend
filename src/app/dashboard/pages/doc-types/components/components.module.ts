import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocTypesTableComponent } from './doc-types-table/doc-types-table.component';
import { DocTypesDialogComponent } from './doc-types-dialog/doc-types-dialog.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DocTypesTableComponent, DocTypesDialogComponent],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule, FormsModule, ReactiveFormsModule],
  exports: [DocTypesTableComponent],
})
export class DocTypeComponentsModule {}
