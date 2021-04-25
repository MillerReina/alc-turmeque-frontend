import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../shared-module/ng-prime/ng-prime.module';
import { AlphabetOnlyDirective } from './officers/directives/alphabet-only-directive.directive';
import { PipesModule } from '../../pipes/pipes.module';
import { Ng2Module } from '../../shared-module/ng2/ng2.module';

import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { InProcessComponent } from './documents/in-process/in-process.component';
import { ResolvedComponent } from './documents/resolved/resolved.component';
import { FinishedComponent } from './documents/finished/finished.component';
import { ReturnedComponent } from './documents/returned/returned.component';
import { ComponentsModule } from '../components/components.module';
import { OfficersComponent } from './officers/officers.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PagesComponent } from './pages.component';
import { CreateOfficerComponent } from './officers/create-officer/create-officer.component';
import { DocumentsComponentsModule } from './documents/components/documents-components.module';
import { CreateDocumentComponent } from './documents/create-document/create-document.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    HomeComponent,
    DocumentsComponent,
    InProcessComponent,
    ResolvedComponent,
    FinishedComponent,
    ReturnedComponent,
    OfficersComponent,
    MyProfileComponent,
    PagesComponent,
    CreateOfficerComponent,
    AlphabetOnlyDirective,
    CreateDocumentComponent,
    DocumentDetailComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    Ng2Module,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentsComponentsModule,
    PipesModule,
  ],
})
export class PagesModule {}
