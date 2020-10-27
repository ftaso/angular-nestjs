import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CareReceiverStoreService } from '../store/care-receiver-store.service';

@Component({
  selector: 'app-care-receiver-regist-dialog',
  templateUrl: './care-receiver-regist-dialog.component.html',
  styleUrls: ['./care-receiver-regist-dialog.component.scss'],
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
export class CareReceiverRegistDialogComponent implements OnInit {

  @Input() data: any;

  // 入力する内容
  newCareReceiver = '';

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  constructor(
    private storeService: CareReceiverStoreService
  ) {
    // ダイアログを開く
    this.isOpen = true;
  }

  ngOnInit(): void {
  }

  // 保存ボタンを押した処理
  async save(): Promise<any> {
    const error = await this.storeService.postList(this.newCareReceiver);
    if (error) {
      // エラーが発生した場合は、
    }
    this.data.click('save');
    this.isOpen = false;
  }

  // 戻るボタンを押した処理
  close(): void {
    this.data.click('close');
    this.isOpen = false;
  }

}
