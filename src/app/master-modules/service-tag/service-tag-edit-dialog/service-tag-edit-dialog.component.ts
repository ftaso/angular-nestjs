import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ServiceTagStoreService } from '../store/service-tag-store.service';

@Component({
  selector: 'app-service-tag-edit-dialog',
  templateUrl: './service-tag-edit-dialog.component.html',
  styleUrls: ['./service-tag-edit-dialog.component.scss'],
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
export class ServiceTagEditDialogComponent implements OnInit {

  @Input() data: any;

  // 表示に使う情報の受け渡しのため(class, 内容)
  // ポップアップの開閉フラグ
  isOpen: boolean;

  // 動的なデータを取得
  serviceTagData = this.storeService.dynamicList$;

  // 選択されているサービスカテゴリ
  selectedServiceCategory = 0;
  // 選択されているサービスサブカテゴリ
  selectedServiceSubCategory = 0;

  // 新規登録フォームON・OFF
  isNewCategory = false;
  isNewSubCategory = false;
  isNewServiceTag = false;

  // 新規登録フォーム
  newCategoryName = '';
  newSubCategoryName = '';
  newServiceTagName = '';

  // 編集フォームON・OFF
  editCategoryId = 0;
  editSubCategoryId = 0;
  editServiceTagId = 0;

  constructor(
    private storeService: ServiceTagStoreService
  ) {
    // ダイアログを開く
    this.isOpen = true;
  }

  ngOnInit(): void {
  }

  // カテゴリを選択
  selectCategory(categoryId: number): void {
    this.selectedServiceCategory = categoryId;
    this.selectedServiceSubCategory = 0;
  }

  // サブカテゴリを選択
  selectSubCategory(subCategoryId: number): void {
    this.selectedServiceSubCategory = subCategoryId;
  }

  // 戻るボタンを押した処理
  close(): void {
    this.data.click('back');
    this.isOpen = false;
  }

  // 新規登録ボタンを押したときの処理
  // カテゴリ新規登録
  editNewCategory(): void {
    this.isNewCategory = true;
  }

  // サブカテゴリ新規登録
  editNewSubCategory(): void {
    this.isNewSubCategory = true;
  }

  // サービスタグ新規登録
  editNewServiceTag(): void {
    this.isNewServiceTag = true;
  }

  // 新規登録の内容を保存
  // カテゴリ
  async saveNewCategory(): Promise<any> {
    // 未入力の場合
    if (!this.newCategoryName) {
      return;
    }
    const newCategoryId = await this.storeService.postCategory(this.newCategoryName);
    // 初期化
    this.newCategoryName = '';
    // 追加したカテゴリを選択状態に
    this.selectedServiceCategory = newCategoryId;
    // 新規登録ボタンに戻す
    this.isNewCategory = false;
  }

  // サブカテゴリ
  async saveNewSubCategory(): Promise<any> {
    // 未入力の場合
    if (!this.newSubCategoryName) {
      return;
    }
    const newSubCategoryId = await this.storeService.postSubCategory(this.newSubCategoryName, this.selectedServiceCategory);
    // 初期化
    this.newSubCategoryName = '';
    // 追加したカテゴリを選択状態に
    this.selectedServiceSubCategory = newSubCategoryId;
    // 新規登録ボタンに戻す
    this.isNewSubCategory = false;
  }

  // サービスタグ
  async saveNewServiceTag(): Promise<any> {
    // 未入力の場合
    if (!this.newServiceTagName) {
      return;
    }
    await this.storeService.postServiceTag(this.newServiceTagName, this.selectedServiceSubCategory);
    // 初期化
    this.newServiceTagName = '';
    // 新規登録ボタンに戻す
    this.isNewServiceTag = false;
  }

  // 作成済みの編集
  // カテゴリ名
  editCategoryName(categoryId: number): void {
    // 前の状態に戻す
    this.storeService.back();
    this.editCategoryId = categoryId;
  }

  // サブカテゴリ名
  editSubCategoryName(subCategoryId: number): void {
    // 前の状態に戻す
    this.storeService.back();
    this.editSubCategoryId = subCategoryId;
  }

  // サービスタグ名
  editServiceTagName(serviceTagId: number): void {
    // 前の状態に戻す
    this.storeService.back();
    this.editServiceTagId = serviceTagId;
  }

  // 作成済みの編集
  // カテゴリ名
  async saveCategoryName(categoryId: number): Promise<any> {
    const error = await this.storeService.putCategoryName(categoryId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editCategoryId = 0;
  }

  // 作成済みの編集
  // サブカテゴリ名
  async saveSubCategoryName(subCategoryId: number): Promise<any> {
    const error = await this.storeService.putSubCategoryName(subCategoryId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editSubCategoryId = 0;
  }

  // 作成済みの編集
  // サービスタグ名
  async saveServiceTagName(serviceTagId: number): Promise<any> {
    const error = await this.storeService.putServiceTagName(serviceTagId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editServiceTagId = 0;
  }

  // カテゴリの削除
  async deleteCategoryName(categoryId: number): Promise<any> {
    const error = await this.storeService.deleteCategoryName(categoryId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editCategoryId = 0;
  }

  // サブカテゴリの削除
  async deleteSubCategoryName(subCategoryId: number): Promise<any> {
    const error = await this.storeService.deleteSubCategoryName(subCategoryId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editSubCategoryId = 0;
  }

  // サービスタグの削除
  async deleteServiceTagName(serviceTagId: number): Promise<any> {
    const error = await this.storeService.deleteServiceTagName(serviceTagId);
    if (error) {
      // 登録に失敗したことを伝える。
    }
    this.editServiceTagId = 0;
  }
}
