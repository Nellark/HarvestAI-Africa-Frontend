import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get weather data', () => {
    const testData = { current: { temp: 25 }, forecast: [] };

    service.getWeatherData('South Africa', 'Limpopo').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/weather?country=South%20Africa&province=Limpopo`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get current weather', () => {
    const testData = { temperature: 25, humidity: 60, windSpeed: 10, windDirection: 'N', precipitation: 0, condition: 'Sunny', icon: 'sun', feelsLike: 27 };

    service.getCurrentWeather('South Africa', 'Limpopo').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/weather/current?country=South%20Africa&province=Limpopo`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get forecast', () => {
    const testData = [{ date: '2026-01-10', day: 'Mon', temperature: { high: 30, low: 20 }, precipitation: { probability: 10, amount: 0 }, humidity: 50, windSpeed: 5, condition: 'Sunny', icon: 'sun' }];

    service.getForecast('South Africa', 'Limpopo', 7).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/weather/forecast?country=South%20Africa&province=Limpopo&days=7`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get alerts', () => {
    const testData = [{ id: 'alert-1', type: 'storm', severity: 'high', title: 'Storm warning', description: 'Heavy rain expected', startTime: '2026-01-10T10:00', endTime: '2026-01-10T18:00', affectedAreas: ['Limpopo'], recommendations: ['Stay indoors'] }];

    service.getAlerts('South Africa', 'Limpopo').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/weather/alerts?country=South%20Africa&province=Limpopo`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get AI recommendations', () => {
    const testData = [{ id: 'rec-1', icon: 'water', title: 'Irrigate crops', description: 'Due to dry spell', day: 'Today', priority: 'high', category: 'irrigation' }];

    service.getAIRecommendations('South Africa', 'Limpopo').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/weather/ai-recommendations?country=South%20Africa&province=Limpopo`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
