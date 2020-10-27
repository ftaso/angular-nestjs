import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number): unknown {

    // if (inputDigit.substring(2, 3) !== ' ') {
    //   this.displayNumber = `${inputDigit.substring(0, 2)}.${inputDigit.substring(2, 3)}`;
    // } else if (inputDigit.substring(1, 2) !== ' ') {
    //   this.displayNumber = `${inputDigit.substring(0, 2)}.0`;
    // } else {
    //   this.displayNumber = `${inputDigit.substring(0, 1)}.0`;
    // }
    return null;
  }

}
