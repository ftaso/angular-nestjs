import { Component, OnChanges, Input } from '@angular/core';
import { RecordStoreService } from '../store/record-store.service';
import { slideInAnimation } from '../../../animations/slide-in';

@Component({
  selector: 'app-daily-attendance',
  templateUrl: './daily-attendance.component.html',
  styleUrls: ['./daily-attendance.component.scss'],
  animations: [slideInAnimation]
})
export class DailyAttendanceComponent implements OnChanges {

  @Input() date: string;
  @Input() careReceiverList: any[];

  // 静的な食事リスト
  recordList = new Array();
  // 表示用の食事リスト
  recordDataTable = new Array();

  // 記述したスタッフのID
  staffId = 0;
  staffName = '';

  // 未登録の利用者リスト
  unregistCareReceiverList = new Array();
  selectedCareReceiverId = 0;

  state = 'center';
  nextState = '';
  beforeDate: string;

  isAdd = false;

  constructor(
    private storeService: RecordStoreService,
  ) {

  }

  async ngOnChanges(): Promise<any> {
    if (this.beforeDate > this.date) {
      this.nextState = 'left';
    } else {
      this.nextState = 'right';
    }
    this.state = this.nextState;
    this.beforeDate = this.date;
    this.attendanceDataLoad(this.date);
  }

  // 今日のレコードの静的リストを取得
  async attendanceDataLoad(date: string): Promise<any> {
    this.recordList = JSON.parse(JSON.stringify(await this.storeService.getStaticList(date)));
    this.state = 'center';
    console.log(this.recordList);
    this.unregistCareReceiverList = this.editUnregistCareReceiverList();
    console.log(this.unregistCareReceiverList);
  }

  // 未登録の利用者情報を作成
  private editUnregistCareReceiverList(): any[] {
    const list = this.careReceiverList.filter(a => !this.recordList.find(b => b.id_careReceiver === a.id_careReceiver));
    return list;
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.recordList)));
  }

  public async attendance(data): Promise<any> {
    if (data.is_attendance === 1) {
      return;
    }
    const putData = JSON.parse(JSON.stringify(data));
    putData.is_attendance = 1;
    const error = await this.storeService.put(putData);
    if (error) {

    }
    this.attendanceDataLoad(data.dt_record);
  }

  public async absence(data): Promise<any> {
    if (data.is_attendance === 0) {
      return;
    }
    const putData = JSON.parse(JSON.stringify(data));
    putData.is_attendance = 0;
    console.log(putData);
    const error = await this.storeService.put(putData);
    if (error) {

    }
    this.attendanceDataLoad(data.dt_record);
  }

  public async regist(): Promise<any> {
    console.log(this.selectedCareReceiverId);
    const error = await this.storeService.post(this.date, this.selectedCareReceiverId);
    if (error) {

    }
    this.attendanceDataLoad(this.date);
  }


}
