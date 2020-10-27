import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';


export class ServiceTagMap {
  id_serviceTag_map: number;
  id_record: number;
  id_serviceTag: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceTagMapHttpHandlerService {


  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(recordId: number, serviceTagId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagMap;
      const body = new HttpParams()
        .set('id_record', String(recordId))
        .set('id_serviceTag', String(serviceTagId));
      console.log(body);
      let newId = '';
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.new_id_serviceTag_map;
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
  async delete(serviceTagMapId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagMap + '/';
      this.baseService.delete(URL, serviceTagMapId, this.sessionService.getToken()).subscribe(
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
