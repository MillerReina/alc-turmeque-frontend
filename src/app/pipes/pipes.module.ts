import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './paginator.pipe';
import { IsActivePipe } from './is-active.pipe';
import { ExtensionPipe } from './extension.pipe';

@NgModule({
  declarations: [PaginatorPipe, IsActivePipe, ExtensionPipe],
  imports: [CommonModule],
  exports: [PaginatorPipe, IsActivePipe, ExtensionPipe],
})
export class PipesModule {}
