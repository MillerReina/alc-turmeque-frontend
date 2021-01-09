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
import { UsersComponent } from './users/users.component';
import { ComponentsModule } from '../components/components.module';
import { OfficersComponent } from './users/officers/officers.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    DocumentsComponent,
    InProcessComponent,
    ResolvedComponent,
    FinishedComponent,
    ReturnedComponent,
    UsersComponent,
    OfficersComponent,
    MyProfileComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, NgPrimeModule, ComponentsModule],
})
export class PagesModule {}
