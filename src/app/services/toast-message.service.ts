import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}
  /**
   * Mensaje de ok
   */
  showSuccessMessage(title: string, text: string) {
    this.messageService.add({ severity: 'success', summary: title, detail: text, life: 5000 });
  }
  /**
   * Mensaje de ok para radicados
   */
  showSuccessMessageDocuments(title: string, text: string) {
    this.messageService.add({ severity: 'success', summary: title, detail: text, life: 8000 });
  }
  /**
   * Mensaje de advertencia
   */
  showWarningMessage(title: string, text: string) {
    this.messageService.add({ severity: 'warn', summary: title, detail: text, life: 5000 });
  }
  /**
   * Mensaje de error
   */
  showErrorMessage(text: string) {
    this.messageService.add({ severity: 'error', summary: 'ERROR', detail: text, life: 5000 });
  }
  /**
   * Mensaje de error
   */
  showErrorMessage2(title: string, text: string) {
    this.messageService.add({ severity: 'error', summary: title, detail: text, life: 5000 });
  }
  /**
   * Mensaje de info
   */
  showInfoMessage(title: string, text: string) {
    this.messageService.add({ severity: 'info', summary: title, detail: text, life: 5000 });
  }

  /* Alertas para requerimientos sin plazo */
  /**
   * Requerimiento pronto a vencer
   */
  showWarningMessageAlmostTime(title: string, text: string) {
    this.messageService.add({ severity: 'warn', summary: title, detail: text, life: 8000 });
  }

  /**
   * Requerimiento sin tiempo y sin respuesta
   */
  showErrorMessageNotTime(title: string, text: string) {
    this.messageService.add({ severity: 'error', summary: title, detail: text, life: 8000 });
  }
}
