import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependicesRoutingModule } from './dependices-routing.module';
import { DependicesComponent } from './dependices.component';
import { CreateDependencyComponent } from './create-dependency/create-dependency.component';

@NgModule({
  declarations: [DependicesComponent, CreateDependencyComponent],
  imports: [CommonModule, DependicesRoutingModule],
})
export class DependicesModule {}
