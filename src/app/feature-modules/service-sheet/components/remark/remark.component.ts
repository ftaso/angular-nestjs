import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { HandingOver } from '../../services/handing-over-http-handler.service';
import { ServiceSheetStoreService } from '../../store/service-sheet-store.service';

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss'],
  animations: [openCloseAnimation]
})
export class RemarkComponent implements OnInit {

  @Input() data: any;

  isOpen = false;

  putData: HandingOver = {
    id_handingOver: 0,
    id_record: 0,
    str_handingOver: '',
    str_report: '',
    str_note: '',
    id_fillOutStaff: 0,
  };

  // 入力欄で入力する内容
  remarkType = '';
  remark = '';
  // 各入力欄で既に入力済みの備考
  remarkList = '';

  constructor(
    private storeService: ServiceSheetStoreService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    // ServiceSheetComponentからInputしたデータを入れていく作業
    this.putData.id_record = this.data.record.id_record;
    if (this.data.data.id_handingOver) {
      this.putData.id_handingOver = this.data.data.id_handingOver;
      if (this.data.data.str_handingOver) {
        this.putData.str_handingOver = this.data.data.str_handingOver;
      }
      if (this.data.data.str_note) {
        this.putData.str_note = this.data.data.str_note;
      }
      if (this.data.data.str_report) {
        this.putData.str_report = this.data.data.str_report;
      }
    }
    this.putData.id_fillOutStaff = this.data.staffId;
    switch (this.data.type) {
      case 'note':
        this.remarkType = '特記事項';
        if (this.putData.str_note) {
          this.remark = this.putData.str_note;
        }
        break;
      case 'report':
        this.remarkType = '本日の様子';
        if (this.putData.str_report) {
          this.remark = this.putData.str_report;
        }
        break;
    }
    this.remarkList = this.data.remarkList;
  }

  public async put(): Promise<any> {
    if (!this.remark) {
      return;
    }
    switch (this.data.type) {
      case 'note':
        this.putData.str_note = this.remark;
        break;
      case 'report':
        this.putData.str_report = this.remark;
        break;
    }
    // 既にデータを持っている場合はPUT, 持っていない場合はPOST
    let error: boolean;
    if (this.putData.id_handingOver) {
      error = await this.storeService.putHandingOver(this.putData);
      if (error) {
        this.isOpen = false;
        return;
      }
      this.data.click('success');
    } else {
      error = await this.storeService.postHandingOver(this.putData);
      if (error) {
        this.isOpen = false;
        return;
      }
      this.data.click('success');
    }
    this.isOpen = false;
  }

  copy(remarkData): void {
    this.remark += remarkData;
    console.log(remarkData);
  }

  close(): void {
    this.isOpen = false;
  }
}
