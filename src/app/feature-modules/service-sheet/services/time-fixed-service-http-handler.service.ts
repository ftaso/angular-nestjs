import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class TimeFixedService {
  id_timeFixedService: number;
  id_record: number;
  str_service: string;
  tm_serviceStart: string;
  tm_serviceEnd: string;
  str_remark: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeFixedServiceHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 対象の利用者のデータを取得
  async get(recordId: number): Promise<TimeFixedService[]> {
    return new Promise<TimeFixedService[]>((resolve, reject) => {
      const URL = `${ConstURL.TimeFixedService}/${recordId}`;
      let list = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          list = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(list);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(timeFixedServiceData: TimeFixedService): Promise<any> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.TimeFixedService;
      const body = new HttpParams()
        .set('id_record', String(timeFixedServiceData.id_record))
        .set('str_service', String(timeFixedServiceData.str_service))
        .set('tm_serviceStart', String(timeFixedServiceData.tm_serviceStart))
        .set('tm_serviceEnd', String(timeFixedServiceData.tm_serviceEnd))
        .set('str_remark', String(timeFixedServiceData.str_remark))
        .set('id_fillOutStaff', String(timeFixedServiceData.id_fillOutStaff));
      console.log(body);
      let newId = '';
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.new_id_timeFixedService;
        },
        error => {
          reject(0);
        },
        () => {
          resolve(newId);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async put(timeFixedServiceData: TimeFixedService): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.TimeFixedService;
      const body = new HttpParams()
      .set('id_timeFixedService', String(timeFixedServiceData.id_timeFixedService))
      .set('id_record', String(timeFixedServiceData.id_record))
      .set('str_service', String(timeFixedServiceData.str_service))
      .set('tm_serviceStart', String(timeFixedServiceData.tm_serviceStart))
      .set('tm_serviceEnd', String(timeFixedServiceData.tm_serviceEnd))
      .set('str_remark', String(timeFixedServiceData.str_remark))
      .set('id_fillOutStaff', String(timeFixedServiceData.id_fillOutStaff));
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
  async delete(timeFixedServiceId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.TimeFixedService + '/';
      this.baseService.delete(URL, timeFixedServiceId, this.sessionService.getToken()).subscribe(
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
