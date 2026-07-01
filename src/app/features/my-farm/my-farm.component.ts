import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-my-farm',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, FormsModule],
  templateUrl: './my-farm.html',
  styleUrls: ['./my-farm.scss'],
})
export class MyFarmComponent {
  state = inject(AppStateService);
  activeTab = signal('crops');

  tabs = [
    { id: 'crops', label: 'Crops', icon: 'grass' },
    { id: 'livestock', label: 'Livestock', icon: 'pets' },
    { id: 'soil', label: 'Soil & Water', icon: 'water_drop' },
    { id: 'expenses', label: 'Expenses', icon: 'account_balance_wallet' },
  ];

  statusBadgeClass(status: string) {
    const map: Record<string, string> = { planted: 'badge-info', growing: 'badge-primary', ready: 'badge-success', harvested: 'badge-neutral' };
    return map[status] || 'badge-neutral';
  }

  healthColor(score: number) {
    if (score >= 85) return '#4CAF50';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  }

  soilInfo = [
    { label: 'Soil Type', value: 'Sandy Loam' },
    { label: 'pH Level', value: '6.2 (Slightly Acidic)' },
    { label: 'Organic Matter', value: '2.8%' },
    { label: 'Nitrogen (N)', value: '45 kg/ha' },
    { label: 'Phosphorus (P)', value: '28 mg/kg' },
    { label: 'Potassium (K)', value: '180 mg/kg' },
    { label: 'Last Soil Test', value: 'March 2026' },
  ];

  waterSourceInfo = [
    { icon: 'water_pump', label: 'Borehole', status: 'Active' },
    { icon: 'water_drop', label: 'Rainwater Tank (5000L)', status: '62% Full' },
    { icon: 'sprinkler', label: 'Drip Irrigation', status: 'Installed' },
  ];

  expenses = [
    { category: 'Seeds & Seedlings', amount: 6200, pct: 25, icon: 'grass', iconClass: 'icon-wrap-primary' },
    { category: 'Fertilizers', amount: 5400, pct: 22, icon: 'compost', iconClass: 'icon-wrap-accent' },
    { category: 'Pesticides/Fungicides', amount: 3800, pct: 15, icon: 'bug_report', iconClass: 'icon-wrap-danger' },
    { category: 'Labour', amount: 4800, pct: 19, icon: 'person', iconClass: 'icon-wrap-warning' },
    { category: 'Fuel & Machinery', amount: 2900, pct: 12, icon: 'agriculture', iconClass: 'icon-wrap-info' },
    { category: 'Other', amount: 1750, pct: 7, icon: 'more_horiz', iconClass: 'icon-wrap-neutral' },
  ];
}
