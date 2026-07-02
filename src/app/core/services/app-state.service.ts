import { Injectable, signal, computed } from '@angular/core';
import type { MarketData, AnalyticsData, CommunityData } from '../models/app.models';
import type { User, Farm, WeatherData, Notification, PlannerTask, CropPrice, CropRecord } from '../../shared/models/app.models';

interface OnboardingPayload {
  name: string;
  fullName?: string;
  email?: string;
  phone?: string;
  size: number;
  sizeUnit: 'ha' | 'acres';
  province: string;
  country: string;
  crops: string[];
  soilType: string;
  waterSource: string;
  language: string;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly guestUser: User = {
    id: 'guest',
    name: 'Guest Farmer',
    email: 'guest@harvestai.africa',
    phone: '',
    role: 'farmer',
    country: '',
    province: '',
    language: 'en',
    onboardingComplete: false,
  };

  // User session
  readonly user = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this.user() !== null);

  // Farm data
  readonly farm = signal<Farm | null>(null);

  // Cached data
  readonly weather = signal<WeatherData | null>(null);
  readonly marketData = signal<MarketData | null>(null);
  readonly analyticsData = signal<AnalyticsData | null>(null);
  readonly communityData = signal<CommunityData | null>(null);
  readonly tasks = signal<PlannerTask[]>([]);
  readonly notifications = signal<Notification[]>([]);
  readonly prices = signal<CropPrice[]>([]);

  // UI state
  readonly isDarkMode = signal<boolean>(false);
  readonly isOffline = signal<boolean>(false);
  readonly sidebarOpen = signal<boolean>(true);
  readonly language = signal<string>('en');
  readonly assistantOpen = signal<boolean>(false);
  readonly notificationsOpen = signal<boolean>(false);

  // Computed values
  readonly unreadNotifications = computed(() =>
    this.notifications().filter((n) => !n.read).length
  );

  readonly theme = this.isDarkMode;
  readonly offline = this.isOffline;

  // Authentication methods
  setUser(user: User | null) {
    this.user.set(user);
    if (user) {
      localStorage.setItem('harvestai-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('harvestai-user');
    }
  }

  getUser(): User | null {
    return this.user();
  }

  logout() {
    this.setUser(null);
    this.farm.set(null);
    this.weather.set(null);
    this.marketData.set(null);
    this.analyticsData.set(null);
    this.communityData.set(null);
    this.tasks.set([]);
    this.notifications.set([]);
    this.prices.set([]);
    localStorage.removeItem('harvestai-token');
    localStorage.removeItem('harvestai-user');
  }

  // Farm data methods
  setFarm(farm: Farm | null) {
    this.farm.set(farm);
  }

  getFarm(): Farm | null {
    return this.farm();
  }

  // Cache methods
  setWeather(data: WeatherData | null) {
    this.weather.set(data);
  }

  setMarketData(data: MarketData | null) {
    this.marketData.set(data);
  }

  setAnalyticsData(data: AnalyticsData | null) {
    this.analyticsData.set(data);
  }

  setCommunityData(data: CommunityData | null) {
    this.communityData.set(data);
  }

  setPrices(prices: CropPrice[]) {
    this.prices.set(prices);
  }

  setTasks(tasks: PlannerTask[]) {
    this.tasks.set(tasks);
  }

  setNotifications(notifications: Notification[]) {
    this.notifications.set(notifications);
  }

  addNotification(notification: Notification) {
    this.notifications.update((ns) => [notification, ...ns]);
  }

  // Notification methods
  markNotificationRead(id: string) {
    this.notifications.update((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllNotificationsRead() {
    this.notifications.update((ns) => ns.map((n) => ({ ...n, read: true })));
  }

  // UI state methods
  toggleTheme() {
    this.toggleDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode.update((v) => !v);
    document.body.classList.toggle('dark-theme', this.isDarkMode());
    localStorage.setItem('harvestai-theme', this.isDarkMode() ? 'dark' : 'light');
  }

  setDarkMode(enabled: boolean) {
    this.isDarkMode.set(enabled);
    document.body.classList.toggle('dark-theme', enabled);
    localStorage.setItem('harvestai-theme', enabled ? 'dark' : 'light');
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

  setLanguage(language: string) {
    this.language.set(language);
    localStorage.setItem('harvestai-language', language);
  }

  // Onboarding
  completeOnboarding(payload: OnboardingPayload) {
    const currentUser = this.user() || this.guestUser;

    this.user.set({
      ...currentUser,
      name: payload.fullName || currentUser.name,
      email: payload.email || currentUser.email,
      phone: payload.phone || currentUser.phone,
      country: payload.country || currentUser.country,
      province: payload.province || currentUser.province,
      language: payload.language || currentUser.language,
      onboardingComplete: true,
    });

    this.language.set(payload.language || currentUser.language);

    // Create initial farm
    const crops: CropRecord[] = (payload.crops || []).map((name, index) => ({
      id: `crop-${index + 1}`,
      name,
      plantedDate: '',
      expectedHarvestDate: '',
      area: 0,
      areaUnit: payload.sizeUnit,
      status: 'planted',
      healthScore: 100,
      icon: 'grass',
    }));

    const newFarm: Farm = {
      id: `farm-${Date.now()}`,
      name: payload.name || 'My Farm',
      size: payload.size,
      sizeUnit: payload.sizeUnit,
      province: payload.province,
      country: payload.country,
      crops,
      livestock: [],
      soilType: payload.soilType,
      waterSource: payload.waterSource,
    };

    this.farm.set(newFarm);
  }

  updateProfile(profile: Partial<User>) {
    const currentUser = this.user();
    if (!currentUser) return;

    this.user.set({
      ...currentUser,
      ...profile,
    });
  }

  setUserAvatar(avatar: string | null) {
    const currentUser = this.user();
    if (!currentUser) return;

    this.user.set({
      ...currentUser,
      avatar: avatar ?? undefined,
    });
  }

  // Initialize from localStorage
  initialize() {
    // Load theme
    const savedTheme = localStorage.getItem('harvestai-theme');
    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    }

    // Load language
    const savedLanguage = localStorage.getItem('harvestai-language');
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('harvestai-user');
    if (savedUser) {
      try {
        this.user.set(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }

    // Check online status
    this.setOffline(!navigator.onLine);

    window.addEventListener('online', () => this.setOffline(false));
    window.addEventListener('offline', () => this.setOffline(true));
  }
}
