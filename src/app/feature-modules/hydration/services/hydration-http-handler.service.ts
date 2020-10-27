import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Hydration {
  id_hydration: number;
  id_record: number;
  tm_hydrate: string;
  num_hydrate: number;
  is_fixed: number;
  str_remark: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class HydrationHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 本日の出席者の食事データの取得を行う
  async get(): Promise<Hydration[]> {
    return new Promise((resolve, reject) => {
      const URL = `${ConstURL.Hydration_Today}`;
      let hydrationList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          hydrationList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(hydrationList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(hydrationData: Hydration): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Hydration;
      const body = new HttpParams()
        .set('id_record', String(hydrationData.id_record))
        .set('tm_hydrate', String(hydrationData.tm_hydrate))
        .set('num_hydrate', String(hydrationData.num_hydrate))
        .set('is_fixed', '1')
        .set('str_remark', String(hydrationData.str_remark))
        .set('id_fillOutStaff', String(hydrationData.id_fillOutStaff));
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
  async postDistribute(recordId: number, time: string, numHydrate: number, staffId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Hydration;
      const body = new HttpParams()
        .set('id_record', String(recordId))
        .set('tm_hydrate', String(time))
        .set('num_hydrate', String(numHydrate))
        .set('is_fixed', String(0))
        .set('str_remark', '')
        .set('id_fillOutStaff', String(staffId));
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
  async put(hydrationData: Hydration): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Hydration;
      // nullの可能性があるため
      const body = new HttpParams()
        .set('id_hydration', String(hydrationData.id_hydration))
        .set('id_record', String(hydrationData.id_record))
        .set('tm_hydrate', String(hydrationData.tm_hydrate))
        .set('num_hydrate', String(hydrationData.num_hydrate))
        .set('is_fixed', String(hydrationData.is_fixed))
        .set('str_remark', String(hydrationData.str_remark))
        .set('id_fillOutStaff', String(hydrationData.id_fillOutStaff));
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
  async delete(hydrationId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Hydration + '/';
      this.baseService.delete(URL, hydrationId, this.sessionService.getToken()).subscribe(
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


