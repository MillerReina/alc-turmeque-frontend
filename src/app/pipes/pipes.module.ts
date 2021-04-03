import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './paginator.pipe';
import { IsActivePipe } from './is-active.pipe';
import { ExtensionPipe } from './extension.pipe';
import { StateDocumentPipe } from './state-document.pipe';
import { NotAssignPipe } from './not-assign.pipe';
import { StateExtensionPipe } from './state-extension.pipe';
import { DateNotificationPipe } from './date-notification.pipe';

@NgModule({
  declarations: [
    PaginatorPipe,
    IsActivePipe,
    ExtensionPipe,
    StateDocumentPipe,
    NotAssignPipe,
    StateExtensionPipe,
    DateNotificationPipe,
  ],
  imports: [CommonModule],
  exports: [
    PaginatorPipe,
    IsActivePipe,
    ExtensionPipe,
    StateDocumentPipe,
    NotAssignPipe,
    StateExtensionPipe,
    DateNotificationPipe,
  ],
})
export class PipesModule {}
