import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyModalService } from '../../../core/services/policy-modal.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-policy-modal',
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: './policy-modal.html',
  styleUrl: './policy-modal.scss'
})
export class PolicyModalComponent {
  modalService = inject(PolicyModalService);
  i18n = inject(I18nService);

  get points(): string[] {
    const translation = this.i18n.translate('policy.modal.points')();
    return Array.isArray(translation) ? translation : [];
  }

  close() {
    this.modalService.close();
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.close();
  }
}
