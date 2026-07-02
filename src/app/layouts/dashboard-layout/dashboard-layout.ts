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
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
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
