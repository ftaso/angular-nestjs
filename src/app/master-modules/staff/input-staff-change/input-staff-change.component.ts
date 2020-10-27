import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SessionService } from '../../../store/session.service';
import { StaffStoreService } from '../store/staff-store.service';

@Component({
  selector: 'app-input-staff-change',
  templateUrl: './input-staff-change.component.html',
  styleUrls: ['./input-staff-change.component.scss'],
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
export class InputStaffChangeComponent implements OnInit {

  // header-menuから受け取るデータ
  @Input() data: any;
  // 開閉フラグ
  isOpen: boolean;

  // 静的なスタッフリスト
  staffList = new Array();

  // 現在選択されてるスタッフID
  selectedStaffId = 0;


  constructor(
    private storeService: StaffStoreService,
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.selectedStaffId = this.data.staffId;
    this.staffDataLoad();
  }

  // スタッフのリストを取得
  async staffDataLoad(): Promise<any> {
    return new Promise(async resolve => {
      this.staffList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
      console.log(this.staffList);
      resolve();
    });
  }

  // スタッフ名を選択
  selectStaff(staffId: number): void {
    this.selectedStaffId = staffId;
    this.data.click(staffId);
    this.isOpen = false;
  }

  // 閉じたときの処理
  closeModal(): void {
    this.isOpen = false;
  }



}
