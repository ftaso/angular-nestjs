import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Hydration } from '../../services/hydration-http-handler.service';
import { HydrationStoreService } from '../../store/hydration-store.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
  animations: [openCloseAnimation]
})
export class CollectComponent implements OnInit {


  // 親コンポーネントであるHydrationComponentからのINPUT
  @Input() data: any;

  // 水分提供量
  numHydrateList = [200, 150, 100, 50, 10];
  selectedNumHydrate = 0;
  // 備考欄への入力
  isComment = false;
  remark = '';

  // ダイアログの開閉フラグ
  isOpen = false;

  putData: Hydration = {
    id_hydration: 0,
    id_record: 0,
    tm_hydrate: '',
    num_hydrate: 0,
    is_fixed: 0,
    str_remark: '',
    id_fillOutStaff: 0,
  };

  // その時刻データを細分化し、テーブルに格納
  table = new Array();

  selectedRow = 0;

  constructor(
    private storeService: HydrationStoreService,
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    console.log(this.data.data);
    // 初期値の代入
    if (!this.data.data.collect) {
      // まだレコードが作られていない
      this.putData.id_record = this.data.record.id_record;
      this.putData.tm_hydrate = this.data.data.time;
    } else {
      // レコードがある場合
      this.putData = JSON.parse(JSON.stringify(this.data.data.collect));
      this.selectedNumHydrate = this.putData.num_hydrate;
      if (this.putData.str_remark) {
        this.remark = this.putData.str_remark;
        this.isComment = true;
      }
    }
    this.putData.id_fillOutStaff = this.data.staffId;
  }


  // INPUT側から水分の種類を入力時
  public async post(numHydrate: number): Promise<any> {
    if (!numHydrate || this.selectedNumHydrate === numHydrate) {
      // 空の情報の時は動作しない。
      // 既に選択状態のものを押しても動作しない。
      return;
    }
    this.putData.num_hydrate = numHydrate;
    const error = await this.storeService.post(this.putData);
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }

  // コメントの表示
  public selectAmount(numHydrate: number): void {
    this.putData.num_hydrate = numHydrate;
  }



  // INPUT側から水分の種類を入力時
  public async put(): Promise<any> {
    // 現在選択されている情報の備考欄を編集
    this.table[this.selectedRow].str_remark = this.remark;
    const error = await this.storeService.put(this.table[this.selectedRow]);
    if (error) {

    }
    this.data.click('put');
    this.remark = '';
    this.isOpen = false;
  }

  // 水分データの削除
  public async remove(i: number): Promise<any> {
    const hydrationId = this.table[i].id_hydration;
    const error = await this.storeService.delete(hydrationId);
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }

  // セーブボタンを押した時の処理
  public async save(): Promise<any> {
    if (!this.putData.num_hydrate) {
      // 空の情報の時は動作しない。
      return;
    }
    this.putData.str_remark = this.remark;
    let error: boolean;
    if (this.putData.id_hydration) {
      error = await this.storeService.put(this.putData);
    } else {
      error = await this.storeService.post(this.putData);
    }
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }


  close(): void {
    this.isOpen = false;
  }

}



