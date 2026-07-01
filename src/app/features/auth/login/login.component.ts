import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  remember = false;
  loading = signal(false);
  error = signal('');
  showPwd = signal(false);
  lang = signal('en');

  languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Swahili' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'zu', name: 'isiZulu' },
  ];

  features = [
    { icon: 'psychology', text: 'AI-powered crop recommendations' },
    { icon: 'biotech', text: 'Instant disease detection' },
    { icon: 'price_check', text: 'Real-time market prices' },
    { icon: 'cloud_sync', text: 'Works offline in the field' },
  ];

  togglePwd() { this.showPwd.set(!this.showPwd()); }

  onLogin() {
    this.loading.set(true);
    this.error.set('');

    try {
      this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/app/dashboard');
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      this.loading.set(false);
    }
  }
}
