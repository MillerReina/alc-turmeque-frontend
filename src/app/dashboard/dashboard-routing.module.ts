import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard/home' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    /* canActivate: [AuthGuard],
    canLoad: [AuthGuard], */
    loadChildren: () => import('./pages/pages-routes.module').then((module) => module.PagesRoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
