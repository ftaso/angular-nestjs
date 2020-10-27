import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../store/session.service';
import { HeaderMenuService } from './header-menu/header-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuFlag = new EventEmitter();

  // マスターの表示・非表示を切り替えるための役割
  loginUserData = {
    staffId: 0,
    accountName: 'No Name',
    isAdministrator: 0,
    isDeveloper: 0
  };

  isOpen = false;

  // ヘッダーで表示するための情報を取得
  state = this.sessionService.loginStaffState$;

  constructor(
    protected authService: AuthService,
    protected sessionService: SessionService,
    protected router: Router,
    private viewContainerRef: ViewContainerRef,
    protected headerMenuService: HeaderMenuService,
  ) { }

  ngOnInit(): void {
  }

  // サイドナビ開閉
  toggle(): void {
    this.menuFlag.emit();
  }

  // ログアウトボタンを押した時の処理
  logout(): void {
    this.authService.logout();
    // ログアウトしたことを通知
    this.sessionService.onNotifySharedDataChanged(false);
    this.router.navigate(['/login']);
  }

  // メニュー開閉
  menuToggle(): void {
    this.isOpen = !this.isOpen;
    this.openHeaderMenu();
  }

  /**
   * ヘッダーのメニューを展開する。
   */
  openHeaderMenu(): void {
    // モーダルウィンドウに表示する内容
    const param = { class: 'header-menu' };

    // openPopUp()を呼んで、Observableを受け取る。
    const observable = this.headerMenuService.openHeaderMenu(this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => console.log(v),
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });

  }

}
