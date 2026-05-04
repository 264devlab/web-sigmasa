import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsGalleryComponent } from '../projects-gallery/projects-gallery.component';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-projects-section',
    standalone: true,
    imports: [CommonModule, ProjectsGalleryComponent, I18nPipe, RevealDirective],
    templateUrl: './projects-section.component.html',
    styleUrl: './projects-section.component.scss'
})
export class ProjectsSectionComponent { }
