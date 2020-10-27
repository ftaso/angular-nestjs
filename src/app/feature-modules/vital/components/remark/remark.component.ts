import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Vital } from '../../services/vital-http-handler.service';
import { VitalStoreService } from '../../store/vital-store.service';

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss'],
  animations: [openCloseAnimation]
})
export class RemarkComponent implements OnInit {

  @Input() data: any;

  isOpen = false;

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

  constructor(
    private storeService: VitalStoreService
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    // VitalComponentからInputしているデータを入れ込む作業
    if (this.data.vital) {
      this.putData = JSON.parse(JSON.stringify(this.data.vital));
    }
    this.putData.id_fillOutStaff = this.data.staffId;
    this.putData.id_record = this.data.record.id_record;
  }

  public async put(): Promise<any> {
    const error = await this.storeService.put(this.putData);
    if (error) {

    }
    this.data.click('put');
    this.isOpen = false;
  }

  close(): void {
    this.isOpen = false;
  }
}
