import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtensionsComponent } from './extensions.component';
import { AngularMaterialModule } from '../../../shared-module/angular-material/angular-material.module';
import { NgPrimeModule } from '../../../shared-module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtensionComponentsModule } from './components/components.module';

@NgModule({
  declarations: [ExtensionsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    ExtensionComponentsModule,
  ],
})
export class ExtensionsModule {}
