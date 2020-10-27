import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StaffStoreService } from '../store/staff-store.service';

@Component({
  selector: 'app-staff-regist-dialog',
  templateUrl: './staff-regist-dialog.component.html',
  styleUrls: ['./staff-regist-dialog.component.scss'],
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
export class StaffRegistDialogComponent {

  @Input() data: any;
  pageTitle = '登録';

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  // 動的なデータを取得
  staffData = this.storeService.dynamicList$;
  // 登録するスタッフ氏名
  newStaffName = '';
  // 登録するスタッフアカウント名
  newAccountName = '';

  constructor(
    private storeService: StaffStoreService,
  ) {
    this.isOpen = true;
  }

  // 保存
  async save(): Promise<any> {
    // Post
    if (this.newStaffName && this.newAccountName) {
      let error: boolean;
      error = await this.storeService.postList(this.newStaffName, this.newAccountName);
      if (error) {

      }
      this.data.click('save');
      this.isOpen = false;
    }
  }

  // 閉じる
  close(): void {
    this.data.click('back');
    this.isOpen = false;
  }

}
