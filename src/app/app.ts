import { Component, AfterViewInit, signal, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { ProjectModalComponent } from './shared/components/project-modal/project-modal.component';
import { PolicyModalComponent } from './shared/components/policy-modal/policy-modal.component';
import { ProjectModalService } from './core/services/project-modal.service';
import { CommonModule } from '@angular/common';

import { PreloaderComponent } from './shared/components/preloader/preloader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProjectModalComponent, PolicyModalComponent, CommonModule, PreloaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('web-sigmasa');
  modalService = inject(ProjectModalService);

  private navbarHeight = 65;

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);

          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - this.navbarHeight;

            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
        });
      }
    });
  }
}
