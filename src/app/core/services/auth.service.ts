import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { User } from '../models/app.models';
import { AppStateService } from './app-state.service';
import { ApiService } from './api.service';

interface AuthResponse {
  accessToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly state = inject(AppStateService);
  private readonly api = inject(ApiService);

  async register(userInput: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
    province?: string;
    language?: string;
  }): Promise<User> {
    const response = await firstValueFrom<AuthResponse>(
      this.api.post<AuthResponse>('/auth/register', {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        phone: userInput.phone,
        country: userInput.country,
        province: userInput.province,
        language: userInput.language,
      })
    );

    this.state.setUser(response.user);
    localStorage.setItem('harvestai-token', response.accessToken);
    return response.user;
  }

  async login(email: string, password: string): Promise<User> {
    const response = await firstValueFrom<AuthResponse>(
      this.api.post<AuthResponse>('/auth/login', { email, password })
    );

    this.state.setUser(response.user);
    localStorage.setItem('harvestai-token', response.accessToken);
    return response.user;
  }

  async getCurrentUser(): Promise<User> {
    const response = await firstValueFrom<{ user: User }>(
      this.api.get<{ user: User }>('/auth/me')
    );

    this.state.setUser(response.user);
    return response.user;
  }

  logout(): void {
    this.state.logout();
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated();
  }

  getToken(): string | null {
    return localStorage.getItem('harvestai-token');
  }
}
