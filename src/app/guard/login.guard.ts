import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../store/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected sessionService: SessionService
  ) { }

  canLoad(route: Route): boolean {
    // tokenが有効なら出欠管理へ飛ばす
    if (this.authService.checkLogin()) {
      this.sessionService.onNotifySharedDataChanged(true);
      this.router.navigate(['/attendance']);
    }
    return true;
  }
}
