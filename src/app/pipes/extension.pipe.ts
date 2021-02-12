import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extension',
})
export class ExtensionPipe implements PipeTransform {
  transform(value: string): unknown {
    let aux = value.split('/');
    return aux[1];
  }
}
