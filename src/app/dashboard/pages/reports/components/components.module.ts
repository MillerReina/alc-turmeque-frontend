import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from './graphic/graphic.component';
import { AngularMaterialModule } from '../../../../shared-module/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GraphicComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule],
  exports: [GraphicComponent],
})
export class ComponentsModule {}
