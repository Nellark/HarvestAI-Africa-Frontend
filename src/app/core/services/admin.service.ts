import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { AdminDashboardData, User } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly api = inject(ApiService);

  getDashboardData(): Observable<AdminDashboardData> {
    return this.api.get<AdminDashboardData>('/admin/dashboard');
  }

  getUsers(filters?: { country?: string; role?: string; status?: string }): Observable<User[]> {
    const params = new URLSearchParams();
    if (filters?.country) params.append('country', filters.country);
    if (filters?.role) params.append('role', filters.role);
    if (filters?.status) params.append('status', filters.status);
    const queryString = params.toString();
    return this.api.get<User[]>(queryString ? `/admin/users?${queryString}` : '/admin/users');
  }

  getUser(id: string): Observable<User> {
    return this.api.get<User>(`/admin/users/${id}`);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.api.put<User>(`/admin/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.api.delete<void>(`/admin/users/${id}`);
  }

  getCountryStats(): Observable<{ country: string; flag: string; farmers: number; hectares: number }[]> {
    return this.api.get<{ country: string; flag: string; farmers: number; hectares: number }[]>('/admin/countries');
  }

  getDiseaseReports(): Observable<{ name: string; count: number; percentage: number; color: string; trend: string }[]> {
    return this.api.get<{ name: string; count: number; percentage: number; color: string; trend: string }[]>('/admin/disease-reports');
  }

  getSystemHealth(): Observable<{ apiStatus: string; aiServiceStatus: string; databaseStatus: string; lastSync: string }> {
    return this.api.get<{ apiStatus: string; aiServiceStatus: string; databaseStatus: string; lastSync: string }>('/admin/system-health');
  }
}
