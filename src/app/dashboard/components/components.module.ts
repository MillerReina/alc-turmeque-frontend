import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { AngularMaterialModule } from '../../shared-module/angular-material/angular-material.module';
import { OfficersTableComponent } from './officers-table/officers-table.component';
import { ProfileInfoDialogComponent } from './profile-info-dialog/profile-info-dialog.component';

@NgModule({
  declarations: [UsersTableComponent, OfficersTableComponent, ProfileInfoDialogComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [UsersTableComponent, OfficersTableComponent],
})
export class ComponentsModule {}
