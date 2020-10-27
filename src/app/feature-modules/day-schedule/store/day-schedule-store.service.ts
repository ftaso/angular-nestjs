import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DayScheduleHttpHandlerService, RegularSchedule } from '../services/day-schedule-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DayScheduleStoreService {

  // 本日分のみ保持
  dynamicList = new BehaviorSubject<RegularSchedule[]>([]);
  staticList = [];

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: DayScheduleHttpHandlerService,
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(): Promise<any> {
    const list = await this.httpHandlerService.get();
    this.setDynamicList(list);
    this.setStaticList();
  }


  // 動的なリストの更新
  public setDynamicList(list: RegularSchedule[]): void {
    this.dynamicList.next(list);
  }

  // 静的なリストの更新（動的リストの現在）
  private setStaticList(): void {
    this.staticList = JSON.parse(JSON.stringify(this.dynamicList.value));
  }

  // GET 静的なリスト
  public async getStaticList(): Promise<RegularSchedule[]> {
    // DBと通信し最新の情報を取得
    await this.getList();
    return (JSON.parse(JSON.stringify(this.staticList)));
  }

  public post(regularScheduleData: RegularSchedule): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.post(regularScheduleData);
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

  public put(regularScheduleData: RegularSchedule): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.put(regularScheduleData);
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
