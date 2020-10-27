import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
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
export class AlertComponent {

  // 外部コンポーネントから院ポーロするデータ
  @Input() data: any;

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  constructor() {
    // ダイアログを開く
    this.isOpen = true;
  }

  close(message: string): void {
    // 戻るボタンを押した処理
    this.data.click(message);
    this.isOpen = false;
  }

}
