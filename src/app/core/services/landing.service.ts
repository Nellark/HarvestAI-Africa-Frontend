import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { LandingPageData } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class LandingService {
  private readonly api = inject(ApiService);

  getLandingData(): Observable<LandingPageData> {
    return this.api.get<LandingPageData>('/landing');
  }

  getHeroStats(): Observable<{ value: string; label: string }[]> {
    return this.api.get<{ value: string; label: string }[]>('/landing/hero-stats');
  }

  getCountries(): Observable<{ name: string; flag: string; code: string }[]> {
    return this.api.get<{ name: string; flag: string; code: string }[]>('/landing/countries');
  }

  getFeatures(): Observable<{ icon: string; title: string; description: string; bgColor: string; color: string }[]> {
    return this.api.get<{ icon: string; title: string; description: string; bgColor: string; color: string }[]>('/landing/features');
  }

  getTestimonials(): Observable<{ name: string; location: string; crop: string; quote: string; avatar: string }[]> {
    return this.api.get<{ name: string; location: string; crop: string; quote: string; avatar: string }[]>('/landing/testimonials');
  }

  getFAQs(): Observable<{ question: string; answer: string }[]> {
    return this.api.get<{ question: string; answer: string }[]>('/landing/faqs');
  }

  getFooterLinks(): Observable<{ title: string; links: string[] }[]> {
    return this.api.get<{ title: string; links: string[] }[]>('/landing/footer-links');
  }
}
