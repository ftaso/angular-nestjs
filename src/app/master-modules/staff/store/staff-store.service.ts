import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StaffHttpHandlerService, Staff } from '../services/staff-http-handler.service';
import { SessionService } from '../../../store/session.service';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffStoreService {

  // 動的リスト
  dynamicList = new BehaviorSubject<Staff[]>([]);
  // 静的リスト
  staticList = [];

  // 動的GET 値更新の度に書き換わっていくもの
  public dynamicList$ = this.dynamicList.asObservable();

  constructor(
    private httpHandlerService: StaffHttpHandlerService,
    private sessionService: SessionService,
    private authService: AuthService,
  ) { }

  // 動的・静的の両方のリストを更新する処理
  public async getList(): Promise<any> {
    const list = await this.httpHandlerService.get();
    this.setDynamicList(list);
    this.setStaticList();
  }

  // 動的なリストの更新
  public setDynamicList(list: Staff[]): void {
    this.dynamicList.next(list);
  }

  // 静的なリストの更新（動的リストの現在）
  private setStaticList(): void {
    this.staticList = JSON.parse(JSON.stringify(this.dynamicList.value));
  }

  // GET 静的なリスト
  public async getStaticList(): Promise<Staff[]> {
    // DBと通信し最新の情報を取得
    await this.getList();
    return (JSON.parse(JSON.stringify(this.staticList)));
  }

  // ダイアログでsaveボタンを押下
  public async putList(primaryKey: number, password?: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const list = [].concat(this.dynamicList.value);
      let error: boolean;
      if (password) {
        error = await this.httpHandlerService.put(list.find(a => a.id_staff === primaryKey), password);
      } else {
        error = await this.httpHandlerService.put(list.find(a => a.id_staff === primaryKey));
      }
      if (error) {
        // エラーが発生した場合は、staticListの情報に戻す。
        this.setDynamicList(this.staticList);
      }
      // 自分のIDの場合は、Session情報も書き換える必要あるため、再度ログイン処理を行う。
      if (primaryKey === this.sessionService.getUserData().staffId) {
        const myData = list.find(a => a.id_staff === primaryKey);
        this.authService.relogin(myData.str_accountName).subscribe(
          data => {
            this.sessionService.setStaffData(data);
          },
          () => {
            resolve(error);
          });
      }
      resolve(error);
    });
  }

  // 新規ダイアログでsaveボタンを押下
  public async postList(staffName: string, accountName: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      // 動的なリストの最新情報から、primaryKeyの情報のみをサービスに対して渡すイメージ
      const error: boolean = await this.httpHandlerService.post(staffName, accountName);
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
