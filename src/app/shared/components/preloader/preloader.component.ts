import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit, OnDestroy {
  isLoading = signal(true);

  ngOnInit() {
    // La animación de carga dura siempre exactamente 3 segundos
    setTimeout(() => {
      this.finishLoading();
    }, 4000);
  }

  finishLoading() {
    this.isLoading.set(false);
  }

  ngOnDestroy() { }
}
