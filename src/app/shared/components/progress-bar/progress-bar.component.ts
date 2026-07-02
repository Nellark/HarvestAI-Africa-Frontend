import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-bar" [class.indeterminate]="indeterminate">
      <div class="progress-fill" [style.width.%]="indeterminate ? 0 : value" [class.indeterminate]="indeterminate"></div>
    </div>
  `,
  styles: `
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4CAF50, #8BC34A);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-fill.indeterminate {
      width: 30% !important;
      animation: indeterminate 1.5s infinite linear;
    }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }
  `
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() indeterminate: boolean = false;
}
