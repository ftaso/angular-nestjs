import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpStateService {

  private popUpState = new Subject<object>();
  /**
   * Subscribe するためのプロパティ
   * `- コンポーネント間で共有するためのプロパティ
   *
   * @memberof PopUpService
   */
  public popUpState$ = this.popUpState.asObservable();


  /**
   * ログインデータの更新イベント
   *
   * @param {object} popUpPrams 更新データ
   * @memberof PopUpService
   */
  public onNotifyPopUpStateChanged(popUpPrams: object): void {
    this.popUpState.next(popUpPrams);
  }

  constructor() { }
}
