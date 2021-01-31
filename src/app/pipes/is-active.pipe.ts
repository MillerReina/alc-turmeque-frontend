import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive',
})
export class IsActivePipe implements PipeTransform {
  transform(value: boolean): unknown {
    if (value === true) {
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }
}
