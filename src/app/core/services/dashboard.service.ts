import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { Farm, Task, TimelineItem } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly api = inject(ApiService);

  getFarmData(): Observable<Farm> {
    return this.api.get<Farm>('/farms/me');
  }

  getStatCards(): Observable<{ icon: string; label: string; value: string; trend: number; iconClass: string }[]> {
    return this.api.get<{ icon: string; label: string; value: string; trend: number; iconClass: string }[]>('/dashboard/stats');
  }

  getAIRecommendations(): Observable<{ icon: string; title: string; description: string; priority: string; iconClass: string; badgeClass: string }[]> {
    return this.api.get<{ icon: string; title: string; description: string; priority: string; iconClass: string; badgeClass: string }[]>('/dashboard/ai-recommendations');
  }

  getQuickActions(): Observable<{ icon: string; label: string; route: string }[]> {
    return this.api.get<{ icon: string; label: string; route: string }[]>('/dashboard/quick-actions');
  }

  getTimeline(): Observable<TimelineItem[]> {
    return this.api.get<TimelineItem[]>('/dashboard/timeline');
  }

  getTasks(): Observable<Task[]> {
    return this.api.get<Task[]>('/dashboard/tasks');
  }
}
