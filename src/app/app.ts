import { Component, AfterViewInit, signal } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('web-sigmasa');

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
