import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../../i18n/i18n.pipe';

@Component({
    selector: 'app-service-card',
    standalone: true,
    imports: [CommonModule, I18nPipe],
    templateUrl: './service-card.component.html',
    styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
    @Input() icon: string = '';
    @Input() titleKey: string = '';
    @Input() descriptionKey: string = '';

    /**
     * Replaces **"text"** with <strong>"text"</strong> to render bold text in descriptions
     */
    formatDescription(text: string): string {
        if (!text) return '';
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
}
