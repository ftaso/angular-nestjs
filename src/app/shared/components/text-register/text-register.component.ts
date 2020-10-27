import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-register',
  templateUrl: './text-register.component.html',
  styleUrls: ['./text-register.component.scss']
})
export class TextRegisterComponent {
  constructor() { }

  @Input() size: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Output() registText = new EventEmitter();

  get style(): string {
    return `${this.size}`;
  }

  regist(): void {
    if (this.value === '') {
      return;
    }
    this.registText.emit(this.value);
    // 複数回押されるのを防止するため
    this.value = '';
  }

}
