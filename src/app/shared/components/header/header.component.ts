import { Component, inject, signal, afterNextRender, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { I18nService } from '../../i18n/i18n.service';
import { RouterLink } from '@angular/router';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-header',
  imports: [RouterLink, I18nPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnDestroy {
  private i18nService = inject(I18nService);
  private document = inject(DOCUMENT);

  isMenuOpen = false;
  activeSection = signal<string>('');
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();
    });
  }

  get currentLang() {
    return this.i18nService.currentLang();
  }

  switchLanguage(lang: 'es' | 'en') {
    this.i18nService.setLanguage(lang);
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    this.isMenuOpen = false;
    
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL natively avoiding reload
      history.replaceState(null, '', `#${sectionId}`);
      this.activeSection.set(sectionId);
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      // Adjust trigger margin to evaluate intersection a bit below the header
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const intersectingSections = new Set<string>();

    this.observer = new IntersectionObserver((entries) => {
      let isChanged = false;

      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        if (entry.isIntersecting) {
          intersectingSections.add(id);
          this.activeSection.set(id);
          history.replaceState(null, '', `#${id}`);
          isChanged = true;
        } else {
          // If a section leaves the viewport, remove it from the active set
          if (intersectingSections.has(id)) {
            intersectingSections.delete(id);
            isChanged = true;
          }
        }
      });

      // If no sections are intersecting anymore, clear the active section
      if (isChanged && intersectingSections.size === 0) {
        this.activeSection.set('');
        history.replaceState(null, '', ' '); // Clear fragment
      }

    }, options);

    // List of sections to monitor
    const sections = ['home', 'services', 'projects', 'mining'];
    sections.forEach(id => {
      const el = this.document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
      }
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
