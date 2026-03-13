import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stacking-card',
  standalone: true,
  templateUrl: './stacking-card.html',
  styleUrl: './stacking-card.scss',
})
export class StackingCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() index: number = 0;
}
