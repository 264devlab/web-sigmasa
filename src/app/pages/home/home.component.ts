import { Component } from '@angular/core';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { ProjectsMap } from '../../shared/components/projects-map/projects-map';
import { ClientsComponent } from '../../shared/components/clients/clients.component';
import { ProjectsSectionComponent } from '../../shared/components/projects-section/projects-section.component';

@Component({
  selector: 'app-home',
  imports: [I18nPipe, ProjectsMap, ClientsComponent, ProjectsSectionComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
