import { Component, HostListener, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
}

@Component({
    selector: 'app-projects-gallery',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects-gallery.component.html',
    styleUrl: './projects-gallery.component.scss'
})
export class ProjectsGalleryComponent implements OnInit {
    projects: Project[] = Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        name: `Proyecto ${i + 1}`,
        description: 'Descripción breve del proyecto realizado con excelencia técnica.',
        image: `assets/images/projects/project-${i + 1}.png`
    }));

    currentPage = signal(1);
    itemsPerPage = signal(6);
    isAnimating = signal(false);

    private touchStartX: number = 0;
    private touchEndX: number = 0;

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

    totalPages = computed(() => Math.ceil(this.projects.length / this.itemsPerPage()));

    paginatedProjects = computed(() => {
        const start = (this.currentPage() - 1) * this.itemsPerPage();
        return this.projects.slice(start, start + this.itemsPerPage());
    });

    changePage(page: number): void {
        if (this.isAnimating()) return;
        this.triggerAnimation();
        setTimeout(() => {
            this.currentPage.set(page);
            const element = document.getElementById('projects-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }

    nextPage(): void {
        if (this.isAnimating()) return;
        this.triggerAnimation();
        setTimeout(() => {
            if (this.currentPage() < this.totalPages()) {
                this.currentPage.update(p => p + 1);
            } else {
                this.currentPage.set(1);
            }
        }, 300);
    }

    prevPage(): void {
        if (this.isAnimating()) return;
        this.triggerAnimation();
        setTimeout(() => {
            if (this.currentPage() > 1) {
                this.currentPage.update(p => p - 1);
            } else {
                this.currentPage.set(this.totalPages());
            }
        }, 300);
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
}
