import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class I18nService {
  
  private http = inject(HttpClient);

  // Idioma actual
  currentLang = signal<'es' | 'en'>('es');

  // Diccionario cargado
  private translations = signal<Record<string, string>>({});

  constructor() {
    this.loadLanguage(this.currentLang());
  }

  // Cambia idioma y recarga JSON
  setLanguage(lang: 'es' | 'en') {
    this.currentLang.set(lang);
    this.loadLanguage(lang);
  }

  // Carga JSON de traducciones
  private loadLanguage(lang: string) {
    this.http.get<Record<string, string>>(`/assets/languages/${lang}.json`)
      .subscribe(data => this.translations.set(data));
  }

  // Devuelve una señal que emite la traducción reactiva
  translate(key: string) {
    return computed(() => {
      const dict = this.translations();
      return dict[key] ?? key;
    });
  }

}
