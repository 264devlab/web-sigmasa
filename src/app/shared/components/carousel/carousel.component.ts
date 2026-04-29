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
    @Input() icon: boolean = false;
    @Input() interval: number = 5000;
    @Input() set slides(value: HeroSlide[]) {
        this.allSlides.set(value);
    }

    allSlides = signal<HeroSlide[]>([]);
    
    // Computed array with clones for infinite effect
    extendedSlides = computed(() => {
        const s = this.allSlides();
        if (s.length === 0) return [];
        return [s[s.length - 1], ...s, s[0]];
    });

    currentIndex = signal(1); // Start at the first real slide
    isTransitioning = signal(true);
    
    // Helper to get real index for dots
    realIndex = computed(() => {
        const s = this.allSlides();
        if (s.length === 0) return 0;
        return (this.currentIndex() - 1 + s.length) % s.length;
    });
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
        if (!this.isTransitioning()) return;
        this.currentIndex.update((index) => index + 1);
        this.resetAutoPlay();
    }

    prevSlide() {
        if (!this.isTransitioning()) return;
        this.currentIndex.update((index) => index - 1);
        this.resetAutoPlay();
    }

    onTransitionEnd() {
        const slidesCount = this.allSlides().length;
        
        if (this.currentIndex() === slidesCount + 1) {
            // Jump from last-clone to first-real
            this.isTransitioning.set(false);
            this.currentIndex.set(1);
            // Re-enable transition after the jump
            setTimeout(() => this.isTransitioning.set(true), 20);
        } else if (this.currentIndex() === 0) {
            // Jump from first-clone to last-real
            this.isTransitioning.set(false);
            this.currentIndex.set(slidesCount);
            // Re-enable transition after the jump
            setTimeout(() => this.isTransitioning.set(true), 20);
        }
    }

    goToSlide(index: number) {
        this.currentIndex.set(index + 1);
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
