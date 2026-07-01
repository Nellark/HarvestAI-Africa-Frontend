import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppStateService } from '../../core/services/app-state.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss'],
})
export class WeatherComponent {
  state = inject(AppStateService);
  private readonly mockData = inject(MockDataService);

  get currentStats() {
    const w = this.state.weather()!;
    return [
      { icon: 'water_drop', label: 'Humidity', value: `${w.humidity}%` },
      { icon: 'air', label: 'Wind Speed', value: `${w.windSpeed} km/h` },
      { icon: 'wb_sunny', label: 'UV Index', value: `${w.uvIndex}` },
      { icon: 'water', label: 'Rainfall Today', value: `${w.rainfall}mm` },
    ];
  }

  aiRecs = this.mockData.weather.aiRecs;
  weatherAlerts = this.mockData.weather.weatherAlerts;
}
