import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class AdminComponent {
  private readonly mockData = inject(MockDataService);

  kpis = this.mockData.admin.kpis;
  countryStats = this.mockData.admin.countryStats;
  diseaseReports = this.mockData.admin.diseaseReports;
  recentUsers = this.mockData.admin.recentUsers;
}
