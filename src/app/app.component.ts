import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './core/services/app-state.service';
import { AuthService } from './core/services/auth.service';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `<router-outlet /><app-toast-container />`,
})
export class AppComponent implements OnInit {
  private state = inject(AppStateService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.auth.initializeSession();

    // Restore dark mode preference
    const dark = localStorage.getItem('darkMode') === 'true';
    if (dark) {
      this.state.isDarkMode.set(true);
      document.body.classList.add('dark-theme');
    }
    // Detect offline
    window.addEventListener('online', () => this.state.isOffline.set(false));
    window.addEventListener('offline', () => this.state.isOffline.set(true));
  }
}
