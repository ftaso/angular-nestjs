import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ServiceDetailStoreService } from '../store/service-detail-store.service';

@Component({
  selector: 'app-service-detail-edit-dialog',
  templateUrl: './service-detail-edit-dialog.component.html',
  styleUrls: ['./service-detail-edit-dialog.component.scss'],
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
export class ServiceDetailEditDialogComponent implements OnInit {

  @Input() data: any;

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  // 動的なデータを取得
  serviceTagData = this.storeService.dynamicList$;

  // 選択されているサービスカテゴリ
  selectedServiceType = 0;

  // 新規登録フォームON・OFF
  isNewType = false;
  isNewDetail = false;

  // 新規登録フォーム
  newTypeName = '';
  newDetailName = '';

  // 編集フォームON・OFF
  editTypeId = 0;
  editDetailId = 0;

  constructor(
    private storeService: ServiceDetailStoreService
  ) {
    // ダイアログを開く
    this.isOpen = true;
  }

  ngOnInit(): void {
  }

  // カテゴリを選択
  selectType(typeId: number): void {
    this.selectedServiceType = typeId;
  }

  // 戻るボタンを押した処理
  close(): void {
    this.data.click('back');
    this.isOpen = false;
  }

  // 新規登録ボタンを押したときの処理
  // カテゴリ新規登録
  editNewType(): void {
    this.reset();
    this.selectedServiceType = 0;
    this.isNewType = true;
  }

  // サブカテゴリ新規登録
  editNewDetail(): void {
    this.reset();
    this.isNewDetail = true;
  }

  reset(): void {
    if (this.editTypeId) {
      this.editTypeId = 0;
    }
    if (this.editDetailId) {
      this.editDetailId = 0;
    }
    this.isNewType = false;
    this.isNewDetail = false;
    this.storeService.back();
  }

  // 新規登録の内容を保存
  // カテゴリ
  async saveNewType(): Promise<any> {
    // 未入力の場合
    if (!this.newTypeName) {
      return;
    }
    const newTypeId = await this.storeService.postType(this.newTypeName);
    // 初期化
    this.newTypeName = '';
    // 追加したカテゴリを選択状態に
    this.selectedServiceType = newTypeId;
    // 新規登録ボタンに戻す
    this.isNewType = false;
  }

  // // サブカテゴリ
  async saveNewDetail(): Promise<any> {
    // 未入力の場合
    if (!this.newDetailName) {
      return;
    }
    await this.storeService.postDetail(this.newDetailName, this.selectedServiceType);
    // 初期化
    this.newDetailName = '';
    // 新規登録ボタンに戻す
    this.isNewDetail = false;
  }


  // 作成済みの編集
  // カテゴリ名
  editType(typeId: number): void {
    // 前の状態に戻す
    this.reset();
    this.editTypeId = typeId;
  }

  // サブカテゴリ名
  editDetail(detailId: number): void {
    // 前の状態に戻す
    this.reset();
    this.editDetailId = detailId;
  }

  // // 作成済みの編集
  // // カテゴリ名
  async saveType(typeId: number): Promise<any> {
    const error = await this.storeService.putType(typeId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editTypeId = 0;
  }

  // // 作成済みの編集
  // // サブカテゴリ名
  async saveDetail(detailId: number): Promise<any> {
    const error = await this.storeService.putDetail(detailId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editDetailId = 0;
  }

  // // サブカテゴリの削除
  async deleteType(typeId: number): Promise<any> {
    const error = await this.storeService.deleteType(typeId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editTypeId = 0;
  }

  // カテゴリの削除
  async deleteDetail(detailId: number): Promise<any> {
    const error = await this.storeService.deleteDetail(detailId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editDetailId = 0;
  }



}
