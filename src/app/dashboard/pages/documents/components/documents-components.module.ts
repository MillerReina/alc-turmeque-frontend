import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { TitleDocumentsComponent } from './title-documents/title-documents.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssingDocumentDialogComponent } from './assing-document-dialog/assing-document-dialog.component';
import { SeeDocumentDialogComponent } from './see-document-dialog/see-document-dialog.component';
import { Ng2Module } from '../../../../shared-module/ng2/ng2.module';
import { ReturnDocumentDialogComponent } from './return-document-dialog/return-document-dialog.component';
import { DocumentHistoryDialogComponent } from './document-history-dialog/document-history-dialog.component';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ExtensionDocumentDialogComponent } from './extension-document-dialog/extension-document-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    DocumentsTableComponent,
    TitleDocumentsComponent,
    AssingDocumentDialogComponent,
    SeeDocumentDialogComponent,
    ReturnDocumentDialogComponent,
    DocumentHistoryDialogComponent,
    ExtensionDocumentDialogComponent,
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Module,
    PipesModule,
  ],
  exports: [DocumentsTableComponent, TitleDocumentsComponent],
})
export class DocumentsComponentsModule {}
