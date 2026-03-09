import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, I18nPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private i18nService = inject(I18nService);

  isMenuOpen = false;

  get currentLang() {
    return this.i18nService.currentLang();
  }

  switchLanguage(lang: 'es' | 'en') {
    this.i18nService.setLanguage(lang);
    this.isMenuOpen = false;
  }
}
