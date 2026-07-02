import { Injectable, signal } from '@angular/core';
import { OFFLINE_CONFIG, STORAGE_KEYS } from '../config/app.constants';

interface OfflineQueueItem {
  id: string;
  timestamp: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  body?: unknown;
  headers?: Record<string, string>;
  retries: number;
}

@Injectable({ providedIn: 'root' })
export class OfflineService {
  private readonly isOnline = signal(navigator.onLine);
  private readonly syncQueue = signal<OfflineQueueItem[]>([]);
  private readonly isSyncing = signal(false);

  readonly online = this.isOnline.asReadonly();
  readonly syncing = this.isSyncing.asReadonly();
  readonly queueSize = this.syncQueue.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Load queue from storage
    this.loadQueue();

    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  private handleOnline() {
    this.isOnline.set(true);
    this.processQueue();
  }

  private handleOffline() {
    this.isOnline.set(false);
  }

  addToQueue(item: Omit<OfflineQueueItem, 'id' | 'timestamp' | 'retries'>): void {
    const queueItem: OfflineQueueItem = {
      ...item,
      id: this.generateId(),
      timestamp: Date.now(),
      retries: 0,
    };

    this.syncQueue.update((queue) => [...queue, queueItem]);
    this.saveQueue();
  }

  async processQueue(): Promise<void> {
    if (!this.isOnline() || this.isSyncing() || this.syncQueue().length === 0) {
      return;
    }

    this.isSyncing.set(true);

    try {
      const queue = [...this.syncQueue()];
      const processed: string[] = [];
      const failed: OfflineQueueItem[] = [];

      for (const item of queue) {
        try {
          await this.executeRequest(item);
          processed.push(item.id);
        } catch (error) {
          item.retries++;
          if (item.retries < 3) {
            failed.push(item);
          } else {
            // Max retries reached, remove from queue
            console.error('Max retries reached for offline item:', item);
            processed.push(item.id);
          }
        }
      }

      // Update queue
      this.syncQueue.update((q) => q.filter((item) => !processed.includes(item.id)));
      this.saveQueue();
    } finally {
      this.isSyncing.set(false);
    }
  }

  private async executeRequest(item: OfflineQueueItem): Promise<void> {
    const options: RequestInit = {
      method: item.method,
      headers: {
        'Content-Type': 'application/json',
        ...item.headers,
      },
    };

    if (item.body) {
      options.body = JSON.stringify(item.body);
    }

    const response = await fetch(item.url, options);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }

  clearQueue(): void {
    this.syncQueue.set([]);
    this.saveQueue();
  }

  getQueueSize(): number {
    return this.syncQueue().length;
  }

  private loadQueue(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
      if (stored) {
        this.syncQueue.set(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load offline queue:', error);
    }
  }

  private saveQueue(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(this.syncQueue()));
    } catch (error) {
      console.error('Failed to save offline queue:', error);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Cache management
  cacheData(key: string, data: unknown, ttl: number = OFFLINE_CONFIG.SYNC_INTERVAL): void {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      localStorage.setItem(`${STORAGE_KEYS.CACHED_DATA}-${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Failed to cache data:', error);
    }
  }

  getCachedData<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEYS.CACHED_DATA}-${key}`);
      if (!stored) return null;

      const item = JSON.parse(stored);
      const now = Date.now();

      // Check if cache is expired
      if (now - item.timestamp > item.ttl) {
        localStorage.removeItem(`${STORAGE_KEYS.CACHED_DATA}-${key}`);
        return null;
      }

      return item.data as T;
    } catch (error) {
      console.error('Failed to get cached data:', error);
      return null;
    }
  }

  clearCache(key?: string): void {
    if (key) {
      localStorage.removeItem(`${STORAGE_KEYS.CACHED_DATA}-${key}`);
    } else {
      // Clear all cached data
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_KEYS.CACHED_DATA))
        .forEach((k) => localStorage.removeItem(k));
    }
  }

  getCacheSize(): number {
    let size = 0;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_KEYS.CACHED_DATA))
      .forEach((k) => {
        size += localStorage.getItem(k)?.length || 0;
      });
    return size;
  }
}
