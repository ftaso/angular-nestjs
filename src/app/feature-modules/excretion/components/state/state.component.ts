import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Excretion } from '../../services/excretion-http-handler.service';
import { ExcretionStoreService } from '../../store/excretion-store.service';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
  animations: [openCloseAnimation]
})
export class StateComponent implements OnInit {

  // 親コンポーネントであるExcretionComponentからのINPUT
  @Input() data: any;

  // 排泄の種類
  stateList = ['〇', '●', '△', '▲', '×'];
  // 備考欄への入力
  remark = '';

  // ダイアログの開閉フラグ
  isOpen = false;

  // モード(簡易入力版<=>編集)
  mode: 'input' | 'edit' = 'input';

  putData: Excretion = {
    id_excretion: 0,
    id_record: 0,
    tm_excrete: '',
    str_excretionState: '',
    str_remark: '',
    id_fillOutStaff: 0,
  };

  putDataList: Excretion[] = [];

  // その時刻データを細分化し、テーブルに格納
  table = new Array();

  selectedRow = 0;

  constructor(
    private storeService: ExcretionStoreService,
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    // 初期値の代入
    console.log(this.data)
    if (!this.data.excretion.length) {
      // まだレコードが作られていない
      this.putData.id_record = this.data.record.id_record;
      this.putData.id_fillOutStaff = this.data.staffId;
      this.putData.tm_excrete = this.data.time;
    } else {
      // レコードがある場合
      this.putData.id_record = this.data.record.id_record;
      this.putData.id_fillOutStaff = this.data.staffId;
      this.putData.tm_excrete = this.data.time;
      this.putDataList = JSON.parse(JSON.stringify(this.data.excretion));
      // Concatされた情報を表示用に分解
      this.remark = this.putDataList[0].str_remark;
    }
    console.log(this.putData);
  }

  // 入力モードの切替
  change(mode: 'input' | 'edit'): void {
    this.mode = mode;
  }

  // 別の行を選択した際
  selectRow(i: number): void {
    this.selectedRow = i;
    this.remark = this.putDataList[i].str_remark;
  }

  // INPUT側から排泄の種類を入力時
  public async post(state: string): Promise<any> {
    if (!state) {
      // 空の情報の時は動作しない。
    }
    this.putData.str_excretionState = state;
    const error = await this.storeService.post(this.putData);
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }



  // INPUT側から排泄の種類を入力時（複数の登録が必要）
  public async put(): Promise<any> {
    // 現在選択されている情報の備考欄を編集
    const error = await this.storeService.putMultiple(this.putDataList);
    if (error) {

    }
    this.data.click('put');
    this.remark = '';
    this.isOpen = false;
  }

  // 排泄データの削除
  public async remove(i: number): Promise<any> {
    const excretionId = this.table[i].id_excretion;
    const error = await this.storeService.delete(excretionId);
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }


  close(): void {
    this.isOpen = false;
  }

}


