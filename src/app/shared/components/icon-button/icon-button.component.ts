import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() size: string;
  @Input() color: string;
  @Input() icon: string;

  get style(): string {
    return `${this.size} ${this.color}`;
  }
}
