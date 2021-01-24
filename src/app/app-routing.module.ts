import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/home' },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then((module) => module.DashboardModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule, DashboardRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
