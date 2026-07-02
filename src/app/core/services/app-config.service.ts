import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { AppConfig, Country, Language } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly api = inject(ApiService);

  // Static config from environment
  get appName(): string {
    return environment.app.name;
  }

  get appVersion(): string {
    return environment.app.version;
  }

  get defaultLanguage(): string {
    return environment.app.defaultLanguage;
  }

  get supportedLanguages(): Language[] {
    return environment.app.supportedLanguages.map((code) => ({
      code,
      name: this.getLanguageName(code),
    }));
  }

  get contactEmail(): string {
    return environment.contact.email;
  }

  get contactPhone(): string {
    return environment.contact.phone;
  }

  get contactAddress(): string | undefined {
    return environment.contact.address;
  }

  get socialLinks(): Record<string, string> {
    return environment.social;
  }

  get supportedCountries(): Country[] {
    return environment.countries.map((c) => ({
      name: c.name,
      flag: c.flag,
      code: c.code,
    }));
  }

  get supportedCrops(): string[] {
    return [...environment.crops];
  }

  get featureFlags(): Record<string, boolean> {
    return environment.features;
  }

  // Dynamic config from API
  getConfig(): Observable<AppConfig> {
    return this.api.get<AppConfig>('/config');
  }

  private getLanguageName(code: string): string {
    const names: Record<string, string> = {
      en: 'English',
      sw: 'Swahili',
      fr: 'Français',
      pt: 'Português',
      ar: 'العربية',
      zu: 'isiZulu',
    };
    return names[code] || code;
  }
}
