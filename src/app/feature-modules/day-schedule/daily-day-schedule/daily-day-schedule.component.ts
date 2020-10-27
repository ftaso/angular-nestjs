import { Component, OnChanges, Input } from '@angular/core';
import { DayScheduleStoreService } from '../store/day-schedule-store.service';
import { CareReceiverStoreService } from '../../../master-modules/care-receiver/store/care-receiver-store.service';
import { slideInAnimation } from '../../../animations/slide-in';

@Component({
  selector: 'app-daily-day-schedule',
  templateUrl: './daily-day-schedule.component.html',
  styleUrls: ['./daily-day-schedule.component.scss'],
  animations: [slideInAnimation]
})
export class DailyDayScheduleComponent implements OnChanges {

  @Input() day: number;

  // 静的な食事リスト
  regularScheduleList = new Array();
  // 表示用の食事リスト
  regularScheduleDataTable = new Array();

  // 記述したスタッフのID
  staffId = 0;
  staffName = '';

  state = 'center';
  nextState = '';
  beforeDay: number;

  constructor(
    private storeService: DayScheduleStoreService,
    private careReceiverStoreService: CareReceiverStoreService
  ) {

  }

  async ngOnChanges(): Promise<any> {
    if (this.beforeDay > this.day) {
      this.nextState = 'left';
    } else {
      this.nextState = 'right';
    }
    this.state = this.nextState;
    this.beforeDay = this.day;
    this.attendanceDataLoad(this.day);
  }

  // 現在会員である利用者の静的リストを取得
  async attendanceDataLoad(day: number): Promise<any> {
    const careReciverList = await this.careReceiverDataLoad();
    const regularScheduleList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    for (let i = 0; i < careReciverList.length; i++) {
      for (const data of regularScheduleList) {
        if (careReciverList[i].id_careReceiver === data.id_careReceiver) {
          careReciverList[i] = JSON.parse(JSON.stringify(data));
        }
      }
    }
    this.regularScheduleList = careReciverList;
  }

  // ある曜日の静的リストを取得
  private async careReceiverDataLoad(): Promise<any[]> {
    const careReceiverList = JSON.parse(JSON.stringify(await this.careReceiverStoreService.getStaticList()));
    this.state = 'center';
    return careReceiverList;
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.regularScheduleList)));
  }

  public async attendance(data): Promise<any> {
    if (data.id_regularSchedule) {
      return;
    }
    const postData = JSON.parse(JSON.stringify(data));
    postData.num_day = this.day;
    postData.tm_start = '09:00';
    postData.tm_end = '17:00';
    const error = await this.storeService.post(postData);
    if (error) {

    }
    this.attendanceDataLoad(this.day);
  }

  public async absence(data): Promise<any> {
    if (!data.id_regularSchedule) {
      return;
    }
    const error = await this.storeService.delete(data.id_regularSchedule);
    if (error) {

    }
    this.attendanceDataLoad(this.day);
  }


}
