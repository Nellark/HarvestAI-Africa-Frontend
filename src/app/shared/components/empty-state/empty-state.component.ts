import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon">{{ icon }}</div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-description">{{ description }}</p>
      <button *ngIf="actionLabel" class="empty-action" (click)="onAction.emit())">
        {{ actionLabel }}
      </button>
    </div>
  `,
  styles: `
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      color: #666;
    }

    .empty-description {
      margin: 0 0 1.5rem 0;
      color: #999;
      max-width: 400px;
    }

    .empty-action {
      padding: 0.75rem 1.5rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }

    .empty-action:hover {
      background: #45a049;
    }
  `
})
export class EmptyStateComponent {
  @Input() icon: string = '📭';
  @Input() title: string = 'No data found';
  @Input() description: string = 'There is no data to display at the moment.';
  @Input() actionLabel?: string;
  @Output() action = new EventEmitter<void>();
}
