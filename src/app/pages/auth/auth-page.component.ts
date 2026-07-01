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
  template: `
    <div class="auth-shell">
      <div class="auth-visual">
        <div class="brand-row">
          <div class="brand-mark">HA</div>
          <div>
            <strong>HarvestAI Africa</strong>
            <span>Trusted intelligence for modern African agriculture</span>
          </div>
        </div>

        <div class="visual-card">
          <p class="eyebrow">Platform preview</p>
          <h1>Real-time advice, offline resilience, and a premium farmer experience.</h1>
          <ul>
            <li><mat-icon>shield</mat-icon> Secure account access and OTP verification</li>
            <li><mat-icon>translate</mat-icon> Language selection for multilingual teams</li>
            <li><mat-icon>dark_mode</mat-icon> Dark mode and high-contrast UI options</li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1595273670150-bd0c3c9f01be?auto=format&fit=crop&w=1000&q=80"
            alt="African farmer using a tablet"
          />
        </div>
      </div>

      <mat-card class="auth-card">
        <div class="auth-card-header">
          <div>
            <p class="eyebrow">{{ modeLabel() }}</p>
            <h2>{{ title() }}</h2>
            <p>{{ subtitle() }}</p>
          </div>
          <button mat-icon-button (click)="state.toggleTheme()" aria-label="Toggle theme">
            <mat-icon>{{ state.theme() === 'dark' ? 'dark_mode' : 'light_mode' }}</mat-icon>
          </button>
        </div>

        @if (mode() === 'language') {
          <div class="language-grid">
            @for (option of languages; track option.value) {
              <button class="language-card" [class.active]="option.value === state.language()" (click)="state.setLanguage(option.value)">
                <mat-icon>language</mat-icon>
                <strong>{{ option.label }}</strong>
                <span>{{ option.value.toUpperCase() }}</span>
              </button>
            }
          </div>
        } @else {
          <form class="auth-form" (ngSubmit)="submit()">
            @if (mode() === 'register') {
              <mat-form-field appearance="outline">
                <mat-label>Full name</mat-label>
                <input matInput [(ngModel)]="fullName" name="fullName" placeholder="Farmer or team lead" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Farm / company name</mat-label>
                <input matInput [(ngModel)]="farmName" name="farmName" placeholder="Harvest Fields Cooperative" />
              </mat-form-field>
            }

            <mat-form-field appearance="outline">
              <mat-label>Email or phone</mat-label>
              <input matInput [(ngModel)]="email" name="email" placeholder="name@farm.co.za" />
            </mat-form-field>

            @if (mode() !== 'otp') {
              <mat-form-field appearance="outline">
                <mat-label>Password</mat-label>
                <input matInput type="password" [(ngModel)]="password" name="password" placeholder="••••••••" />
              </mat-form-field>
            }

            @if (mode() === 'forgot') {
              <p class="helper">
                We will send a reset link and an SMS fallback so farm teams can regain access quickly.
              </p>
            }

            @if (mode() === 'otp') {
              <div class="otp-grid">
                @for (cell of otpCells; track cell) {
                  <input maxlength="1" inputmode="numeric" placeholder="0" aria-label="OTP digit" />
                }
              </div>
            }

            @if (mode() === 'register') {
              <div class="meta-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Country</mat-label>
                  <mat-select [(ngModel)]="country" name="country">
                    <mat-option value="South Africa">South Africa</mat-option>
                    <mat-option value="Kenya">Kenya</mat-option>
                    <mat-option value="Nigeria">Nigeria</mat-option>
                    <mat-option value="Ghana">Ghana</mat-option>
                    <mat-option value="Zambia">Zambia</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Preferred language</mat-label>
                  <mat-select [value]="state.language()" (valueChange)="state.setLanguage($event)">
                    @for (option of languages; track option.value) {
                      <mat-option [value]="option.value">{{ option.label }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              </div>
            }

            <div class="row">
              <mat-checkbox>{{ mode() === 'register' ? 'Accept terms' : 'Remember me' }}</mat-checkbox>
              <a
                class="row-link"
                [routerLink]="mode() === 'login' ? '/auth/forgot-password' : '/auth/login'"
              >
                {{ mode() === 'login' ? 'Forgot password?' : 'Return to login' }}
              </a>
            </div>

            @if (errorMessage) {
              <div class="status-message">{{ errorMessage }}</div>
            }

            <button mat-flat-button color="primary" class="submit-btn" type="submit">
              <mat-icon>{{ submitIcon() }}</mat-icon>
              {{ submitLabel() }}
            </button>
          </form>
        }

        <mat-divider />

        <div class="auth-footer">
          <span>{{ footerText() }}</span>
          <a mat-stroked-button routerLink="/">
            <mat-icon>arrow_back</mat-icon>
            Back to landing
          </a>
        </div>
      </mat-card>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      padding: 1rem;
      background:
        radial-gradient(circle at top left, rgba(200, 227, 106, 0.24), transparent 32%),
        radial-gradient(circle at bottom right, rgba(46, 125, 50, 0.15), transparent 30%),
        var(--color-background);
    }

    .auth-shell {
      min-height: calc(100vh - 2rem);
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 1.2rem;
      align-items: center;
      max-width: 1360px;
      margin: 0 auto;
    }

    .auth-visual,
    .auth-card {
      min-height: 100%;
    }

    .auth-visual {
      padding: 1rem;
      display: grid;
      gap: 1rem;
    }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .brand-mark {
      width: 3rem;
      height: 3rem;
      border-radius: 18px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, var(--color-primary), var(--color-dark));
      color: #fff;
      font-weight: 800;
    }

    .brand-row strong,
    .auth-card h2 {
      display: block;
      font: 700 1.2rem/1.1 'Poppins', sans-serif;
      margin: 0;
    }

    .brand-row span,
    .auth-card p,
    .eyebrow,
    .helper,
    .row-link,
    .auth-footer span {
      color: var(--color-secondary);
    }

    .visual-card,
    .auth-card {
      border-radius: 32px;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(229, 231, 235, 0.9);
      box-shadow: var(--shadow-elevated);
      backdrop-filter: blur(18px);
    }

    .visual-card {
      padding: 1.35rem;
      overflow: hidden;
    }

    .eyebrow {
      margin: 0 0 0.4rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.7rem;
      font-weight: 700;
    }

    .visual-card h1 {
      margin: 0 0 1rem;
      font: 700 clamp(2rem, 4vw, 3.8rem) / 0.98 'Poppins', sans-serif;
      max-width: 13ch;
      letter-spacing: -0.03em;
    }

    .visual-card ul {
      list-style: none;
      display: grid;
      gap: 0.75rem;
      padding: 0;
      margin: 0 0 1rem;
    }

    .visual-card li {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      color: var(--color-text);
      font-weight: 600;
    }

    .visual-card li mat-icon {
      color: var(--color-primary);
    }

    .visual-card img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 26px;
      margin-top: 1rem;
    }

    .auth-card {
      padding: 1.35rem;
      display: grid;
      gap: 1rem;
    }

    .auth-card-header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;
    }

    .auth-form {
      display: grid;
      gap: 0.95rem;
    }

    .language-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .language-card {
      display: grid;
      justify-items: start;
      gap: 0.4rem;
      padding: 1rem;
      border-radius: 22px;
      border: 1px solid var(--color-border);
      background: #fff;
      text-align: left;
      cursor: pointer;
      transition: all 180ms ease;
    }

    .language-card.active,
    .language-card:hover {
      border-color: rgba(46, 125, 50, 0.35);
      box-shadow: var(--shadow-card);
      transform: translateY(-2px);
    }

    .language-card mat-icon {
      color: var(--color-primary);
    }

    .language-card strong {
      font: 700 1rem/1.1 'Poppins', sans-serif;
    }

    .language-card span {
      color: var(--color-secondary);
      font-size: 0.84rem;
    }

    .meta-grid,
    .otp-grid,
    .row {
      display: grid;
      gap: 0.8rem;
    }

    .meta-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .otp-grid {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .otp-grid input {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 20px;
      border: 1px solid var(--color-border);
      background: #fff;
      text-align: center;
      font: 700 1.3rem/1 'Poppins', sans-serif;
    }

    .row {
      grid-template-columns: 1fr auto;
      align-items: center;
    }

    .row-link {
      text-decoration: none;
      font-weight: 600;
    }

    .submit-btn {
      justify-self: start;
      border-radius: 999px;
      padding-inline: 1.25rem;
    }

    .status-message {
      padding: 0.8rem 0.95rem;
      border-radius: 16px;
      background: rgba(46, 125, 50, 0.1);
      color: var(--color-primary);
      border: 1px solid rgba(46, 125, 50, 0.16);
      font-weight: 600;
    }

    .submit-btn mat-icon,
    .auth-footer a mat-icon {
      margin-right: 0.35rem;
    }

    .auth-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    @media (max-width: 960px) {
      .auth-shell {
        grid-template-columns: 1fr;
      }
      .auth-visual {
        order: 2;
      }
    }

    @media (max-width: 720px) {
      :host {
        padding: 0.5rem;
      }
      .auth-shell {
        min-height: calc(100vh - 1rem);
      }
      .language-grid,
      .meta-grid,
      .row {
        grid-template-columns: 1fr;
      }
      .auth-footer {
        align-items: start;
        flex-direction: column;
      }
      .brand-row {
        align-items: start;
      }
      .visual-card h1 {
        max-width: none;
      }
    }
  `,
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
  protected country = 'South Africa';
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

  protected submit(): void {
    this.errorMessage = '';

    if (this.mode() === 'register') {
      try {
        this.auth.register({
          name: this.fullName,
          email: this.email,
          password: this.password,
          phone: '',
          country: this.country,
          province: 'Limpopo',
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
        this.auth.login(this.email, this.password);
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
