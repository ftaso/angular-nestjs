
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServiceTagStoreService } from '../../master-modules/service-tag/store/service-tag-store.service';
import { ServiceSheetStoreService } from '../service-sheet/store/service-sheet-store.service';
import { TimeTableService } from '../../services/time-table.service';
import * as moment from 'moment';

@Component({
  selector: 'app-print-service-sheet',
  templateUrl: './print-service-sheet.component.html',
  styleUrls: ['./print-service-sheet.component.scss']
})
export class PrintServiceSheetComponent implements OnInit {

  pageTitle = 'サービス提供記録表（印刷）';

  // 静的なスタッフリスト
  selectedDateRecordList = new Array();
  // 静的なサービスタグのリスト
  serviceTagList = new Array();
  // 静的なレコード
  recordData: any;
  record = {
    meal: [],
    vital: [],
    excretion: [],
    hydration: [],
    timeFixedService: [],
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
    private serviceTagStoreService: ServiceTagStoreService,
    private timeTableService: TimeTableService,
  ) { }

  async ngOnInit(): Promise<any> {
    this.selectedDateRecordList = await this.recordDataLoad(this.selectedDate.format('YYYY-MM-DD'));
    const serviceTagList = await this.serviceTagStoreService.getStaticList();
    this.serviceTagList = this.editServiceTagList(serviceTagList);
    // 配列を作る
    this.timeTable = this.timeTableService.createTimeTable(60);
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

  async preview(record): Promise<any> {
    this.selectedRecord = record;
    this.recordData = JSON.parse(JSON.stringify(await this.storeService.getStaticList(this.selectedRecord.id_record)));
    this.createServiceSheetTimeTable();
    this.checkServiceTagList();
  }

  // 検索するサービス提供記録を呼び出す
  async find(event): Promise<any> {
    this.selectedRecord = event.value;
    this.recordData = JSON.parse(JSON.stringify(await this.storeService.getStaticList(this.selectedRecord.id_record)));
    this.createServiceSheetTimeTable();
    this.checkServiceTagList();
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
          this.totalHydration += Number(record.num_hydrate);
          serviceSheetTimeTableElement.hydration += Number(record.num_hydrate);
        }
      }

      for (const record of this.recordData.timeFixedServices) {
        if (this.timeTable[i].time <= record.tm_serviceStart && record.tm_serviceStart < this.timeTable[i + 1].time) {
          serviceSheetTimeTableElement.timeFixedService = record;
          break;
        }
      }
      this.serviceTimeTable.push(JSON.parse(JSON.stringify(serviceSheetTimeTableElement)));
    }
    // タイムテーブル完成後、サービス終了時間によってrowSpan&displayを切り替える
    for (let i = 0; i < this.serviceTimeTable.length; i++) {
      if (this.serviceTimeTable[i].display) {
        if (this.serviceTimeTable[i].timeFixedService) {
          for (let j = i + 1; j < this.serviceTimeTable.length; j++) {
            if (this.serviceTimeTable[i].timeFixedService.tm_serviceEnd > this.serviceTimeTable[j].time) {
              this.serviceTimeTable[i].rowSpan++;
              this.serviceTimeTable[j].display = false;
            }
          }
        }
      }
    }
  }

  // サービスタグリスト
  private checkServiceTagList(): void {
    if (this.recordData.serviceTagMaps.length > 0) {
      const serviceTagIds = [];
      for (const existedServiceTag of this.recordData.serviceTagMaps) {
        serviceTagIds.push(existedServiceTag.id_serviceTag);
      }
      for (const serviceTagCategory of this.serviceTagList) {
        for (const serviceTagSubCategory of serviceTagCategory.serviceTagSubCategorys) {
          for (const serviceTag of serviceTagSubCategory.serviceTags) {
            if (serviceTagIds.includes(serviceTag.id_serviceTag)) {
              serviceTag.check = true;
            }
          }
        }
      }
    }
  }

  private editServiceTagList(serviceTagList): any[] {
    // サービスタグリストからis_delete=0、 is_delete is NULLのみをリストに格納しなおす
    for (const serviceTagCategory of serviceTagList) {
      for (const serviceTagSubCategory of serviceTagCategory.serviceTagSubCategorys) {
        for (const serviceTag of serviceTagSubCategory.serviceTags) {
          serviceTag.check = false;
        }
      }
    }
    console.log(serviceTagList);
    return serviceTagList;
  }

  print() {
    setTimeout(() => {
      window.print();
    }, 200);
    window.onafterprint = (event) => {
      console.log('After print');
    };

  }
}
