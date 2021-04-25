import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared-module/angular-material/angular-material.module';
import { OfficersTableComponent } from './officers-table/officers-table.component';
import { ProfileInfoDialogComponent } from './profile-info-dialog/profile-info-dialog.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgPrimeModule } from '../../shared-module/ng-prime/ng-prime.module';
import { MenuNotificationsComponent } from './menu-notifications/menu-notifications.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OfficersTableComponent, ProfileInfoDialogComponent, MenuNotificationsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [OfficersTableComponent, ProfileInfoDialogComponent, MenuNotificationsComponent],
})
export class ComponentsModule {}
