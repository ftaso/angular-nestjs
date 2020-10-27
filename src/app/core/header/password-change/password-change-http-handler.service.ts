import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

@Injectable({
  providedIn: 'platform'
})
export class PasswordChangeHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async put(oldPassword: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let err: boolean;
      const URL = ConstURL.Staff_Password + '/' + this.sessionService.getUserData().staffId;
      const body = new HttpParams()
        .set('password', String(password))
        .set('oldPassword', String(oldPassword));
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
