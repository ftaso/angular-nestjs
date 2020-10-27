import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffStoreService } from './store/staff-store.service';
import { SessionService } from '../../store/session.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { StaffEditDialogComponent } from './staff-edit-dialog/staff-edit-dialog.component';
import { StaffRegistDialogComponent } from './staff-regist-dialog/staff-regist-dialog.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  pageTitle = 'スタッフマスター';
  // スタッフリスト
  staffList = new Array();
  // 開発者モード
  developerMode = false;

  constructor(
    private storeService: StaffStoreService,
    private viewContainerRef: ViewContainerRef,
    private sessionService: SessionService,
    private daialogStateService: DialogStateService,
  ) { }

  async ngOnInit(): Promise<any> {
    // 最新の情報の取得 → 静的なリストの取得
    this.load();
  }

  // ダイアログから戻ってきた時にも初回と同様のことを行う。
  async load(): Promise<any> {
    this.developerMode = this.sessionService.isDeveloper() ? true : false;
    this.staffList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.staffList)));
  }

  // Editダイアログを開く
  edit(staffId: number): void {
    // Editダイアログに表示する内容
    const param = {
      class: 'edit-card',
      id: staffId
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.daialogStateService.openDialog(StaffEditDialogComponent, this.viewContainerRef, param);
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

  // 削除
  remove(staffId: number): void {

  }

  // 新規登録
  regist(): void {
    // Registダイアログに表示する内容
    const param = {
      class: 'regist-card',
    };
    // Registダイアログを呼んで、Observableを受け取る。
    const observable = this.daialogStateService.openDialog(StaffRegistDialogComponent, this.viewContainerRef, param);
    // Registダイアログの処理に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Registダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'save':
              this.load();
              break;
            case 'back':
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

}
