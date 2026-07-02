import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton" [class.skeleton-text]="type === 'text'" [class.skeleton-card]="type === 'card'" [class.skeleton-circle]="type === 'circle'">
      <div class="skeleton-shimmer"></div>
    </div>
  `,
  styles: `
    .skeleton {
      background: #e0e0e0;
      position: relative;
      overflow: hidden;
    }

    .skeleton-text {
      height: 1rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .skeleton-card {
      height: 120px;
      border-radius: 8px;
    }

    .skeleton-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .skeleton-shimmer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `
})
export class SkeletonLoaderComponent {
  @Input() type: 'text' | 'card' | 'circle' = 'text';
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
}
