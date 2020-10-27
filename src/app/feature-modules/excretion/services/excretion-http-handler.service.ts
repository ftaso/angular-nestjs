import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Excretion {
  id_excretion: number;
  id_record: number;
  tm_excrete: string;
  str_excretionState: string;
  str_remark: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExcretionHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 本日の出席者の食事データの取得を行う
  async get(): Promise<Excretion[]> {
    return new Promise((resolve, reject) => {
      const URL = `${ConstURL.Excretion_Today}`;
      let excretionList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          excretionList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(excretionList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(excretionData: Excretion): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Excretion;
      const body = new HttpParams()
        .set('id_record', String(excretionData.id_record))
        .set('tm_excrete', String(excretionData.tm_excrete))
        .set('str_excretionState', String(excretionData.str_excretionState))
        .set('str_remark', String(excretionData.str_remark))
        .set('id_fillOutStaff', String(excretionData.id_fillOutStaff));
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
  async put(excretionData: Excretion): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Excretion;
      // nullの可能性があるため
      const body = new HttpParams()
        .set('id_excretion', String(excretionData.id_excretion))
        .set('id_record', String(excretionData.id_record))
        .set('tm_excrete', String(excretionData.tm_excrete))
        .set('str_excretionState', String(excretionData.str_excretionState))
        .set('str_remark', String(excretionData.str_remark))
        .set('id_fillOutStaff', String(excretionData.id_fillOutStaff));
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
  async putMultiple(excretionTable: Excretion[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Excretion_Multiple;
      // nullの可能性があるため
      // let id_excretions = '';
      // let str_remarks = '';
      // console.log(excretionTable);
      // for (const excretionData of excretionTable) {
      //   id_excretions += excretionData.id_excretion + ',';
      //   if (excretionData.str_remark) {
      //     str_remarks += excretionData.str_remark + ',';
      //   } else {
      //     str_remarks += ',';
      //   }
      // }
      // id_excretions = id_excretions.substring(0, id_excretions.length - 1);
      // str_remarks = str_remarks.substring(0, str_remarks.length - 1);
      // console.log(id_excretions, str_remarks);
      // const body = new HttpParams()
      //   .set('id_excretions', String(id_excretions))
      //   .set('str_remarks', String(str_remarks));
      const body = new HttpParams()
        .set('excretionList', JSON.stringify(excretionTable));
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
  async delete(excretionId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Excretion + '/';
      this.baseService.delete(URL, excretionId, this.sessionService.getToken()).subscribe(
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

