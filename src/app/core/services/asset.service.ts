import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly cdnEnabled = environment.cdn.enabled;
  private readonly cdnBaseUrl = environment.cdn.baseUrl;
  private readonly imageBaseUrl = environment.cdn.imageBaseUrl;

  // Default fallback images
  private readonly fallbackImages = {
    hero: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    farm: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=320&fit=crop',
    crop: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&h=700&fit=crop',
    weather: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=700&fit=crop',
    market: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=600&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  };

  getImage(path: string, type: 'hero' | 'farm' | 'crop' | 'weather' | 'market' | 'avatar' = 'hero'): string {
    if (!path) {
      return this.fallbackImages[type];
    }

    // If it's already a full URL, return as is
    if (this.isFullUrl(path)) {
      return path;
    }

    // If CDN is enabled, use CDN URL
    if (this.cdnEnabled) {
      return `${this.imageBaseUrl}/${path}`;
    }

    // Otherwise, return the path as-is (assuming it's a relative path to assets)
    return path;
  }

  getAsset(path: string): string {
    if (!path) {
      return '';
    }

    if (this.isFullUrl(path)) {
      return path;
    }

    if (this.cdnEnabled) {
      return `${this.cdnBaseUrl}/${path}`;
    }

    return `/assets/${path}`;
  }

  getFlag(countryCode: string): string {
    return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
  }

  getCountryFlag(countryName: string): string {
    const codeMap: Record<string, string> = {
      'South Africa': 'za',
      'Kenya': 'ke',
      'Nigeria': 'ng',
      'Ghana': 'gh',
      'Zimbabwe': 'zw',
      'Zambia': 'zm',
      'Uganda': 'ug',
      'Mozambique': 'mz',
      'Botswana': 'bw',
      'Tanzania': 'tz',
      'Malawi': 'mw',
      'Senegal': 'sn',
    };

    const code = codeMap[countryName] || 'za';
    return this.getFlag(code);
  }

  private isFullUrl(url: string): boolean {
    return /^https?:\/\//i.test(url) || url.startsWith('data:');
  }
}
