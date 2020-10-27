import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';
import { VitalStoreService } from './store/vital-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { SessionService } from '../../store/session.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { RemarkComponent } from './components/remark/remark.component';
import { DigitComponent } from './components/digit/digit.component';
import { TimeComponent } from './components/time/time.component';
import { InputStaffChangeComponent } from '../.././master-modules/staff/input-staff-change/input-staff-change.component';

@Component({
  selector: 'app-vital',
  templateUrl: './vital.component.html',
  styleUrls: ['./vital.component.scss']
})
export class VitalComponent implements OnInit {

  pageTitle = 'バイタル';


  // 静的なスタッフリスト
  staffList = new Array();
  // 静的なバイタルリスト
  vitalList = new Array();

  // 記述したスタッフのID
  staffId = 0;

  picker: any;


  constructor(
    private staffStoreService: StaffStoreService,
    private storeService: VitalStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
    private sessionService: SessionService,
  ) { }

  async ngOnInit(): Promise<any> {
    await this.staffDataLoad();
    this.vitalDataLoad();
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

  // 今日のバイタルの静的リストを取得
  async vitalDataLoad(): Promise<any> {
    this.vitalList = JSON.parse(JSON.stringify(await this.storeService.getStaticList()));
    console.log(this.vitalList);
  }

  // ダイアログ内の編集データをリストで表示されているデータに戻す処理
  back(): void {
    this.storeService.setDynamicList(JSON.parse(JSON.stringify(this.vitalList)));
  }

  // バイタルに関する情報が1つも入力されていないデータかどうかの判定
  checkNoDataVital(data): boolean {
    return !data.tm_check && !data.num_bodyTemperature && !data.num_maximalBloodPressure && !data.num_minimalBloodPressure
      && !data.num_pulse && !data.num_SpO2 && !data.str_remark;
  }

  // 追加データ
  async add(recordId: number): Promise<any> {
    console.log(recordId);
    const error = await this.storeService.noDataPost(recordId, this.staffId);
    if (error) {

    }
    this.vitalDataLoad();
  }

  // バイタルデータの削除
  async remove(vitalId: number): Promise<any> {
    // Editダイアログに表示する内容
    const param = {
      class: 'delete-alert',
      content: `バイタルデータを削除しますがよろしいでしょうか？`
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
              const error = await this.storeService.delete(vitalId);
              console.log(error);
              this.vitalDataLoad();
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

  // バイタルタイプの編集
  openInputDialog(recordData, inputType, vitalData?): void {
    // バイタルデータのない場合は、情報が送信されない。
    if (inputType === 'str_remark' && !vitalData) {
      return;
    }
    // モーダルウィンドウに表示する内容
    const param = {
      class: 'input-dialog',
      record: recordData,
      vital: vitalData,
      type: inputType,
      staffId: this.staffId
    };
    // openPopUp()を呼んで、Observableを受け取る。
    let component;
    switch (inputType) {
      case 'tm_check':
        component = TimeComponent;
        break;
      case 'str_remark':
        component = RemarkComponent;
        break;
      default:
        component = DigitComponent;
    }
    const observable = this.dialogStateService.openDialog(component, this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => {
          // Editダイアログ内でのボタン押下時の処理分岐
          switch (v) {
            case 'put':
              this.vitalDataLoad();
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



