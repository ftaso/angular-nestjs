import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PasswordChangeHttpHandlerService } from './password-change-http-handler.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
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
export class PasswordChangeComponent {

  // header-menuから受け取るデータ
  @Input() data: any;
  // 開閉フラグ
  isOpen: boolean;

  // 今使っているパスワード
  oldPassword = '';
  // 今使っているパスワードの可視不可視
  oldPasswordHide = false;
  // 新しいパスワード
  newPassword = '';
  // 新しいパスワードの可視不可視
  newPasswordHide = true;
  // 新しいパスワード(確認用)
  confirmPassword = '';
  // 新しいパスワード(確認用)の可視不可視
  confirmPasswordHide = true;

  // errorが出たかどうか
  error = false;
  // エラーメッセージ
  errorMessage = '';


  constructor(
    private httpHandlerService: PasswordChangeHttpHandlerService,
  ) {
    this.isOpen = true;
  }

  // 閉じたときの処理
  closeModal(): void {
    this.isOpen = false;
  }

  // 送信
  async submit(): Promise<any> {
    if (this.newPassword !== this.confirmPassword) {
      this.error = true;
      this.errorMessage = `確認用のパスワードと一致していません。`;
      return;
    }
    const error = await this.httpHandlerService.put(this.oldPassword, this.newPassword);
    console.log(error);
    if (error) {
      this.error = error;
      this.errorMessage = `パスワードの設定に失敗しました。パスワードをご確認の上、もう一度設定してください。`;
      return;
    }
    // エラーがなければ、
    // 【TODO】新パスワードでのトークン再発行必要？
    this.error = error;
    this.errorMessage = '';
    this.isOpen = false;
  }

  // エラーメッセージリセット
  removeErrorMessage(e: any): void {
    this.error = false;
  }

}
