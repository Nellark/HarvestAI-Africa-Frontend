import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LandingService } from './landing.service';
import { environment } from '../../../environments/environment';

describe('LandingService', () => {
  let service: LandingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LandingService],
    });

    service = TestBed.inject(LandingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get landing data', () => {
    const testData = { heroStats: [], features: [] };

    service.getLandingData().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get hero stats', () => {
    const testData = [{ value: '1000', label: 'Farmers' }];

    service.getHeroStats().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing/hero-stats`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get countries', () => {
    const testData = [{ name: 'South Africa', flag: '🇿🇦', code: 'ZA' }];

    service.getCountries().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing/countries`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get features', () => {
    const testData = [{ icon: 'grass', title: 'Test', description: 'Test desc', bgColor: '#fff', color: '#000' }];

    service.getFeatures().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing/features`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get testimonials', () => {
    const testData = [{ name: 'John', location: 'SA', crop: 'Maize', quote: 'Great app', avatar: '' }];

    service.getTestimonials().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing/testimonials`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get FAQs', () => {
    const testData = [{ question: 'What is this?', answer: 'An app' }];

    service.getFAQs().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing/faqs`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get footer links', () => {
    const testData = [{ title: 'About', links: ['Team', 'Mission'] }];

    service.getFooterLinks().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/landing/footer-links`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
