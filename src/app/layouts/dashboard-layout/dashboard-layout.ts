import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../core/services/app-state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationDrawerComponent } from '../../shared/components/notification-drawer/notification-drawer.component';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MatIconModule, MatBadgeModule, MatTooltipModule, MatMenuModule, MatButtonModule, MatDividerModule, NotificationDrawerComponent],
  template: `
    <!-- Offline Banner -->
    @if (state.isOffline()) {
      <div class="offline-banner">
        <mat-icon>wifi_off</mat-icon>
        You are offline — showing cached data
        <button class="btn btn-sm btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.5);margin-left:12px">
          <mat-icon style="font-size:14px;width:14px;height:14px">sync</mat-icon> Sync
        </button>
      </div>
    }

    <div class="shell-layout" [class.sidebar-collapsed]="!state.sidebarOpen()">
      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="state.sidebarOpen()">
        <div class="sidebar-header">
          <div class="logo" routerLink="/app/dashboard">
            <div class="logo-icon">
              <mat-icon>agriculture</mat-icon>
            </div>
            <div class="logo-text">
              <span class="logo-name">HarvestAI</span>
              <span class="logo-sub">Africa</span>
            </div>
          </div>
          <button class="sidebar-toggle hide-desktop" (click)="state.toggleSidebar()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <span class="nav-section-label">Main</span>
            @for (item of mainNav; track item.path) {
              <a class="nav-item"
                 [routerLink]="'/app/' + item.path"
                 routerLinkActive="active"
                 [matTooltip]="!state.sidebarOpen() ? item.label : ''"
                 matTooltipPosition="right"
                 (click)="onNavClick()">
                <mat-icon>{{ item.icon }}</mat-icon>
                <span class="nav-label">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="nav-badge">{{ item.badge }}</span>
                }
              </a>
            }
          </div>

          <div class="nav-section">
            <span class="nav-section-label">AI Tools</span>
            @for (item of aiNav; track item.path) {
              <a class="nav-item"
                 [routerLink]="'/app/' + item.path"
                 routerLinkActive="active"
                 [matTooltip]="!state.sidebarOpen() ? item.label : ''"
                 matTooltipPosition="right"
                 (click)="onNavClick()">
                <mat-icon>{{ item.icon }}</mat-icon>
                <span class="nav-label">{{ item.label }}</span>
              </a>
            }
          </div>

          <div class="nav-section">
            <span class="nav-section-label">Commerce</span>
            @for (item of commerceNav; track item.path) {
              <a class="nav-item"
                 [routerLink]="'/app/' + item.path"
                 routerLinkActive="active"
                 [matTooltip]="!state.sidebarOpen() ? item.label : ''"
                 matTooltipPosition="right"
                 (click)="onNavClick()">
                <mat-icon>{{ item.icon }}</mat-icon>
                <span class="nav-label">{{ item.label }}</span>
              </a>
            }
          </div>

          <div class="nav-section">
            <span class="nav-section-label">Other</span>
            @for (item of otherNav; track item.path) {
              <a class="nav-item"
                 [routerLink]="'/app/' + item.path"
                 routerLinkActive="active"
                 [matTooltip]="!state.sidebarOpen() ? item.label : ''"
                 matTooltipPosition="right"
                 (click)="onNavClick()">
                <mat-icon>{{ item.icon }}</mat-icon>
                <span class="nav-label">{{ item.label }}</span>
                @if (item.path === 'notifications' && state.unreadNotifications() > 0) {
                  <span class="nav-badge">{{ state.unreadNotifications() }}</span>
                }
              </a>
            }
          </div>
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="sidebar-user" [matMenuTriggerFor]="userMenu">
            <div class="avatar">
              @if (state.user()?.avatar) {
                <img [src]="state.user()!.avatar" [alt]="state.user()!.name" />
              } @else {
                {{ state.user()?.name?.charAt(0) }}
              }
            </div>
            <div class="user-info">
              <span class="user-name">{{ state.user()?.name }}</span>
              <span class="user-role">{{ state.user()?.province }}, {{ state.user()?.country }}</span>
            </div>
            <mat-icon class="user-chevron">expand_more</mat-icon>
          </div>
          <mat-menu #userMenu="matMenu" xPosition="after" yPosition="above">
            <a mat-menu-item routerLink="/app/settings"><mat-icon>settings</mat-icon> Settings</a>
            <button mat-menu-item (click)="state.toggleDarkMode()"><mat-icon>{{ state.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon> {{ state.isDarkMode() ? 'Light Mode' : 'Dark Mode' }}</button>
            <mat-divider></mat-divider>
            <a mat-menu-item routerLink="/auth/login"><mat-icon>logout</mat-icon> Sign Out</a>
          </mat-menu>
        </div>
      </aside>

      <!-- Sidebar Overlay (Mobile) -->
      @if (state.sidebarOpen() && isMobile()) {
        <div class="sidebar-overlay" (click)="state.toggleSidebar()"></div>
      }

      <!-- Main Content Area -->
      <div class="main-area">
        <!-- Topbar -->
        <header class="topbar">
          <button class="topbar-toggle" (click)="state.toggleSidebar()">
            <mat-icon>{{ state.sidebarOpen() ? 'menu_open' : 'menu' }}</mat-icon>
          </button>

          <div class="topbar-search hide-mobile">
            <mat-icon>search</mat-icon>
            <input type="text" placeholder="Search crops, AI advice, market prices..." />
          </div>

          <div class="topbar-actions">
            <button class="action-btn hide-mobile" (click)="state.toggleDarkMode()" [matTooltip]="state.isDarkMode() ? 'Light Mode' : 'Dark Mode'">
              <mat-icon>{{ state.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            </button>
            <button class="action-btn" (click)="notifOpen.set(!notifOpen())" [matTooltip]="'Notifications'">
              <mat-icon [matBadge]="state.unreadNotifications() || null" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
            </button>
            <button class="action-btn" routerLink="/app/ai-assistant" [matTooltip]="'AI Assistant'">
              <mat-icon>psychology</mat-icon>
            </button>
            <div class="topbar-avatar" [matMenuTriggerFor]="topUserMenu">
              <div class="avatar" style="width:36px;height:36px;font-size:13px;cursor:pointer">
                @if (state.user()?.avatar) {
                  <img [src]="state.user()!.avatar" [alt]="state.user()!.name" />
                } @else {
                  {{ state.user()?.name?.charAt(0) }}
                }
              </div>
            </div>
            <mat-menu #topUserMenu="matMenu">
              <a mat-menu-item routerLink="/app/settings"><mat-icon>settings</mat-icon> Settings</a>
              <a mat-menu-item routerLink="/auth/login"><mat-icon>logout</mat-icon> Sign Out</a>
            </mat-menu>
          </div>
        </header>

        <!-- Page Content -->
        <main class="content-area page-enter">
          <router-outlet />
        </main>

        <!-- Bottom Nav (Mobile) -->
        <nav class="bottom-nav hide-desktop">
          @for (item of bottomNavItems; track item.path) {
            <a class="bottom-nav-item" [routerLink]="'/app/' + item.path" routerLinkActive="active">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </div>
    </div>

    <!-- Notification Drawer -->
    <app-notification-drawer [open]="notifOpen()" (closed)="notifOpen.set(false)" />
  `,
  styles: [`
    .shell-layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background: var(--bg);
      transition: all var(--transition-slow);
    }

    /* ---- Sidebar ---- */
    .sidebar {
      width: var(--sidebar-width);
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--bg-card);
      border-right: 1px solid var(--border);
      transition: width var(--transition-slow), transform var(--transition-slow);
      position: relative;
      z-index: 100;
      flex-shrink: 0;
      overflow: hidden;
    }

    .sidebar-collapsed .sidebar {
      width: 68px;
    }

    .sidebar-header {
      padding: 20px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      text-decoration: none;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #fff;
      box-shadow: 0 4px 12px rgba(46,125,50,0.3);
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      white-space: nowrap;
      transition: opacity var(--transition);
    }

    .logo-name {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .logo-sub {
      font-size: 10px;
      color: var(--primary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .sidebar-collapsed .logo-text,
    .sidebar-collapsed .nav-label,
    .sidebar-collapsed .nav-section-label,
    .sidebar-collapsed .user-info,
    .sidebar-collapsed .user-chevron {
      opacity: 0;
      pointer-events: none;
      width: 0;
      overflow: hidden;
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px 8px;
    }

    .nav-section {
      margin-bottom: 8px;
    }

    .nav-section-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      padding: 12px 8px 4px;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      transition: opacity var(--transition);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 10px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      transition: all var(--transition);
      position: relative;
      white-space: nowrap;
      margin-bottom: 2px;
    }

    .nav-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .nav-label {
      overflow: hidden;
      transition: opacity var(--transition), width var(--transition);
      white-space: nowrap;
    }

    .nav-item:hover {
      background: var(--bg-subtle);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: rgba(46,125,50,0.1);
      color: var(--primary);
      font-weight: 600;
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: var(--primary);
      border-radius: 0 3px 3px 0;
    }

    .nav-badge {
      margin-left: auto;
      background: var(--danger);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 99px;
      min-width: 18px;
      text-align: center;
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid var(--border);
      flex-shrink: 0;
    }

    .sidebar-user {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      border-radius: 10px;
      cursor: pointer;
      transition: background var(--transition);
      overflow: hidden;
    }

    .sidebar-user:hover { background: var(--bg-subtle); }

    .sidebar-user .avatar {
      width: 36px;
      height: 36px;
      font-size: 13px;
      flex-shrink: 0;
    }

    .sidebar-user .avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info {
      flex: 1;
      overflow: hidden;
      min-width: 0;
      transition: opacity var(--transition);
    }

    .user-name {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      display: block;
      font-size: 11px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-chevron {
      font-size: 18px;
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      z-index: 99;
    }

    .sidebar-toggle {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
      padding: 4px;
      border-radius: 8px;
    }

    /* ---- Main Area ---- */
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }

    /* ---- Topbar ---- */
    .topbar {
      height: var(--topbar-height);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 24px;
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      z-index: 50;
    }

    .topbar-toggle {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      transition: all var(--transition);
    }
    .topbar-toggle:hover { background: var(--bg-subtle); color: var(--text-primary); }

    .topbar-search {
      flex: 1;
      max-width: 460px;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 8px 14px;
      transition: all var(--transition);
    }

    .topbar-search:focus-within {
      border-color: var(--primary);
      background: var(--bg-card);
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }

    .topbar-search mat-icon {
      font-size: 18px;
      color: var(--text-muted);
    }

    .topbar-search input {
      border: none;
      background: transparent;
      font-size: 13px;
      color: var(--text-primary);
      outline: none;
      width: 100%;
      font-family: 'Inter', sans-serif;
    }

    .topbar-search input::placeholder { color: var(--text-muted); }

    .topbar-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .action-btn {
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 10px;
      color: var(--text-secondary);
      transition: all var(--transition);
    }
    .action-btn:hover { background: var(--bg-subtle); color: var(--text-primary); }

    /* ---- Content ---- */
    .content-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 32px;
      background: var(--bg);
    }

    /* ---- Bottom Nav (Mobile) ---- */
    .bottom-nav {
      display: flex;
      background: var(--bg-card);
      border-top: 1px solid var(--border);
      height: 60px;
      flex-shrink: 0;
    }

    .bottom-nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 10px;
      font-weight: 500;
      transition: color var(--transition);
    }
    .bottom-nav-item mat-icon { font-size: 22px; }
    .bottom-nav-item.active { color: var(--primary); }

    /* ---- Mobile ---- */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0; top: 0; bottom: 0;
        transform: translateX(-100%);
        z-index: 200;
        width: var(--sidebar-width) !important;
      }
      .sidebar.open { transform: translateX(0); }
      .shell-layout.sidebar-collapsed .sidebar { transform: translateX(-100%); }
      .content-area { padding: 16px; padding-bottom: 76px; }
    }
  `],
})
export class DashboardLayoutComponent {
  state = inject(AppStateService);
  notifOpen = signal(false);

  mainNav: NavItem[] = [
    { path: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: 'farm', label: 'My Farm', icon: 'yard' },
    { path: 'planner', label: 'Planner', icon: 'calendar_month' },
    { path: 'analytics', label: 'Analytics', icon: 'bar_chart' },
  ];

  aiNav: NavItem[] = [
    { path: 'ai-assistant', label: 'AI Assistant', icon: 'psychology' },
    { path: 'disease-detection', label: 'Disease Detection', icon: 'biotech' },
    { path: 'crop-advisor', label: 'Crop Advisor', icon: 'tips_and_updates' },
    { path: 'yield-forecast', label: 'Yield Forecast', icon: 'trending_up' },
    { path: 'weather', label: 'Weather', icon: 'wb_sunny' },
  ];

  commerceNav: NavItem[] = [
    { path: 'market-prices', label: 'Market Prices', icon: 'price_check' },
    { path: 'marketplace', label: 'Marketplace', icon: 'storefront' },
  ];

  otherNav: NavItem[] = [
    { path: 'community', label: 'Community', icon: 'groups' },
    { path: 'notifications', label: 'Notifications', icon: 'notifications' },
    { path: 'settings', label: 'Settings', icon: 'settings' },
  ];

  bottomNavItems: NavItem[] = [
    { path: 'dashboard', label: 'Home', icon: 'home' },
    { path: 'farm', label: 'Farm', icon: 'yard' },
    { path: 'ai-assistant', label: 'AI', icon: 'psychology' },
    { path: 'market-prices', label: 'Market', icon: 'price_check' },
    { path: 'settings', label: 'Settings', icon: 'settings' },
  ];

  isMobile() { return window.innerWidth <= 768; }

  onNavClick() {
    if (this.isMobile()) this.state.sidebarOpen.set(false);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.state.sidebarOpen.set(true);
    }
  }
}
