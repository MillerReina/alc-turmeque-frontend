import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { TitleDocumentsComponent } from './title-documents/title-documents.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DocumentsTableComponent, TitleDocumentsComponent],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule, FormsModule, ReactiveFormsModule],
  exports: [DocumentsTableComponent, TitleDocumentsComponent],
})
export class DocumentsComponentsModule {}
