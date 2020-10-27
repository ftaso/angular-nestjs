import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderMenuComponent } from './header-menu.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderMenuService {

  /**
   * モーダルウィンドウの作成元。
   * モーダルウィンドウを二度目以降にに呼び出したときに、
   * 先に作成したモーダルウィンドウをクリアするために変数で保存しておく。 
   */
  viewContainerRef: ViewContainerRef;

  /**
   * RxJSのサブジェクト。
   * モーダルウィンドウの呼び出し元にObservablewo返し、
   * モーダルウィンドウが閉じられたときは、それを通知(publish)する。
   */
  subject: Subject<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  /**
   * モーダルウィンドウを開くメソッド。
   * モーダルウィンドウを表示するコンポーネントから呼び出す。
   * @param viewContainerRef 呼び出し元で生成し、渡す必要がある。
   * @param param 生成するモーダルウィンドウに表示するデータ
   */
  public openHeaderMenu(viewContainerRef: ViewContainerRef, param: any): any {
    // モーダルウィンドウを呼び出すたびにサブジェクトを新しく生成する。
    this.subject = new Subject();

    // モーダルウィンドウを二度目以降にに呼び出したときに、
    // 先に作成したモーダルウィンドウを破棄する。
    // しないと、モーダルウィンドウのDIV要素が永遠と増えていく。
    if (this.viewContainerRef) { this.viewContainerRef.clear(); }

    // viewContainerRefをクラスプロパティに保存
    this.viewContainerRef = viewContainerRef;

    // モーダルウィンドウを作成し、呼び出し元画面に追加
    const componentRef = this.createComponent(HeaderMenuComponent, viewContainerRef);

    // 作成したモーダルウィンドウにデータを渡す。
    componentRef.instance.data = param;
    param.click = this.retPublish();

    // 呼び出し元にObservableを返す。
    return this.subject.asObservable();
  }

  /**
   * テンプレートからコンポーネントを作成し、viewContainerRefに追加する。
   * @param componentTemplate a
   * @param viewContainerRef a
   */
  private createComponent(componentTemplate: any, viewContainerRef: ViewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentTemplate);
    return viewContainerRef.createComponent(componentFactory);

  }

  /**
   * Observableに値を通知(publish)するメソッドを返すメソッド。
   * モーダル画面から呼び出す。
   */
  private retPublish(): any {
    const subject = this.subject;
    return (retVal: string) => {
      try {
        subject.next(retVal);
        subject.complete();
      } catch (err) {
        subject.error(err);
      }
    };
  }

}
