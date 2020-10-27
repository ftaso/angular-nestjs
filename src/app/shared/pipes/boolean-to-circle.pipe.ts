import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToCircle'
})
export class BooleanToCirclePipe implements PipeTransform {

  transform(value: number | boolean): string {
    // numberの場合
    if (value) {
      return '〇';
    }
    return '';
  }

}
