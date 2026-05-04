import { Injectable, signal } from '@angular/core';

export interface Project {
  id: string | number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  estado?: string;
  localidad?: string;
  superficie?: string;
  comitente?: string;
  empresa?: string;
  status?: string;
  location?: string;
  surface_area?: string;
  client?: string;
  company?: string;
  // Additional fields for the modal
  fecha?: string;
  date?: string;
  extra_description?: string;
  descripcion_ampliada?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectModalService {
  private _isOpen = signal(false);
  private _selectedProject = signal<Project | null>(null);

  isOpen = this._isOpen.asReadonly();
  selectedProject = this._selectedProject.asReadonly();

  open(project: Project) {
    this._selectedProject.set(project);
    this._isOpen.set(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  close() {
    this._isOpen.set(false);
    this._selectedProject.set(null);
    document.body.style.overflow = ''; // Restore scrolling
  }
}
