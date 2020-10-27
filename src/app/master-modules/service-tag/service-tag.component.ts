import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServiceTagStoreService } from './store/service-tag-store.service';
import { ServiceTagEditDialogComponent } from './service-tag-edit-dialog/service-tag-edit-dialog.component';
import { DialogStateService } from '../../services/dialog-state.service';

@Component({
  selector: 'app-service-tag',
  templateUrl: './service-tag.component.html',
  styleUrls: ['./service-tag.component.scss'],
})
export class ServiceTagComponent implements OnInit {

  pageTitle = 'サービスタグマスター';

  // サービスタグリスト
  serviceTagList = [];
  // 動的なサービスタグリスト
  serviceTagData = this.storeService.dynamicList$;

  constructor(
    private storeService: ServiceTagStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
  ) { }

  async ngOnInit(): Promise<any> {
    // 最新の情報の取得 → 静的なリストの取得
    this.load();
  }

  // ダイアログから戻ってきた時にも初回と同様のことを行う。
  async load(): Promise<any> {
    // 最新の情報の取得 → 静的なリストの取得
    this.serviceTagList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    // is_delete = 1 の中しかないものに関しては通す必要がある、
    // サービスタグリストからis_delete=0、 is_delete is NULLのみをリストに格納しなおす
    this.serviceTagList.sort((a, b) => {
      if (a.id_serviceTagCategory > b.id_serviceTagCategory) { return 1; }
      if (a.id_serviceTagCategory < b.id_serviceTagCategory) { return -1; }
      if (a.id_serviceTagSubCategory > b.id_serviceTagSubCategory) { return 1; }
      if (a.id_serviceTagSubCategory < b.id_serviceTagSubCategory) { return -1; }
      // 削除されたものが上になるように
      if (a.is_delete > b.is_delete) { return 1; }
      if (a.is_delete < b.is_delete) { return -1; }
    });
    for (const serviceTag of this.serviceTagList) {
      // 列の幅(デフォルト)
      serviceTag.categoryRowSpan = 1;
      serviceTag.subCategoryRowSpan = 1;
      // 表示するか(2列目以降は非表示にする予定)
      serviceTag.categoryDisplay = true;
      serviceTag.subCategoryDisplay = true;
    }
    for (let i = 0; i < this.serviceTagList.length; i++) {
      if (this.serviceTagList[i].categoryDisplay) {
        for (let j = i + 1; j < this.serviceTagList.length; j++) {
          if (this.serviceTagList[i].id_serviceTagCategory === this.serviceTagList[j].id_serviceTagCategory) {
            if (this.serviceTagList[j].is_delete === 0) {
              this.serviceTagList[i].categoryRowSpan++;
            }
            this.serviceTagList[j].categoryDisplay = false;
            if (this.serviceTagList[i].id_serviceTagSubCategory === this.serviceTagList[j].id_serviceTagSubCategory) {
              if (this.serviceTagList[j].is_delete === 0) {
                this.serviceTagList[i].subCategoryRowSpan++;
              }
              this.serviceTagList[j].subCategoryDisplay = false;
            }
            if (this.serviceTagList[j].subCategoryDisplay) {
              for (let k = j + 1; k < this.serviceTagList.length; k++) {
                if (this.serviceTagList[j].id_serviceTagSubCategory === this.serviceTagList[k].id_serviceTagSubCategory) {
                  if (this.serviceTagList[k].is_delete === 0) {
                    this.serviceTagList[j].subCategoryRowSpan++;
                  }
                  this.serviceTagList[k].subCategoryDisplay = false;
                } else {
                  break;
                }
              }
            }
          } else {
            break;
          }
        }
      }
    }
    this.serviceTagList = this.serviceTagList.filter(a =>
      (a.is_delete === 0 || !a.is_delete || (a.is_delete === 1 && a.subCategoryDisplay && a.categoryDisplay)));
  }

  // Editダイアログを開く
  edit(): void {
    // Editダイアログに表示する内容
    const param = {
      class: 'edit-card',
    };
    // Editダイアログを呼んで、Observableを受け取る。
    // どのコンポーネントを表示するかの情報を渡す
    const observable = this.dialogStateService.openDialog(ServiceTagEditDialogComponent, this.viewContainerRef, param);
    // Editダイアログの処理に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'save':
              this.load();
              break;
            case 'back':
              this.load();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // カテゴリ名編集
  editCategory(i): void {
    this.serviceTagList[i].isCategoryEdit = true;
  }

  // カテゴリ名保存
  async saveCategory(i): Promise<any> {
    this.serviceTagList[i].isCategoryEdit = false;
    const error = await this.storeService.putCategoryName(this.serviceTagList[i].id_serviceTagCategory);
    if (error) {

    }
    this.load();
  }

  // サブカテゴリ名編集
  editSubCategory(i): void {
    this.serviceTagList[i].isSubCategoryEdit = true;
  }

  // カテゴリ名保存
  async saveSubCategory(i): Promise<any> {
    this.serviceTagList[i].isSubCategoryEdit = false;
    const error = await this.storeService.putSubCategoryName(this.serviceTagList[i].id_serviceTagSubCategory);
    if (error) {

    }
    this.load();
  }

}
