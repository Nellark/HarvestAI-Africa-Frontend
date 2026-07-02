import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.api.baseUrl;
  private readonly requestTimeout = environment.api.timeout;
  private readonly retryAttempts = environment.api.retryAttempts;
  private readonly retryDelay = environment.api.retryDelay;

  get<T>(path: string, options?: object): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${path}`, options)
      .pipe(
        timeout(this.requestTimeout),
        retry({ count: this.retryAttempts, delay: this.retryDelay }),
        catchError(this.handleError)
      );
  }

  post<T>(path: string, body: unknown, options?: object): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(
        timeout(this.requestTimeout),
        retry({ count: this.retryAttempts, delay: this.retryDelay }),
        catchError(this.handleError)
      );
  }

  put<T>(path: string, body: unknown, options?: object): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(
        timeout(this.requestTimeout),
        retry({ count: this.retryAttempts, delay: this.retryDelay }),
        catchError(this.handleError)
      );
  }

  delete<T>(path: string, options?: object): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${path}`, options)
      .pipe(
        timeout(this.requestTimeout),
        retry({ count: this.retryAttempts, delay: this.retryDelay }),
        catchError(this.handleError)
      );
  }

  patch<T>(path: string, body: unknown, options?: object): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(
        timeout(this.requestTimeout),
        retry({ count: this.retryAttempts, delay: this.retryDelay }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Request failed.';
    return throwError(() => new Error(message));
  }
}
