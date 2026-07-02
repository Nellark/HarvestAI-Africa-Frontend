import { Injectable, inject } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { environment } from '../../../environments/environment';

interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  userId?: string;
  additionalContext?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class ErrorTrackingService implements ErrorHandler {
  private errorQueue: ErrorLog[] = [];
  private maxQueueSize = 50;

  handleError(error: unknown): void {
    const errorLog: ErrorLog = {
      message: this.extractMessage(error),
      stack: this.extractStack(error),
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.getUserId(),
    };

    this.logError(errorLog);

    // In production, you would send this to a service like Sentry
    if (environment.production) {
      this.sendToErrorService(errorLog);
    } else {
      console.error('Error:', error);
    }
  }

  private extractMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    return String(error);
  }

  private extractStack(error: unknown): string | undefined {
    if (error instanceof Error) return error.stack;
    return undefined;
  }

  private getUserId(): string | undefined {
    return localStorage.getItem('harvestai-user') ? JSON.parse(localStorage.getItem('harvestai-user')!).id : undefined;
  }

  private logError(errorLog: ErrorLog): void {
    this.errorQueue.push(errorLog);
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }
  }

  private sendToErrorService(errorLog: ErrorLog): void {
    // In production, integrate with Sentry or similar service
    // For now, we'll store in localStorage for debugging
    const errors = JSON.parse(localStorage.getItem('harvestai-errors') || '[]');
    errors.push(errorLog);
    localStorage.setItem('harvestai-errors', JSON.stringify(errors.slice(-100)));
  }

  getErrorLogs(): ErrorLog[] {
    return [...this.errorQueue];
  }

  clearErrorLogs(): void {
    this.errorQueue = [];
  }
}
