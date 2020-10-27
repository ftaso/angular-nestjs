import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StaffStoreService } from '../store/staff-store.service';
import { SessionService } from '../../../store/session.service';

@Component({
  selector: 'app-staff-edit-dialog',
  templateUrl: './staff-edit-dialog.component.html',
  styleUrls: ['./staff-edit-dialog.component.scss'],
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
export class StaffEditDialogComponent {


  @Input() data: any;
  pageTitle = '編集';

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  // 動的なデータを取得
  staffData = this.storeService.dynamicList$;

  // パスワードの再設定用の入力フォーム
  passwordSettingForm = false;
  // 新しいパスワード
  newPassword = '';
  // 新しいパスワードの可視不可視
  newPasswordHide = true;
  // 新しいパスワード(確認用)
  confirmPassword = '';
  // 新しいパスワード(確認用)の可視不可視
  confirmPasswordHide = true;
  // 編集ダイアログのモード
  developerMode = false;

  // 自分のスタッフID、自分のデータを削除できないように
  myId = 0;


  constructor(
    private sessionService: SessionService,
    private storeService: StaffStoreService,
  ) {
    this.developerMode = this.sessionService.isDeveloper() ? true : false;
    this.myId = this.sessionService.getUserData().staffId;
    this.isOpen = true;
  }

  // 保存
  async save(staffId: number): Promise<any> {
    // Post
    // パスワードの判定
    // 1. パスワードを再設定する。
    // 2. パスワードの一致。
    // 3. パスワードの文字列に禁止が含まれない。(半角英数字)
    // 4. 4文字以上。
    let error: boolean;
    if (this.passwordSettingForm && this.newPassword === this.confirmPassword) {
      error = await this.storeService.putList(staffId, this.newPassword);
    } else if (!this.passwordSettingForm) {
      error = await this.storeService.putList(staffId);
    }
    if (error) {

    }
    this.data.click('save');
    this.isOpen = false;
  }

  // 削除
  async remove(staffId: number): Promise<any> {
    // Delete
    const error = await this.storeService.deleteList(staffId);
    if (error) {
      // エラーが発生した場合は、
    }
    this.data.click('remove');
    this.isOpen = false;
  }

  // 閉じる
  close(): void {
    this.data.click('back');
    this.isOpen = false;
  }
}
