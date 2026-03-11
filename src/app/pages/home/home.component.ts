import { Component, inject } from '@angular/core';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { ProjectsMap } from '../../shared/components/projects-map/projects-map';
import { ClientsComponent } from '../../shared/components/clients/clients.component';
import { ProjectsSectionComponent } from '../../shared/components/projects-section/projects-section.component';
import { CarouselComponent, HeroSlide } from '../../shared/components/carousel/carousel.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { ServicesComponent } from '../../shared/components/services/services.component';

@Component({
  selector: 'app-home',
  imports: [I18nPipe, ProjectsMap, ClientsComponent, ProjectsSectionComponent, CarouselComponent, ServicesComponent],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class HomeComponent {
  private i18n = inject(I18nService);

  get heroSlides(): HeroSlide[] {
    const isEs = this.i18n.currentLang() === 'es';

    return [
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
    ];
  }
}
