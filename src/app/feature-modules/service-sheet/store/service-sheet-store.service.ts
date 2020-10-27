import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceSheetHttpHandlerService, ServiceSheet } from '../services/service-sheet-http-handler.service';
import { ServiceTagMapHttpHandlerService, ServiceTagMap } from '../services/service-tag-map-http-handler.service';
import { HandingOverHttpHandlerService, HandingOver } from '../services/handing-over-http-handler.service';
import { ServiceHttpHandlerService, Service } from '../services/service-http-handler.service';
import { ServiceDetailMapHttpHandlerService, ServiceDetailMap } from '../services/service-detail-map-http-handler.service';
import { ServiceDetailStoreService } from 'src/app/master-modules/service-detail/store/service-detail-store.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceSheetStoreService {

  // 現在表示している一人分のレコードのみ保持
  dynamicList = new BehaviorSubject<ServiceSheet>({
    dt_record: '',
    id_careReceiver: 0,
    id_record: 0,
    is_attendance: 0,
    tm_end: '',
    tm_start: '',
    meals: [],
    vitals: [],
    excretions: [],
    hydrations: [],
    services: [],
    serviceTags: [],
    handingOvers: [],
  });
  staticList: ServiceSheet;

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: ServiceSheetHttpHandlerService,
    private serviceTagMapHttpHandlerService: ServiceTagMapHttpHandlerService,
    private serviceHttpHandlerService: ServiceHttpHandlerService,
    private handingOverHttpHandlerService: HandingOverHttpHandlerService,
    private serviceDetailMapHttpHandlerService: ServiceDetailMapHttpHandlerService
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(recordId: number, type?: string): Promise<any> {
    console.log(type)
    if (!type) {
      const list = await this.httpHandlerService.get(recordId);
      this.setDynamicList(list);
      this.setStaticList();
      return;
    }
    switch (type) {
      case 'service':
        const serviceList = await this.serviceHttpHandlerService.get(recordId);
        this.dynamicList.value.services = [].concat(serviceList);
        this.setDynamicList(JSON.parse(JSON.stringify(this.dynamicList.value)));
        this.setStaticList();
        break;
      case 'handingOver':
        const handingOverList = await this.handingOverHttpHandlerService.get(recordId);
        this.dynamicList.value.handingOvers = [].concat(handingOverList);
        this.setDynamicList(JSON.parse(JSON.stringify(this.dynamicList.value)));
        this.setStaticList();
        break;
    }
  }


  // 動的なリストの更新
  public setDynamicList(list: ServiceSheet): void {
    this.dynamicList.next(list);
  }


  // 静的なリストの更新（動的リストの現在）
  private setStaticList(): void {
    this.staticList = JSON.parse(JSON.stringify(this.dynamicList.value));
  }

  // GET 静的なリスト
  public async getStaticList(recordId: number, type?: string): Promise<ServiceSheet> {
    // DBと通信し最新の情報を取得
    if (!type) {
      await this.getList(recordId);
    } else {
      await this.getList(recordId, type);
    }
    return (JSON.parse(JSON.stringify(this.staticList)));
  }

  // このデータは直接変種されないので静的なもののみ取得し、ストアで保持しない
  public async getRecordList(date: string): Promise<any> {
    const recordList = await this.httpHandlerService.getRecordList(date);
    return recordList;
  }

  // 以下、サービスタグマップ関連
  public async deleteServiceTagMap(serviceTagMapId: number): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error = await this.serviceTagMapHttpHandlerService.delete(serviceTagMapId);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      resolve(error);
    });
  }

  public async postService(serviceData: Service): Promise<any> {
    return new Promise<number>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.serviceHttpHandlerService.post(serviceData);
      if (!newId) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(newId);
      }
      // ダイアログからなので、全データ更新する
      resolve(newId);
    });
  }

  public async postHandingOver(handingOverData: HandingOver): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.handingOverHttpHandlerService.post(handingOverData);
      if (!newId) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(true);
      }
      // ダイアログからなので、全データ更新する
      resolve(false);
    });
  }

  public async putService(serviceData: Service): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.serviceHttpHandlerService.put(serviceData);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      resolve(error);
    });
  }

  public async putHandingOver(handingOverData: HandingOver): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.handingOverHttpHandlerService.put(handingOverData);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      resolve(error);
    });
  }

  public async deleteService(serviceId: number): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error = await this.serviceHttpHandlerService.delete(serviceId);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      resolve(error);
    });
  }

  public async postServiceDetailMap(serivceDetailList: number[], serviceId: number): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error = await this.serviceDetailMapHttpHandlerService.postMultiple(serivceDetailList, serviceId);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(true);
      }
      // ダイアログからなので、全データ更新する
      resolve(false);
    });
  }
}


