import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AppStateService } from './app-state.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    localStorage.clear();
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('logs in with the backend when the endpoint responds', async () => {
    const promise = service.login('farmer@example.com', 'secret123');

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');

    req.flush({
      accessToken: 'token-123',
      user: {
        id: 'u-1',
        name: 'Test Farmer',
        email: 'farmer@example.com',
        role: 'farmer',
        country: 'South Africa',
        province: 'Limpopo',
        language: 'en',
        onboardingComplete: false,
      },
    });

    const user = await promise;
    expect(user.email).toBe('farmer@example.com');
    expect(TestBed.inject(AppStateService).isAuthenticated()).toBeTrue();
  });
});
