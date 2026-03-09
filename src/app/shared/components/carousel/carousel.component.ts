import { Component, Input, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';

export interface HeroSlide {
    title: string;
    description: string;
    backgroundImage: string;
    buttonText: string;
    buttonLink: string;
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

    // Track the actual index including clones for infinite scroll
    // For a truly smooth "circular" effect without jump back, 
    // we would need clones. But with current structure, modulo is simpler.
    // To satisfy "same direction", we keep modulo.
    currentIndex = signal(0);
    private autoPlayInterval: any;

    ngOnInit() {
        this.startAutoPlay();
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
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }

    private stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    private resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}
