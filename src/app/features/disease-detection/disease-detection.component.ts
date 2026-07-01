import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MOCK_DISEASE_DETECTIONS } from '../../mock-data/mock-data';

@Component({
  selector: 'app-disease-detection',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './disease-detection.html',
  styleUrls: ['./disease-detection.scss'],
})
export class DiseaseDetectionComponent {
  detections = MOCK_DISEASE_DETECTIONS;
  uploadedImage = signal<string | null>(null);
  currentResult = signal<typeof MOCK_DISEASE_DETECTIONS[0] | null>(null);
  analyzing = signal(false);
  dragOver = signal(false);

  supportedCrops = ['Maize', 'Tomatoes', 'Beans', 'Cassava', 'Groundnuts', 'Millet', 'Spinach', 'Sorghum'];

  photoTips = [
    'Take photo in good natural lighting',
    'Focus on the affected area clearly',
    'Include at least 3 infected leaves',
    'Avoid blurry or dark images',
    'Show both sides of leaves if possible',
  ];

  simulateUpload() {
    const images = [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
    ];
    this.uploadedImage.set(images[Math.floor(Math.random() * images.length)]);
  }

  analyze() {
    this.analyzing.set(true);
    setTimeout(() => {
      this.analyzing.set(false);
      this.currentResult.set(this.detections[0]);
    }, 2500);
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragOver.set(true); }
  onDrop(e: DragEvent) { e.preventDefault(); this.dragOver.set(false); this.simulateUpload(); }

  severityBadge(s: string) { return s === 'high' ? 'badge-danger' : s === 'medium' ? 'badge-warning' : 'badge-success'; }
  confidenceColor(c: number) { return c >= 85 ? '#4CAF50' : c >= 70 ? '#F59E0B' : '#EF4444'; }
  timeAgo(date: Date): string {
    const h = Math.floor((Date.now() - date.getTime()) / 3600000);
    return h < 24 ? `${h}h ago` : `${Math.floor(h/24)}d ago`;
  }
}
