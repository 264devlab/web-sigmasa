import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-policy-section',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent, I18nPipe, RevealDirective],
  templateUrl: './policy-section.html',
  styleUrl: './policy-section.scss'
})
export class PolicySectionComponent { }
