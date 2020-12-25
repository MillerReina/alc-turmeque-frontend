import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';

const childRoutes: Routes = [
  {
    path: 'all',
    component: DocumentsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class PagesRoutesModule {}
