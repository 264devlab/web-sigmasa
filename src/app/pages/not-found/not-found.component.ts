import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { ActionButtonComponent } from '../../shared/components/action-button/action-button.component';
import { I18nService } from '../../shared/i18n/i18n.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, I18nPipe, ActionButtonComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFoundComponent {
  private i18n = inject(I18nService);

  get backHomeText() {
    return this.i18n.translate('notfound.backHome')();
  }
}
