import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { ServiceSheetStoreService } from '../../store/service-sheet-store.service';
import { Service } from '../../services/service-http-handler.service';
import * as moment from 'moment';
import { TimePickerComponent } from '../../../../shared/components/time-picker/time-picker.component';
import { ServiceDetailStoreService } from '../../../../master-modules/service-detail/store/service-detail-store.service';

@Component({
  selector: 'app-time-fixed-service',
  templateUrl: './time-fixed-service.component.html',
  styleUrls: ['./time-fixed-service.component.scss'],
  animations: [openCloseAnimation]
})
export class TimeFixedServiceComponent implements OnInit {

  @ViewChild(TimePickerComponent) protected timePickerComponent: TimePickerComponent;
  @Input() data: any;

  isOpen = false;

  timeInterval = 0;

  putData: Service = {
    id_service: 0,
    id_record: 0,
    id_serviceType: 0,
    serviceType: {
      id_serviceType: 0,
      str_serviceType: ''
    },
    serviceDetailMaps: [],
    tm_start: '',
    tm_end: '',
    str_remark: '',
    id_fillOutStaff: 0,
  };

  setTime = '';

  remark = '';
  careReceiver = '';

  serviceDetailList = new Array();

  selectedService = {
    id_serviceType: 0,
    str_serviceType: ''
  };
  newServiceType = '';
  newServiceDetail = '';

  selectedTime: 'start' | 'end' = 'start';

  isAddServiceType = false;
  isAddServiceDetail = false;
  isChangeTime = false;

  constructor(
    private storeService: ServiceSheetStoreService,
    private serviceDetailStoreService: ServiceDetailStoreService,
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.serviceDetailList = this.data.serviceDetailList;
    // サービスの詳細を選択できるようにする
    this.resetSelectServiceDetail();
    this.careReceiver = this.data.record.str_careReceiver;
    this.timeInterval = this.data.timeInterval;
    if (this.data.data) {
      this.putData = JSON.parse(JSON.stringify(this.data.data));
      this.selectedService = this.putData.serviceType;
      console.log(this.putData)
      for (const type of this.serviceDetailList) {
        if (type.id_serviceType === this.putData.serviceType.id_serviceType) {
          if (type.serviceDetails.length) {
            for (const detail of type.serviceDetails) {
              for (const selectDetail of this.putData.serviceDetailMaps) {
                if (detail.id_serviceDetail === selectDetail.id_serviceDetail) {
                  detail.select = true;
                  break;
                }
              }
            }
          }
          this.selectedService = type;
        }
      }
      console.log(this.serviceDetailList)
    } else {
      this.putData.id_record = this.data.record.id_record;
      this.putData.tm_start = moment(this.data.time, 'HH:mm:ss').format('HH:mm:ss');
      this.putData.tm_end = moment(this.data.time, 'HH:mm:ss').add(60, 'minutes').format('HH:mm:ss');
    }
    this.setTime = this.putData.tm_start;
    console.log(this.setTime);
    this.putData.id_fillOutStaff = this.data.staffId;
  }

  inputReset(mode: 'type' | 'detail'): void {
    if (mode === 'type') {
      this.newServiceType = '';
    }
    this.newServiceDetail = '';
  }

  // サービスの種別を新規登録する場合
  addServiceType(): void {
    this.isAddServiceType = true;
    this.isAddServiceDetail = true;
  }

  // サービスの詳細を新規登録する場合
  addServiceDetail(): void {
    this.inputReset('detail');
    this.isAddServiceDetail = true;
  }

  public async post(): Promise<any> {
    if (!this.selectedService.id_serviceType) {
      return;
    }
    this.putData.id_serviceType = this.selectedService.id_serviceType;
    const serviceDetailList = [];
    for (const type of this.serviceDetailList) {
      if (type.serviceDetails.length) {
        for (const detail of type.serviceDetails) {
          if (detail.select) {
            serviceDetailList.push(detail.id_serviceDetail);
          }
        }
      }
    }
    let serviceId: number;
    if (this.putData.id_service) {
      // PUT
      const error = await this.storeService.putService(this.putData);
      if (error) {
        serviceId = 0;
      } else {
        serviceId = this.putData.id_service;
      }
    } else {
      serviceId = await this.storeService.postService(this.putData);
    }
    console.log(serviceId);
    if (!serviceId) {
      this.data.click('error');
      this.isOpen = false;
      return;
    } else {
      console.log(serviceId);
      await this.storeService.postServiceDetailMap(serviceDetailList, serviceId);
    }
    this.data.click(JSON.stringify(this.serviceDetailList));
    this.isOpen = false;
  }

  public async delete(): Promise<any> {
    let error: boolean;
    if (this.putData.id_service) {
      // DELETE
      error = await this.storeService.deleteService(this.putData.id_service);
    } else {
      return;
    }
    if (error) {
      this.data.click('error');
      this.isOpen = false;
      return;
    }
    this.data.click(JSON.stringify(this.serviceDetailList));
    this.isOpen = false;
  }

  close(): void {
    this.isOpen = false;
  }

  // サービスタイプの変更
  selectServiceType(service: any): void {
    // 選択中のものをクリックしても何も起きない。
    if (this.selectedService.id_serviceType === service.id_serviceType) {
      return;
    }
    this.selectedService = service;
    this.inputReset('type');
    // 他のタイプの選択中の項目を一旦リセットする
    this.resetSelectServiceDetail();
  }

  // 他のタイプの選択中の項目を一旦リセットする
  resetSelectServiceDetail(): void {
    // サービスの詳細を選択できるようにする
    for (const type of this.serviceDetailList) {
      if (type.serviceDetails.length) {
        for (const detail of type.serviceDetails) {
          detail.select = false;
        }
      }
    }
  }

  // サービス詳細の選択
  selectServiceDetail(serviceDetail: any): void {
    serviceDetail.select = !serviceDetail.select;
  }

  // timePickerからinputされた情報を適宜入れていく
  input(time: string, type: 'start' | 'end'): void {
    switch (type) {
      case 'start':
        this.putData.tm_start = time;
        break;
      case 'end':
        this.putData.tm_end = time;
        break;
    }
  }

  // トグルの開閉ボタン
  // ひとつ開くと他閉じる
  openToggle(type: string): void {
    // 初期化
    this.isAddServiceType = false;
    this.isAddServiceDetail = false;
    this.isChangeTime = false;
    switch (type) {
      case 'type':
        this.isAddServiceType = true;
        break;
      case 'detail':
        this.isAddServiceDetail = true;
        break;
      case 'time':
        this.isChangeTime = true;
        break;
    }
  }

  closeToggle(): void {
    // 初期化
    this.isAddServiceType = false;
    this.isAddServiceDetail = false;
    this.isChangeTime = false;
  }

  async postNewServiceType(text: string): Promise<void> {
    const newId = await this.serviceDetailStoreService.postType(text);
    if (!newId) {
      // エラーが発生
    } else {
      this.serviceDetailList.push({
        id_serviceType: newId,
        str_serviceType: text,
        serviceDetails: [],
        select: false
      });
    }
  }

  async postNewServiceDetail(text: string): Promise<void> {
    const typeId = this.selectedService.id_serviceType;
    const newId = await this.serviceDetailStoreService.postDetail(text, typeId);
    if (!newId) {
      // エラーが発生
    } else {
      this.serviceDetailList.find(a => a.id_serviceType === typeId).serviceDetails.push({
        id_serviceDetail: newId,
        str_serviceDetail: text,
        select: false
      });
    }
  }

}

