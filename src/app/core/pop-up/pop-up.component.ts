import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
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
export class PopUpComponent {

  // 表示に使う情報の受け渡しのため(class, 内容)
  @Input() data: any;
  // ポップアップの開閉フラグ
  isOpen: boolean;

  constructor() {
    this.isOpen = true;
  }

  /**
   * ポップアップを非表示にする。
   * ウィンドウの破棄は次にポップアップのを呼び出したときに、
   * モーダルサービスで行うため、ここでは非表示にするだけ。
   */
  closePopUp(): void {
    this.isOpen = false;
  }

}
