import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-icon-button',
  templateUrl: './label-icon-button.component.html',
  styleUrls: ['./label-icon-button.component.scss']
})
export class LabelIconButtonComponent {

  constructor() { }

  @Input() size: string;
  @Input() color: string;
  @Input() icon: string;
  @Input() text: string;

  get style(): string {
    return `${this.size} ${this.color}`;
  }

}


