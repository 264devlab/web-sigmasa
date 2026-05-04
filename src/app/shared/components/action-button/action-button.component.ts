import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() link: string = '';
    @Output() onClick = new EventEmitter<void>();

    onButtonClick(event: Event) {
        if (this.onClick.observed) {
            event.preventDefault();
            this.onClick.emit();
        }
    }
}
