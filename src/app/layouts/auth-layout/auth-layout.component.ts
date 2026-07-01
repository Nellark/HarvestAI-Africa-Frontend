import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  template: `
    <div class="auth-layout">
      <div class="auth-brand">
        <div class="brand-content">
          <div class="logo">
            <div class="logo-icon"><mat-icon>agriculture</mat-icon></div>
            <span class="logo-name">HarvestAI <span class="logo-africa">Africa</span></span>
          </div>
          <h1>Empowering African Farmers with AI</h1>
          <p>Join thousands of farmers using AI to improve yields, detect diseases, and access better markets.</p>
        </div>
      </div>
      <div class="auth-content">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      display: flex;
      min-height: 100vh;
    }
    .auth-brand {
      flex: 1;
      background: linear-gradient(135deg, var(--primary-dark), var(--primary));
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
    }
    .brand-content {
      max-width: 420px;
      color: #fff;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 48px;
    }
    .logo-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-name {
      font-family: 'Poppins', sans-serif;
      font-size: 20px;
      font-weight: 700;
    }
    .logo-africa {
      color: var(--accent);
    }
    .brand-content h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .brand-content p {
      font-size: 15px;
      line-height: 1.7;
      opacity: 0.85;
    }
    .auth-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      background: var(--bg);
    }
    @media (max-width: 768px) {
      .auth-brand { display: none; }
    }
  `],
})
export class AuthLayoutComponent {}
