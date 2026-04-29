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
    'assets/logos/clientes/Legislatura San Juan.svg',
    'assets/logos/clientes/IPV.svg',
    'assets/logos/clientes/OSSE.svg',
    'assets/logos/clientes/veladero.svg',
    'assets/logos/clientes/LosAzules-1.svg',
    'assets/logos/clientes/epse.svg',
    'assets/logos/clientes/barrick.svg',
    'assets/logos/clientes/MinasArgentinas.svg',
    'assets/logos/clientes/ngex-minerals-.svg',
    'assets/logos/clientes/GobiernoSanJuan.svg',
  ];

  // Doubling the logos to create the infinite scroll effect
  scrollingLogos = [...this.logos, ...this.logos];
}
