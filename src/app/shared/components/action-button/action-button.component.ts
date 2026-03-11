import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-action-button',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './action-button.html',
    styleUrl: './action-button.scss'
})
export class ActionButtonComponent {
    @Input() text: string = '';
    @Input() link: string = '/';
}
