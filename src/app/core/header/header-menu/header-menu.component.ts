import { Component, Input, ViewContainerRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { DialogStateService } from '../../../services/dialog-state.service';
import { AccountNameChangeComponent } from '../account-name-change/account-name-change.component';
import { PasswordChangeComponent } from '../password-change/password-change.component';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        display: 'none',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.05s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
      transition('* => void', [
        animate('0.05s')
      ]),
      transition('void => *', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class HeaderMenuComponent {

  // header-menu.serviceから受け取るデータ
  @Input() data: any;
  // 開閉フラグ
  isOpen: boolean;
  // 選択状態のフラグ(アカウント名)
  selectedAccountName = false;
  // 選択状態のフラグ(パスワード)
  selectedPassword = false;

  constructor(
    protected authService: AuthService,
    private dialogStateService: DialogStateService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.isOpen = true;
  }

  // アカウント名変更
  changeAccountName(): void {
    this.selectedAccountName = true;
    this.selectedPassword = false;
    const params = {
      class: 'dialog',
    };
    this.dialogStateService.openDialog(AccountNameChangeComponent, this.viewContainerRef, params);
  }

  // パスワード変更
  changePassword(): void {
    this.selectedPassword = true;
    this.selectedAccountName = false;
    const params = {
      class: 'dialog',
    };
    this.dialogStateService.openDialog(PasswordChangeComponent, this.viewContainerRef, params);
  }

  // ログアウト
  logout(): void {
    this.authService.logout();
  }

  /**
   * モーダルウィンドウを非表示にする。
   * ウィンドウの破棄は次にモーダルウィンドウのを呼び出したときに、
   * モーダルサービスで行うため、ここでは非表示にするだけ。
   */
  closeModal(): void {
    this.isOpen = false;
  }
}
