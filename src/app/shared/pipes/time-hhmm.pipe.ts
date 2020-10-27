import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ja';

@Pipe({
  name: 'timeHHmm'
})
export class TimeHhmmPipe implements PipeTransform {
  // 時刻の表示変換
  transform(time: string, minutes: number): string {
    if (time === '') {
      return '';
    }
    if (minutes) {
      return moment(time, 'HH:mm:ss').add(minutes, 'minutes').format('H:mm');
    }
    return moment(time, 'HH:mm:ss').format('H:mm');
  }

}

