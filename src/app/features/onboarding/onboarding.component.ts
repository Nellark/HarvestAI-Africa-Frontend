import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  currentStep = signal(0);

  farm = {
    name: '',
    size: 0,
    sizeUnit: 'ha',
    province: '',
    country: 'South Africa',
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
    { step: 3, title: 'Livestock', description: 'Do you keep any animals?' },
    { step: 4, title: 'Water & Soil', description: 'Your farm environment details' },
    { step: 5, title: 'Preferences', description: 'Language and experience level' },
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

  livestockOptions = [
    { name: 'Cattle', icon: 'set_meal' },
    { name: 'Goats', icon: 'pets' },
    { name: 'Sheep', icon: 'cruelty_free' },
    { name: 'Chickens', icon: 'egg_alt' },
    { name: 'Pigs', icon: 'restaurant' },
    { name: 'Ducks', icon: 'water_bird' },
  ];

  waterSources = [
    { value: 'borehole', label: 'Borehole', icon: 'water_pump' },
    { value: 'river', label: 'River / Dam', icon: 'water' },
    { value: 'rainwater', label: 'Rainwater Harvesting', icon: 'water_drop' },
    { value: 'scheme', label: 'Irrigation Scheme', icon: 'sprinkler' },
    { value: 'tap', label: 'Municipal Water', icon: 'local_drink' },
  ];

  soilTypes = ['Sandy Loam', 'Clay', 'Loam', 'Sandy', 'Silty Loam', 'Clay Loam', 'Unknown'];

  languages = [
    { code: 'en', name: 'English', flag: '🇿🇦' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇲🇿' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'ar', name: 'العربية', flag: '🇪🇬' },
  ];

  experiences = [
    { value: 'beginner', label: 'Beginner', desc: 'Less than 3 years farming experience' },
    { value: 'intermediate', label: 'Intermediate', desc: '3–10 years of farming experience' },
    { value: 'experienced', label: 'Experienced', desc: 'More than 10 years farming' },
  ];

  isCropSelected(name: string) {
    return this.farm.crops.includes(name);
  }

  isLivestockSelected(name: string) {
    return this.farm.livestock.includes(name);
  }

  toggleCrop(name: string) {
    if (this.isCropSelected(name)) {
      this.farm.crops = this.farm.crops.filter((c) => c !== name);
    } else {
      this.farm.crops = [...this.farm.crops, name];
    }
  }

  toggleLivestock(name: string) {
    if (this.isLivestockSelected(name)) {
      this.farm.livestock = this.farm.livestock.filter((l) => l !== name);
    } else {
      this.farm.livestock = [...this.farm.livestock, name];
    }
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
}
