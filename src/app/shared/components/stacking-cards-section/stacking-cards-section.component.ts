import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { StackingCardComponent } from "./stacking-card/stacking-card";

@Component({
  selector: 'app-stacking-cards-section',
  standalone: true,
  imports: [CommonModule, StackingCardComponent, I18nPipe],
  templateUrl: './stacking-cards-section.component.html',
  styleUrl: './stacking-cards-section.component.scss',
})
export class StackingCardsSectionComponent {
  cards = [
    {
      titleKey: 'about.history.title',
      descriptionKey: 'about.history.description'
    },
    {
      titleKey: 'about.mission.title',
      descriptionKey: 'about.mission.description'
    },
    {
      titleKey: 'about.vision.title',
      descriptionKey: 'about.vision.description'
    },
    {
      titleKey: 'about.values.title',
      descriptionKey: 'about.values.description'
    }
  ];
}
