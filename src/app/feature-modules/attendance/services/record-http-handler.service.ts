import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Record {
  id_record: number;
  dt_record: string;
  id_careReceiver: number;
  tm_start: string;
  tm_end: string;
  is_attendance: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecordHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 本日の出席者の食事データの取得を行う
  async get(date: string): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      const URL = `${ConstURL.Record_Date}/${date}`;
      let recordList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          recordList = data ? data : [];
        },
        error => {
          reject(error);
        },
        () => {
          resolve(recordList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(date: string, careReceiverId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Record;
      const body = new HttpParams()
        .set('dt_record', String(date))
        .set('id_careReceiver', String(careReceiverId))
        .set('tm_start', String('09:00'))
        .set('tm_end', String('17:00'))
        .set('is_attendance', String(1));
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
  async put(recordData: Record): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Record;
      const body = new HttpParams()
        .set('id_record', String(recordData.id_record))
        .set('dt_record', String(recordData.dt_record))
        .set('id_careReceiver', String(recordData.id_careReceiver))
        .set('tm_start', String(recordData.tm_start))
        .set('tm_end', String(recordData.tm_end))
        .set('is_attendance', String(recordData.is_attendance));
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
  async delete(recordId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Record + '/';
      this.baseService.delete(URL, recordId, this.sessionService.getToken()).subscribe(
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

