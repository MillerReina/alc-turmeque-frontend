import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { InProcessComponent } from './documents/in-process/in-process.component';
import { ResolvedComponent } from './documents/resolved/resolved.component';
import { FinishedComponent } from './documents/finished/finished.component';
import { ReturnedComponent } from './documents/returned/returned.component';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from '../../guards/admin.guard';
import { OfficersComponent } from './users/officers/officers.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../../guards/auth.guard';

const childRoutes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./create/create.module').then((module) => module.CreateModule),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'all',
    component: DocumentsComponent,
  },
  {
    path: 'in-process',
    component: InProcessComponent,
  },
  {
    path: 'resolved',
    component: ResolvedComponent,
  },
  {
    path: 'finished',
    component: FinishedComponent,
  },
  {
    path: 'returned',
    component: ReturnedComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'officers',
    component: OfficersComponent,
    canActivate: [AdminGuard],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class PagesRoutesModule {}
