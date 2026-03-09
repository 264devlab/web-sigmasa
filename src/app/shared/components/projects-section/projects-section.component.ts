import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsGalleryComponent } from '../projects-gallery/projects-gallery.component';

@Component({
    selector: 'app-projects-section',
    standalone: true,
    imports: [CommonModule, ProjectsGalleryComponent],
    templateUrl: './projects-section.component.html',
    styleUrl: './projects-section.component.scss'
})
export class ProjectsSectionComponent { }
