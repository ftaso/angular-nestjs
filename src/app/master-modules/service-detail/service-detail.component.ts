import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServiceDetailStoreService } from './store/service-detail-store.service';
import { ServiceDetailEditDialogComponent } from './service-detail-edit-dialog/service-detail-edit-dialog.component';
import { DialogStateService } from '../../services/dialog-state.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  pageTitle = 'サービスマスター';

  // サービスタグリスト
  serviceTagList = [];
  // 動的なサービスタグリスト
  serviceTagData = this.storeService.dynamicList$;

  constructor(
    private storeService: ServiceDetailStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService
  ) { }

  async ngOnInit(): Promise<any> {
    // 最新の情報の取得 → 静的なリストの取得
    this.load();
  }

  // ダイアログから戻ってきた時にも初回と同様のことを行う。
  async load(): Promise<any> {
    // 最新の情報の取得 → 静的なリストの取得
    this.serviceTagList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    // is_delete = 1 の中しかないものに関しては通す必要がある、
    // サービスタグリストからis_delete=0、 is_delete is NULLのみをリストに格納しなおす
    this.serviceTagList.sort((a, b) => {
      if (a.id_serviceType > b.id_serviceType) { return 1; }
      if (a.id_serviceType < b.id_serviceType) { return -1; }
      if (a.id_serviceDetail > b.id_serviceDetail) { return 1; }
      if (a.id_serviceDetail < b.id_serviceDetail) { return -1; }
      // 削除されたものが上になるように
    });
    console.log(this.serviceTagList)
  }

  // Editダイアログを開く
  edit(): void {
    console.log('aaa');
    // Editダイアログに表示する内容
    const param = {
      class: 'edit-card',
    };
    // Editダイアログを呼んで、Observableを受け取る。
    // どのコンポーネントを表示するかの情報を渡す
    const observable = this.dialogStateService.openDialog(ServiceDetailEditDialogComponent, this.viewContainerRef, param);
    // Editダイアログの処理に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'save':
              this.load();
              break;
            case 'back':
              this.load();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }


}
