import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { MarketData, MarketplaceListing } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class MarketService {
  private readonly api = inject(ApiService);

  getMarketData(): Observable<MarketData> {
    return this.api.get<MarketData>('/market');
  }

  getMarketPrices(crop?: string, location?: string): Observable<{ id: string; crop: string; price: number; currency: string; unit: string; market: string; location: { country: string; province: string; market: string }; trend: string; changePercentage: number; date: string }[]> {
    const params = new URLSearchParams();
    if (crop) params.append('crop', crop);
    if (location) params.append('location', location);
    return this.api.get<{ id: string; crop: string; price: number; currency: string; unit: string; market: string; location: { country: string; province: string; market: string }; trend: string; changePercentage: number; date: string }[]>(`/market/prices?${params.toString()}`);
  }

  getPriceTrends(crop: string, location: string): Observable<{ crop: string; location: string; historicalData: { date: string; price: number }[]; prediction?: { nextWeek: number; nextMonth: number; confidence: number }; recommendation: string }> {
    return this.api.get<{ crop: string; location: string; historicalData: { date: string; price: number }[]; prediction?: { nextWeek: number; nextMonth: number; confidence: number }; recommendation: string }>(`/market/trends?crop=${crop}&location=${location}`);
  }

  getNearbyBuyers(location: string, crop?: string): Observable<{ id: string; name: string; type: string; location: string; distance: number; contact?: { phone?: string; email?: string }; crops: string[]; averagePrice: number; rating?: number }[]> {
    const params = new URLSearchParams({ location });
    if (crop) params.append('crop', crop);
    return this.api.get<{ id: string; name: string; type: string; location: string; distance: number; contact?: { phone?: string; email?: string }; crops: string[]; averagePrice: number; rating?: number }[]>(`/market/buyers?${params.toString()}`);
  }

  getMarketplaceListings(filters?: { crop?: string; location?: string; status?: string }): Observable<MarketplaceListing[]> {
    const params = new URLSearchParams();
    if (filters?.crop) params.append('crop', filters.crop);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.status) params.append('status', filters.status);
    return this.api.get<MarketplaceListing[]>(`/marketplace/listings?${params.toString()}`);
  }

  createListing(listing: Omit<MarketplaceListing, 'id' | 'createdAt' | 'sellerName'>): Observable<MarketplaceListing> {
    return this.api.post<MarketplaceListing>('/marketplace/listings', listing);
  }

  updateListing(id: string, listing: Partial<MarketplaceListing>): Observable<MarketplaceListing> {
    return this.api.put<MarketplaceListing>(`/marketplace/listings/${id}`, listing);
  }

  deleteListing(id: string): Observable<void> {
    return this.api.delete<void>(`/marketplace/listings/${id}`);
  }
}
