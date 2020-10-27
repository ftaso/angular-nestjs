import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';
import { ExcretionStoreService } from './store/excretion-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { TimeTableService } from '../../services/time-table.service';
import { SessionService } from '../../store/session.service';
import { StateComponent } from './components/state/state.component';
import { InputStaffChangeComponent } from '../.././master-modules/staff/input-staff-change/input-staff-change.component';

@Component({
  selector: 'app-excretion',
  templateUrl: './excretion.component.html',
  styleUrls: ['./excretion.component.scss']
})
export class ExcretionComponent implements OnInit {

  pageTitle = '排泄';

  // 静的なスタッフリスト
  staffList = new Array();
  // 静的なバイタルリスト
  excretionList = new Array();

  // 排泄のリスト
  excretionTable = new Array();

  // タイムテーブル
  timeTable = new Array();

  // 記述したスタッフのID
  staffId = 0;

  constructor(
    private staffStoreService: StaffStoreService,
    private storeService: ExcretionStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
    private sessionService: SessionService,
    private timeTableService: TimeTableService
  ) { }

  async ngOnInit(): Promise<any> {
    await this.staffDataLoad();
    // 配列を作る
    this.timeTable = this.timeTableService.createTimeTable(20);
    this.excretionDataLoad();
    this.staffId = this.sessionService.getUserData().staffId;
  }

  // スタッフのリストを取得
  async staffDataLoad(): Promise<any> {
    return new Promise(async resolve => {
      this.staffList = JSON.parse(JSON.stringify(await this.staffStoreService.getStaticList()));
      console.log(this.staffList);
      resolve();
    });
  }

  // 今日のバイタルの静的リストを取得
  async excretionDataLoad(): Promise<any> {
    this.excretionList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    this.editExcretionTable();
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.excretionList)));
  }

  // バイタルデータ表示用のテーブルを作成する
  editExcretionTable(): void {
    for (const record of this.excretionList) {
      record.time = [];
      for (const time of this.timeTable) {
        record.time.push({
          time: time.time,
          excretions: [],
          remark: false
        });
      }
      for (const excretion of record.excretions) {
        for (const time of record.time) {
          if (excretion.tm_excrete === time.time) {
            // 時刻に対して追加してく
            time.excretions.push(JSON.parse(JSON.stringify(excretion)));
            if (excretion.str_remark) {
              time.remark = true;
            }
          }
        }
      }
      record.time.sort((a, b) => {
        if (a.time > b.time) { return 1; }
        if (a.time < b.time) { return -1; }
      });
    }
    // 排泄情報
    console.log(this.excretionList);
  }

  async openDialog(recordData, timeData, excretionData?): Promise<any> {
    // Editダイアログに表示する内容
    const param = {
      class: 'input-dialog',
      record: recordData,
      staffId: this.staffId,
      time: timeData,
      excretion: excretionData,
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(StateComponent, this.viewContainerRef, param);
    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'put':
              this.excretionDataLoad();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }


  // 入力者変更用のスタッフダイアログを開く
  menuToggle(): void {
    const param = {
      class: 'input-staff-change-dialog',
      staffId: this.staffId,
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(InputStaffChangeComponent, this.viewContainerRef, param);
    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: staffId => {
          // スタッフダイアログ内でのボタン押下時の内容反映
          console.log(staffId);
          this.staffId = Number(staffId);
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }
}
