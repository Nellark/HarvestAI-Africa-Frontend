import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { AnalyticsData, YieldForecast } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly api = inject(ApiService);

  getAnalyticsData(period: { start: string; end: string }): Observable<AnalyticsData> {
    return this.api.get<AnalyticsData>(`/analytics?start=${period.start}&end=${period.end}`);
  }

  getKPIs(period: { start: string; end: string }): Observable<{ label: string; value: string; trend: number; sparkline: number[]; unit?: string }[]> {
    return this.api.get<{ label: string; value: string; trend: number; sparkline: number[]; unit?: string }[]>(`/analytics/kpis?start=${period.start}&end=${period.end}`);
  }

  getFinancialData(period: { start: string; end: string }): Observable<{ month: string; revenue: number; expenses: number; profit: number }[]> {
    return this.api.get<{ month: string; revenue: number; expenses: number; profit: number }[]>(`/analytics/financial?start=${period.start}&end=${period.end}`);
  }

  getCropPerformance(): Observable<{ name: string; score: number; yield: number; revenue: number; healthScore: number; trend: string }[]> {
    return this.api.get<{ name: string; score: number; yield: number; revenue: number; healthScore: number; trend: string }[]>('/analytics/crop-performance');
  }

  getWaterUsage(period: { start: string; end: string }): Observable<{ month: string; used: number; target: number; efficiency: number }[]> {
    return this.api.get<{ month: string; used: number; target: number; efficiency: number }[]>(`/analytics/water-usage?start=${period.start}&end=${period.end}`);
  }

  getDiseaseStats(): Observable<{ name: string; count: number; percentage: number; color: string; trend: string }[]> {
    return this.api.get<{ name: string; count: number; percentage: number; color: string; trend: string }[]>('/analytics/disease-stats');
  }

  getYieldForecast(crop: string, field: string): Observable<YieldForecast> {
    return this.api.get<YieldForecast>(`/analytics/yield-forecast?crop=${crop}&field=${field}`);
  }

  getAIInsights(): Observable<{ icon: string; color: string; title: string; text: string; category: string; priority: string; actionable: boolean }[]> {
    return this.api.get<{ icon: string; color: string; title: string; text: string; category: string; priority: string; actionable: boolean }[]>('/analytics/ai-insights');
  }
}
