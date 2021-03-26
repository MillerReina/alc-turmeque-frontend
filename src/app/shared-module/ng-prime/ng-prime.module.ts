import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PopoverModule } from 'ngx-smart-popover';
import { CaptchaModule } from 'primeng/captcha';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule, PopoverModule, CaptchaModule],
  providers: [MessageService],
  exports: [ToastModule, PopoverModule, CaptchaModule],
})
export class NgPrimeModule {}
