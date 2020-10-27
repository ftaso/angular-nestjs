import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { SessionService } from '../store/session.service';
import { PopUpStateService } from '../store/pop-up-state.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperGuard implements CanLoad {

  constructor(
    protected sessionService: SessionService,
    protected router: Router,
    protected popUpStateService: PopUpStateService,
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    // tokenとその有効期限を確認
    console.log('isDeveloper', this.sessionService.isDeveloper());
    if (!this.sessionService.isDeveloper()) {
      this.router.navigate(['/attendance']);
      const params = {
        class: 'pop-up',
        contents: '開発者権限がないため、閲覧できません。'
      };
      this.popUpStateService.onNotifyPopUpStateChanged(params);
      return false;
    }
    return true;
  }
}
