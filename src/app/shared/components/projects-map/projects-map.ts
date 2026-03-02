import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './projects-map.html',
  styleUrl: './projects-map.scss',
})
export class ProjectsMap {
  projects: Project[] = [
    {
      id: 1,
      name: 'Proyecto Minero Veladero',
      description: 'Extracción de oro y plata en la cordillera de los Andes.',
      x: 35,
      y: 25
    },
    {
      id: 2,
      name: 'Parque Solar Ullum',
      description: 'Generación de energía renovable a gran escala.',
      x: 42,
      y: 65
    },
    {
      id: 3,
      name: 'Dique Caracoles',
      description: 'Aprovechamiento hidroeléctrico y riego sobre el río San Juan.',
      x: 45,
      y: 58
    },
    {
      id: 4,
      name: 'Ruta Nacional 150',
      description: 'Conexión vial estratégica del corredor bioceánico.',
      x: 38,
      y: 35
    },
    {
      id: 5,
      name: 'Centro Cívico San Juan',
      description: 'Edificio administrativo central de la provincia.',
      x: 48,
      y: 68
    }
  ];

  activeProject: Project | null = null;

  setActiveProject(project: Project | null) {
    this.activeProject = project;
  }
}
