import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyModalService {
  private _isOpen = signal(false);

  isOpen = this._isOpen.asReadonly();

  open() {
    this._isOpen.set(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  close() {
    this._isOpen.set(false);
    document.body.style.overflow = ''; // Restore scrolling
  }
}
