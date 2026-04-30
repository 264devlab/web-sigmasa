import { Component, HostListener, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { ProjectModalService } from '../../../core/services/project-modal.service';

interface Project {
    id: string | number;
    name: string;
    description: string;
    image: string;
    estado?: string;
    localidad?: string;
    superficie?: string;
    comitente?: string;
    status?: string;
    location?: string;
    surface_area?: string;
    client?: string;
}

@Component({
    selector: 'app-projects-gallery',
    standalone: true,
    imports: [CommonModule, I18nPipe, NgOptimizedImage],
    templateUrl: './projects-gallery.component.html',
    styleUrl: './projects-gallery.component.scss'
})
export class ProjectsGalleryComponent implements OnInit {
    private i18nService = inject(I18nService);
    private modalService = inject(ProjectModalService);

    projects = computed(() => {
        const items = (this.i18nService.translate('projects.items')() as unknown) as any[];
        if (!Array.isArray(items)) return [];

        return items.map((item, i) => ({
            ...item,
            id: item.id || i + 1,
            image: item.image || `assets/images/projects/project-${i + 1}.webp`,
        }));
    });

    currentPage = signal(1);
    itemsPerPage = signal(6);
    isAnimating = signal(false);

    private touchStartX: number = 0;
    private touchEndX: number = 0;

    constructor() {}

    ngOnInit(): void {
        this.updateItemsPerPage();
    }

    @HostListener('window:resize')
    onResize(): void {
        this.updateItemsPerPage();
    }

    private updateItemsPerPage(): void {
        const wasMobile = this.itemsPerPage() === 3;
        const newVal = window.innerWidth < 768 ? 3 : 6;

        if (wasMobile !== (newVal === 3)) {
            this.itemsPerPage.set(newVal);
            this.currentPage.set(1);
        }
    }

    totalPages = computed(() => Math.ceil(this.projects().length / this.itemsPerPage()));

    paginatedProjects = computed(() => {
        const start = (this.currentPage() - 1) * this.itemsPerPage();
        return this.projects().slice(start, start + this.itemsPerPage());
    });

    changePage(page: number): void {
        if (this.isAnimating()) return;
        this.triggerAnimation();
        this.currentPage.set(page);
        const element = document.getElementById('projects-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    nextPage(): void {
        if (this.isAnimating()) return;
        this.triggerAnimation();
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
        } else {
            this.currentPage.set(1);
        }
    }

    prevPage(): void {
        if (this.isAnimating()) return;
        this.triggerAnimation();
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
        } else {
            this.currentPage.set(this.totalPages());
        }
    }

    private triggerAnimation(): void {
        this.isAnimating.set(true);
        setTimeout(() => this.isAnimating.set(false), 600);
    }

    openProject(project: any): void {
        this.modalService.open(project);
    }

    onTouchStart(event: TouchEvent): void {
        this.touchStartX = event.changedTouches[0].screenX;
    }

    onTouchEnd(event: TouchEvent): void {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
    }

    private handleSwipe(): void {
        const swipeThreshold = 50;
        if (this.touchStartX - this.touchEndX > swipeThreshold) {
            this.nextPage();
        } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
            this.prevPage();
        }
    }


}
