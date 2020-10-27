import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DayScheduleStoreService } from './store/day-schedule-store.service';
import { CareReceiverStoreService } from '../../master-modules/care-receiver/store/care-receiver-store.service';
import { CareReceiver } from 'src/app/master-modules/care-receiver/services/care-receiver-http-handler.service';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnInit {

  pageTitle = 'スケジュール';

  // 週の日付用の配列
  weekList = ['日', '月', '火', '水', '木', '金', '土'];
  // 選択されている日（これを変更することで、daily-attendanceComponentの表示を変更）
  selectedDay = moment().day();

  regularScheduleList = new Array();

  constructor(
    private storeService: DayScheduleStoreService,
    private careReceiverStoreService: CareReceiverStoreService
  ) { }

  ngOnInit(): void {
    this.attendanceDataLoad();
  }

  // 現在会員である利用者の静的リストを取得
  async attendanceDataLoad(): Promise<any> {
    const careReciverList = await this.careReceiverDataLoad();
    const regularScheduleList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    for (const careReceiver of careReciverList) {
      careReceiver.dayData = [];
      for (let j = 0; j < this.weekList.length; j++) {
        careReceiver.dayData[j] = {};
      }
      for (const data of regularScheduleList) {
        if (careReceiver.id_careReceiver === data.id_careReceiver) {
          careReceiver.dayData[data.num_day] = JSON.parse(JSON.stringify(data));
        }
      }
    }
    this.regularScheduleList = careReciverList;
  }

  // 全利用者の静的リストを取得
  private async careReceiverDataLoad(): Promise<any[]> {
    const careReceiverList = JSON.parse(JSON.stringify(await this.careReceiverStoreService.getStaticList()));
    return careReceiverList;
  }

  // // 日付タブを押された処理
  // changeDay(day: number): void {
  //   console.log(day);
  //   this.selectedDay = day;
  // }

  
  public async attendance(data, day): Promise<any> {
    if (data.id_regularSchedule) {
      return;
    }
    console.log(data.id_careReceiver);
    const postData = JSON.parse(JSON.stringify(data));
    postData.num_day = day;
    postData.tm_start = '09:00';
    postData.tm_end = '17:00';
    const error = await this.storeService.post(postData);
    if (error) {

    }
    this.attendanceDataLoad();
  }

  public async absence(data): Promise<any> {
    if (!data.id_regularSchedule) {
      return;
    }
    const error = await this.storeService.delete(data.id_regularSchedule);
    if (error) {

    }
    this.attendanceDataLoad();
  }

}

