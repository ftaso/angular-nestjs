import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordTypeJp'
})
export class RecordTypeJpPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'meals':
        return '食事';
      case 'excretions':
        return '排泄';
      case 'hydrations':
        return '水分補給';
      case 'vitals':
        return 'バイタル';
      default:
        return value;
    }
  }

}
