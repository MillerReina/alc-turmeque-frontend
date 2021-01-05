import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Modulos creados */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../shared-module/ng-prime/ng-prime.module';
import { PagesModule } from './pages/pages.module';
/* Componentes */
import { DashboardComponent } from './dashboard.component';
/* Servicio toast */
import { ToastMessageService } from '../services/toast-message.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
    AngularMaterialModule,
    NgPrimeModule,
    PagesModule,
  ],
  providers: [ToastMessageService],
})
export class DashboardModule {}
