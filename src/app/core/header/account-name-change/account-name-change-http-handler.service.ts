import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

@Injectable({
  providedIn: 'platform'
})
export class AccountNameChangeHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async put(accountName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let err: boolean;
      const URL = ConstURL.Staff_AccountName + '/' + this.sessionService.getUserData().staffId;
      const body = new HttpParams()
        .set('str_accountName', String(accountName));
      this.baseService.put(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data.Error);
          err = data.Error;
        },
        error => {
          reject(true);
        },
        () => {
          resolve(err);
        });
    });
  }
}

