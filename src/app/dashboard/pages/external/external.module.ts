import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalComponent } from './external.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { ExternalDetailComponent } from './external-detail/external-detail.component';
import { CreateExternalComponent } from './create-external/create-external.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ExternalFinishedComponent } from './external-finished/external-finished.component';
import { ExternalResolvedComponent } from './external-resolved/external-resolved.component';
import { ExternalInProcessComponent } from './external-in-process/external-in-process.component';

@NgModule({
  declarations: [
    ExternalComponent,
    ExternalDetailComponent,
    CreateExternalComponent,
    ExternalFinishedComponent,
    ExternalResolvedComponent,
    ExternalInProcessComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule,
  ],
})
export class ExternalModule {}
