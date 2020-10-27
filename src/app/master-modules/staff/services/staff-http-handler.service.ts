import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Staff {
  id_staff: number;
  str_accountName: string;
  str_staffName: string;
  is_administrator: number;
  is_developer: number;
  is_delete: number;
}

@Injectable({
  providedIn: 'root'
})
export class StaffHttpHandlerService {


  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // スタッフの一覧を取得し、ストアを更新する
  async get(): Promise<Staff[]> {
    return new Promise<any>((resolve, reject) => {
      const URL = ConstURL.Staff;
      console.log(URL)
      let staffList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          staffList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(staffList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(staffName: string, accountName: string): Promise<boolean> {
    console.log(staffName);
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Staff;
      const body = new HttpParams()
        .set('str_staffName', staffName)
        .set('str_accountName', accountName)
        .set('password', '0000')
        .set('is_administrator', '0')
        .set('is_developer', '0')
        .set('is_delete', '0');
      console.log(body);
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
        },
        error => {
          reject(true);
        },
        () => {
          resolve(false);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async put(staffData: Staff, password?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let newPassword = '';
      if (password) {
        newPassword = password;
      }
      const URL = ConstURL.Staff + '/' + staffData.id_staff;
      const body = new HttpParams()
        .set('id_staff', String(staffData.id_staff))
        .set('str_staffName', String(staffData.str_staffName))
        .set('str_accountName', String(staffData.str_accountName))
        .set('password', newPassword)
        .set('is_administrator', String(staffData.is_administrator))
        .set('is_developer', String(staffData.is_developer))
        .set('is_delete', String(staffData.is_delete));
      this.baseService.put(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
        },
        error => {
          reject(true);
        },
        () => {
          resolve(false);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async delete(staffId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Staff + '/';
      this.baseService.delete(URL, staffId, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
        },
        error => {
          reject(true);
        },
        () => {
          resolve(false);
        });
    });
  }
}

