import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { ServiceCardComponent } from './service-card/service-card.component';

interface ServiceItem {
    icon: string;
    titleKey: string;
    descriptionKey: string;
}

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, I18nPipe, ServiceCardComponent],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss'
})
export class ServicesComponent {
    services: ServiceItem[] = [
        {
            icon: 'assets/icons/ingieneria.svg',
            titleKey: 'services.engineering.title',
            descriptionKey: 'services.engineering.description'
        },
        {
            icon: 'assets/icons/construccion.svg',
            titleKey: 'services.construction.title',
            descriptionKey: 'services.construction.description'
        },
        {
            icon: 'assets/icons/desarrollos.svg',
            titleKey: 'services.real-estate.title',
            descriptionKey: 'services.real-estate.description'
        },
        {
            icon: 'assets/icons/arquitectura.svg',
            titleKey: 'services.architecture.title',
            descriptionKey: 'services.architecture.description'
        },
        {
            icon: 'assets/icons/mineria.svg',
            titleKey: 'services.mining.title',
            descriptionKey: 'services.mining.description'
        },
        {
            icon: 'assets/icons/equipos.svg',
            titleKey: 'services.equipment.title',
            descriptionKey: 'services.equipment.description'
        }
    ];
}
