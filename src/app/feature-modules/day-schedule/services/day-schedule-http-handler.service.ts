import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class RegularSchedule {
  id_regularSchedule: number;
  num_day: number;
  id_careReceiver: number;
  tm_start: string;
  tm_end: string;
}

@Injectable({
  providedIn: 'root'
})
export class DayScheduleHttpHandlerService {


  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 全てのレギュラースケジュールを取得
  async get(): Promise<RegularSchedule[]> {
    return new Promise((resolve, reject) => {
      const URL = `${ConstURL.RegularSchedule}`;
      let regularScheduleList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          regularScheduleList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(regularScheduleList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(regularScheduleData: RegularSchedule): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.RegularSchedule;
      const body = new HttpParams()
        .set('num_day', String(regularScheduleData.num_day))
        .set('id_careReceiver', String(regularScheduleData.id_careReceiver))
        .set('tm_start', String(regularScheduleData.tm_start))
        .set('tm_end', String(regularScheduleData.tm_end));
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
  async put(regularScheduleData: RegularSchedule): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.RegularSchedule;
      const body = new HttpParams()
        .set('num_day', String(regularScheduleData.num_day))
        .set('id_careReceiver', String(regularScheduleData.id_careReceiver))
        .set('tm_start', String(regularScheduleData.tm_start))
        .set('tm_end', String(regularScheduleData.tm_end));
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
  async delete(regularScheduleId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.RegularSchedule + '/';
      this.baseService.delete(URL, regularScheduleId, this.sessionService.getToken()).subscribe(
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
