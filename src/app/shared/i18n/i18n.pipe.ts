import { Pipe, PipeTransform, inject, ChangeDetectorRef, Injector, effect, signal } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false
})
export class I18nPipe implements PipeTransform {

  private i18n = inject(I18nService);
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  private keySignal = signal('');
  private value = '';

  constructor() {
    effect(() => {
      const key = this.keySignal();
      if (!key) return;

      const translation = this.i18n.translate(key)();
      this.value = translation ?? key;

      // refresca el DOM
      this.cdr.markForCheck();
    }, { injector: this.injector });
  }

  transform(key: string): string {
    // NO se escribe la signal durante el render
    //Se agenda para después (microtask)
    queueMicrotask(() => {
      if (this.keySignal() !== key) {
        this.keySignal.set(key);
      }
    });

    // Retorna el valor actual 
    // (puede ser la key mientras se carga JSON)
    return this.value;
  }
}