import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './paginator.pipe';
import { IsActivePipe } from './is-active.pipe';

@NgModule({
  declarations: [PaginatorPipe, IsActivePipe],
  imports: [CommonModule],
  exports: [PaginatorPipe, IsActivePipe],
})
export class PipesModule {}
