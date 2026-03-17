import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  logos: string[] = [
    'assets/logos/clientes/adium.svg',
    'assets/logos/clientes/barrick.svg',
    'assets/logos/clientes/impregilo.svg',
    'assets/logos/clientes/isolux-corsan.svg',
    'assets/logos/clientes/libertad.svg',
    'assets/logos/clientes/salentein.svg',
    'assets/logos/clientes/yamana_gold.svg',
  ];

  // Doubling the logos to create the infinite scroll effect
  scrollingLogos = [...this.logos, ...this.logos];
}
