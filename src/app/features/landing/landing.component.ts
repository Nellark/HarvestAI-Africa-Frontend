import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
})
export class LandingComponent {
  private readonly mockData = inject(MockDataService);
  openFaq = -1;
  selectedLang = 'en';

  heroStats = this.mockData.landing.heroStats!;
  countries = this.mockData.landing.countries!;
  features = this.mockData.landing.features!;
  steps = this.mockData.landing.steps!;
  testimonials = this.mockData.landing.testimonials!;
  platformStats = this.mockData.landing.platformStats!;
  faqs = this.mockData.landing.faqs!;
  footerLinks = this.mockData.landing.footerLinks!;
  languages = this.mockData.landing.languages!;
}
