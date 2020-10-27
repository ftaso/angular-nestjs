import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { HandingOverStoreService } from './store/handing-over-store.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { WebsocketService } from '../../services/web-socket.service';
import { SessionService } from '../../store/session.service';
import * as moment from 'moment';
import { StaffStoreService } from '../../master-modules/staff/store/staff-store.service';
import { InputStaffChangeComponent } from '../../master-modules/staff/input-staff-change/input-staff-change.component';
import { PopUpComponent } from '../../core/pop-up/pop-up.component';

@Component({
  selector: 'app-closing-meeting',
  templateUrl: './closing-meeting.component.html',
  styleUrls: ['./closing-meeting.component.scss']
})
export class ClosingMeetingComponent implements OnInit, OnDestroy {

  pageTitle = '終了ミーテイング';

  // 入力スタッフ
  staffList = new Array();
  staffId: number;

  // 静的なスタッフリスト
  selectedDateRecordList = new Array();

  // 静的なレコード
  handingOverData: any[];

  message = '';

  // Websocktのモード
  mode: 'edit' | 'view' | 'exit' = 'exit';

  // 検索対象の日
  selectedDate = moment();
  selectedRecord: any;

  connection;
  data;

  constructor(
    private storeService: HandingOverStoreService,
    private viewContainerRef: ViewContainerRef,
    private dialogStateService: DialogStateService,
    private sessionService: SessionService,
    private staffStoreService: StaffStoreService,
    private websocketService: WebsocketService
  ) {

  }

  async ngOnInit(): Promise<any> {
    this.selectedDateRecordList = await this.recordDataLoad(this.selectedDate.format('YYYY-MM-DD'));
    console.log(this.selectedDateRecordList);
    // 入力スタッフ用
    await this.staffDataLoad();
    this.staffId = this.sessionService.getUserData().staffId;
  }

  emitter(): void {
    this.websocketService.emit('events', { test: 'test' });
    // this.websocketService.emit('events', { handingOverData: JSON.stringify(this.handingOverData) });
  }

  openAlertPopUp(message: string): void {
    const params = {
      class: 'pop-up',
      contents: message
    };
    this.dialogStateService.openDialog(PopUpComponent, this.viewContainerRef, params);
  }


  socketStart(selectMode: 'edit' | 'view' | 'exit'): void {
    this.websocketService.connect();
    this.connection = this.websocketService.on('message').subscribe(data => {
      console.log(JSON.parse(data));
      if (JSON.parse(data).mode === 'exit') {
        this.openAlertPopUp(`エラー：すでに誰かが親機として入室しています。`);
        this.mode = 'exit';
      }
    });
    this.connection = this.websocketService.on('broadcast').subscribe(data => {
      this.selectedRecord = JSON.parse(data.selectedRecord);
      this.handingOverData = JSON.parse(data.handingOverData);
    });
    this.websocketService.emit('message', JSON.stringify({
      accountId: this.staffId,
      mode: selectMode,
      beforemode: this.mode
    }));
  }

  async ngOnDestroy(): Promise<any> {
    if (this.selectedRecord && this.mode === 'edit') {
      await this.save();
    }
    if (this.mode === 'edit' || this.mode === 'view') {
      this.websocketService.emit('message', JSON.stringify({
        accountId: this.staffId,
        mode: 'exit'
      }));
      this.connection.unsubscribe();
    }
  }

  // スタッフのリストを取得
  async staffDataLoad(): Promise<any> {
    return new Promise(async resolve => {
      this.staffList = JSON.parse(JSON.stringify(await this.staffStoreService.getStaticList()));
      console.log(this.staffList);
      resolve();
    });
  }

  // 指定された日付の利用者の情報を取得
  async recordDataLoad(date: string): Promise<any> {
    return new Promise(async resolve => {
      const careReceiverList = JSON.parse(JSON.stringify(await this.storeService.getRecordList(date)));
      resolve(careReceiverList);
    });
  }

  async onDateChange(event): Promise<any> {
    console.log(event);
    this.selectedDateRecordList = await this.recordDataLoad(this.selectedDate.format('YYYY-MM-DD'));
  }

  // 検索するサービス提供記録を呼び出す
  async find(record: any): Promise<any> {
    if (this.selectedRecord && this.mode === 'edit') {
      await this.save();
    }
    this.selectedRecord = record;
    this.handingOverData = JSON.parse(JSON.stringify(await this.storeService.getStaticList(this.selectedRecord.id_record)));
    // レコードに対して、handingOverがまだ作成されていない場合ダミーデータを作成
    if (!this.handingOverData.length) {
      this.handingOverData[0] = {
        str_handingOver: ''
      };
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
        },
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }

  enter(mode: 'edit' | 'view'): void {
    if (this.mode === mode) { return; }
    switch (mode) {
      case 'edit':
        this.socketStart(mode);
        break;
      case 'view':
        this.socketStart(mode);
        break;
    }
    this.mode = mode;
  }

  emit(event): void {
    this.handingOverData[0].str_handingOver = event;
    this.websocketService.emit('broadcast', {
      selectedRecord: JSON.stringify(this.selectedRecord),
      handingOverData: JSON.stringify(this.handingOverData)
    });
  }

  async save(): Promise<any> {
    return new Promise(resolve => {
      if (this.handingOverData[0].id_handingOver) {
        this.storeService.putHandingOver(this.handingOverData[0]);
      } else {
        this.handingOverData[0].id_record = this.selectedRecord.id_record;
        this.handingOverData[0].str_note = '';
        this.handingOverData[0].str_report = '';
        this.handingOverData[0].id_fillOutStaff = this.staffId;
        this.storeService.postHandingOver(this.handingOverData[0]);
      }
      resolve();
    })
  }

}
