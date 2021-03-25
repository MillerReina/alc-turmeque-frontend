import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateExtension',
})
export class StateExtensionPipe implements PipeTransform {
  transform(value: string): unknown {
    switch (value) {
      case 'E':
        return 'En espera';
      case 'A':
        return 'Aprobada';
      case 'R':
        return 'Rechazada';
      default:
        break;
    }
  }
}
