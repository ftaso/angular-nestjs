import { Component } from '@angular/core';
import * as moment from 'moment';
import { CareReceiverStoreService } from '../../master-modules/care-receiver/store/care-receiver-store.service'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {

  pageTitle = '出席管理';

  // 週の日付用の配列
  weekList = new Array();
  // 週の始まりを記録
  fromDate: any;
  // 選択されている日（これを変更することで、daily-attendanceComponentの表示を変更）
  selectedDate = moment().format('YYYY-MM-DD');

  // 利用者のリスト
  careReceiverList = new Array();

  constructor(
    private careReceiverStoreService: CareReceiverStoreService
  ) {
    this.getCareReceiverList();
    this.weekListChange();
  }

  private async getCareReceiverList(): Promise<any> {
    // 利用者のリスト
    this.careReceiverList = await this.careReceiverStoreService.getStaticList();
  }

  // 週のリストを変更
  private weekListChange(): void {
    const fromDate = moment(this.selectedDate, 'YYYY-MM-DD').startOf('week').format('YYYY-MM-DD');
    const newWeekList = new Array();
    for (let i = 0; i < 7; i++) {
      newWeekList.push(moment(fromDate, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD'));
    }
    this.weekList = newWeekList;
  }

  // 日付タブを押された処理
  changeDate(date: string): void {
    this.selectedDate = date;
  }

  // 先週へボタンを押す
  previousWeek(): void {
    this.selectedDate = moment(this.selectedDate, 'YYYY-MM-DD').add(-7, 'days').format('YYYY-MM-DD');
    this.weekListChange();
  }

  // 翌週へボタンを押す
  nextWeek(): void {
    this.selectedDate = moment(this.selectedDate, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
    this.weekListChange();
  }
}
