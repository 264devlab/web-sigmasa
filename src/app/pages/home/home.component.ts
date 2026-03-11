import { Component, inject } from '@angular/core';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { ProjectsMap } from '../../shared/components/projects-map/projects-map';
import { ClientsComponent } from '../../shared/components/clients/clients.component';
import { CarouselComponent, HeroSlide } from '../../shared/components/carousel/carousel.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { ServicesComponent } from '../../shared/components/services/services.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [I18nPipe, ProjectsMap, ClientsComponent, CarouselComponent, ServicesComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class HomeComponent {
  private i18n = inject(I18nService);

  get heroSlides(): HeroSlide[] {
    const isEs = this.i18n.currentLang() === 'es';

    return [
      {
        title: this.i18n.translate('hero_title')(),
        description: this.i18n.translate('hero_description')(),
        backgroundImage: 'assets/images/build.jpg',
        buttonText: this.i18n.translate('hero_button')(),
        buttonLink: '/proyectos'
      },
      {
        title: isEs ? 'Minería Sustentable' : 'Sustainable Mining',
        description: isEs
          ? 'Comprometidos con el desarrollo responsable y la innovación tecnológica en San Juan.'
          : 'Committed to responsible development and technological innovation in San Juan.',
        backgroundImage: 'assets/images/build.jpg',
        buttonText: isEs ? 'Conocer más' : 'Learn more',
        buttonLink: '/mineria'
      },
      {
        title: isEs ? 'Energías Renovables' : 'Renewable Energies',
        description: isEs
          ? 'Liderando la transición hacia un futuro energético más limpio y eficiente para todos.'
          : 'Leading the transition towards a cleaner and more efficient energy future for all.',
        backgroundImage: 'assets/images/build.jpg',
        buttonText: isEs ? 'Ver energía' : 'View energy',
        buttonLink: '/servicios'
      },
      {
        title: isEs ? 'Arquitectura Moderna' : 'Modern Architecture',
        description: isEs
          ? 'Diseñamos espacios innovadores que transforman el entorno urbano de nuestra provincia.'
          : 'We design innovative spaces that transform the urban environment of our province.',
        backgroundImage: 'assets/images/build.jpg',
        buttonText: isEs ? 'Explorar diseños' : 'Explore designs',
        buttonLink: '/proyectos'
      }
    ];
  }
}
