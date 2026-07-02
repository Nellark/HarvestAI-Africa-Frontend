import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with isLoading false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should show loading', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should hide loading', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBe(false);
  });

  it('should handle multiple show calls', () => {
    service.show();
    service.show();
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should reset loading state', () => {
    service.show();
    service.reset();
    expect(service.isLoading()).toBe(false);
  });
});
