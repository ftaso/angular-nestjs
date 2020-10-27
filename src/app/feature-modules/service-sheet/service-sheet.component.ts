import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServiceDetailStoreService } from '../../master-modules/service-detail/store/service-detail-store.service';
import { ServiceSheetStoreService } from './store/service-sheet-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { SessionService } from '../../store/session.service';
import * as moment from 'moment';
import { TimeTableService } from '../../services/time-table.service';
import { TimeFixedServiceComponent } from './components/time-fixed-service/time-fixed-service.component';
import { RemarkComponent } from './components/remark/remark.component';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';
import { InputStaffChangeComponent } from '../../master-modules/staff/input-staff-change/input-staff-change.component';

@Component({
  selector: 'app-service-sheet',
  templateUrl: './service-sheet.component.html',
  styleUrls: ['./service-sheet.component.scss']
})
export class ServiceSheetComponent implements OnInit {

  pageTitle = 'サービス提供記録';

  // 入力スタッフ
  staffList = new Array();
  staffId: number;

  timeInterval = 20;

  // 静的なスタッフリスト
  selectedDateRecordList = new Array();
  // 静的なサービスタグのリスト
  serviceDetailList = new Array();
  // 静的なレコード
  recordData: any;
  record = {
    meal: [],
    vital: [],
    excretion: [],
    hydration: [],
    timeFixedService: [],
    service: [],
    serviceTag: [],
    handingOver: []
  };
  // 備考欄リスト
  remarkList = [];

  // タイムテーブル
  timeTable = new Array();
  // サービス記録のタイムテーブル
  serviceTimeTable = new Array();
  // 1日の水分摂取量
  totalHydration = 0;

  // 検索対象の日
  selectedDate = moment();
  selectedRecord: any;

  constructor(
    private storeService: ServiceSheetStoreService,
    private serviceDetailStoreService: ServiceDetailStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
    private sessionService: SessionService,
    private timeTableService: TimeTableService,
    private staffStoreService: StaffStoreService
  ) { }

  async ngOnInit(): Promise<any> {
    this.selectedDateRecordList = await this.recordDataLoad(this.selectedDate.format('YYYY-MM-DD'));
    this.serviceDetailList = await this.serviceDetailStoreService.getStaticList();
    // 配列を作る
    this.timeTable = this.timeTableService.createTimeTable(this.timeInterval);
    // 入力スタッフ用
    await this.staffDataLoad();
    this.staffId = this.sessionService.getUserData().staffId;
  }

  async dataLoad(type): Promise<any> {
    switch (type) {
      case 'service':
        this.recordData = JSON.parse(JSON.stringify(
          await this.storeService.getStaticList(this.selectedRecord.id_record, 'service')));
        this.editRemarkList();
        this.createServiceSheetTimeTable();
        break;
      case 'handingOver':
        this.recordData = JSON.parse(JSON.stringify(
          await this.storeService.getStaticList(this.selectedRecord.id_record, 'handingOver')));
        this.createServiceSheetTimeTable();
        break;
    }
  }

  // スタッフのリストを取得
  async staffDataLoad(): Promise<any> {
    return new Promise(async resolve => {
      this.staffList = JSON.parse(JSON.stringify(await this.staffStoreService.getStaticList()));
      console.log(this.staffList);
      resolve();
    });
  }

  // 指定された日付の利用者の情報を取得
  async recordDataLoad(date: string): Promise<any> {
    return new Promise(async resolve => {
      const selectedDateRecordList = JSON.parse(JSON.stringify(await this.storeService.getRecordList(date)));
      resolve(selectedDateRecordList);
    });
  }

  // 選択された日付が変わったとき、新しくその日のレコードを取り直す
  async onDateChange(event): Promise<any> {
    console.log(event);
    this.selectedDateRecordList = await this.recordDataLoad(this.selectedDate.format('YYYY-MM-DD'));
  }

  // 検索するサービス提供記録を呼び出す
  async find(event): Promise<any> {
    this.selectedRecord = event.value;
    this.recordData = JSON.parse(JSON.stringify(await this.storeService.getStaticList(this.selectedRecord.id_record)));
    this.editRemarkList();
    this.createServiceSheetTimeTable();
  }

  // タイムテーブルを作成
  private createServiceSheetTimeTable(): void {
    this.serviceTimeTable = new Array();
    this.totalHydration = 0;
    for (let i = 0; i < this.timeTable.length; i++) {
      const serviceSheetTimeTableElement = Object();
      serviceSheetTimeTableElement.time = this.timeTable[i].time;
      serviceSheetTimeTableElement.display = true;
      serviceSheetTimeTableElement.rowSpan = 1;
      // 排泄は、その時間のマークの個数
      serviceSheetTimeTableElement.excretion = [];
      for (const record of this.recordData.excretions) {
        if (this.timeTable[i].time <= record.tm_excrete && record.tm_excrete < this.timeTable[i + 1].time) {
          serviceSheetTimeTableElement.excretion = serviceSheetTimeTableElement.excretion.concat(record.str_excretionState.split(','));
        }
      }
      // 水分補給は、1hでの摂取量
      serviceSheetTimeTableElement.hydration = 0;
      for (const record of this.recordData.hydrations) {
        if (this.timeTable[i].time <= record.tm_hydrate && record.tm_hydrate < this.timeTable[i + 1].time) {
          if (record.is_fixed === 1) {
            this.totalHydration += Number(record.num_hydrate);
            serviceSheetTimeTableElement.hydration += Number(record.num_hydrate);
          }
        }
      }
      serviceSheetTimeTableElement.service = [];
      for (const record of this.recordData.services) {
        if (i % Math.round(60 / this.timeInterval) === 0) {
          for (let j = 0; j < Math.round(60 / this.timeInterval); j++) {
            if (this.timeTable[i + j].time === record.tm_start) {
              serviceSheetTimeTableElement.service.push(JSON.parse(JSON.stringify(record)));
            }
          }
          serviceSheetTimeTableElement.service.sort((a, b) => {
            if (moment(a.tm_start, 'HH:mm:ss').isAfter(moment(b.tm_start, 'HH:mm:ss'))) { return 1; }
            if (moment(a.tm_start, 'HH:mm:ss').isBefore(moment(b.tm_start, 'HH:mm:ss'))) { return -1; }
            if (moment(a.tm_end, 'HH:mm:ss').isAfter(moment(b.tm_end, 'HH:mm:ss'))) { return 1; }
            if (moment(a.tm_end, 'HH:mm:ss').isBefore(moment(b.tm_end, 'HH:mm:ss'))) { return -1; }
          });
        }
      }
      this.serviceTimeTable.push(JSON.parse(JSON.stringify(serviceSheetTimeTableElement)));
    }
    // タイムテーブル完成後、サービス終了時間によってrowSpan&displayを切り替える
  }


  // 時間固定のサービスの記録のためのダイアログ
  openTimeFixedServiceDialog(timeData, timeFixedServiceData?): void {
    // ダイアログに表示する内容
    const param = {
      class: 'time-fixed-service-dialog',
      staffId: this.staffId,
      record: this.selectedRecord,
      time: timeData,
      timeInterval: this.timeInterval,
      data: timeFixedServiceData,
      serviceDetailList: this.serviceDetailList
    };
    // openPopUp()を呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(TimeFixedServiceComponent, this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          console.log(v);
          switch (v) {
            case 'success':
              this.dataLoad('service');
              break;
            case 'error':
              break;
            default:
              this.dataLoad('service');
              this.serviceDetailList = JSON.parse(v);
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

  // 各INPUTの備考欄での情報を抽出する
  editRemarkList(): void {
    this.remarkList = new Array();
    const recordObjeckKeys = Object.keys(this.recordData);
    console.log(recordObjeckKeys);
    for (const key of recordObjeckKeys) {
      if (Array.isArray(this.recordData[`${key}`])) {
        for (const data of this.recordData[`${key}`]) {
          if (data.str_remark) {
            let timeKey = '';
            let timeValue = '';
            let remark = '';
            timeKey = Object.keys(data).find(a => a.includes('tm_'));
            if (timeKey) {
              timeValue = data[`${timeKey}`];
            }
            let typeName = '';
            if (key === 'services') {
              typeName = data['serviceType'].str_serviceType;
            } else {
              typeName = key;
            }
            this.remarkList.push({
              type: `${typeName}`,
              time: timeValue,
              remark: data.str_remark.split(',')
            });
          }
        }
      }
    }
    console.log(this.remarkList);
  }

  // 備考関係の入力を行うダイアログを開く
  openRemarkDialog(remarkType: string): void {
    let handingOverData: any;
    if (this.recordData.handingOvers.length) {
      handingOverData = this.recordData.handingOvers[0];
    } else {
      handingOverData = {};
    }
    console.log(this.selectedRecord);
    const param = {
      class: 'remark-dialog',
      staffId: this.staffId,
      record: this.selectedRecord,
      type: remarkType,
      data: handingOverData,
      remarkList: this.remarkList
    };
    console.log(this.remarkList);
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(RemarkComponent, this.viewContainerRef, param);
    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'success':
              this.dataLoad('handingOver');
              break;
            case 'error':
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }
}

