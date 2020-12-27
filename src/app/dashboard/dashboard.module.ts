import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared-module/angular-material/angular-material.module';
import { DocumentsComponent } from './pages/documents/documents.component';
import { HomeComponent } from './pages/home/home.component';
import { NgPrimeModule } from '../shared-module/ng-prime/ng-prime.module';
import { ToastMessageService } from '../services/toast-message.service';

@NgModule({
  declarations: [DashboardComponent, DocumentsComponent, HomeComponent],
  imports: [CommonModule, RouterModule, DashboardRoutingModule, SharedModule, AngularMaterialModule, NgPrimeModule],
  providers: [ToastMessageService],
})
export class DashboardModule {}
