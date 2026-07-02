import { AppStateService } from './app-state.service';

describe('AppStateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    service = new AppStateService();
  });

  it('should start as a guest profile when no one is signed in', () => {
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.user()?.name).toBe('Guest Farmer');
    expect(service.user()?.email).toBe('guest@harvestai.africa');
  });

  it('should keep location fields empty when no country or province is provided', () => {
    service.completeOnboarding({
      name: 'New Farm',
      size: 4,
      sizeUnit: 'ha',
      province: '',
      country: '',
      crops: ['Avocado'],
      livestock: [],
      waterSource: 'Rainwater',
      soilType: 'Loam',
      language: 'en',
      experience: 'beginner',
      hasInternet: true,
    });

    expect(service.user()?.country).toBe('');
    expect(service.user()?.province).toBe('');
    expect(service.farm()?.country).toBe('');
    expect(service.farm()?.province).toBe('');
  });

  it('should update the farm state from onboarding details and mark onboarding complete', () => {
    service.completeOnboarding({
      name: 'Ngoakoana Mphago Farm',
      size: 8.5,
      sizeUnit: 'ha',
      province: 'Limpopo',
      country: 'South Africa',
      crops: ['Maize', 'Tomatoes'],
      livestock: ['Chickens'],
      waterSource: 'Borehole',
      soilType: 'Loam',
      language: 'en',
      experience: 'intermediate',
      hasInternet: true,
    });

    expect(service.user()?.onboardingComplete).toBeTrue();
    expect(service.farm()?.name).toBe('Ngoakoana Mphago Farm');
    expect(service.farm()?.province).toBe('Limpopo');
    expect(service.farm()?.crops.length).toBe(2);
    expect(service.farm()?.livestock.length).toBe(1);
  });
});
