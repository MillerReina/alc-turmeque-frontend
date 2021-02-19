import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './paginator.pipe';
import { IsActivePipe } from './is-active.pipe';
import { ExtensionPipe } from './extension.pipe';
import { StateDocumentPipe } from './state-document.pipe';

@NgModule({
  declarations: [PaginatorPipe, IsActivePipe, ExtensionPipe, StateDocumentPipe],
  imports: [CommonModule],
  exports: [PaginatorPipe, IsActivePipe, ExtensionPipe, StateDocumentPipe],
})
export class PipesModule {}
