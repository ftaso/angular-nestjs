import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceDetailHttpHandlerService, ServiceDetail } from '../services/service-detail-http-handler.service';
import { ServiceTypeHttpHandlerService, ServiceType } from '../services/service-type-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailStoreService {

  // 動的リスト
  dynamicList = new BehaviorSubject<ServiceDetail[]>([]);
  // 静的リスト
  staticList = [];

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: ServiceDetailHttpHandlerService,
    private serviceTypeHttpHandlerService: ServiceTypeHttpHandlerService
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(): Promise<any> {
    const list = await this.httpHandlerService.get();
    this.setDynamicList(list);
    this.setStaticList(JSON.parse(JSON.stringify(list)));
  }


  // 動的なリストの更新
  public setDynamicList(list: ServiceDetail[]): void {
    this.dynamicList.next(list);
  }

  // 静的なリストの更新
  private setStaticList(list: ServiceDetail[]): void {
    this.staticList = JSON.parse(JSON.stringify([].concat(list)));
  }

  // GET 静的なリスト
  public async getStaticList(): Promise<ServiceDetail[]> {
    // DBと通信し最新の情報を取得
    await this.getList();
    return (this.staticList);
  }

  // 動的なリストを静的なリストの状態に戻す。
  async back(): Promise<any> {
    this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
  }

  // POST
  // カテゴリ名の新規追加
  public async postType(newName: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.serviceTypeHttpHandlerService.post(newName);
      if (!newId) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(0);
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(newId);
    });
  }

  // サービスタグ名の新規追加
  public async postDetail(newName: string, typeId: number): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.httpHandlerService.post(newName, typeId);
      if (!newId) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(newId);
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(newId);
    });
  }

  // PUTメソッド
  // カテゴリ名の保存
  public async putType(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      const error: boolean = await this.serviceTypeHttpHandlerService.put(list.find(a => a.id_serviceType === primaryKey));
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
        reject(error);
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(error);
    });
  }


  // サービスタグ名の保存
  public async putDetail(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      const error: boolean = await this.httpHandlerService.put(list.find(a => a.id_serviceDetail === primaryKey));
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(error);
    });
  }

  // カテゴリ名でdeleteボタンを押下
  public async deleteType(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const error: boolean = await this.serviceTypeHttpHandlerService.delete(primaryKey);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(error);
    });
  }


  // サービスタグ名でdeleteボタンを押下
  public async deleteDetail(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const error: boolean = await this.httpHandlerService.delete(primaryKey);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(error);
    });
  }

}
