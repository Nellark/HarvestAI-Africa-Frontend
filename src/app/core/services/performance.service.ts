import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private readonly router = inject(Router);
  private metrics: PerformanceMetric[] = [];

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Track page navigation timing
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.recordNavigationTiming();
    });

    // Track Core Web Vitals
    this.trackCoreWebVitals();
  }

  private recordNavigationTiming(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.recordMetric('navigation', navigation.loadEventEnd - navigation.fetchStart);
        this.recordMetric('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
        this.recordMetric('firstPaint', this.getFirstPaint());
        this.recordMetric('firstContentfulPaint', this.getFirstContentfulPaint());
      }
    }
  }

  private trackCoreWebVitals(): void {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.recordMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0] as any;
          this.recordMetric('FID', firstEntry.processingStart - firstEntry.startTime);
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          this.recordMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }
  }

  private getFirstPaint(): number {
    const paintEntries = performance.getEntriesByName('first-paint');
    return paintEntries.length > 0 ? paintEntries[0].startTime : 0;
  }

  private getFirstContentfulPaint(): number {
    const paintEntries = performance.getEntriesByName('first-contentful-paint');
    return paintEntries.length > 0 ? paintEntries[0].startTime : 0;
  }

  recordMetric(name: string, value: number): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
    });

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const filtered = this.metrics.filter((m) => m.name === name);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, m) => acc + m.value, 0);
    return sum / filtered.length;
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}
