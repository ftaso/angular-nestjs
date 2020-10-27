import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class CareReceiver {
  id_careReceiver: number;
  str_careReceiver: string;
  is_delete: number;
}

@Injectable({
  providedIn: 'root'
})
export class CareReceiverHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 利用者の一覧を取得し、ストアを更新する
  async get(): Promise<CareReceiver[]> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.CareReceiver;
      let careReceiverList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          // careReceiverList = data.mst_careReceiver;
          careReceiverList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(careReceiverList);
        });
    });
  }

  // 利用者の情報を、追加で送信する(成功:false, 失敗:true)
  async post(careReceiverName: string): Promise<boolean> {
    console.log(careReceiverName);
    return new Promise((resolve, reject) => {
      const URL = ConstURL.CareReceiver;
      const body = new HttpParams()
        .set('str_careReceiver', careReceiverName);
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

  // 利用者の情報を、追加で送信する(成功:false, 失敗:true)
  async put(careReceiverData: CareReceiver): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.CareReceiver;
      const body = new HttpParams()
        .set('id_careReceiver', String(careReceiverData.id_careReceiver))
        .set('str_careReceiver', String(careReceiverData.str_careReceiver))
        .set('is_delete', String(careReceiverData.is_delete));
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

  // 利用者の情報を、追加で送信する(成功:false, 失敗:true)
  async delete(careReceiverId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.CareReceiver + '/';
      this.baseService.delete(URL, careReceiverId, this.sessionService.getToken()).subscribe(
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
