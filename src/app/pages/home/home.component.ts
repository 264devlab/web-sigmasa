import { Component } from '@angular/core';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';

@Component({
  selector: 'app-home',
  imports: [I18nPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
