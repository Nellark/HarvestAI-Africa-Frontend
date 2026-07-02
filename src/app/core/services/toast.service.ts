import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'warning' | 'danger';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(message: string, type: ToastType = 'success', duration = 3200) {
    const toast: ToastMessage = {
      id: `toast-${++this.counter}`,
      message,
      type,
      duration,
    };

    this.toasts.update((items) => [...items, toast]);

    if (duration > 0) {
      window.setTimeout(() => this.remove(toast.id), duration);
    }

    return toast.id;
  }

  success(message: string, duration = 3200) {
    return this.show(message, 'success', duration);
  }

  info(message: string, duration = 3200) {
    return this.show(message, 'info', duration);
  }

  warning(message: string, duration = 3600) {
    return this.show(message, 'warning', duration);
  }

  danger(message: string, duration = 4000) {
    return this.show(message, 'danger', duration);
  }

  remove(id: string) {
    this.toasts.update((items) => items.filter((toast) => toast.id !== id));
  }
}
