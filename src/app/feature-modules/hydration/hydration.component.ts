import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';
import { HydrationStoreService } from './store/hydration-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { TimeTableService } from '../../services/time-table.service';
import { SessionService } from '../../store/session.service';
import { CollectComponent } from './components/collect/collect.component';
import { InputStaffChangeComponent } from '../../master-modules/staff/input-staff-change/input-staff-change.component';

@Component({
  selector: 'app-hydration',
  templateUrl: './hydration.component.html',
  styleUrls: ['./hydration.component.scss']
})
export class HydrationComponent implements OnInit {

  pageTitle = '水分補給';

  // 静的なスタッフリスト
  staffList = new Array();
  // 静的なバイタルリスト
  hydrationList = new Array();

  // タイムテーブル
  timeTable = new Array();

  // 記述したスタッフのID
  staffId = 0;
  staffName = '';

  // 水分提供量
  numHydrateList = [200, 150, 100, 50, 10];
  selectedNumHydrate = 0;
  // 提供する場合はON
  mode: 'distribute' | 'collect' = 'collect';

  constructor(
    private staffStoreService: StaffStoreService,
    private storeService: HydrationStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
    private sessionService: SessionService,
    private timeTableService: TimeTableService
  ) { }

  async ngOnInit(): Promise<any> {
    await this.staffDataLoad();
    // 配列を作る
    this.timeTable = this.timeTableService.createTimeTable(20);
    this.hydrationDataLoad();
    this.staffId = this.sessionService.getUserData().staffId;
    this.staffName = this.staffList.find(a => a.id_staff === this.staffId).str_staffName;
  }

  // スタッフのリストを取得
  async staffDataLoad(): Promise<any> {
    return new Promise(async resolve => {
      this.staffList = JSON.parse(JSON.stringify(await this.staffStoreService.getStaticList()));
      console.log(this.staffList);
      resolve();
    });
  }

  // 提供⇔回収
  toggleMode(mode: 'distribute' | 'collect'): void {
    this.mode = mode;
    if (this.mode === 'collect') {
      this.selectedNumHydrate = 0;
    }
  }

  // 数字
  selectNumHydrate(amount: number): void {
    this.selectedNumHydrate = amount;
  }

  // 今日のバイタルの静的リストを取得
  async hydrationDataLoad(): Promise<any> {
    this.hydrationList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    this.editHydrationTable();
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.hydrationList)));
  }

  // バイタルデータ表示用のテーブルを作成する
  editHydrationTable(): void {
    // 排泄情報
    console.log(this.hydrationList);
    // タイムテーブルを取得した結果
    console.log(this.timeTable);
    for (const record of this.hydrationList) {
      record.time = [];
      for (const time of this.timeTable) {
        record.time.push({
          time: time.time
        });
      }
      for (const hydration of record.hydrations) {
        for (const time of record.time) {
          if (hydration.tm_hydrate === time.time) {
            // 提供データ・回収データに分ける
            if (hydration.is_fixed === 0) {
              time.distribute = JSON.parse(JSON.stringify(hydration));
            } else {
              time.collect = JSON.parse(JSON.stringify(hydration));
            }
          }
        }
      }
      record.time.sort((a, b) => {
        if (a.time > b.time) { return 1; }
        if (a.time < b.time) { return -1; }
        if (a.is_fixed > b.is_fixed) { return 1; }
        if (a.is_fixed < b.is_fixed) { return -1; }
      });
    }
    console.log(this.hydrationList);
  }

  async clickTab(recordData, hydrationData): Promise<any> {
    // 提供、回収のどちらが選択されているかで分岐
    switch (this.mode) {
      case 'distribute':
        if (this.selectedNumHydrate > 0) {
          let error: boolean;
          if (hydrationData.distribute) {
            const data = hydrationData.distribute;
            data.num_hydrate = this.selectedNumHydrate;
            data.id_fillOutStaff = this.staffId;
            error = await this.storeService.put(data);
          } else {
            error = await this.storeService.postDistribute(recordData.id_record, hydrationData.time, this.selectedNumHydrate, this.staffId);
          }
          if (error) {

          }
          this.hydrationDataLoad();
        } else {
          return;
        }
        break;
      case 'collect':
        // Editダイアログに表示する内容
        const param = {
          class: 'input-dialog',
          record: recordData,
          staffId: this.staffId,
          data: hydrationData,
        };
        // Editダイアログを呼んで、Observableを受け取る。
        const observable = this.dialogStateService.openDialog(CollectComponent, this.viewContainerRef, param);
        // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
        observable.subscribe(
          {
            next: v => {
              // Editダイアログ内でのボタン押下時の処理分岐
              switch (v) {
                case 'put':
                  this.hydrationDataLoad();
                  break;
              }
            },
            error: (err) => console.log(err),
            complete: () => console.log('done')
          });
        break;
    }
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
          this.staffName = this.staffList.find(a => a.id_staff === this.staffId).str_staffName;
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }
}
