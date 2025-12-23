import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  private readonly DEFAULT_LANG_KEY = 'currentLang';
  private readonly DEFAULT_LANG_VALUE = 'es';

  constructor(){
    if(!this.exists(this.DEFAULT_LANG_KEY)){
      this.set(this.DEFAULT_LANG_KEY, this.DEFAULT_LANG_VALUE)
    }
  }
   
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  update(key: string, value: string): boolean {
    if (!this.exists(key)) {
      return false;
    }

    localStorage.setItem(key, value);
    return true;
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  clear(): void {
    localStorage.clear();
  }

}
