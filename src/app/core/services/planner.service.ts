import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { PlannerData, Task, CalendarEvent, Reminder } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PlannerService {
  private readonly api = inject(ApiService);

  getPlannerData(): Observable<PlannerData> {
    return this.api.get<PlannerData>('/planner');
  }

  getTasks(filters?: { status?: string; category?: string; priority?: string }): Observable<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.priority) params.append('priority', filters.priority);
    const queryString = params.toString();
    return this.api.get<Task[]>(queryString ? `/planner/tasks?${queryString}` : '/planner/tasks');
  }

  createTask(task: Omit<Task, 'id' | 'completedAt'>): Observable<Task> {
    return this.api.post<Task>('/planner/tasks', task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.api.put<Task>(`/planner/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.api.delete<void>(`/planner/tasks/${id}`);
  }

  getEvents(startDate: string, endDate: string): Observable<CalendarEvent[]> {
    return this.api.get<CalendarEvent[]>(`/planner/events?start=${startDate}&end=${endDate}`);
  }

  createEvent(event: Omit<CalendarEvent, 'id'>): Observable<CalendarEvent> {
    return this.api.post<CalendarEvent>('/planner/events', event);
  }

  updateEvent(id: string, event: Partial<CalendarEvent>): Observable<CalendarEvent> {
    return this.api.put<CalendarEvent>(`/planner/events/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.api.delete<void>(`/planner/events/${id}`);
  }

  getReminders(): Observable<Reminder[]> {
    return this.api.get<Reminder[]>('/planner/reminders');
  }

  createReminder(reminder: Omit<Reminder, 'id'>): Observable<Reminder> {
    return this.api.post<Reminder>('/planner/reminders', reminder);
  }

  updateReminder(id: string, reminder: Partial<Reminder>): Observable<Reminder> {
    return this.api.put<Reminder>(`/planner/reminders/${id}`, reminder);
  }

  deleteReminder(id: string): Observable<void> {
    return this.api.delete<void>(`/planner/reminders/${id}`);
  }
}
