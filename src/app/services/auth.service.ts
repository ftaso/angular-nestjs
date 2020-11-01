import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, timeout } from 'rxjs/operators';
import { ConstURL } from '../class/url';
import { SessionService } from '../store/session.service';
import { BaseService } from '../services/base.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    protected sessionService: SessionService,
    protected baseService: BaseService,
    protected router: Router
  ) { }

  // AuthGurd用の関数
  // トークンがあるかと期限切れでないかを判定
  public isAuthenticated(): boolean {
    const token = this.sessionService.getToken();
    console.log(token);
    if (!token) {
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(token)) {
      this.sessionService.onNotifySharedDataChanged(true);
      return true;
    } else {
      return false;
    }
  }

  // ログイン時の処理
  public login(accountName: string, pass: string): any {
    console.log(accountName, pass);
    return this.http.post<any>(ConstURL.Login, { str_accountName: accountName, password: pass })
      .pipe(
        timeout(10000),
        map((user) => {
          // login successful if there's a jwt token in the response
          console.log(user);
          // this.router.navigate(['/attendance']);
          if (user && user.auth) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.sessionService.onNotifySharedDataChanged(true);
            this.sessionService.setStaffData(user);
            this.router.navigate(['/attendance']);
          }
          return user;
        })
      );
  }

  // ログアウトの処理
  public logout(): any {
    // Cookieに保持するデータを削除
    console.log('logouuououou')
    const URL = ConstURL.Logout;
    const body = new HttpParams();
    return this.baseService.post(URL, body, '').subscribe(
      data => {
        console.log(data);
      },
      error => {

      },
      () => {
        // Sessionストア内の情報の破棄
        this.sessionService.logout();
        this.router.navigate(['/login']);
      }
    )
  }

  // アカウント名・パスワード変更時の再発行処理
  public relogin(accountName: string): any {
    return this.http.post<any>(ConstURL.Relogin, { str_accountName: accountName })
      .pipe(
        timeout(10000),
        map((user) => {
          // login successful if there's a jwt token in the response
          console.log(user);
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.sessionService.onNotifySharedDataChanged(true);
            this.sessionService.setStaffData(user);
            console.log('relogin!');
          }
          return user;
        })
      );
  }

  async checkSession(): Promise<any> {
    return new Promise<number>((resolve) => {
      const URL = ConstURL.Session;
      const body = new HttpParams();
      let userData;
      this.baseService.post(URL, body, '').subscribe(
        data => {
          console.log(data);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          userData = data;
        },
        error => {
          console.log('エラー', error);
          resolve(error.status);
        },
        () => {
          this.sessionService.onNotifySharedDataChanged(true);
          this.sessionService.setStaffData(userData);
          resolve(200);
        }
      );
    });
  }
}
