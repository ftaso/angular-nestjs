import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Vital {
  id_vital: number;
  id_record: number;
  tm_check: string;
  num_bodyTemperature: number;
  num_maximalBloodPressure: number;
  num_minimalBloodPressure: number;
  num_pulse: number;
  num_SpO2: number;
  str_remark: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class VitalHttpHandlerService {


  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 本日の出席者の食事データの取得を行う
  async get(): Promise<Vital[]> {
    return new Promise((resolve, reject) => {
      const URL = `${ConstURL.Vital_Today}`;
      let vitalList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          vitalList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(vitalList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(vitalData: Vital): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Vital;
      const body = new HttpParams()
        .set('id_record', String(vitalData.id_record))
        .set('tm_check', vitalData.tm_check ? String(vitalData.tm_check) : '')
        .set('num_bodyTemperature', vitalData.num_bodyTemperature ? String(vitalData.num_bodyTemperature) : '')
        .set('num_maximalBloodPressure', vitalData.num_maximalBloodPressure ? String(vitalData.num_maximalBloodPressure) : '')
        .set('num_minimalBloodPressure', vitalData.num_minimalBloodPressure ? String(vitalData.num_minimalBloodPressure) : '')
        .set('num_pulse', vitalData.num_pulse ? String(vitalData.num_pulse) : '')
        .set('num_SpO2', vitalData.num_SpO2 ? String(vitalData.num_SpO2) : '')
        .set('str_remark', vitalData.str_remark ? String(vitalData.str_remark) : '')
        .set('id_fillOutStaff', String(vitalData.id_fillOutStaff));
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
  async put(vitalData: Vital): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Vital;
      // nullの可能性があるため
      const body = new HttpParams()
        .set('id_vital', vitalData.id_vital ? String(vitalData.id_vital) : '')
        .set('id_record', String(vitalData.id_record))
        .set('tm_check', vitalData.tm_check ? String(vitalData.tm_check) : '')
        .set('num_bodyTemperature', vitalData.num_bodyTemperature ? String(vitalData.num_bodyTemperature) : '')
        .set('num_maximalBloodPressure', vitalData.num_maximalBloodPressure ? String(vitalData.num_maximalBloodPressure) : '')
        .set('num_minimalBloodPressure', vitalData.num_minimalBloodPressure ? String(vitalData.num_minimalBloodPressure) : '')
        .set('num_pulse', vitalData.num_pulse ? String(vitalData.num_pulse) : '')
        .set('num_SpO2', vitalData.num_SpO2 ? String(vitalData.num_SpO2) : '')
        .set('str_remark', vitalData.str_remark ? String(vitalData.str_remark) : '')
        .set('id_fillOutStaff', String(vitalData.id_fillOutStaff));
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
  async delete(vitalId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Vital + '/';
      this.baseService.delete(URL, vitalId, this.sessionService.getToken()).subscribe(
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
  async noDataPost(recordId: number, staffId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Vital;
      const body = new HttpParams()
        .set('id_record', String(recordId))
        .set('tm_check', '')
        .set('num_bodyTemperature', '')
        .set('num_maximalBloodPressure', '')
        .set('num_minimalBloodPressure', '')
        .set('num_pulse', '')
        .set('num_SpO2', '')
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
}
