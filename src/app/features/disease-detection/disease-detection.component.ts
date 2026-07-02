import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MOCK_DISEASE_DETECTIONS } from '../../mock-data/mock-data';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-disease-detection',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './disease-detection.html',
  styleUrls: ['./disease-detection.scss'],
})
export class DiseaseDetectionComponent {
  private readonly toast = inject(ToastService);
  detections = MOCK_DISEASE_DETECTIONS;
  uploadedImage = signal<string | null>(null);
  currentResult = signal<typeof MOCK_DISEASE_DETECTIONS[0] | null>(null);
  analyzing = signal(false);
  dragOver = signal(false);
  selectedCrop = signal('Maize');

  supportedCrops = ['Maize', 'Tomatoes', 'Beans', 'Cassava', 'Groundnuts', 'Millet', 'Spinach', 'Sorghum'];

  photoTips = [
    'Take photo in good natural lighting',
    'Focus on the affected area clearly',
    'Include at least 3 infected leaves',
    'Avoid blurry or dark images',
    'Show both sides of leaves if possible',
  ];

  triggerFilePicker() {
    const input = document.querySelector<HTMLInputElement>('#disease-upload-input');
    input?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  analyze() {
    if (!this.uploadedImage()) {
      return;
    }

    this.analyzing.set(true);
    this.toast.info('Analyzing your crop image…');
    setTimeout(() => {
      const match = this.detections.find((d) => d.cropType.toLowerCase() === this.selectedCrop().toLowerCase()) ?? this.detections[0];
      this.currentResult.set({
        ...match,
        id: `analysis-${Date.now()}`,
        confidence: Math.min(96, Math.max(78, Math.round(match.confidence - 3 + Math.random() * 8))),
        detectedAt: new Date(),
      });
      this.analyzing.set(false);
      this.toast.success(`Disease analysis complete for ${this.selectedCrop()}.`);
    }, 1800);
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragOver.set(true); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver.set(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  severityBadge(s: string) { return s === 'high' ? 'badge-danger' : s === 'medium' ? 'badge-warning' : 'badge-success'; }
  confidenceColor(c: number) { return c >= 85 ? '#4CAF50' : c >= 70 ? '#F59E0B' : '#EF4444'; }
  timeAgo(date: Date): string {
    const h = Math.floor((Date.now() - date.getTime()) / 3600000);
    return h < 24 ? `${h}h ago` : `${Math.floor(h/24)}d ago`;
  }
}
