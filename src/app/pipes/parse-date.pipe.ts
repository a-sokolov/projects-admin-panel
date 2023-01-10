import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
})
export class ParseDatePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return formatDate(value, args[0] ?? 'dd MMMM yyyy', 'ru');
  }
}
