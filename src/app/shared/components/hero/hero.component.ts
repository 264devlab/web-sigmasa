import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { NgOptimizedImage } from '@angular/common';
import { ProjectModalService } from '../../../core/services/project-modal.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterModule, ActionButtonComponent, RevealDirective, NgOptimizedImage],
    templateUrl: './hero.html',
    styleUrl: './hero.scss',
})
export class HeroComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() backgroundImage: string = '';
    @Input() priority: boolean = false;

    @Input() buttonText: string = 'Ver más';
    @Input() project?: any;

    private modalService = inject(ProjectModalService);

    openModal() {
        if (this.project) {
            this.modalService.open(this.project);
        }
    }

    onImageLoad() {
        const img = document.querySelector('.hero-img[src*="' + this.backgroundImage + '"]');
        if (img) {
            img.classList.add('loaded');
        }
    }
}
