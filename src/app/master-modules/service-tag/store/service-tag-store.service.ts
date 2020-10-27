import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceTagHttpHandlerService, ServiceTag } from '../services/service-tag-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTagStoreService {

  // 動的リスト
  dynamicList = new BehaviorSubject<ServiceTag[]>([]);
  // 静的リスト
  staticList = [];

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: ServiceTagHttpHandlerService
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(): Promise<any> {
    const list = await this.httpHandlerService.get();
    console.log(list)
    this.setDynamicList(list);
    this.setStaticList(JSON.parse(JSON.stringify(list)));
  }


  // 動的なリストの更新
  public setDynamicList(list: ServiceTag[]): void {
    this.dynamicList.next(list);
  }

  // 静的なリストの更新
  private setStaticList(list: ServiceTag[]): void {
    this.staticList = JSON.parse(JSON.stringify([].concat(list)));
  }

  // GET 静的なリスト
  public async getStaticList(): Promise<ServiceTag[]> {
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
  public async postCategory(newName: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.httpHandlerService.postCategory(newName);
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

  // サブカテゴリ名の新規追加
  public async postSubCategory(newName: string, categoryId: number): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const newId: number = await this.httpHandlerService.postSubCategory(newName, categoryId);
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
  public async postServiceTag(newName: string, subCategoryId: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.postServiceTag(newName, subCategoryId);
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

  // PUTメソッド
  // カテゴリ名の保存
  public async putCategoryName(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      const error: boolean = await this.httpHandlerService.putCategoryName(list.find(a => a.id_serviceTagCategory === primaryKey));
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

  // サブカテゴリ名の保存
  public async putSubCategoryName(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      const error: boolean = await this.httpHandlerService.putSubCategoryName(list.find(a => a.id_serviceTagSubCategory === primaryKey));
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(error);
    });
  }

  // サービスタグ名の保存
  public async putServiceTagName(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      const error: boolean = await this.httpHandlerService.putServiceTagName(list.find(a => a.id_serviceTag === primaryKey));
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
  public async deleteCategoryName(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const error: boolean = await this.httpHandlerService.deleteCategoryName(primaryKey);
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(JSON.parse(JSON.stringify(this.staticList)));
      }
      // ダイアログからなので、全データ更新する
      await this.getList();
      resolve(error);
    });
  }

  // サブカテゴリ名でdeleteボタンを押下
  public async deleteSubCategoryName(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const error: boolean = await this.httpHandlerService.deleteSubCategoryName(primaryKey);
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
  public async deleteServiceTagName(primaryKey: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const error: boolean = await this.httpHandlerService.deleteServiceTagName(primaryKey);
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

