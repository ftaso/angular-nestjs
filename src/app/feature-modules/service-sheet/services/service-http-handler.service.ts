import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Service {
  id_service: number;
  id_record: number;
  id_serviceType: number;
  serviceType: any;
  serviceDetailMaps: any[];
  tm_start: string;
  tm_end: string;
  str_remark: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 対象の利用者のデータを取得
  async get(recordId: number): Promise<Service[]> {
    return new Promise<Service[]>((resolve, reject) => {
      const URL = `${ConstURL.Service}/${recordId}`;
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
  async post(serviceData: Service): Promise<any> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Service;
      const body = new HttpParams()
        .set('id_record', String(serviceData.id_record))
        .set('id_serviceType', String(serviceData.id_serviceType))
        .set('tm_start', String(serviceData.tm_start))
        .set('tm_end', String(serviceData.tm_end))
        .set('str_remark', String(serviceData.str_remark))
        .set('id_fillOutStaff', String(serviceData.id_fillOutStaff));
      console.log(body);
      let newId = '';
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.new_id_service;
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
  async put(serviceData: Service): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Service;
      const body = new HttpParams()
      .set('id_service', String(serviceData.id_service))
      .set('id_record', String(serviceData.id_record))
      .set('id_serviceType', String(serviceData.id_serviceType))
      .set('tm_start', String(serviceData.tm_start))
      .set('tm_end', String(serviceData.tm_end))
      .set('str_remark', String(serviceData.str_remark))
      .set('id_fillOutStaff', String(serviceData.id_fillOutStaff));
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
  async delete(serviceId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Service + '/';
      this.baseService.delete(URL, serviceId, this.sessionService.getToken()).subscribe(
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
