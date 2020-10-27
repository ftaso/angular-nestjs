import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../store/session.service';
import { PopUpStateService } from '../store/pop-up-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    protected sessionService: SessionService,
    protected popUpStateService: PopUpStateService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // tokenとその有効期限を確認
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/login']);
    //   this.sessionService.onNotifySharedDataChanged(false);
    //   // 【TODO】認証情報が切れました的なポップアップ
    //   const params = {
    //     class: 'no-admin',
    //     contents: 'もう一度ログインしてください。'
    //   };
    //   this.popUpStateService.onNotifyPopUpStateChanged(params);
    // }
    return true;
  }

}
