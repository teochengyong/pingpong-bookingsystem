import { Pipe, PipeTransform } from '@angular/core';
import { SortBy } from './sortBy';
@Pipe({
  name: 'orderByDate'
})

export class OrderByDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const sortBy = new SortBy;
    return sortBy.orderByDate(value, args);
  }
}
