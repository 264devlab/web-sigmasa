import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [I18nPipe, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent { }
