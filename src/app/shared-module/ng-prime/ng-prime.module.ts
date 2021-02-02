import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PopoverModule } from 'ngx-smart-popover';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule, PopoverModule],
  providers: [MessageService],
  exports: [ToastModule, PopoverModule],
})
export class NgPrimeModule {}
