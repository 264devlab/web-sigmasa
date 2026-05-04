import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ProjectModalService } from '../../../core/services/project-modal.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, I18nPipe, UpperCasePipe],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss'
})
export class ProjectModalComponent {
  modalService = inject(ProjectModalService);

  currentSlide = signal(0); // For info carousel (mobile)
  currentImageIndex = signal(0); // For image carousel
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  close() {
    this.modalService.close();
    this.currentSlide.set(0);
    this.currentImageIndex.set(0);
  }

  nextImage() {
    const images = this.modalService.selectedProject()?.images || [];
    if (images.length > 0) {
      this.currentImageIndex.update(i => (i + 1) % images.length);
    }
  }

  prevImage() {
    const images = this.modalService.selectedProject()?.images || [];
    if (images.length > 0) {
      this.currentImageIndex.update(i => (i - 1 + images.length) % images.length);
    }
  }

  goToImage(index: number) {
    this.currentImageIndex.set(index);
  }

  nextSlide() {
    if (this.currentSlide() < 1) {
      this.currentSlide.update(s => s + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide() > 0) {
      this.currentSlide.update(s => s - 1);
    }
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const threshold = 50;
    if (this.touchStartX - this.touchEndX > threshold) {
      this.nextSlide();
    } else if (this.touchEndX - this.touchStartX > threshold) {
      this.prevSlide();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.close();
  }
}
