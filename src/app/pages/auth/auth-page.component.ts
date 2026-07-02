import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppStateService } from '../../core/services/app-state.service';
import { AuthService } from '../../core/services/auth.service';
import { LANGUAGE_OPTIONS } from '../../core/data/mock-data';

type AuthMode = 'login' | 'register' | 'forgot' | 'otp' | 'language';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly state = inject(AppStateService);
  protected readonly auth = inject(AuthService);
  protected readonly languages = LANGUAGE_OPTIONS;
  protected readonly otpCells = Array.from({ length: 6 }, (_, index) => index);
  protected fullName = '';
  protected farmName = '';
  protected email = '';
  protected password = '';
  protected country = '';
  protected errorMessage = '';

  protected readonly mode = (() => (this.route.snapshot.data['mode'] as AuthMode) ?? 'login') as () => AuthMode;
  protected readonly modeLabel = () =>
    ({
      login: 'Secure access',
      register: 'Create workspace',
      forgot: 'Recover account',
      otp: 'Verification',
      language: 'Personalize',
    })[this.mode()];
  protected readonly title = () =>
    ({
      login: 'Sign in to your farm dashboard',
      register: 'Create a new farm workspace',
      forgot: 'Reset your password',
      otp: 'Verify your one-time passcode',
      language: 'Choose your preferred language',
    })[this.mode()];
  protected readonly subtitle = () =>
    ({
      login: 'Continue to weather, yield, market, and AI insights.',
      register: 'Set up your operation in under two minutes.',
      forgot: 'We will help you restore access safely and quickly.',
      otp: 'Enter the code sent to your phone or email.',
      language: 'Set the language that best matches your field team.',
    })[this.mode()];
  protected readonly submitLabel = () =>
    ({
      login: 'Sign in',
      register: 'Create account',
      forgot: 'Send reset link',
      otp: 'Verify code',
      language: 'Save preference',
    })[this.mode()];
  protected readonly submitIcon = () =>
    ({
      login: 'login',
      register: 'person_add',
      forgot: 'send',
      otp: 'verified',
      language: 'check_circle',
    })[this.mode()];
  protected readonly footerText = () =>
    this.mode() === 'register'
      ? 'Already have an account? Sign in when you are ready.'
      : 'New to HarvestAI Africa? Create a workspace and start with the onboarding flow.';

  protected async submit(): Promise<void> {
    this.errorMessage = '';

    if (this.mode() === 'register') {
      try {
        await this.auth.register({
          name: this.fullName,
          email: this.email,
          password: this.password,
          phone: '',
          country: this.country,
          province: '',
          language: this.state.language(),
        });
        this.router.navigate(['/onboarding']);
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Registration failed.';
      }
      return;
    }

    if (this.mode() === 'login') {
      try {
        await this.auth.login(this.email, this.password);
        this.router.navigate(['/app/dashboard']);
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Login failed.';
      }
      return;
    }

    if (this.mode() === 'otp') {
      this.router.navigate(['/app/dashboard']);
      return;
    }

    if (this.mode() === 'forgot') {
      this.errorMessage = 'Password reset instructions were prepared for your inbox.';
    }
  }
}
