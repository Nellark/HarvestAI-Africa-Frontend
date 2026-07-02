import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { AssistantMessage } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AIAssistantService {
  private readonly api = inject(ApiService);

  sendMessage(message: string, context?: { crop?: string; field?: string; weather?: string }): Observable<AssistantMessage> {
    return this.api.post<AssistantMessage>('/ai/chat', { message, context });
  }

  getChatHistory(): Observable<AssistantMessage[]> {
    return this.api.get<AssistantMessage[]>('/ai/chat/history');
  }

  getPrompts(): Observable<string[]> {
    return this.api.get<string[]>('/ai/prompts');
  }

  clearChatHistory(): Observable<void> {
    return this.api.delete<void>('/ai/chat/history');
  }
}
