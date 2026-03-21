import { Component, ViewChildren, ViewChild, ElementRef, QueryList, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../i18n/i18n.pipe';

interface Project {
  id: number;
  name: string;
  description: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
}

@Component({
  selector: 'app-projects-map',
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: './projects-map.html',
  styleUrl: './projects-map.scss',
})
export class ProjectsMap {
  @ViewChildren('projectButton') projectButtons!: QueryList<ElementRef<any>>;
  @ViewChild('linesContainer') linesContainer!: ElementRef<any>;
  @ViewChild('mapImage') mapImage!: ElementRef<any>;
  @ViewChild('infoCard') infoCard!: ElementRef<any>;

  projects: Project[] = [
    {
      id: 1,
      name: 'projects-map.items.veladero.name',
      description: 'projects-map.items.veladero.description',
      x: 35,
      y: 25
    },
    {
      id: 2,
      name: 'projects-map.items.solar.name',
      description: 'projects-map.items.solar.description',
      x: 42,
      y: 65
    },
    {
      id: 3,
      name: 'projects-map.items.dique.name',
      description: 'projects-map.items.dique.description',
      x: 45,
      y: 58
    },
    {
      id: 4,
      name: 'projects-map.items.ruta.name',
      description: 'projects-map.items.ruta.description',
      x: 38,
      y: 35
    },
    {
      id: 5,
      name: 'projects-map.items.civic.name',
      description: 'projects-map.items.civic.description',
      x: 48,
      y: 68
    }
  ];

  activeProject: Project | null = null;
  lineStartX: number = 0;
  lineStartY: number = 0;
  lineTargetX: number = 0;
  lineTargetY: number = 0;

  setActiveProject(project: Project | null) {
    this.activeProject = project;
    if (project) {
      // Small delay to ensure the DOM has updated (description revealed)
      // Pass the project explicitly to avoid race conditions with this.activeProject
      setTimeout(() => this.calculateLineTarget(project), 50);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.activeProject) {
      this.calculateLineTarget(this.activeProject);
    }
  }

  calculateLineTarget(project: Project) {
    if (!this.linesContainer || !this.infoCard || !this.mapImage) return;

    const svgElement = this.linesContainer.nativeElement;
    const mapElement = this.mapImage.nativeElement;
    const infoCardElement = this.infoCard.nativeElement;

    if (svgElement && mapElement && infoCardElement) {
      const svgRect = svgElement.getBoundingClientRect();
      const mapRect = mapElement.getBoundingClientRect();
      const infoRect = infoCardElement.getBoundingClientRect();

      // 1. Calculate map dot (Start Point) relative to SVG
      const dotXInPx = mapRect.left - svgRect.left + (mapRect.width * (project.x / 100));
      const dotYInPx = mapRect.top - svgRect.top + (mapRect.height * (project.y / 100));

      // 2. Calculate right-middle point of the info card (Target Point) relative to SVG
      // We point to the right edge of the info card
      const targetXInPx = infoRect.right - svgRect.left;
      const targetYInPx = infoRect.top + (infoRect.height / 2) - svgRect.top;

      // Convert all to percentages for the SVG coordinate system
      this.lineStartX = svgRect.width > 0 ? (dotXInPx / svgRect.width) * 100 : 0;
      this.lineStartY = svgRect.height > 0 ? (dotYInPx / svgRect.height) * 100 : 0;
      this.lineTargetX = svgRect.width > 0 ? (targetXInPx / svgRect.width) * 100 : 0;
      this.lineTargetY = svgRect.height > 0 ? (targetYInPx / svgRect.height) * 100 : 0;
    }
  }
}
