import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
})
export class ParseDatePipe implements PipeTransform {
  transform(value: string, format?: string, ...args: string[]): string {
    return formatDate(value, format ?? 'dd MMMM yyyy', 'ru');
  }
}
