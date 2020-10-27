import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';
import { MealStoreService } from './store/meal-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { MealTypeComponent } from './components/meal-type/meal-type.component';
import { ProportionComponent } from './components/proportion/proportion.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { RemarkComponent } from './components/remark/remark.component';
import { SessionService } from '../../store/session.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { InputStaffChangeComponent } from '../.././master-modules/staff/input-staff-change/input-staff-change.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  pageTitle = '食事管理画面';

  // 静的なスタッフリスト
  staffList = new Array();
  // 静的な食事リスト
  mealList = new Array();
  // 表示用の食事リスト
  mealDataTable = new Array();

  // 記述したスタッフのID
  staffId = 0;

  constructor(
    private staffStoreService: StaffStoreService,
    private storeService: MealStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
    private sessionService: SessionService,
  ) { }

  async ngOnInit(): Promise<any> {
    await this.staffDataLoad();
    this.mealDataLoad();
    this.staffId = this.sessionService.getUserData().staffId;
  }

  // スタッフのリストを取得
  async staffDataLoad(): Promise<any> {
    return new Promise(async resolve => {
      this.staffList = JSON.parse(JSON.stringify(await this.staffStoreService.getStaticList()));
      console.log(this.staffList);
      resolve();
    });
  }

  // 今日の食事の静的リストを取得
  async mealDataLoad(): Promise<any> {
    this.mealList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    console.log(this.mealList);
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.mealList)));
  }


  // 食事データの削除
  async remove(mealId: number): Promise<any> {
    // Editダイアログに表示する内容
    const param = {
      class: 'delete-alert',
      content: `食事データを削除しますがよろしいでしょうか？`
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(AlertComponent, this.viewContainerRef, param);
    // Editダイアログの処理に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: async v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'yes':
              const error = await this.storeService.delete(mealId);
              this.mealDataLoad();
              break;
            case 'no':
              this.back();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // 食事データの追加
  addMeal(recordData, mealData): void {
    // モーダルウィンドウに表示する内容
    const param = {
      class: 'meal-type',
      record: recordData,
      meal: mealData,
      id: this.staffId,
    };
    // openPopUp()を呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(AddMealComponent, this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'post':
              this.mealDataLoad();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // 間食の追加
  async addSnack(recordId): Promise<any> {
    const error = await this.storeService.postSnack(recordId, this.staffId);
    if (error) {
      return;
    }
    this.mealDataLoad();
  }

  // 食事タイプの編集
  selectMealType(recordData, mealData): void {
    if (!mealData.id_meal) {
      return;
    }
    // モーダルウィンドウに表示する内容
    const param = {
      class: 'meal-type',
      id: this.staffId,
      record: recordData,
      meal: mealData,
    };
    // openPopUp()を呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(MealTypeComponent, this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'put':
              this.mealDataLoad();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // 食事量の編集
  selectProportion(recordData, mealData, selectedType: 'main' | 'sub'): void {
    if (!mealData.id_meal) {
      return;
    }
    // モーダルウィンドウに表示する内容
    const param = {
      class: 'meal-type',
      id: this.staffId,
      record: recordData,
      meal: mealData,
      type: selectedType
    };
    // openPopUp()を呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(ProportionComponent, this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'put':
              this.mealDataLoad();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  // 備考の編集
  editRemark(recordData, mealData): void {
    if (!mealData.id_meal) {
      return;
    }
    // モーダルウィンドウに表示する内容
    const param = {
      class: 'meal-type',
      id: this.staffId,
      record: recordData,
      meal: mealData
    };
    // openPopUp()を呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(RemarkComponent, this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'put':
              this.mealDataLoad();
              break;
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }


  // 入力者変更用のスタッフダイアログを開く
  menuToggle(): void {
    const param = {
      class: 'input-staff-change-dialog',
      staffId: this.staffId,
    };
    // Editダイアログを呼んで、Observableを受け取る。
    const observable = this.dialogStateService.openDialog(InputStaffChangeComponent, this.viewContainerRef, param);
    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: staffId => {
          // スタッフダイアログ内でのボタン押下時の内容反映
          console.log(staffId);
          this.staffId = Number(staffId);
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }
}
