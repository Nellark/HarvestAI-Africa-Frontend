import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss'],
})
export class AnalyticsComponent {
  private readonly mockData = inject(MockDataService);
  period = signal('This Season');
  periods = ['This Week', 'This Month', 'This Season', 'This Year'];
  Math = Math;

  kpis = this.mockData.analytics.kpis;
  monthlyFinancial = this.mockData.analytics.monthlyFinancial;
  cropPerformance = this.mockData.analytics.cropPerformance;
  waterUsage = this.mockData.analytics.waterUsage;
  diseaseStats = this.mockData.analytics.diseaseStats;
  aiInsights = this.mockData.analytics.aiInsights;

  perfColor(score: number) {
    if (score >= 85) return '#4CAF50';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  }
}
