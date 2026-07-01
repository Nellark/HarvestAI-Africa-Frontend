import { Injectable, signal, computed } from '@angular/core';
import type { User, Farm, WeatherData, CropPrice, Notification, PlannerTask } from '../../shared/models/app.models';
import { MOCK_USER, MOCK_FARM, MOCK_WEATHER, MOCK_PRICES, MOCK_NOTIFICATIONS, MOCK_TASKS } from '../../mock-data/mock-data';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly user = signal<User | null>(MOCK_USER);
  readonly farm = signal<Farm | null>(MOCK_FARM);
  readonly weather = signal<WeatherData | null>(MOCK_WEATHER);
  readonly prices = signal<CropPrice[]>(MOCK_PRICES);
  readonly notifications = signal<Notification[]>(MOCK_NOTIFICATIONS);
  readonly tasks = signal<PlannerTask[]>(MOCK_TASKS);
  readonly isDarkMode = signal<boolean>(false);
  readonly isOffline = signal<boolean>(false);
  readonly sidebarOpen = signal<boolean>(true);
  readonly language = signal<string>('en');
  readonly isAuthenticated = signal<boolean>(true);
  readonly assistantOpen = signal<boolean>(false);
  readonly notificationsOpen = signal<boolean>(false);
  readonly theme = this.isDarkMode;
  readonly offline = this.isOffline;

  readonly unreadNotifications = computed(() =>
    this.notifications().filter((n) => !n.read).length
  );

  toggleDarkMode() {
    this.isDarkMode.update((v) => !v);
    document.body.classList.toggle('dark-theme', this.isDarkMode());
  }

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  setSidebarOpen(open: boolean) {
    this.sidebarOpen.set(open);
  }

  setNotificationsOpen(open: boolean) {
    this.notificationsOpen.set(open);
  }

  setAssistantOpen(open: boolean) {
    this.assistantOpen.set(open);
  }

  setOffline(offline: boolean) {
    this.isOffline.set(offline);
  }

  toggleOffline() {
    this.isOffline.update((v) => !v);
  }

  toggleTheme() {
    this.toggleDarkMode();
  }

  setLanguage(language: string) {
    this.language.set(language);
  }

  markNotificationRead(id: string) {
    this.notifications.update((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllNotificationsRead() {
    this.notifications.update((ns) => ns.map((n) => ({ ...n, read: true })));
  }
}
