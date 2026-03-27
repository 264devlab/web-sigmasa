import { Component, Input, OnInit, OnDestroy, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { ProjectModalService } from '../../../core/services/project-modal.service';

export interface HeroSlide {
    title: string;
    description: string;
    backgroundImage: string;
    buttonText: string;

    project?: any;
}

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, HeroComponent],
    templateUrl: './carousel.html',
    styleUrl: './carousel.scss',
})
export class CarouselComponent implements OnInit, OnDestroy {
    @Input() slides: HeroSlide[] = [];
    @Input() interval: number = 5000;
    @Input() icon: boolean = false;

    // Track the actual index including clones for infinite scroll
    // For a truly smooth "circular" effect without jump back, 
    // we would need clones. But with current structure, modulo is simpler.
    // To satisfy "same direction", we keep modulo.
    currentIndex = signal(0);
    private autoPlayInterval: any;
    private touchStartX: number = 0;
    private touchEndX: number = 0;
    private modalService = inject(ProjectModalService);

    constructor() {
        effect(() => {
            if (this.modalService.isOpen()) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }

    ngOnInit() {
        // startAutoPlay is handled by the effect in the constructor
    }

    ngOnDestroy() {
        this.stopAutoPlay();
    }

    nextSlide() {
        this.currentIndex.update((index) => (index + 1) % this.slides.length);
        this.resetAutoPlay();
    }

    prevSlide() {
        this.currentIndex.update((index) => (index - 1 + this.slides.length) % this.slides.length);
        this.resetAutoPlay();
    }

    goToSlide(index: number) {
        this.currentIndex.set(index);
        this.resetAutoPlay();
    }

    private startAutoPlay() {
        if (this.modalService.isOpen() || this.autoPlayInterval) return;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }

    private stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    private resetAutoPlay() {
        this.stopAutoPlay();
        if (!this.modalService.isOpen()) {
            this.startAutoPlay();
        }
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
            this.nextSlide();
        } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
            this.prevSlide();
        }
    }
}
