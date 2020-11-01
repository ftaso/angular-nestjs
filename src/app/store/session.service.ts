import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoginStaffData } from '../class/staff';
import { ConstURL } from '../class/url';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // ログイン情報のローカルストレージ内への保存キー
  protected MY_STAFF_ID_KEY = 'my_staff_id_key';
  protected MY_ACCOUNT_NAME_KEY = 'my_account_name_key';
  protected MY_IS_ADMINISTRATOR_KEY = 'my_is_administrator_key';
  protected MY_IS_DEVELOPER_KEY = 'my_is_developer_key';
  protected MY_TOKEN_KEY = 'my_token_key';

  // ログインデータの変更を通知するためのオブジェクト
  private isLoginState = new Subject<boolean>();

  // ログイン情報を適宜更新して保持する通知するオブジェクト
  private loginStaffState = new BehaviorSubject<LoginStaffData>({
    staffId: 0,
    accountName: '',
    staffName: '',
    isAdministrator: 0,
    isDeveloper: 0,
  });

  // ログイン情報そのもの
  private sessionLoginStaffStateState = {
    staffId: 0,
    accountName: '',
    staffName: '',
    isAdministrator: 0,
    isDeveloper: 0,
  };

  // Subscribe するためのプロパティ(Component間での共有のため)
  // ログイン情報の更新時渡すboolean
  public isLoginState$ = this.isLoginState.asObservable();
  // ログイン情報そのもの
  public loginStaffState$ = this.loginStaffState.asObservable();

  constructor(
  ) { }

  // ログイン状態(isLoginState)の更新イベントを発火させる処理
  public onNotifySharedDataChanged(isLogin: boolean): void {
    this.isLoginState.next(isLogin);
  }

  // ログイン情報を外部Componentから更新する際に行う処理
  public setStaffData(loginStaffData: LoginStaffData): void {
    // SubscribeしているComponentへの通知
    this.onNotifyStaffDataChanged(loginStaffData);
    // ローカルストレージの更新
    this.setStaffDataToLocalStorage(loginStaffData);
    // 内部のデータを変更
    this.sessionLoginStaffStateState = loginStaffData;
  }

  // 以下、このサービス内で保持するデータを呼び出されたときに返す処理
  public getUserData(): LoginStaffData {
    return this.sessionLoginStaffStateState;
  }

  // tokenを返す
  public getToken(): string {
    return '';
  }

  // Guardで使用、管理者権限を持つかどうか
  public isAuth(): number {
    return this.sessionLoginStaffStateState.staffId;
  }

  // Guardで使用、管理者権限を持つかどうか
  public isAdmin(): boolean {
    return this.sessionLoginStaffStateState.isAdministrator === 1 ? true : false;
  }

  // Guardで使用、管理者権限を持つかどうか
  public isDeveloper(): boolean {
    return this.sessionLoginStaffStateState.isDeveloper === 1 ? true : false;
  }

  // ログアウト
  public logout(): void {
    // 初期値に戻す
    this.sessionLoginStaffStateState = {
      staffId: 0,
      accountName: '',
      staffName: '',
      isAdministrator: 0,
      isDeveloper: 0,
    };
    this.onNotifySharedDataChanged(false);
    this.onNotifyStaffDataChanged(this.sessionLoginStaffStateState);
  }

  // 以下、sessionService内でのみ処理

  // ログイン情報(loginStaffState)の更新イベントを発火させる処理
  protected onNotifyStaffDataChanged(staffData: LoginStaffData): void {
    this.loginStaffState.next(staffData);
  }

  // ログイン情報をローカルストレージへ保存する処理
  protected setStaffDataToLocalStorage(loginStaffData: LoginStaffData): void {
    // localStorage.setItem(this.MY_STAFF_ID_KEY, JSON.stringify({ id_staff: loginStaffData.staffId }));
    // localStorage.setItem(this.MY_ACCOUNT_NAME_KEY, JSON.stringify({ str_accountName: loginStaffData.accountName }));
    // localStorage.setItem(this.MY_IS_ADMINISTRATOR_KEY, JSON.stringify({ is_administrator: loginStaffData.isAdministrator }));
    // localStorage.setItem(this.MY_IS_DEVELOPER_KEY, JSON.stringify({ is_developer: loginStaffData.isDeveloper }));
    // localStorage.setItem(this.MY_TOKEN_KEY, JSON.stringify({ token: loginStaffData.token }));
  }


}
