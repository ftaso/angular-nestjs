import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
// axios を require してインスタンスを生成する

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // 派生クラスのコンストラクタで定義する
  protected _model = {};
  protected _model_name = '';

  constructor(protected _http: HttpClient) { }

  headerBuilders(token: string): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + token);
    return headers;
  }

  get(url: string, token: string): Observable<any> {
    const headers = this.headerBuilders(token);
    return this._http.get(url, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  post(url: string, model: any, token: any): Observable<any> {
    console.log('post: ' + model);
    const headers = this.headerBuilders(token);
    return this._http.post(url, model, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  // PUTメソッド使用時、headerに情報を含まないように変更
  put(url: string, model: any, token: any): Observable<any> {
    console.log('put: ' + model);
    const headers = this.headerBuilders(token);
    return this._http.put(url, model, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  putString(url: string, model: any, org_id: string, token: any): Observable<any> {
    console.log('put: ' + model);
    const headers = this.headerBuilders(token);
    return this._http.put(url + org_id, model, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  putNoId(url: string, model: any, token: any): Observable<any> {
    console.log('put: ' + model);
    const headers = this.headerBuilders(token);
    return this._http.put(url, model, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  putStringNoModel(url: string, org_id: string, token: any): Observable<any> {
    const headers = this.headerBuilders(token);
    return this._http.put(url + org_id, null, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  putNoModel(url: string, org_id: number, token: any): Observable<any> {
    const headers = this.headerBuilders(token);
    return this._http.put(url + org_id, null, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  delete(url: string, del_id: number, token: any): Observable<any> {
    console.log('delete: ' + del_id);
    const headers = this.headerBuilders(token);
    return this._http.delete(url + del_id, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  deleteNoId(url: string, model: any, token: any): Observable<any> {
    console.log('delete');
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token),
      body: model
    };
    return this._http.delete(url, httpOptions).pipe(
      timeout(100000),
      map((x) => x),
      catchError((error) => throwError(error))
    );
  }

  deleteString(url: string, del_id: string, token: any): Observable<any> {
    console.log('delete: ' + del_id);
    const headers = this.headerBuilders(token);
    return this._http.delete(url + del_id, { headers }).pipe(
      timeout(100000),
      map((x) => x),
      catchError((err) => throwError(err))
    );
  }

  load(): Observable<any[]> {
    console.log('called load function');
    return of(this._model[this._model_name]);
  }
}
