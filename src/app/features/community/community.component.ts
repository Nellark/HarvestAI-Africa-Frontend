import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './community.html',
  styleUrls: ['./community.scss'],
})
export class CommunityComponent {
  private readonly mockData = inject(MockDataService);
  activeCategory = signal('all');
  searchTerm = '';

  categories = this.mockData.community.categories;

  filteredPosts() {
    return this.mockData.community.posts.filter(p =>
      (this.activeCategory() === 'all' || p.category === this.activeCategory()) &&
      (!this.searchTerm || p.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  categoryBadge(cat: string) {
    const map: Record<string, string> = { question: 'badge-info', success: 'badge-success', tip: 'badge-warning', discussion: 'badge-neutral' };
    return map[cat] || 'badge-neutral';
  }

  timeAgo(date: Date): string {
    const d = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (d === 0) return 'Today';
    if (d === 1) return 'Yesterday';
    return `${d} days ago`;
  }

  experts = this.mockData.community.experts;

  trendingTags = this.mockData.community.trendingTags;
}
