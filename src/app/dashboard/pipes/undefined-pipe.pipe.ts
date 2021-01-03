import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefinedPipe'
})
export class UndefinedPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
