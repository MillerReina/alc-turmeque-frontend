import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateNotification',
})
export class DateNotificationPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: any): unknown {
    const start = moment();
    const registerDate = moment(value);
    const result = registerDate.diff(start, 'days');
    if (result === 0) {
      return 'Hoy';
    } else if (result === -1) {
      return 'Ayer';
    } else if (result === -2) {
      return 'Hace dos días';
    } else {
      return `El ${this.datePipe.transform(value, 'dd/MMMM/yyyy')}`;
    }
  }
}
