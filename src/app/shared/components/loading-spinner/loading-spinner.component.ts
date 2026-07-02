import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-spinner" [class.small]="size === 'small'" [class.large]="size === 'large'">
      <div class="spinner"></div>
    </div>
  `,
  styles: `
    .loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(76, 175, 80, 0.2);
      border-top-color: #4CAF50;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .loading-spinner.small .spinner {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }

    .loading-spinner.large .spinner {
      width: 60px;
      height: 60px;
      border-width: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
