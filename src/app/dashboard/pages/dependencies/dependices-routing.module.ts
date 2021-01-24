import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDependencyComponent } from './create-dependency/create-dependency.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateDependencyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DependicesRoutingModule {}