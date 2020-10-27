import { Injectable } from '@angular/core';
import { ConstURL } from '../../../class/url';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { SessionService } from '../../../store/session.service';

export class ServiceTagCategory {
  id_serviceTagCategory: number;
  str_serviceTagCategory: string;
}

export class ServiceTagSubCategory {
  id_serviceTagCategory: number;
  id_serviceTagSubCategory: number;
  str_serviceTagSubCategory: string;
}

export class ServiceTag {
  id_serviceTagSCategory: number;
  str_serviceTagSCategory: string;
  id_serviceTagSubCategory: number;
  str_serviceTagSubSCategory: string;
  id_serviceTag: number;
  str_serviceTag: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceTagHttpHandlerService {

  constructor(
    private baseService: BaseService,
    private sessionService: SessionService,
  ) { }

  // スタッフの一覧を取得し、ストアを更新する
  async get(): Promise<ServiceTag[]> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTag;
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

  // カテゴリ名の情報を新規登録する(成功:false, 失敗:true)
  async postCategory(newName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagCategory;
      let newId = 0;
      const body = new HttpParams()
        .set('str_serviceTagCategory', newName);
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.id_serviceTagCategory.insertId;
        },
        error => {
          reject(newId);
        },
        () => {
          resolve(newId);
        });
    });
  }

  // サブカテゴリ名の情報を新規登録する(成功:false, 失敗:true)
  async postSubCategory(newName: string, categoryId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagSubCategory;
      let newId = 0;
      const body = new HttpParams()
        .set('str_serviceTagSubCategory', newName)
        .set('id_serviceTagCategory', String(categoryId));
      this.baseService.post(URL, body, this.sessionService.getToken()).subscribe(
        data => {
          console.log(data);
          newId = data.id_serviceTagSubCategory.insertId;
        },
        error => {
          reject(newId);
        },
        () => {
          resolve(newId);
        });
    });
  }

  // サービスタグ名の情報を新規登録する(成功:false, 失敗:true)
  async postServiceTag(newName: string, subCategoryId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTag;
      const body = new HttpParams()
        .set('str_serviceTag', newName)
        .set('id_serviceTagSubCategory', String(subCategoryId));
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

  // カテゴリ名の情報を追加で送信する(成功:false, 失敗:true)
  async putCategoryName(serviceTagCategoryData: ServiceTagCategory): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagCategory;
      const body = new HttpParams()
        .set('id_serviceTagCategory', String(serviceTagCategoryData.id_serviceTagCategory))
        .set('str_serviceTagCategory', String(serviceTagCategoryData.str_serviceTagCategory));
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

  // サブカテゴリ名の情報を追加で送信する(成功:false, 失敗:true)
  async putSubCategoryName(serviceTagSubCategoryData: ServiceTagSubCategory): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagSubCategory;
      const body = new HttpParams()
        .set('id_serviceTagSubCategory', String(serviceTagSubCategoryData.id_serviceTagSubCategory))
        .set('str_serviceTagSubCategory', String(serviceTagSubCategoryData.str_serviceTagSubCategory));
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

  // サービスタグ名の情報を追加で送信する(成功:false, 失敗:true)
  async putServiceTagName(serviceTagData: ServiceTag): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTag;
      const body = new HttpParams()
        .set('id_serviceTag', String(serviceTagData.id_serviceTag))
        .set('str_serviceTag', String(serviceTagData.str_serviceTag));
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
  async deleteCategoryName(primaryKey: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagCategory + '/';
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

  // サブカテゴリ
  async deleteSubCategoryName(primaryKey: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTagSubCategory + '/';
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

  // サービスタグ
  async deleteServiceTagName(primaryKey: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const URL = ConstURL.ServiceTag + '/';
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

