import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { InProcessComponent } from './documents/in-process/in-process.component';
import { ResolvedComponent } from './documents/resolved/resolved.component';
import { FinishedComponent } from './documents/finished/finished.component';
import { ReturnedComponent } from './documents/returned/returned.component';
import { AdminGuard } from '../../guards/admin.guard';
import { OfficersComponent } from './officers/officers.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DependicesComponent } from './dependencies/dependices.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreateOfficerComponent } from './officers/create-officer/create-officer.component';
import { DocTypesComponent } from './doc-types/doc-types.component';

const childRoutes: Routes = [
  {
    path: 'officers',
    component: OfficersComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'create/officer',
    component: CreateOfficerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'edit/:id/officer',
    component: CreateOfficerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'dependency',
    component: DependicesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./../pages/dependencies/dependices.module').then((module) => module.DependicesModule),
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
    path: 'doc-types',
    component: DocTypesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./../pages/doc-types/doc-types.module').then((module) => module.DocTypesModule),
  },
  {
    path: 'dependencies',
    component: DependicesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class PagesRoutesModule {}
