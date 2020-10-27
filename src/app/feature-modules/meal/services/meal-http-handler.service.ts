import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class Meal {
  id_meal: number;
  id_record: number;
  str_mealType: string;
  num_mainProportion: number;
  num_subProportion: number;
  str_remark: string;
  id_fillOutStaff: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealHttpHandlerService {


  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // 本日の出席者の食事データの取得を行う
  async get(): Promise<Meal[]> {
    return new Promise((resolve, reject) => {
      const URL = `${ConstURL.Meal_Today}`;
      let mealList = new Array();
      this.baseService.get(URL, this.sessionService.getToken()).subscribe(
        data => {
          console.log(URL, data);
          mealList = data;
        },
        error => {
          reject(error);
        },
        () => {
          resolve(mealList);
        });
    });
  }

  // スタッフの情報を、追加で送信する(成功:false, 失敗:true)
  async post(mealData: Meal): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Meal;
      const body = new HttpParams()
        .set('id_record', String(mealData.id_record))
        .set('str_mealType', mealData.str_mealType)
        .set('num_mainProportion', String(mealData.num_mainProportion))
        .set('num_subProportion', String(mealData.num_subProportion))
        .set('str_remark', mealData.str_remark)
        .set('id_fillOutStaff', String(mealData.id_fillOutStaff));
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
  async put(mealData: Meal): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Meal;
      const body = new HttpParams()
        .set('id_meal', String(mealData.id_meal))
        .set('id_record', String(mealData.id_record))
        .set('str_mealType', mealData.str_mealType)
        .set('num_mainProportion', String(mealData.num_mainProportion))
        .set('num_subProportion', String(mealData.num_subProportion))
        .set('str_remark', mealData.str_remark)
        .set('id_fillOutStaff', String(mealData.id_fillOutStaff));
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
  async delete(mealId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Meal + '/';
      this.baseService.delete(URL, mealId, this.sessionService.getToken()).subscribe(
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
  async postSnack(recordId: number, staffId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.Meal;
      const body = new HttpParams()
        .set('id_record', String(recordId))
        .set('str_mealType', '間食')
        .set('num_mainProportion', '10')
        .set('num_subProportion', '0')
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
