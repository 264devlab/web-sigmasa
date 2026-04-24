import { inject, Injectable, computed } from '@angular/core';
import { I18nService } from '../../shared/i18n/i18n.service';
import { HeroSlide } from '../../shared/components/carousel/carousel.component';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  private i18n = inject(I18nService);

  private getProjectSlides(sectionKey: string): HeroSlide[] {
    const slideIds = this.i18n.translate(sectionKey)() as unknown as string[];
    const projects = this.i18n.translate('projects.items')() as unknown as any[];
    
    if (!Array.isArray(slideIds) || !Array.isArray(projects)) return [];

    return slideIds.map(id => {
      const project = projects.find(p => p.id === id);
      return {
        title: project?.name || '',
        description: project?.description || '',
        backgroundImage: project?.image || '',
        buttonText: project?.button || this.i18n.translate('projects.read-more')(),

        project: project
      };
    });
  }

  heroSlides = computed<HeroSlide[]>(() => this.getProjectSlides('hero.slides'));
  projects1Slides = computed<HeroSlide[]>(() => this.getProjectSlides('projects_1.slides'));
  projects2Slides = computed<HeroSlide[]>(() => this.getProjectSlides('projects_2.slides'));
}
