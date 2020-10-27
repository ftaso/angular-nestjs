import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

  // 施設の開始時刻
  startTime = '08:00';
  // 施設の終了時刻
  endTime = '19:00';

  constructor() { }

  // 引数として与えられた分間隔の配列を作る
  createTimeTable(stepMin: number): object[] {
    const timeCellList = new Array();
    const time = moment(this.startTime, 'HH:mm');
    const timeCellListEnd = moment(this.endTime, 'HH:mm');
    while (time.isSameOrBefore(timeCellListEnd)) {
      timeCellList.push(JSON.parse(JSON.stringify({
        time: time.format('HH:mm:ss')
      })));
      time.add(stepMin, 'minutes');
    }
    timeCellList.pop();
    return timeCellList;
  }

}
