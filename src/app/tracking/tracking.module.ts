import { TrackingComponent } from './tracking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { NgPrimeModule } from '../shared-module/ng-prime/ng-prime.module';
import { AngularMaterialModule } from '../shared-module/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentTrackingComponent } from './document-tracking/document-tracking.component';
import { SearchTrackingComponent } from './search-tracking/search-tracking.component';
import { PipesModule } from '../pipes/pipes.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [TrackingComponent, DocumentTrackingComponent, SearchTrackingComponent, AboutComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    NgPrimeModule,
    TrackingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class TrackingModule {}
