import { inject, Injectable, computed } from '@angular/core';
import { I18nService } from '../../shared/i18n/i18n.service';
import { HeroSlide } from '../../shared/components/carousel/carousel.component';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  private i18n = inject(I18nService);

  heroSlides = computed<HeroSlide[]>(() => [
    {
      title: this.i18n.translate('hero.slides.legislature_annex.title')(),
      description: this.i18n.translate('hero.slides.legislature_annex.description')(),
      backgroundImage: 'assets/images/anexo_legislatura.svg',
      buttonText: this.i18n.translate('hero.slides.legislature_annex.button')(),
      buttonLink: '/proyectos'
    },
    {
      title: this.i18n.translate('hero.slides.ayres_village_gallery.title')(),
      description: this.i18n.translate('hero.slides.ayres_village_gallery.description')(),
      backgroundImage: 'assets/images/galeria_ayres_village.svg',
      buttonText: this.i18n.translate('hero.slides.ayres_village_gallery.button')(),
      buttonLink: '/mineria'
    },
    {
      title: this.i18n.translate('hero.slides.ayres_village_neighborhood.title')(),
      description: this.i18n.translate('hero.slides.ayres_village_neighborhood.description')(),
      backgroundImage: 'assets/images/barrio_ayres_village.svg',
      buttonText: this.i18n.translate('hero.slides.ayres_village_neighborhood.button')(),
      buttonLink: '/servicios'
    },
    {
      title: this.i18n.translate('hero.slides.los_molinos_neighborhood.title')(),
      description: this.i18n.translate('hero.slides.los_molinos_neighborhood.description')(),
      backgroundImage: 'assets/images/barrio_los_molinos.svg',
      buttonText: this.i18n.translate('hero.slides.los_molinos_neighborhood.button')(),
      buttonLink: '/proyectos'
    },
    {
      title: this.i18n.translate('hero.slides.skate_park.title')(),
      description: this.i18n.translate('hero.slides.skate_park.description')(),
      backgroundImage: 'assets/images/skatepark.svg',
      buttonText: this.i18n.translate('hero.slides.skate_park.button')(),
      buttonLink: '/proyectos'
    }
  ]);

  projects1Slides = computed<HeroSlide[]>(() => [
    {
      title: this.i18n.translate('projects_1.centauri_adium.title')(),
      description: this.i18n.translate('projects_1.centauri_adium.description')(),
      backgroundImage: 'assets/images/project_centauri_adium.png',
      buttonText: this.i18n.translate('projects_1.centauri_adium.button')(),
      buttonLink: '/proyectos'
    },
    {
      title: this.i18n.translate('projects_1.los_molinos.title')(),
      description: this.i18n.translate('projects_1.los_molinos.description')(),
      backgroundImage: 'assets/images/barrio_los_molinos_2.png',
      buttonText: this.i18n.translate('projects_1.los_molinos.button')(),
      buttonLink: '/proyectos'
    },
    {
      title: this.i18n.translate('projects_1.punta_negra.title')(),
      description: this.i18n.translate('projects_1.punta_negra.description')(),
      backgroundImage: 'assets/images/planta_potabilizadora_dique_punta_negra.png',
      buttonText: this.i18n.translate('projects_1.punta_negra.button')(),
      buttonLink: '/proyectos'
    },
    {
      title: this.i18n.translate('projects_1.linea_132.title')(),
      description: this.i18n.translate('projects_1.linea_132.description')(),
      backgroundImage: 'assets/images/linea_132.png',
      buttonText: this.i18n.translate('projects_1.linea_132.button')(),
      buttonLink: '/proyectos'
    }
  ]);

  projects2Slides = computed<HeroSlide[]>(() => [
    {
      title: this.i18n.translate('projects_2.los_azules.title')(),
      description: this.i18n.translate('projects_2.los_azules.description')(),
      backgroundImage: 'assets/images/los_azules.png',
      buttonText: this.i18n.translate('projects_2.los_azules.button')(),
      buttonLink: '/mineria'
    },
    {
      title: this.i18n.translate('projects_2.veladero.title')(),
      description: this.i18n.translate('projects_2.veladero.description')(),
      backgroundImage: 'assets/images/vealdero.png',
      buttonText: this.i18n.translate('projects_2.veladero.button')(),
      buttonLink: '/mineria'
    },
    {
      title: this.i18n.translate('projects_2.hualilan.title')(),
      description: this.i18n.translate('projects_2.hualilan.description')(),
      backgroundImage: 'assets/images/hualilan.png',
      buttonText: this.i18n.translate('projects_2.hualilan.button')(),
      buttonLink: '/mineria'
    }
  ]);
}
