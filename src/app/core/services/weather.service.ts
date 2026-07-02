import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { WeatherData } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly api = inject(ApiService);

  getWeatherData(country: string, province: string): Observable<WeatherData> {
    return this.api.get<WeatherData>(`/weather?country=${country}&province=${province}`);
  }

  getCurrentWeather(country: string, province: string): Observable<{ temperature: number; humidity: number; windSpeed: number; windDirection: string; precipitation: number; condition: string; icon: string; feelsLike: number; uvIndex?: number }> {
    return this.api.get<{ temperature: number; humidity: number; windSpeed: number; windDirection: string; precipitation: number; condition: string; icon: string; feelsLike: number; uvIndex?: number }>(`/weather/current?country=${country}&province=${province}`);
  }

  getForecast(country: string, province: string, days: number = 7): Observable<{ date: string; day: string; temperature: { high: number; low: number }; precipitation: { probability: number; amount: number }; humidity: number; windSpeed: number; condition: string; icon: string }[]> {
    return this.api.get<{ date: string; day: string; temperature: { high: number; low: number }; precipitation: { probability: number; amount: number }; humidity: number; windSpeed: number; condition: string; icon: string }[]>(`/weather/forecast?country=${country}&province=${province}&days=${days}`);
  }

  getAlerts(country: string, province: string): Observable<{ id: string; type: string; severity: string; title: string; description: string; startTime: string; endTime: string; affectedAreas: string[]; recommendations: string[] }[]> {
    return this.api.get<{ id: string; type: string; severity: string; title: string; description: string; startTime: string; endTime: string; affectedAreas: string[]; recommendations: string[] }[]>(`/weather/alerts?country=${country}&province=${province}`);
  }

  getAIRecommendations(country: string, province: string): Observable<{ id: string; icon: string; title: string; description: string; day: string; priority: string; category: string }[]> {
    return this.api.get<{ id: string; icon: string; title: string; description: string; day: string; priority: string; category: string }[]>(`/weather/ai-recommendations?country=${country}&province=${province}`);
  }
}
