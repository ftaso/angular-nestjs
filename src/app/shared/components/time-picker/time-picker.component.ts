import { Component, AfterViewChecked, Output, EventEmitter, Input } from '@angular/core';
// タイムピッカーのデザイン
import Picker from 'pickerjs';
import * as moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements AfterViewChecked {

  @Output() pickerTime = new EventEmitter<string>();
  @Input() className: string;
  @Input() setTime: string;
  @Input() timeInterval: number;

  // Pickerに使用
  picker: any;

  // 初回時のみ、ngAfter
  isFirst = true;
  time;

  constructor() {
  }

  // ngAfterViewInitよりも後？
  ngAfterViewChecked(): void {
    this.pickerOpen();
    // 初回の時刻を送信しないので、別でEmit
    if (this.isFirst) {
      this.pickerTime.emit(this.setTime);
      this.isFirst = false;
    }
  }

  // 時刻変更時発火
  check(value: string): void {
    this.pickerTime.emit(value);
  }

  set(value: string): void {
  }

  // picker.js起動（埋め込み型）
  pickerOpen(): void {
    this.picker = new Picker(document.querySelector(`.${this.className}`), {
      format: 'HH:mm',
      inline: true,
      headers: true,
      container: `.${this.className}-picker-container`,
      date: moment(this.setTime, 'HH:mm:ss').format('HH:mm'),
      increment: {
        minute: this.timeInterval,
      },
      text: {
        hour: ' 時',
        minute: ' 分'
      },
      hidden(): void {

      },
      hide(): void {

      },
      shown(): void {

      },
    });
  }


}
