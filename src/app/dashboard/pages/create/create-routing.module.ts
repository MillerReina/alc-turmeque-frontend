import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOfficerComponent } from './create-officer/create-officer.component';

const routes: Routes = [
  {
    path: 'officer',
    component: CreateOfficerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
