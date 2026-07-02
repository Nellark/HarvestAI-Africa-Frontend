import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../core/services/app-state.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  private readonly state = inject(AppStateService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  currentStep = signal(0);
  customCropInput = '';

  personalDetails = {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    province: '',
  };

  farm = {
    name: '',
    size: 0,
    sizeUnit: 'ha',
    province: '',
    country: '',
    crops: [] as string[],
    livestock: [] as string[],
    waterSource: 'borehole',
    soilType: 'Sandy Loam',
    language: 'en',
    experience: 'beginner',
    hasInternet: true,
  };

  steps = [
    { step: 1, title: 'Farm Basics', description: 'Tell us about your farm location and size' },
    { step: 2, title: 'Crops', description: 'What do you grow on your farm?' },
  ];

  progressPct = computed(() => Math.round((this.currentStep() / (this.steps.length - 1)) * 100));

  cropOptions = [
    { name: 'Maize', icon: 'grass' },
    { name: 'Tomatoes', icon: 'local_florist' },
    { name: 'Beans', icon: 'eco' },
    { name: 'Cassava', icon: 'agriculture' },
    { name: 'Groundnuts', icon: 'spa' },
    { name: 'Millet', icon: 'grain' },
    { name: 'Sorghum', icon: 'forest' },
    { name: 'Rice', icon: 'grass' },
    { name: 'Spinach', icon: 'yard' },
    { name: 'Cabbage', icon: 'local_florist' },
    { name: 'Sweet Potato', icon: 'energy_savings_leaf' },
    { name: 'Sunflower', icon: 'wb_sunny' },
  ];

  ngOnInit() {
    this.prefillFromUser();
  }

  isCropSelected(name: string) {
    return this.farm.crops.includes(name);
  }

  toggleCrop(name: string) {
    if (this.isCropSelected(name)) {
      this.farm.crops = this.farm.crops.filter((c) => c !== name);
    } else {
      this.farm.crops = [...this.farm.crops, name];
    }
  }

  addCustomCrop() {
    const value = this.customCropInput.trim();
    if (!value) return;

    const normalized = value.replace(/\s+/g, ' ');
    if (!this.farm.crops.includes(normalized)) {
      this.farm.crops = [...this.farm.crops, normalized];
    }
    this.customCropInput = '';
  }

  nextStep() {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.update((v) => v + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 0) {
      this.currentStep.update((v) => v - 1);
    }
  }

  private prefillFromUser() {
    const user = this.state.user();
    if (!user) {
      return;
    }

    this.personalDetails.fullName = user.name || this.personalDetails.fullName;
    this.personalDetails.email = user.email || this.personalDetails.email;
    this.personalDetails.phone = user.phone || this.personalDetails.phone;
    this.personalDetails.country = user.country || this.personalDetails.country;
    this.personalDetails.province = user.province || this.personalDetails.province;
    this.farm.province = user.province || this.farm.province;
    this.farm.country = user.country || this.farm.country;
    this.farm.language = user.language || this.farm.language;
  }

  finishOnboarding() {
    this.state.completeOnboarding({
      ...this.farm,
      ...this.personalDetails,
      size: Number(this.farm.size || 0),
      sizeUnit: this.farm.sizeUnit as 'ha' | 'acres',
    });
    this.toast.success('Your farm setup has been saved.');
    this.router.navigate(['/app/dashboard']);
  }
}
