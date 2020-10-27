import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { slideInAnimation } from './animation';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { HeaderComponent } from './core/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './store/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(SideNavComponent) protected sideNavComponent: SideNavComponent;
  @ViewChild(HeaderComponent) protected headerComponent: HeaderComponent;
  title = 'ikoinoie26';

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
    private sessionService: SessionService,
  ) {
  }

  // ライフサイクルメソッド｡コンポーネントの初期化で使用する
  ngOnInit(): void {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.sessionService.isLoginState$.subscribe(
      data => {
        this.isLogin = data;
      }
    );
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
