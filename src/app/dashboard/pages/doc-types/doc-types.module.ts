import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocTypeComponentsModule } from './components/components.module';
import { DocTypesComponent } from './doc-types.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DocTypesComponent],
  imports: [
    CommonModule,
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DocTypeComponentsModule,
  ],
})
export class DocTypesModule {}
