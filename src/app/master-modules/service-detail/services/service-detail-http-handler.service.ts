import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';


export class ServiceDetail {
  id_serviceType: number;
  id_serviceDetail: number;
  str_serviceDetail: string;
}


@Injectable({
  providedIn: 'root'
})
export class ServiceDetailHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // スタッフの一覧を取得し、ストアを更新する
  async get(): Promise<ServiceDetail[]> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceDetail;
      let serviceTagList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          serviceTagList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(serviceTagList);
        });
    });
  }


  // サブカテゴリ名の情報を新規登録する(成功:false, 失敗:true)
  async post(newName: string, typeId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceDetail;
      const body = new HttpParams()
        .set('str_serviceDetail', newName)
        .set('id_serviceType', String(typeId));
      let newId = 0;
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.new_id_serviceDetail;
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
  async put(serviceDetailData: ServiceDetail): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceDetail;
      const body = new HttpParams()
        .set('id_serviceDetail', String(serviceDetailData.id_serviceDetail))
        .set('str_serviceDetail', String(serviceDetailData.str_serviceDetail));
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
      const URL = ConstURL.ServiceDetail + '/';
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
