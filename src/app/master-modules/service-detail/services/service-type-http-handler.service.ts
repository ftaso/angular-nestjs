import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class ServiceType {
  id_serviceType: number;
  str_serviceType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeHttpHandlerService {
  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // カテゴリ名の情報を新規登録する(成功:false, 失敗:true)
  async post(newName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceType;
      let newId = 0;
      const body = new HttpParams()
        .set('str_serviceType', newName);
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.new_id_serviceType;
        },
        error => {
          reject(newId);
        },
        () => {
          resolve(newId);
        });
    });
  }

  // カテゴリ名の情報を追加で送信する(成功:false, 失敗:true)
  async put(serviceTypeData: ServiceType): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceType;
      const body = new HttpParams()
        .set('id_serviceType', String(serviceTypeData.id_serviceType))
        .set('str_serviceType', String(serviceTypeData.str_serviceType));
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

  // なにも結び付いていないカテゴリ名を、削除する(成功:false, 失敗:true)
  // カテゴリ
  async delete(primaryKey: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceType + '/';
      this.baseService.delete(URL, primaryKey, this.sessionService.getToken()).subscribe(
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
