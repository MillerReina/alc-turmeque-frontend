import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './paginator.pipe';
import { IsActivePipe } from './is-active.pipe';
import { ExtensionPipe } from './extension.pipe';
import { StateDocumentPipe } from './state-document.pipe';
import { NotAssignPipe } from './not-assign.pipe';

@NgModule({
  declarations: [PaginatorPipe, IsActivePipe, ExtensionPipe, StateDocumentPipe, NotAssignPipe],
  imports: [CommonModule],
  exports: [PaginatorPipe, IsActivePipe, ExtensionPipe, StateDocumentPipe, NotAssignPipe],
})
export class PipesModule {}
