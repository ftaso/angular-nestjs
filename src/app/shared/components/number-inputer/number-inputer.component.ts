import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-inputer',
  templateUrl: './number-inputer.component.html',
  styleUrls: ['./number-inputer.component.scss']
})
export class NumberInputerComponent implements OnInit {

  @Output() inputNumber = new EventEmitter<string>();
  @Output() pushedButton = new EventEmitter<string>();

  // 入力された数値
  inputDigit = '   ';

  constructor() { }

  ngOnInit(): void {
  }

  // ボタンが押下
  pushButton(button: any): void {
    console.log('button', button, this.inputDigit)
    this.pushedButton.emit(button);
    if (button === 'c') {
      this.inputDigit = '   ';
    } else if (button === 'x') {
      for (let i = 0; i < this.inputDigit.length; i++) {
        if (this.inputDigit[i] === ' ') {
          if (i === 2) {
            this.inputDigit = this.inputDigit.substring(0, 1) + ' ' +
              this.inputDigit.substring(2, this.inputDigit.length);
            break;
          } else if (i === 1) {
            this.inputDigit = '   ';
            break;
          }
        }
        if (i === this.inputDigit.length - 1) {
          this.inputDigit = this.inputDigit.substring(0, 2) + ' ' +
            this.inputDigit.substring(4, this.inputDigit.length);
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (this.inputDigit[i] === ' ') {
          this.inputDigit = this.inputDigit.substring(0, i) + button + this.inputDigit.substring(i + 1, this.inputDigit.length);
          break;
        }
      }
    }
    // 変更後のものをemit
    console.log(this.inputDigit);
    this.inputNumber.emit(this.inputDigit);
  }

  // リセット
  reset(): void {
    this.inputDigit = '   ';
    this.inputNumber.emit(this.inputDigit);
  }

  // 数値のセット
  set(value: string): void {
    this.inputDigit = value;
    this.inputNumber.emit(this.inputDigit);
  }

  // 数値のセット(発火せず)
  setNoEmit(value: string): void {
    this.inputDigit = value;
  }

}
