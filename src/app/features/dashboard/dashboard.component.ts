import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppStateService } from '../../core/services/app-state.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  state = inject(AppStateService);
  private readonly mockData = inject(MockDataService);

  greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  firstName() {
    const name = this.state.user()?.name;
    return name ? name.split(' ')[0] : 'Farmer';
  }

  today() {
    return new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  statCards = this.mockData.dashboard.statCards;
  aiRecommendations = this.mockData.dashboard.aiRecommendations;
  quickActions = this.mockData.dashboard.quickActions;
  timeline = this.mockData.dashboard.timeline;

  statusBadge(status: string) {
    const map: Record<string, string> = { planted: 'badge-info', growing: 'badge-primary', ready: 'badge-success', harvested: 'badge-neutral' };
    return map[status] || 'badge-neutral';
  }

  priorityBadge(priority: string) {
    const map: Record<string, string> = { high: 'badge-danger', medium: 'badge-warning', low: 'badge-neutral' };
    return map[priority] || 'badge-neutral';
  }

  healthColor(score: number) {
    if (score >= 85) return '#4CAF50';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  }

  alertIconClass(type: string) {
    const map: Record<string, string> = { weather: 'icon-wrap-info', disease: 'icon-wrap-danger', market: 'icon-wrap-primary', planner: 'icon-wrap-warning', ai: 'icon-wrap-primary', system: 'icon-wrap-neutral' };
    return map[type] || 'icon-wrap-primary';
  }
}
