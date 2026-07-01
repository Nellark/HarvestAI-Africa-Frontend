import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-market-prices',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './market-prices.html',
  styleUrls: ['./market-prices.scss'],
})
export class MarketPricesComponent {
  state = inject(AppStateService);
  private readonly mockData = inject(MockDataService);
  searchTerm = '';
  activeFilter = signal('All');
  selectedPrice = signal<any>(null);

  filters = this.mockData.marketPrices.filters;

  filteredPrices = () => {
    return this.state.prices().filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  };

  trendData(basePrice: number) {
    return Array.from({ length: 30 }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.1;
      const trend = i / 30 * 0.05;
      return Math.max(5, Math.min(45, 20 + variation * 20 + trend * 20 + (i === 29 ? 5 : 0)));
    });
  }

  aiInsight(price: any): string {
    if (price.trend === 'up') return `${price.name} prices are trending upward (+${price.changePercent}%). Consider selling within the next 2 weeks before seasonal correction. Current conditions favour sellers.`;
    if (price.trend === 'down') return `${price.name} prices are under pressure. Hold if possible — AI forecasts a price recovery in 3–4 weeks based on seasonal patterns.`;
    return `${price.name} prices are stable. Good time to plan sales based on your cash flow needs.`;
  }

  nearbyBuyers = this.mockData.marketPrices.nearbyBuyers;
}
