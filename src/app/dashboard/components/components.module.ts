import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { AngularMaterialModule } from '../../shared-module/angular-material/angular-material.module';

@NgModule({
  declarations: [UsersTableComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [UsersTableComponent],
})
export class ComponentsModule {}
