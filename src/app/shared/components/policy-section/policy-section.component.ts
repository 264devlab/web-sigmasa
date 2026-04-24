import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { RevealDirective } from '../../directives/reveal.directive';
import { PolicyModalService } from '../../../core/services/policy-modal.service';

@Component({
  selector: 'app-policy-section',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent, I18nPipe, RevealDirective],
  templateUrl: './policy-section.html',
  styleUrl: './policy-section.scss'
})
export class PolicySectionComponent {
  private policyModalService = inject(PolicyModalService);

  openPolicyModal() {
    this.policyModalService.open();
  }
}
