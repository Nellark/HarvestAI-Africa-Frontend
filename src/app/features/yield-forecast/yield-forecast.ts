import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppStateService } from '../../core/services/app-state.service';
import { MOCK_YIELD_FORECAST } from '../../mock-data/mock-data';

@Component({
  selector: 'app-yield-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './yield-forecast.html',
  styleUrls: ['./yield-forecast.scss'],
})
export class YieldForecastComponent {
  state = inject(AppStateService);
  forecast = MOCK_YIELD_FORECAST;

  pctChange() {
    return (((this.forecast.predictedYield - this.forecast.historicalYield) / this.forecast.historicalYield) * 100).toFixed(1);
  }

  scoreColor(impact: string, score: number) {
    if (impact === 'positive') return '#4CAF50';
    if (impact === 'negative') return '#EF4444';
    return '#9CA3AF';
  }

  yieldRecs = [
    { icon: 'water_drop', title: 'Optimise Irrigation Timing', description: 'AI analysis shows reducing irrigation frequency but increasing volume per session could improve yield by 8%.', improvement: '8', iconClass: 'icon-wrap-info', badgeClass: 'badge-info' },
    { icon: 'bug_report', title: 'Preventive Pest Management', description: 'Apply Chlorpyrifos at VE stage to prevent Fall Armyworm damage that historically reduces yield by 12%.', improvement: '12', iconClass: 'icon-wrap-danger', badgeClass: 'badge-warning' },
    { icon: 'compost', title: 'Split Fertiliser Application', description: 'Applying LAN in 3 splits instead of 2 can improve nitrogen uptake efficiency and boost yield.', improvement: '6', iconClass: 'icon-wrap-accent', badgeClass: 'badge-success' },
  ];
}
