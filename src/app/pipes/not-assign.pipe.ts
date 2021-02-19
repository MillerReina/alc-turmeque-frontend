import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notAssign',
})
export class NotAssignPipe implements PipeTransform {
  transform(value: any): unknown {
    if (value != null) {
      return value;
    } else {
      return 'Sin asignar';
    }
  }
}
