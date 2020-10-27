import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Vital } from '../../services/vital-http-handler.service';
import { VitalStoreService } from '../../store/vital-store.service';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  animations: [openCloseAnimation]
})
export class TimeComponent implements OnInit {

  @Input() data: any;
  @Input() type: any;
  @Input() staffId: any;

  isOpen = false;

  pickerTime = '';

  putData: Vital = {
    id_vital: 0,
    id_record: 0,
    tm_check: '',
    num_bodyTemperature: 0,
    num_maximalBloodPressure: 0,
    num_minimalBloodPressure: 0,
    num_pulse: 0,
    num_SpO2: 0,
    str_remark: '',
    id_fillOutStaff: 0,
  };

  // 初回の時間
  setTime = new Date().getHours() + ':' + (Math.floor(new Date().getMinutes() / 10) * 10) + ':00';

  isTimepicker = true;

  constructor(
    private storeService: VitalStoreService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    // VitalComponentからInputしているデータを入れ込む作業
    if (this.data.vital) {
      this.putData = JSON.parse(JSON.stringify(this.data.vital));
    } else {
      this.putData.tm_check = this.setTime;
    }
    this.putData.id_fillOutStaff = this.data.staffId;
    this.putData.id_record = this.data.record.id_record;
  }


  public async put(): Promise<any> {
    let error: boolean;
    if (this.putData.id_vital) {
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

  // timePickerからinputされた情報を適宜入れていく
  input(time: string): void {
    this.putData.tm_check = time;
  }


}

