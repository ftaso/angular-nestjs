import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecordHttpHandlerService, Record } from '../services/record-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RecordStoreService {

  // 本日分のみ保持
  dynamicList = new BehaviorSubject<Record[]>([]);
  staticList = [];

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: RecordHttpHandlerService,
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(date): Promise<any> {
    const list = await this.httpHandlerService.get(date);
    this.setDynamicList(list);
    this.setStaticList();
  }


  // 動的なリストの更新
  public setDynamicList(list: Record[]): void {
    this.dynamicList.next(list);
  }

  // 静的なリストの更新（動的リストの現在）
  private setStaticList(): void {
    this.staticList = JSON.parse(JSON.stringify(this.dynamicList.value));
  }

  // GET 静的なリスト
  public async getStaticList(date: string): Promise<Record[]> {
    // DBと通信し最新の情報を取得
    await this.getList(date);
    return (JSON.parse(JSON.stringify(this.staticList)));
  }

  public post(date: string, careReceiverId: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.post(date, careReceiverId);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      await this.getList(date);
      resolve(error);
    });
  }

  public put(recordData: Record): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.put(recordData);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      await this.getList(recordData.dt_record);
      resolve(error);
    });
  }

  // ダイアログでdeleteボタンを押下
  public async delete(primaryKey: number): Promise<boolean> {
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
