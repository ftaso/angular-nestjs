import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs/operators';
import { ConstURL } from '../class/url';
import { SessionService } from '../store/session.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    protected sessionServie: SessionService,
    protected router: Router
  ) { }

  // AuthGurd用の関数
  // トークンがあるかと期限切れでないかを判定
  public isAuthenticated(): boolean {
    const token = this.sessionServie.getToken();
    console.log(token);
    if (!token) {
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(token)) {
      this.sessionServie.onNotifySharedDataChanged(true);
      return true;
    } else {
      return false;
    }
  }

  // LoginGurd用の関数
  // トークンがあるかと期限切れでないかを判定
  public checkLogin(): boolean {
    const token = this.sessionServie.getToken();
    if (!token) {
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(token)) {
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
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.sessionServie.onNotifySharedDataChanged(true);
            this.sessionServie.setStaffData(user);
            this.router.navigate(['/attendance']);
          }
          return user;
        })
      );
  }

  // ログアウトの処理
  public logout(): void {
    // sessionServiceに保持するデータを削除
    this.sessionServie.onNotifySharedDataChanged(false);
    this.sessionServie.logout();
    this.router.navigate(['/login']);
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
            this.sessionServie.onNotifySharedDataChanged(true);
            this.sessionServie.setStaffData(user);
            console.log('relogin!');
          }
          return user;
        })
      );
  }
}
