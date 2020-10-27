import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SessionService } from '../../../store/session.service';
import { AccountNameChangeHttpHandlerService } from './account-name-change-http-handler.service';

@Component({
  selector: 'app-account-name-change',
  templateUrl: './account-name-change.component.html',
  styleUrls: ['./account-name-change.component.scss'],
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
export class AccountNameChangeComponent implements OnInit {

  // header-menuから受け取るデータ
  @Input() data: any;
  // 開閉フラグ
  isOpen: boolean;

  // 設定中のスタッフデータ
  staffData = this.sessionService.getUserData();
  // 今使っているアカウント名
  oldAccountName = this.sessionService.getUserData().accountName;
  // 新しく設定するアカウント名
  newAccountName = '';

  // errorが出たかどうか
  error = false;
  // エラーメッセージ
  errorMessage = '';


  constructor(
    private sessionService: SessionService,
    private httpHandlerService: AccountNameChangeHttpHandlerService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
  }

  // 閉じたときの処理
  closeModal(): void {
    this.isOpen = false;
  }

  // 送信
  async submit(): Promise<any> {
    const error = await this.httpHandlerService.put(this.newAccountName);
    if (error) {
      this.error = error;
      this.errorMessage = `アカウント名が重複しています。`;
      return;
    }
    // エラーがなければ、セッションで保持する情報の書き換え
    this.staffData.accountName = this.newAccountName;
    this.sessionService.setStaffData(this.staffData);
    // 【TODO】新パスワードでのトークン再発行必要？
    this.error = error;
    this.errorMessage = '';
    this.isOpen = false;
  }

}
