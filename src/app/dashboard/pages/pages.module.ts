import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { InProcessComponent } from './documents/in-process/in-process.component';
import { ResolvedComponent } from './documents/resolved/resolved.component';
import { AngularMaterialModule } from '../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../shared-module/ng-prime/ng-prime.module';
import { FinishedComponent } from './documents/finished/finished.component';
import { ReturnedComponent } from './documents/returned/returned.component';
import { ComponentsModule } from '../components/components.module';
import { OfficersComponent } from './officers/officers.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CreateOfficerComponent } from './officers/create-officer/create-officer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlphabetOnlyDirective } from './officers/directives/alphabet-only-directive.directive';

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
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
