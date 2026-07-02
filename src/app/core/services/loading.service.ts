import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _isLoading = signal(false);
  private readonly _loadingCount = signal(0);

  readonly isLoading = this._isLoading.asReadonly();

  show() {
    this._loadingCount.update((count) => count + 1);
    this._isLoading.set(true);
  }

  hide() {
    this._loadingCount.update((count) => Math.max(0, count - 1));
    if (this._loadingCount() === 0) {
      this._isLoading.set(false);
    }
  }

  reset() {
    this._loadingCount.set(0);
    this._isLoading.set(false);
  }
}
