import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
  transform(array: any[], page_size: number | string, page_number: number, term: string): any[] {
    if (!array.length) return [];
    if (page_size === 'all') {
      return array;
    }
    page_size = page_size || 10;
    page_number = page_number || 1;
    term = '';
    --page_number;
    // @ts-ignore
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
}
