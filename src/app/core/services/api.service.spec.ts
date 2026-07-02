import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request', () => {
    const testData = { id: 1, name: 'Test' };

    service.get<{ id: number; name: string }>('/test').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/test`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should make POST request', () => {
    const testData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };

    service.post<{ id: number; name: string }>('/test', body).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush(testData);
  });

  it('should make PUT request', () => {
    const testData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };

    service.put<{ id: number; name: string }>('/test', body).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/test`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    req.flush(testData);
  });

  it('should make DELETE request', () => {
    service.delete<void>('/test').subscribe();

    const req = httpMock.expectOne(`${environment.api.baseUrl}/test`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should make PATCH request', () => {
    const testData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };

    service.patch<{ id: number; name: string }>('/test', body).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/test`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush(testData);
  });

  it('should handle errors', () => {
    service.get<any>('/test').subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}/test`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
