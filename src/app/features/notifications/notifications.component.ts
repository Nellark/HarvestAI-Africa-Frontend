import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss'],
})
export class NotificationsComponent {
  state = inject(AppStateService);
  activeTab = 'all';

  tabs = [
    { id: 'all', label: 'All', icon: 'notifications' },
    { id: 'weather', label: 'Weather', icon: 'thunderstorm' },
    { id: 'disease', label: 'Disease', icon: 'bug_report' },
    { id: 'market', label: 'Market', icon: 'price_check' },
    { id: 'ai', label: 'AI', icon: 'psychology' },
  ];

  filteredNotifications() {
    if (this.activeTab === 'all') return this.state.notifications();
    return this.state.notifications().filter(n => n.type === this.activeTab);
  }

  countByType(type: string) {
    return this.state.notifications().filter(n => n.type === type && !n.read).length;
  }

  iconClass(type: string) {
    const map: Record<string, string> = {
      weather: 'icon-wrap-info', disease: 'icon-wrap-danger',
      market: 'icon-wrap-primary', planner: 'icon-wrap-warning',
      ai: 'icon-wrap-primary', system: 'icon-wrap-neutral',
    };
    return map[type] || 'icon-wrap-primary';
  }

  priorityBadge(p: string) {
    return p === 'high' ? 'badge-danger' : p === 'medium' ? 'badge-warning' : 'badge-neutral';
  }

  timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}
