import { Injectable, inject } from '@angular/core';
import type { User } from '../../shared/models/app.models';
import { AppStateService } from './app-state.service';

interface StoredUser extends User {
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly state = inject(AppStateService);

  private readonly usersKey = 'harvestai-users';
  private readonly currentUserKey = 'harvestai-current-user';
  private readonly authenticatedKey = 'harvestai-authenticated';

  initializeSession(): void {
    const stored = localStorage.getItem(this.currentUserKey);
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        this.state.user.set(user);
        this.state.isAuthenticated.set(true);
        return;
      } catch {
        this.clearSession();
      }
    }

    this.state.isAuthenticated.set(false);
  }

  register(userInput: { name: string; email: string; password: string; phone?: string; country?: string; province?: string; language?: string }): User {
    const users = this.getUsers();
    const normalizedEmail = userInput.email.trim().toLowerCase();

    if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const user: StoredUser = {
      id: this.createId(),
      name: userInput.name.trim(),
      email: normalizedEmail,
      phone: userInput.phone?.trim(),
      role: 'farmer',
      country: userInput.country?.trim() || 'South Africa',
      province: userInput.province?.trim() || 'Limpopo',
      language: userInput.language?.trim() || 'en',
      onboardingComplete: false,
      password: userInput.password,
    };

    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.persistSession(user);
    return this.toPublicUser(user);
  }

  login(email: string, password: string): User {
    const users = this.getUsers();
    const found = users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());

    if (!found || found.password !== password) {
      throw new Error('Invalid email or password.');
    }

    this.persistSession(found);
    return this.toPublicUser(found);
  }

  logout(): void {
    this.clearSession();
  }

  private persistSession(user: StoredUser): void {
    this.state.user.set(this.toPublicUser(user));
    this.state.isAuthenticated.set(true);
    localStorage.setItem(this.currentUserKey, JSON.stringify(this.toPublicUser(user)));
    localStorage.setItem(this.authenticatedKey, 'true');
  }

  private clearSession(): void {
    this.state.user.set(null);
    this.state.isAuthenticated.set(false);
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.authenticatedKey);
  }

  private getUsers(): StoredUser[] {
    const raw = localStorage.getItem(this.usersKey);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as StoredUser[];
    } catch {
      return [];
    }
  }

  private toPublicUser(user: StoredUser): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      country: user.country,
      province: user.province,
      language: user.language,
      onboardingComplete: user.onboardingComplete,
    };
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
