import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() size: string;
  @Input() color: string;
  @Input() label: string;

  get style(): string {
    return `${this.size} ${this.color}`;
  }
}
