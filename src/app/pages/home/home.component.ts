import { Component } from '@angular/core';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { ProjectsMap } from '../../shared/components/projects-map/projects-map';

@Component({
  selector: 'app-home',
  imports: [I18nPipe, ProjectsMap],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
