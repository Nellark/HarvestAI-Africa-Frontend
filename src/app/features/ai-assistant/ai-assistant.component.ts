import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MOCK_AI_MESSAGES } from '../../mock-data/mock-data';
import type { AIMessage } from '../../shared/models/app.models';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.scss',
})
export class AiAssistantComponent {
  messages = signal<AIMessage[]>([...MOCK_AI_MESSAGES]);
  inputText = '';
  activeConv = signal('1');
  voiceActive = signal(false);
  attachments = signal<string[]>([]);

  conversations = [
    { id: '1', title: 'Maize leaf yellowing issue', time: '2 hours ago' },
    { id: '2', title: 'Best time to harvest tomatoes', time: 'Yesterday' },
    { id: '3', title: 'Fall Armyworm treatment', time: '3 days ago' },
    { id: '4', title: 'Irrigation scheduling advice', time: 'Last week' },
    { id: '5', title: 'Cover crop recommendations', time: 'Last week' },
  ];

  suggestions = [
    'What are the signs of Fall Armyworm in maize?',
    'When should I irrigate my tomatoes?',
    'What crops should I plant this season?',
    'How can I improve my soil health?',
    'What is the best fertilizer for beans?',
    'How do I prevent blight in tomatoes?',
  ];

  aiTools = [
    { icon: 'biotech', label: 'Disease Detection', desc: 'Upload crop photo', route: '/app/disease-detection', iconClass: 'icon-wrap-danger' },
    { icon: 'tips_and_updates', label: 'Crop Advisor', desc: 'What to plant', route: '/app/crop-advisor', iconClass: 'icon-wrap-warning' },
    { icon: 'trending_up', label: 'Yield Forecast', desc: 'Predict harvest', route: '/app/yield-forecast', iconClass: 'icon-wrap-primary' },
    { icon: 'wb_sunny', label: 'Weather Advice', desc: 'Farm weather tips', route: '/app/weather', iconClass: 'icon-wrap-info' },
  ];

  sendSuggestion(text: string) {
    this.inputText = text;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.inputText.trim()) return;
    const userMsg: AIMessage = { id: Date.now().toString(), role: 'user', content: this.inputText, timestamp: new Date() };
    this.messages.update(m => [...m, userMsg]);
    const thinking: AIMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', timestamp: new Date(), thinking: true };
    this.messages.update(m => [...m, thinking]);
    this.inputText = '';
    this.attachments.set([]);
    setTimeout(() => {
      this.messages.update(msgs => {
        const withoutThinking = msgs.filter(m => !m.thinking);
        return [...withoutThinking, {
          id: Date.now().toString(), role: 'assistant',
          content: this.generateResponse(userMsg.content),
          timestamp: new Date(),
        }];
      });
    }, 1800);
  }

  generateResponse(query: string): string {
    return `Thank you for your question about: "${query}"\n\nBased on your farm data in Limpopo and current conditions, here is my analysis:\n\n**Key Recommendations:**\n1. Monitor your crops carefully over the next 48 hours given the weather forecast\n2. Consider applying preventive measures based on current pest pressure in your region\n3. Optimal conditions for your maize planting are currently favorable\n\nWould you like me to generate a detailed action plan or connect you with a local agronomist?`;
  }

  formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
  }

  onEnter(event: Event) {
    const e = event as KeyboardEvent;
    if (!e.shiftKey) { e.preventDefault(); this.sendMessage(); }
  }

  autoResize(event: Event) {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  toggleVoice() { this.voiceActive.update(v => !v); }
  triggerImageUpload() { this.attachments.update(a => [...a, 'crop-photo.jpg']); }
  removeAttachment(att: string) { this.attachments.update(a => a.filter(x => x !== att)); }
  newConversation() { this.messages.set([]); }
}
