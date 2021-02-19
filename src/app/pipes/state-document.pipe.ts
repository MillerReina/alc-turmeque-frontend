import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateDocument',
})
export class StateDocumentPipe implements PipeTransform {
  transform(value: string): unknown {
    switch (value) {
      case 'PR':
        return 'En proceso';
      case 'RA':
        return 'Radicado';
      case 'RE':
        return 'Resuelto';
      case 'FI':
        return 'Finalizado';
      case 'DE':
        return 'Devuelto';
      default:
        break;
    }
  }
}
