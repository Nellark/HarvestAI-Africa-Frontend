import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { ErrorTrackingService } from './core/services/error-tracking.service';
import { AppStateService } from './core/services/app-state.service';
import { I18nService } from './core/services/i18n.service';
import { UserAnalyticsService } from './core/services/user-analytics.service';
import { PerformanceService } from './core/services/performance.service';
import { PWAService } from './core/services/pwa.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor])),
    provideRouter(routes),
    ErrorTrackingService,
    AppStateService,
    I18nService,
    UserAnalyticsService,
    PerformanceService,
    PWAService,
  ],
};
