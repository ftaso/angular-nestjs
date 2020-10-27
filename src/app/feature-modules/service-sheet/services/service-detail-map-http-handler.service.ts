import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class ServiceDetailMap {
  id_serviceDetail_map: number;
  id_serviceDetail: number;
  id_record: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailMapHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // // 対象の利用者のデータを取得
  // async get(recordId: number): Promise<Service[]> {
  //   return new Promise<Service[]>((resolve, reject) => {
  //     const URL = `${ConstURL.Service}/${recordId}`;
  //     let list = new Array();
  //     this.baseService.get(URL, this.sessionService.getToken()).subscribe(
  //       data => {
  //         console.log(URL, data);
  //         list = data;
  //       },
  //       error => {
  //         reject(error);
  //       },
  //       () => {
  //         resolve(list);
  //       });
  //   });
  // }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async postMultiple(serviceDetails: number[], serviceId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceDetailMap;
      const serviceDetailData = [];
      for (const serviceDetail of serviceDetails) {
        serviceDetailData.push({
          id_service: serviceId,
          id_serviceDetail: serviceDetail
        });
      }
      const body = new HttpParams()
        .set('id_service', String(serviceId))
        .set('serviceDetails', JSON.stringify(serviceDetailData));
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

}
