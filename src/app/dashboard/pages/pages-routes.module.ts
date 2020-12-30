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

const childRoutes: Routes = [
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
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class PagesRoutesModule {}
