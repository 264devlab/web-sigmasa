import { Component, inject } from '@angular/core';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { ProjectsMap } from '../../shared/components/projects-map/projects-map';
import { ClientsComponent } from '../../shared/components/clients/clients.component';
import { ProjectsSectionComponent } from '../../shared/components/projects-section/projects-section.component';
import { CarouselComponent, HeroSlide } from '../../shared/components/carousel/carousel.component';
import { ServicesComponent } from '../../shared/components/services/services.component';
import { ContactSectionComponent } from '../../shared/components/contact-section/contact-section.component';
import { HomeDataService } from './home-data.service';

@Component({
  selector: 'app-home',
  imports: [ProjectsMap, ClientsComponent, ProjectsSectionComponent, CarouselComponent, ServicesComponent, ContactSectionComponent],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class HomeComponent {
  public homeData = inject(HomeDataService);
}
