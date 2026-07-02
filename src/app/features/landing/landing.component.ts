import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent {

  private readonly mockData = inject(MockDataService);

  mobileOpen = signal(false);

  openFaq = -1;
  selectedLang = 'en';
  selectedBenefit = 0;
  activeTab = 'Automation';

  tabs = ['Automation', 'Precision', 'Scalability', 'Sustainability'];

  stats = [
    { value: '98%', label: 'Crop Health Accuracy' },
    { value: '7X', label: 'Faster Decision-Making with Real-Time Data' },
    { value: '24/7', label: 'Remote Field Monitoring' },
  ];

  services = [
    {
      case: 'AI Disease Detection',
      title: 'Snap a photo, get instant diagnosis',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&h=700&fit=crop'
    },
    {
      case: 'Yield Forecasting',
      title: 'Predict your harvest with AI',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&h=700&fit=crop'
    },
    {
      case: 'Market Prices',
      title: 'Sell at the right time, right price',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=700&fit=crop'
    }
  ];

  heroStats = this.mockData.landing.heroStats;
  heroCards = this.mockData.landing.heroCards;
  countries = this.mockData.landing.countries;
  features = this.mockData.landing.features;
  benefits = this.mockData.landing.benefits ?? [];
  caseStudies = this.mockData.landing.caseStudies;
  steps = this.mockData.landing.steps;
  showcaseCards = this.mockData.landing.showcaseCards;
  testimonials = this.mockData.landing.testimonials;
  platformStats = this.mockData.landing.platformStats;
  faqs = this.mockData.landing.faqs;
  footerLinks = this.mockData.landing.footerLinks;
  languages = this.mockData.landing.languages;

  get currentBenefit() {
    return this.benefits[this.selectedBenefit];
  }

  selectBenefit(index: number) {
    this.selectedBenefit = index;
  }

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? -1 : index;
  }

  selectLanguage(code: string) {
    this.selectedLang = code;
  }

  isFlagImage(flag: string): boolean {
    return /^https?:\/\//i.test(flag) || flag.startsWith('data:');
  }
}


