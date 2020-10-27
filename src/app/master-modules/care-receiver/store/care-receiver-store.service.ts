import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CareReceiverHttpHandlerService, CareReceiver } from '../services/care-receiver-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CareReceiverStoreService {

  // 動的リスト
  dynamicList = new BehaviorSubject<CareReceiver[]>([]);
  // 静的リスト
  staticList = [];

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: CareReceiverHttpHandlerService
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(): Promise<any> {
    const list = await this.httpHandlerService.get();
    this.setDynamicList(list);
    console.log(list);
    this.setStaticList();
  }


  // 動的なリストの更新
  public setDynamicList(list: CareReceiver[]): void {
    this.dynamicList.next(list);
  }

  // 静的なリストの更新（動的リストの現在）
  private setStaticList(): void {
    this.staticList = JSON.parse(JSON.stringify(this.dynamicList.value));
  }

  // GET 静的なリスト
  public async getStaticList(): Promise<CareReceiver[]> {
    // DBと通信し最新の情報を取得
    await this.getList();
    return (JSON.parse(JSON.stringify(this.staticList)));
  }

  // ダイアログでsaveボタンを押下
  public async putList(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      const error: boolean = await this.httpHandlerService.put(list.find(a => a.id_careReceiver === primaryKey));
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(this.staticList);
      }
      resolve(error);
    });
  }

  // 新規ダイアログでsaveボタンを押下
  public async postList(careReceiverName: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.post(careReceiverName);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(this.staticList);
      }
      resolve(error);
    });
  }

  // ダイアログでdeleteボタンを押下
  public async deleteList(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const error: boolean = await this.httpHandlerService.delete(primaryKey);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(this.staticList);
      }
      resolve(error);
    });
  }
}
