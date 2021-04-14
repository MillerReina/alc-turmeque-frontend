import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PopoverModule } from 'ngx-smart-popover';
import { CaptchaModule } from 'primeng/captcha';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule, PopoverModule, CaptchaModule, TabViewModule],
  providers: [MessageService],
  exports: [ToastModule, PopoverModule, CaptchaModule, TabViewModule],
})
export class NgPrimeModule {}
