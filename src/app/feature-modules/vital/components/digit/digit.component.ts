import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { openCloseAnimation } from '../../../../animations/open-close';
import { Vital } from '../../services/vital-http-handler.service';
import { VitalStoreService } from '../../store/vital-store.service';
import { NumberInputerComponent } from '../../../../shared/components/number-inputer/number-inputer.component';

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrls: ['./digit.component.scss'],
  animations: [openCloseAnimation]
})
export class DigitComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  @Input() type: any;
  @Input() staffId: any;
  @ViewChild(NumberInputerComponent) numberInputerComponent: NumberInputerComponent;

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

  inputDigit: number;
  displayName = '';
  displayNumber = '   ';
  secondDisplayNumber = '   ';
  suffix: string;

  inputType: 'max' | 'min';

  // 受け渡しする値
  value = '   ';
  button: string;
  firstFlag = true;

  constructor(
    private storeService: VitalStoreService,
  ) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    let temp: string;
    console.log(this.data.record)
    // VitalComponentからInputしているデータを入れ込む作業
    if (this.data.vital) {
      this.putData = JSON.parse(JSON.stringify(this.data.vital));
    }
    this.putData.id_record = this.data.record.id_record;
    this.putData.id_fillOutStaff = this.data.staffId;
    // それぞれに表示用の単位
    switch (this.data.type) {
      case 'num_bodyTemperature':
        this.displayName = '体温';
        if (this.putData.num_bodyTemperature) {
          temp = String(this.putData.num_bodyTemperature * 10);
          this.value = temp;
          this.displayNumber = temp.substring(0, 2) + '.' + temp.substring(2, 3);
        }
        this.suffix = '℃';
        break;
      case 'num_bloodPressure':
        this.displayName = '最高血圧';
        if (this.putData.num_maximalBloodPressure && this.putData.num_minimalBloodPressure) {
          if (this.putData.num_maximalBloodPressure < 100) {
            temp = String(this.putData.num_maximalBloodPressure);
            this.value = temp.substring(0, 2) + ' ';
            this.displayNumber = temp.substring(0, 2) + ' ';
          } else {
            this.value = String(this.putData.num_maximalBloodPressure);
            this.displayNumber = String(this.putData.num_maximalBloodPressure);
          }
          if (this.putData.num_minimalBloodPressure < 100) {
            temp = String(this.putData.num_minimalBloodPressure);
            this.secondDisplayNumber = temp.substring(0, 2) + ' ';
          } else {
            this.secondDisplayNumber = String(this.putData.num_minimalBloodPressure);
          }
        }
        this.inputType = 'max';
        this.suffix = 'mmHg';
        break;
      case 'num_pulse':
        if (this.putData.num_pulse) {
          if (this.putData.num_pulse < 100) {
            temp = String(this.putData.num_pulse);
            this.value = temp.substring(0, 2) + ' ';
            this.displayNumber = temp.substring(0, 2) + ' ';
          } else {
            this.value = String(this.putData.num_pulse);
            this.displayNumber = String(this.putData.num_pulse);
          }
        }
        this.displayName = '心拍';
        this.suffix = 'bpm';
        break;
      case 'num_SpO2':
        if (this.putData.num_SpO2) {
          if (this.putData.num_SpO2 < 100) {
            temp = String(this.putData.num_SpO2);
            this.value = temp.substring(0, 2) + ' ';
            this.displayNumber = temp.substring(0, 2) + ' ';
          } else {
            this.value = String(this.putData.num_SpO2);
            this.displayNumber = String(this.putData.num_SpO2);
          }
        }
        this.displayName = 'SpO2';
        this.suffix = '%';
        break;
    }
  }

  // 子コンポーネントにあたるNumberInputer表示完了後に、値をセットしなおす
  ngAfterViewInit(): void {
    if (this.value === '   ' || !this.value) {
      this.setValue(this.value);
    }
  }

  public async put(): Promise<any> {
    let error: boolean;
    // 情報がない場合はPOSTするため
    const putNumber = Number(this.displayNumber.replace(/\s+/g, ''));
    switch (this.data.type) {
      case 'num_bloodPressure':
        // 最低血圧の入力も必要
        this.putData.num_maximalBloodPressure = putNumber;
        this.putData.num_minimalBloodPressure = Number(this.secondDisplayNumber.replace(/\s+/g, ''));
        break;
      default:
        this.putData[`${this.data.type}`] = putNumber;
        break;
    }
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

  // 押されたボタンの情報をキャッチ
  pushedButton(pushedButton: string): void {
    this.button = pushedButton;
  }

  // numberInputerからinputされた情報を適宜入れていく
  input(inputDigit: string): void {
    if (inputDigit === '   ' && this.button !== 'x') {
      return;
    }
    switch (this.data.type) {
      case 'num_bodyTemperature':
        // 小数点があるときのみ
        if (inputDigit.substring(2, 3) !== ' ') {
          this.displayNumber = `${inputDigit.substring(0, 2)}.${inputDigit.substring(2, 3)}`;
        } else if (inputDigit.substring(1, 2) !== ' ') {
          this.displayNumber = `${inputDigit.substring(0, 2)}.0`;
        } else {
          this.displayNumber = `${inputDigit.substring(0, 1)}.0`;
        }
        break;
      case 'num_bloodPressure':
        if (this.inputType === 'max') {
          if (inputDigit.substring(2, 3)) {
            this.displayNumber = inputDigit.substring(0, 3);
          } else {
            this.displayNumber = inputDigit.substring(0, 2);
          }
        } else {
          if (inputDigit.substring(2, 3)) {
            this.secondDisplayNumber = inputDigit.substring(0, 3);
          } else {
            this.secondDisplayNumber = inputDigit.substring(0, 2);
          }
        }
        break;
      default:
        if (inputDigit.substring(2, 3)) {
          this.displayNumber = inputDigit.substring(0, 3);
        } else {
          this.displayNumber = inputDigit.substring(0, 2);
        }
        break;
    }
  }

  changeInputType(type): void {
    if (!this.inputType) {
      return;
    }
    this.inputType = type;
    if (this.inputType === 'max') {
      this.setValue(this.displayNumber);
    } else {
      this.setValue(this.secondDisplayNumber);
    }
    console.log(this.inputType);
  }

  clear(): void {
    if (this.inputType === 'max') {
      this.displayNumber = '   ';
    } else {
      this.displayNumber = '   ';
    }
    this.numberInputerComponent.reset();
  }

  setValue(value: string): void {
    this.numberInputerComponent.set(value);
  }
}

