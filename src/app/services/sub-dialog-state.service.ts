import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubDialogStateService {

  /**
   * ポップアップの作成元。
   * ポップアップを二度目以降にに呼び出したときに、
   * 先に作成したポップアップをクリアするために変数で保存しておく。
   */
  viewContainerRef: ViewContainerRef;

  /**
   * RxJSのサブジェクト。
   * ポップアップの呼び出し元にObservablewo返し、
   * ポップアップが閉じられたときは、それを通知(publish)する。
   */
  subject: Subject<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }


  /**
   * ポップアップを開くメソッド。
   * ポップアップを表示するコンポーネントから呼び出す。
   * @param viewContainerRef 呼び出し元で生成し、渡す必要がある。
   * @param param 生成するポップアップに表示するデータ
   * @param data 表示するデータ
   */
  public openDialog(componentTemplate: any, viewContainerRef: ViewContainerRef, param: any): any {
    // ポップアップを呼び出すたびにサブジェクトを新しく生成する。
    this.subject = new Subject();

    // ポップアップを二度目以降にに呼び出したときに、
    // 先に作成したポップアップを破棄する。
    // しないと、ポップアップのDIV要素が永遠と増えていく。
    if (this.viewContainerRef) { this.viewContainerRef.clear(); }

    // viewContainerRefをクラスプロパティに保存
    this.viewContainerRef = viewContainerRef;

    // ポップアップを作成し、呼び出し元画面に追加
    const componentRef = this.createComponent(componentTemplate, viewContainerRef);

    // 作成したポップアップにデータを渡す。
    componentRef.instance.data = param;
    param.click = this.retPublish();

    // 呼び出し元にObservableを返す。
    return this.subject.asObservable();
  }

  // テンプレートからコンポーネントを作成し、viewContainerRefに追加する。
  private createComponent(componentTemplate: any, viewContainerRef: ViewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentTemplate);
    return viewContainerRef.createComponent(componentFactory);

  }

  /*
  * Observableに値を通知(publish)するメソッドを返すメソッド。
  * モーダル画面から呼び出す。
  */
  public retPublish(): any {
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

