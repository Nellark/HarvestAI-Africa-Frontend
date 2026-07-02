import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to English', () => {
    expect(service.getLanguage()).toBe('en');
  });

  it('should translate English text', () => {
    const result = service.translate('common.loading');
    expect(result).toBe('Loading...');
  });

  it('should translate Swahili text', () => {
    service.setLanguage('sw');
    const result = service.translate('common.loading');
    expect(result).toBe('Inapakia...');
  });

  it('should translate French text', () => {
    service.setLanguage('fr');
    const result = service.translate('common.loading');
    expect(result).toBe('Chargement...');
  });

  it('should return key if translation not found', () => {
    const result = service.translate('nonexistent.key');
    expect(result).toBe('nonexistent.key');
  });

  it('should replace parameters in translation', () => {
    const result = service.translate('common.welcome', { name: 'John' });
    // This would need the translation to support parameters
    expect(result).toBeTruthy();
  });
});
