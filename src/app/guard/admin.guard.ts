import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { SessionService } from '../store/session.service';
import { PopUpStateService } from '../store/pop-up-state.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    protected sessionService: SessionService,
    protected router: Router,
    protected popUpStateService: PopUpStateService
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    // tokenとその有効期限を確認
    console.log('isAdmin', this.sessionService.isAdmin());
    if (!this.sessionService.isAdmin()) {
      this.router.navigate(['/attendance']);
      // 【TODO】認証情報が切れました的なポップアップ
      const params = {
        class: 'no-admin',
        contents: '管理者権限がないため、閲覧できません。'
      };
      this.popUpStateService.onNotifyPopUpStateChanged(params);
      return false;
    }
    return true;
  }
}
