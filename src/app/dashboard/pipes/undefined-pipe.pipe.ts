import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefined',
})
export class UndefinedPipePipe implements PipeTransform {
  transform(value: string): unknown {
    if (value === undefined) {
      return '';
    } else {
      return value;
    }
  }
}
