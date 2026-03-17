import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterModule, ActionButtonComponent, RevealDirective],
    templateUrl: './hero.html',
    styleUrl: './hero.scss',
})
export class HeroComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() backgroundImage: string = '';
    @Input() buttonLink: string = '/';
    @Input() buttonText: string = 'Ver más';
}
