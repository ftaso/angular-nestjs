import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CareReceiverStoreService } from './store/care-receiver-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { CareReceiverEditDialogComponent } from './care-receiver-edit-dialog/care-receiver-edit-dialog.component';
import { CareReceiverRegistDialogComponent } from './care-receiver-regist-dialog/care-receiver-regist-dialog.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';



@Component({
  selector: 'app-care-receiver',
  templateUrl: './care-receiver.component.html',
  styleUrls: ['./care-receiver.component.scss']
})
export class CareReceiverComponent implements OnInit {

  pageTitle = '利用者マスター';

  // 利用者リスト
  careReceiverList = [];

  constructor(
    private storeService: CareReceiverStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
  ) { }

  async ngOnInit(): Promise<any> {
    // 最新の情報の取得 → 静的なリストの取得
    this.careReceiverList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
  }

  // ダイアログから戻ってきた時にも初回と同様のことを行う。
  async load(): Promise<any> {
    this.careReceiverList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    console.log(this.careReceiverList);
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.careReceiverList)));
  }

  // Editダイアログを開く
  edit(careReceiverId: number): void {
    // Editダイアログに表示する内容
    const param = {
      class: 'edit-card',
      id: careReceiverId,
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(CareReceiverEditDialogComponent, this.viewContainerRef, param);
    // Editダイアログの処理に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'save':
              this.load();
              break;
            case 'remove':
              this.load();
              break;
            case 'back':
              this.back();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // Registダイアログを開く
  regist(): void {
    // Editダイアログに表示する内容
    const param = {
      class: 'regist-card',
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(CareReceiverRegistDialogComponent, this.viewContainerRef, param);
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
              this.back();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // 削除
  async remove(careReceiverId: number): Promise<any> {
    const careReceiver = this.careReceiverList.find(a => a.id_careReceiver === careReceiverId);
    // Editダイアログに表示する内容
    const param = {
      class: 'delete-alert',
      content: `${careReceiver.str_careReceiver}さんの利用者登録を解除しますがよろしいでしょうか？`
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(AlertComponent, this.viewContainerRef, param);
    // Editダイアログの処理に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: async v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'yes':
              const error = await this.storeService.deleteList(careReceiverId);
              console.log(error);
              this.load();
              break;
            case 'no':
              this.back();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }


}
