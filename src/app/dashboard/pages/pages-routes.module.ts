import { ExternalDetailComponent } from './external/external-detail/external-detail.component';
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
import { CreateDocumentComponent } from './documents/create-document/create-document.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ExtensionsComponent } from './extensions/extensions.component';
import { ExternalComponent } from './external/external.component';
import { CreateExternalComponent } from './external/create-external/create-external.component';
import { ExternalInProcessComponent } from './external/external-in-process/external-in-process.component';
import { ExternalResolvedComponent } from './external/external-resolved/external-resolved.component';
import { ExternalFinishedComponent } from './external/external-finished/external-finished.component';
import { ReportsComponent } from './reports/reports.component';
import { RegistryOfficersComponent } from './reports/registry-officers/registry-officers.component';

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
    path: 'home',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'all',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: DocumentsComponent,
  },
  {
    path: 'in-process',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: InProcessComponent,
  },
  {
    path: 'resolved',
    component: ResolvedComponent,
  },
  {
    path: 'finished',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: FinishedComponent,
  },
  {
    path: 'returned',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: ReturnedComponent,
  },
  {
    path: 'create-doc',
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    component: CreateDocumentComponent,
  },
  {
    path: 'detail/:id/document',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: DocumentDetailComponent,
  },
  {
    path: 'doc-types',
    component: DocTypesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./../pages/doc-types/doc-types.module').then((module) => module.DocTypesModule),
  },
  {
    path: 'extensions',
    component: ExtensionsComponent,
    canActivate: [AdminGuard],
    loadChildren: () => import('./../pages/extensions/extensions.module').then((module) => module.ExtensionsModule),
  },
  {
    path: 'dependencies',
    component: DependicesComponent,
    canActivate: [AdminGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./../pages/dependencies/dependices.module').then((module) => module.DependicesModule),
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ext',
    canLoad: [AuthGuard],
    component: ExternalComponent,
    loadChildren: () => import('./../pages/external/external.module').then((module) => module.ExternalModule),
  },
  {
    path: 'external',
    canLoad: [AuthGuard],
    component: ExternalComponent,
  },
  {
    path: 'create-external',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: CreateExternalComponent,
  },
  {
    path: 'detail/:id/external',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: ExternalDetailComponent,
  },
  {
    path: 'external/in-process',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: ExternalInProcessComponent,
  },
  {
    path: 'external/resolved',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: ExternalResolvedComponent,
  },
  {
    path: 'external/finished',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: ExternalFinishedComponent,
  },
  {
    path: 'reports',
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./../pages/reports/reports.module').then((module) => module.ReportsModule),
  },
  {
    path: 'reports/documents',
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    component: ReportsComponent,
  },
  {
    path: 'reports/officers',
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard],
    component: RegistryOfficersComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class PagesRoutesModule {}
