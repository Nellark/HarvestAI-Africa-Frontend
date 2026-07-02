import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  firstName = ''; lastName = ''; email = ''; phone = ''; country = ''; password = '';
  agree = false; loading = signal(false); showPwd = signal(false);

  countries = ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Zimbabwe', 'Zambia', 'Uganda', 'Mozambique', 'Botswana', 'Tanzania', 'Malawi', 'Senegal'];

  togglePwd() { this.showPwd.set(!this.showPwd()); }

  stats = [
    { value: '24K+', label: 'Farmers' },
    { value: '9', label: 'Countries' },
    { value: '42%', label: 'More Yield' },
    { value: 'Free', label: 'Forever' },
  ];

  passwordStrength = signal(0);
  strengthColor() { return ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][this.passwordStrength()]; }
  strengthLabel() { return ['', 'Weak', 'Fair', 'Good', 'Strong'][this.passwordStrength()]; }

  async onRegister() {
    this.loading.set(true);

    try {
      await this.auth.register({
        name: `${this.firstName} ${this.lastName}`.trim(),
        email: this.email,
        password: this.password,
        phone: this.phone,
        country: this.country,
      });
      this.router.navigateByUrl('/onboarding');
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Unable to create account.');
    } finally {
      this.loading.set(false);
    }
  }
}
