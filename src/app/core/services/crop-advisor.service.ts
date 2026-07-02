import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { CropRecommendation } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CropAdvisorService {
  private readonly api = inject(ApiService);

  getCropRecommendations(params: {
    soilType: string;
    irrigationType: string;
    climate: string;
    budget?: number;
    season: string;
  }): Observable<CropRecommendation[]> {
    return this.api.post<CropRecommendation[]>('/crop-advisor/recommendations', params);
  }

  getPlantingSchedule(crop: string, location: string): Observable<{ crop: string; location: string; schedule: { date: string; activity: string; description: string }[] }> {
    return this.api.get<{ crop: string; location: string; schedule: { date: string; activity: string; description: string }[] }>(`/crop-advisor/planting-schedule?crop=${crop}&location=${location}`);
  }

  getSoilAnalysis(fieldId: string): Observable<{ fieldId: string; ph: number; nitrogen: number; phosphorus: number; potassium: number; organicMatter: number; recommendations: string[] }> {
    return this.api.get<{ fieldId: string; ph: number; nitrogen: number; phosphorus: number; potassium: number; organicMatter: number; recommendations: string[] }>(`/crop-advisor/soil-analysis?fieldId=${fieldId}`);
  }
}
