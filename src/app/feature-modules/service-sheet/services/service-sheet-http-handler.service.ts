import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class ServiceSheet {
  dt_record: string;
  id_careReceiver: number;
  id_record: number;
  is_attendance: number;
  tm_end: string;
  tm_start: string;
  meals: any[];
  vitals: any[];
  excretions: any[];
  hydrations: any[];
  services: any[];
  serviceTags: any[];
  handingOvers: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ServiceSheetHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 対象の利用者のデータを取得
  async get(recordId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const URL = `${ConstURL.SherviceSheet}/${recordId}`;
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

  async getRecordList(date: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const URL = `${ConstURL.Record_Date}/${date}`;
      let recordList = new ServiceSheet();
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
