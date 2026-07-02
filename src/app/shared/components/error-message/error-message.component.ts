import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-message" [class.small]="size === 'small'" [class.large]="size === 'large'">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h4 *ngIf="title" class="error-title">{{ title }}</h4>
        <p class="error-text">{{ message }}</p>
        <button *ngIf="showRetry" class="error-retry" (click)="onRetry.emit())">
          Retry
        </button>
      </div>
    </div>
  `,
  styles: `
    .error-message {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      color: #c33;
    }

    .error-message.small {
      padding: 0.5rem;
      font-size: 0.875rem;
    }

    .error-message.large {
      padding: 1.5rem;
      font-size: 1.125rem;
    }

    .error-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .error-content {
      flex: 1;
    }

    .error-title {
      margin: 0 0 0.25rem 0;
      font-weight: 600;
    }

    .error-text {
      margin: 0;
      opacity: 0.9;
    }

    .error-retry {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      background: #c33;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .error-retry:hover {
      background: #a22;
    }
  `
})
export class ErrorMessageComponent {
  @Input() message: string = 'An error occurred';
  @Input() title?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showRetry: boolean = false;
  @Output() retry = new EventEmitter<void>();
}
