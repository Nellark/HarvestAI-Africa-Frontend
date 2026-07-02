import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { environment } from '../../../environments/environment';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get farm data', () => {
    const testData = { id: 'farm-1', name: 'My Farm', size: 10 };

    service.getFarmData().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/farms/me`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get stat cards', () => {
    const testData = [{ icon: 'grass', label: 'Crops', value: '10', trend: 5, iconClass: 'text-green' }];

    service.getStatCards().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/dashboard/stats`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get AI recommendations', () => {
    const testData = [{ icon: 'lightbulb', title: 'Water crops', description: 'Due to heat', priority: 'high', iconClass: 'text-yellow', badgeClass: 'badge-high' }];

    service.getAIRecommendations().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/dashboard/ai-recommendations`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get quick actions', () => {
    const testData = [{ icon: 'add', label: 'Add Crop', route: '/farm/add' }];

    service.getQuickActions().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/dashboard/quick-actions`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get timeline', () => {
    const testData = [{ title: 'Planted maize', description: 'Field 1', time: '2 days ago', tone: 'success' }];

    service.getTimeline().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/dashboard/timeline`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get tasks', () => {
    const testData = [{ id: 'task-1', title: 'Water crops', completed: false, dueDate: '2026-01-10' }];

    service.getTasks().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/dashboard/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
