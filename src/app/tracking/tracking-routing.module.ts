import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DocumentTrackingComponent } from './document-tracking/document-tracking.component';
import { SearchTrackingComponent } from './search-tracking/search-tracking.component';

const routes: Routes = [
  { path: 'tracking', component: SearchTrackingComponent },
  { path: 'tracking/:id/document', component: DocumentTrackingComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingRoutingModule {}
