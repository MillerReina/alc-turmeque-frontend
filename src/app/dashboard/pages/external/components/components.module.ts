import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalTableComponent } from './external-table/external-table.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleDocumentsComponent } from './title-documents/title-documents.component';

@NgModule({
  declarations: [ExternalTableComponent, TitleDocumentsComponent],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule, FormsModule, ReactiveFormsModule],
  exports: [ExternalTableComponent, TitleDocumentsComponent],
})
export class ComponentsModule {}
