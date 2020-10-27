import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';
import { HttpParams } from '@angular/common/http';


export class HandingOver {
  id_handingOver: number;
  id_record: number;
  str_handingOver: string;
  str_report: string;
  str_note: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class HandingOverHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 対象の利用者のデータを取得
  async get(recordId: number): Promise<HandingOver> {
    return new Promise<HandingOver>((resolve, reject) => {
      const URL = `${ConstURL.HandingOver}/${recordId}`;
      let handingOver = new HandingOver();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          handingOver = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(handingOver);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(handingOverData: HandingOver): Promise<any> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.HandingOver;
      const body = new HttpParams()
        .set('id_record', String(handingOverData.id_record))
        .set('id_record', String(handingOverData.id_record))
        .set('str_handingOver', String(handingOverData.str_handingOver))
        .set('str_report', String(handingOverData.str_report))
        .set('str_note', String(handingOverData.str_note))
        .set('id_fillOutStaff', String(handingOverData.id_fillOutStaff));
      console.log(body);
      let newId = '';
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.new_id_handingOver;
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
  async put(handingOverData: HandingOver): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.HandingOver;
      const body = new HttpParams()
        .set('id_handingOver', String(handingOverData.id_handingOver))
        .set('id_record', String(handingOverData.id_record))
        .set('id_record', String(handingOverData.id_record))
        .set('str_handingOver', String(handingOverData.str_handingOver))
        .set('str_report', String(handingOverData.str_report))
        .set('str_note', String(handingOverData.str_note))
        .set('id_fillOutStaff', String(handingOverData.id_fillOutStaff));
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
  async delete(handingOverId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.HandingOver + '/';
      this.baseService.delete(URL, handingOverId, this.sessionService.getToken()).subscribe(
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

  async getRecordList(date: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const URL = `${ConstURL.Record_Date}/${date}`;
      let recordList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          recordList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(recordList);
        });
    });
  }

}
