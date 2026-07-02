import { Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class PWAService {
  private readonly toastService = inject(ToastService);
  private swUpdate: { isEnabled?: boolean; activateUpdate?: () => Promise<boolean>; checkForUpdate?: () => Promise<boolean> } | null = null;

  checkForUpdates(): void {
    if (!this.swUpdate || !this.swUpdate.isEnabled) {
      return;
    }

    // Check for updates periodically
    setInterval(() => {
      this.checkForUpdate();
    }, 60000); // Every minute
  }

  activateUpdate(): void {
    if (this.swUpdate && this.swUpdate.activateUpdate) {
      this.swUpdate.activateUpdate().then(() => {
        window.location.reload();
      });
    }
  }

  checkForUpdate(): void {
    if (this.swUpdate && this.swUpdate.isEnabled && this.swUpdate.checkForUpdate) {
      this.swUpdate.checkForUpdate();
    }
  }
}
