import { Component, HostListener, OnInit, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
}

@Component({
    selector: 'app-projects-gallery',
    standalone: true,
    imports: [CommonModule, I18nPipe],
    templateUrl: './projects-gallery.component.html',
    styleUrl: './projects-gallery.component.scss'
})
export class ProjectsGalleryComponent implements OnInit {
    private i18nService = inject(I18nService);

    projects = computed(() => {
        const items = (this.i18nService.translate('projects.items')() as unknown) as any[];
        if (!Array.isArray(items)) return [];

        return items.map((item, i) => ({
            id: i + 1,
            name: item.name,
            description: item.description,
            image: `assets/images/projects/project-${i + 1}.webp`
        }));
    });

    currentPage = signal(1);
    itemsPerPage = signal(6);
    isAnimating = signal(false);

    private touchStartX: number = 0;
    private touchEndX: number = 0;
    private imageCache: HTMLImageElement[] = [];

    constructor() {
        // Preload all images whenever the projects list changes
        effect(() => {
            const currentProjects = this.projects();
            if (currentProjects.length > 0) {
                this.preloadImages(currentProjects);
            }
        });
    }

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

    private preloadImages(projects: any[]): void {
        projects.forEach(project => {
            // Check if already preloaded
            if (!this.imageCache.some(img => img.src.includes(project.image))) {
                const img = new Image();
                img.src = project.image;
                this.imageCache.push(img);
            }
        });
    }
}
