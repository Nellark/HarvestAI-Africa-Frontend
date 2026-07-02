import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { DiseaseDetectionResult, DiseaseReport } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DiseaseDetectionService {
  private readonly api = inject(ApiService);

  analyzeImage(image: File, crop: string, fieldId?: string): Observable<DiseaseDetectionResult> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('crop', crop);
    if (fieldId) formData.append('fieldId', fieldId);

    return this.api.post<DiseaseDetectionResult>('/disease-detection/analyze', formData);
  }

  getDiseaseReports(fieldId?: string): Observable<DiseaseReport[]> {
    const params = fieldId ? `?fieldId=${fieldId}` : '';
    return this.api.get<DiseaseReport[]>(`/disease-detection/reports${params}`);
  }

  getDiseaseReport(id: string): Observable<DiseaseReport> {
    return this.api.get<DiseaseReport>(`/disease-detection/reports/${id}`);
  }

  createDiseaseReport(report: Omit<DiseaseReport, 'id' | 'detectedDate'>): Observable<DiseaseReport> {
    return this.api.post<DiseaseReport>('/disease-detection/reports', report);
  }

  updateDiseaseReport(id: string, report: Partial<DiseaseReport>): Observable<DiseaseReport> {
    return this.api.put<DiseaseReport>(`/disease-detection/reports/${id}`, report);
  }
}
