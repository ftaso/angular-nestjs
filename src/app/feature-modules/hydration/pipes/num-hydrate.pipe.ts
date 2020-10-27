import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numHydrate'
})
export class NumHydratePipe implements PipeTransform {

  transform(value: number): any {
    if (value < 50) {
      return '50未満';
    }
    return value;
  }

}
