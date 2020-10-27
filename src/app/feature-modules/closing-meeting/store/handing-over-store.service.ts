import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HandingOverHttpHandlerService, HandingOver } from '../services/handing-over-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HandingOverStoreService {

  // 現在表示している一人分のレコードのみ保持
  dynamicList = new BehaviorSubject<HandingOver>({
    id_handingOver: 0,
    id_record: 0,
    str_handingOver: '',
    str_report: '',
    str_note: '',
    id_fillOutStaff: 0,
  });
  staticList: HandingOver;

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: HandingOverHttpHandlerService,
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(recordId: number): Promise<any> {
    const list = await this.httpHandlerService.get(recordId);
    this.setDynamicList(list);
    this.setStaticList();
  }


  // 動的なリストの更新
  public setDynamicList(list: HandingOver): void {
    this.dynamicList.next(list);
  }


  // 静的なリストの更新（動的リストの現在）
  private setStaticList(): void {
    this.staticList = JSON.parse(JSON.stringify(this.dynamicList.value));
  }

  // GET 静的なリスト
  public async getStaticList(recordId: number): Promise<HandingOver> {
    // DBと通信し最新の情報を取得
    await this.getList(recordId);
    return (JSON.parse(JSON.stringify(this.staticList)));
  }

  // このデータは直接変種されないので静的なもののみ取得し、ストアで保持しない
  public async getRecordList(date: string): Promise<any> {
    const recordList = await this.httpHandlerService.getRecordList(date);
    return recordList;
  }


  public async postHandingOver(handingOverData: HandingOver): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.httpHandlerService.post(handingOverData);
      if (!newId) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(true);
      }
      // ダイアログからなので、全データ更新する
      resolve(false);
    });
  }


  public async putHandingOver(handingOverData: HandingOver): Promise<any> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.put(handingOverData);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      resolve(error);
    });
  }

}
