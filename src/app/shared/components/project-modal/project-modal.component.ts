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

  currentSlide = signal(0);
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  close() {
    this.modalService.close();
    this.currentSlide.set(0); // Reset slide on close
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
