import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MOCK_MARKETPLACE_LISTINGS } from '../../mock-data/mock-data';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './marketplace.html',
  styleUrls: ['./marketplace.scss'],
})
export class MarketplaceComponent {
  activeTab = signal('all');
  activeCategory = signal('all');
  searchTerm = '';

  tabs = [
    { id: 'all', label: 'All Listings', icon: 'storefront' },
    { id: 'buy', label: 'Buy Inputs', icon: 'shopping_cart' },
    { id: 'sell', label: 'Sell Produce', icon: 'local_shipping' },
  ];

  categories = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'produce', label: 'Produce', icon: 'local_florist' },
    { id: 'inputs', label: 'Inputs', icon: 'grass' },
    { id: 'equipment', label: 'Equipment', icon: 'agriculture' },
    { id: 'services', label: 'Services', icon: 'miscellaneous_services' },
  ];

  filteredItems() {
    return MOCK_MARKETPLACE_LISTINGS.filter(item => {
      const matchCat = this.activeCategory() === 'all' || item.category === this.activeCategory();
      const matchSearch = !this.searchTerm || item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchTab = this.activeTab() === 'all' ||
        (this.activeTab() === 'buy' && ['inputs', 'equipment', 'services'].includes(item.category)) ||
        (this.activeTab() === 'sell' && item.category === 'produce');
      return matchCat && matchSearch && matchTab;
    });
  }
}
