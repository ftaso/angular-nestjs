import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CareReceiverStoreService } from '../store/care-receiver-store.service';

@Component({
  selector: 'app-care-receiver-edit-dialog',
  templateUrl: './care-receiver-edit-dialog.component.html',
  styleUrls: ['./care-receiver-edit-dialog.component.scss'],
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
export class CareReceiverEditDialogComponent implements OnInit {

  @Input() data: any;

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  // 動的なデータを取得
  careReceiverData = this.storeService.dynamicList$;

  constructor(
    private storeService: CareReceiverStoreService
  ) {
    // ダイアログを開く
    this.isOpen = true;
  }

  ngOnInit(): void {
  }

  // 保存ボタンを押した処理
  async save(careReceiverId: number): Promise<any> {
    const error = await this.storeService.putList(careReceiverId);
    if (error) {
      // エラーが発生した場合は、
    }
    this.data.click('save');
    this.isOpen = false;
  }

  // 削除ボタンを押した処理
  async remove(careReceiverId: number): Promise<any> {
    const error = await this.storeService.deleteList(careReceiverId);
    if (error) {
      // エラーが発生した場合は、
    }
    this.data.click('remove');
    this.isOpen = false;
  }

  // 戻るボタンを押した処理
  close(): void {
    this.data.click('back');
    this.isOpen = false;
  }
}
