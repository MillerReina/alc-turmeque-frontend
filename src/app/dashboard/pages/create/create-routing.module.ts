import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOfficerComponent } from './create-officer/create-officer.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {
    path: 'create/officer',
    component: CreateOfficerComponent,
  },
  {
    path: 'create/user',
    component: CreateUserComponent,
  },
  {
    path: 'edit/:id/officer',
    component: CreateOfficerComponent,
  },
  {
    path: 'edit/:id/user',
    component: CreateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
