import { Component, ViewChild, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { slideInAnimation } from './animation';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { HeaderComponent } from './core/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './store/session.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild(SideNavComponent) protected sideNavComponent: SideNavComponent;
  @ViewChild(HeaderComponent) protected headerComponent: HeaderComponent;
  title = 'ikoinoie26';

  isBrowser: boolean;

  /**
   * CommonService の変数の参照を取得するプロパティ
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  isLogin = false;

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof BillingStudentComponent
   */
  private subscription: Subscription;

  // コンストラクタ. ServiceSample1Component のインスタンスを生成する
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ライフサイクルメソッド｡コンポーネントの初期化で使用する
  async ngOnInit(): Promise<any> {
    console.log('platform', this.platformId);
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.sessionService.isLoginState$.subscribe(
      data => {
        this.isLogin = data;
      }
    );
    console.log('まだ、ストア内にユーザーデータを保持していません。');
    // もし認証情報を保持していないのであれば、再度検索
    // session情報の確認を行い、session情報があれば、userDataをsessionServiceに格納
    const error = await this.authService.checkSession();
    if (!this.sessionService.isAuth()) {
      switch (error) {
        case 401: {
          console.log('認証情報がないため、ログイン画面へ遷移します。');
          this.router.navigate(['/login']);
          break;
        }
        case 403: {
          console.log('Server側でAPI実行時のレスポンス');
          break;
        }
      }
    }
  }

  // コンポーネント終了時の処理
  ngOnDestroy(): void {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  // サイドナビ開閉
  sideNavToggle(): void {
    this.sideNavComponent.toggle();
  }

  // router-outletに情報を渡す
  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
