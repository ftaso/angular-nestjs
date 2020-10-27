import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; 

@Pipe({
  name: 'jpDate'
})
export class JpDatePipe implements PipeTransform {

  transform(value: string): unknown {
    return moment(value, 'YYYY-MM-DD').format('M月D日(ddd)');;
  }

}
