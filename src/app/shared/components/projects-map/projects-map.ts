import {
  Component,
  viewChildren,
  viewChild,
  ElementRef,
  HostListener,
  signal,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  // New Signal-based View Queries
  projectButtons = viewChildren<ElementRef>('projectButton');
  linesContainer = viewChild<ElementRef>('linesContainer');
  mapImage = viewChild<ElementRef>('mapImage');
  infoCard = viewChild<ElementRef>('infoCard');

  projects: Project[] = [
    {
      id: 1,
      name: 'projects-map.items.centauri.name',
      description: 'projects-map.items.centauri.description',
      x: 54,
      y: 78
    },
    {
      id: 2,
      name: 'projects-map.items.legislatura.name',
      description: 'projects-map.items.legislatura.description',
      x: 54,
      y: 73
    },
    {
      id: 3,
      name: 'projects-map.items.ayres-village.name',
      description: 'projects-map.items.ayres-village.description',
      x: 51,
      y: 73
    },
    {
      id: 4,
      name: 'projects-map.items.los-molinos.name',
      description: 'projects-map.items.los-molinos.description',
      x: 53,
      y: 72.5
    },
    {
      id: 5,
      name: 'projects-map.items.acueducto.name',
      description: 'projects-map.items.acueducto.description',
      x: 45,
      y: 67
    },
    {
      id: 6,
      name: 'projects-map.items.linea-132k.name',
      description: 'projects-map.items.linea-132k.description',
      x: 47,
      y: 65
    },
    {
      id: 7,
      name: 'projects-map.items.ayres-del-este.name',
      description: 'projects-map.items.ayres-del-este.description',
      x: 55,
      y: 73
    },
    {
      id: 8,
      name: 'projects-map.items.los-azules.name',
      description: 'projects-map.items.los-azules.description',
      x: 18,
      y: 62
    },
    {
      id: 9,
      name: 'projects-map.items.veladero.name',
      description: 'projects-map.items.veladero.description',
      x: 23,
      y: 27
    },
    {
      id: 10,
      name: 'projects-map.items.hualilan.name',
      description: 'projects-map.items.hualilan.description',
      x: 27,
      y: 56.5
    }
  ];

  // State Signals
  activeProject = signal<Project | null>(null);
  lineStartX = signal(0);
  lineStartY = signal(0);
  lineTargetX = signal(0);
  lineTargetY = signal(0);

  setActiveProject(project: Project | null) {
    this.activeProject.set(project);

    if (project) {
      // Use requestAnimationFrame to ensure the DOM has updated (description revealed)
      // and we avoid NG0100 by deferring calculation to the next frame
      requestAnimationFrame(() => {
        // Re-check if project is still active to avoid race conditions
        if (this.activeProject() === project) {
          this.calculateLineTarget(project);
        }
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    const current = this.activeProject();
    if (current) {
      requestAnimationFrame(() => this.calculateLineTarget(current));
    }
  }

  calculateLineTarget(project: Project) {
    const linesContainer = this.linesContainer();
    const infoCard = this.infoCard();
    const mapImage = this.mapImage();

    if (!linesContainer || !infoCard || !mapImage) return;

    const svgElement = linesContainer.nativeElement;
    const mapElement = mapImage.nativeElement;
    const infoCardElement = infoCard.nativeElement;

    if (svgElement && mapElement && infoCardElement) {
      const svgRect = svgElement.getBoundingClientRect();
      const mapRect = mapElement.getBoundingClientRect();
      const infoRect = infoCardElement.getBoundingClientRect();

      // 1. Calculate map dot (Start Point) relative to SVG
      const dotXInPx = mapRect.left - svgRect.left + mapRect.width * (project.x / 100);
      const dotYInPx = mapRect.top - svgRect.top + mapRect.height * (project.y / 100);

      // 2. Calculate right-middle point of the info card (Target Point) relative to SVG
      const targetXInPx = infoRect.right - svgRect.left;
      const targetYInPx = infoRect.top + infoRect.height / 2 - svgRect.top;

      // Update Signals
      this.lineStartX.set(svgRect.width > 0 ? (dotXInPx / svgRect.width) * 100 : 0);
      this.lineStartY.set(svgRect.height > 0 ? (dotYInPx / svgRect.height) * 100 : 0);
      this.lineTargetX.set(svgRect.width > 0 ? (targetXInPx / svgRect.width) * 100 : 0);
      this.lineTargetY.set(svgRect.height > 0 ? (targetYInPx / svgRect.height) * 100 : 0);

      // In Zoneless, we manually trigger a change detection cycle here to ensure
      // the new coordinates are picked up immediately and safely.
      this.cdr.detectChanges();
    }
  }
}
