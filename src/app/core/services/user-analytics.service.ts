import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

@Injectable({ providedIn: 'root' })
export class UserAnalyticsService {
  private readonly router = inject(Router);
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];
  private maxQueueSize = 100;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  private initialize(): void {
    // Track page views
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.trackPageView(event.urlAfterRedirects);
    });

    // Send queued events periodically
    setInterval(() => this.flushQueue(), 30000); // Every 30 seconds
  }

  trackEvent(event: string, properties?: Record<string, unknown>): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
      userId: this.getUserId(),
      sessionId: this.sessionId,
    };

    this.eventQueue.push(analyticsEvent);
    if (this.eventQueue.length >= this.maxQueueSize) {
      this.flushQueue();
    }
  }

  trackPageView(url: string): void {
    this.trackEvent('page_view', {
      url,
      path: new URL(url, window.location.origin).pathname,
      referrer: document.referrer,
    });
  }

  trackUserAction(action: string, context?: Record<string, unknown>): void {
    this.trackEvent('user_action', {
      action,
      ...context,
    });
  }

  trackFeatureUsage(feature: string, action: string): void {
    this.trackEvent('feature_usage', {
      feature,
      action,
    });
  }

  trackError(error: string, context?: Record<string, unknown>): void {
    this.trackEvent('error', {
      error,
      ...context,
    });
  }

  private flushQueue(): void {
    if (this.eventQueue.length === 0) return;

    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
    // For now, store in localStorage
    const stored = JSON.parse(localStorage.getItem('harvestai-analytics') || '[]');
    stored.push(...this.eventQueue);
    localStorage.setItem('harvestai-analytics', JSON.stringify(stored.slice(-500)));

    this.eventQueue = [];
  }

  private getUserId(): string | undefined {
    return localStorage.getItem('harvestai-user') ? JSON.parse(localStorage.getItem('harvestai-user')!).id : undefined;
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
