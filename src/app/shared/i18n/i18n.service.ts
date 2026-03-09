import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class I18nService {

  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService)
  private readonly LANG_KEY = 'currentLang';

  // Idioma actual
  currentLang = signal<'es' | 'en'>('es');

  // Diccionario cargado
  private translations = signal<Record<string, string>>({});

  constructor() {
    const lang = this.localStorage.get(this.LANG_KEY) as 'es' | 'en' ?? 'es';
    this.currentLang.set(lang);
    this.loadLanguage(lang);
  }

  // Cambia idioma y recarga JSON
  setLanguage(lang: 'es' | 'en') {
    if (this.currentLang() === lang) return;

    this.localStorage.set(this.LANG_KEY, lang);
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
      const value = this.getNestedValue(dict, key);
      return value ?? key;
    });
  }

  private getNestedValue(obj: any, path: string): string | null {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return null;
      }
    }

    return typeof current === 'string' ? current : null;
  }
}