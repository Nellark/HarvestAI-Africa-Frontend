import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crop-advisor',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './crop-advisor.html',
  styleUrls: ['./crop-advisor.scss'],
})
export class CropAdvisorComponent {
  loading = signal(false);
  recommendations = signal<any[]>([]);

  inputs = {
    province: 'Limpopo',
    country: 'South Africa',
    farmSize: 5,
    season: 'Summer (Oct–Mar)',
    soilType: 'Sandy Loam',
    waterAvail: 'Borehole (Moderate)',
    budget: 5000,
    experience: 'intermediate',
  };

  provinces = ['Limpopo', 'Mpumalanga', 'KwaZulu-Natal', 'Gauteng', 'Western Cape', 'Eastern Cape', 'Northern Cape', 'Free State', 'North West'];
  countries = ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Zimbabwe', 'Zambia', 'Uganda', 'Mozambique'];
  seasons = ['Summer (Oct–Mar)', 'Winter (Apr–Sep)', 'Year-round'];
  soilTypes = ['Sandy Loam', 'Clay', 'Loam', 'Sandy', 'Silty Loam', 'Clay Loam'];
  waterOptions = ['Rainfed Only', 'Borehole (Moderate)', 'River / Dam (Good)', 'Irrigation Scheme (Excellent)', 'Municipal Water'];

  getRecommendations() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.recommendations.set([
        { crop: 'Tomatoes (Roma)', icon: 'local_florist', aiScore: 92, profitability: 'High', difficulty: 'Intermediate', expectedYield: '45–65 t/ha', revenueEstimate: 'R 45,000–65,000', waterReq: 'Moderate', duration: '3–4 months', aiReason: 'Excellent market demand in Limpopo with premium pricing. Your borehole supports drip irrigation, maximising yield. Current market price trend shows +14% increase over 60 days.' },
        { crop: 'Maize (PAN 6Q-508)', icon: 'grass', aiScore: 88, profitability: 'Good', difficulty: 'Easy', expectedYield: '6–8 t/ha', revenueEstimate: 'R 23,000–30,800', waterReq: 'Low–Moderate', duration: '4–5 months', aiReason: 'Well-suited to Sandy Loam in Limpopo. Low input cost with good returns. Drought-tolerant variety recommended for your rainfall pattern.' },
        { crop: 'Butternut Squash', icon: 'eco', aiScore: 82, profitability: 'Good', difficulty: 'Easy', expectedYield: '20–35 t/ha', revenueEstimate: 'R 20,000–35,000', waterReq: 'Low', duration: '3 months', aiReason: 'Low water requirement makes it ideal for your borehole setup. Strong demand in informal markets and growing export potential.' },
      ]);
    }, 2200);
  }

  difficultyBadge(d: string) { return d === 'Easy' ? 'badge-success' : d === 'Intermediate' ? 'badge-warning' : 'badge-danger'; }
  scoreGradient(score: number) {
    if (score >= 85) return 'linear-gradient(135deg, #2E7D32, #4CAF50)';
    if (score >= 70) return 'linear-gradient(135deg, #D97706, #F59E0B)';
    return 'linear-gradient(135deg, #DC2626, #EF4444)';
  }
}
