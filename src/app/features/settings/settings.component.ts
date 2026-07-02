import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';
import { ToastService } from '../../core/services/toast.service';
import type { User } from '../../shared/models/app.models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsComponent implements OnInit {
  state = inject(AppStateService);
  private readonly toast = inject(ToastService);
  activeSection = signal('profile');
  currentLang = 'en';
  profileForm = {
    name: '',
    email: '',
    phone: '',
    country: 'South Africa',
    province: '',
    role: 'Farmer',
    avatar: '',
  };

  sections = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'theme', label: 'Appearance', icon: 'palette' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'offline', label: 'Offline Mode', icon: 'cloud_off' },
    { id: 'privacy', label: 'Privacy & Security', icon: 'lock' },
    { id: 'about', label: 'About', icon: 'info' },
  ];

  languages = [
    { code: 'en', name: 'English' }, { code: 'sw', name: 'Swahili' },
    { code: 'fr', name: 'Français' }, { code: 'pt', name: 'Português' },
    { code: 'zu', name: 'isiZulu' }, { code: 'ar', name: 'العربية' },
  ];

  notifSettings = [
    { id: 'weather', icon: 'thunderstorm', color: '#3B82F6', label: 'Weather Alerts', desc: 'Severe weather warnings for your farm location', push: true, sms: true },
    { id: 'disease', icon: 'bug_report', color: '#EF4444', label: 'Disease Alerts', desc: 'Crop disease risk warnings in your region', push: true, sms: false },
    { id: 'market', icon: 'price_check', color: '#2E7D32', label: 'Market Price Alerts', desc: 'Significant price changes for your crops', push: true, sms: false },
    { id: 'planner', icon: 'calendar_today', color: '#F59E0B', label: 'Planner Reminders', desc: 'Reminders for scheduled tasks and activities', push: true, sms: true },
    { id: 'ai', icon: 'psychology', color: '#7C3AED', label: 'AI Insights', desc: 'New recommendations from your AI assistant', push: false, sms: false },
  ];

  offlineSettings = [
    { label: 'Auto-sync when connected', desc: 'Automatically sync data when internet is available', enabled: true },
    { label: 'Cache weather forecasts', desc: 'Store 7-day forecasts for offline access', enabled: true },
    { label: 'Cache market prices', desc: 'Store last known prices for offline viewing', enabled: true },
    { label: 'Download AI recommendations', desc: 'Save AI recommendations for offline reading', enabled: false },
  ];

  privacySettings = [
    { icon: 'location_on', label: 'Location Sharing', desc: 'Share farm location for better market and weather data', type: 'toggle', enabled: true, action: '' },
    { icon: 'analytics', label: 'Usage Analytics', desc: 'Help improve HarvestAI by sharing anonymous usage data', type: 'toggle', enabled: true, action: '' },
    { icon: 'lock', label: 'Two-Factor Authentication', desc: 'Add extra security to your account', type: 'button', enabled: false, action: 'Enable 2FA' },
    { icon: 'key', label: 'Change Password', desc: 'Update your account password', type: 'button', enabled: false, action: 'Change' },
    { icon: 'delete', label: 'Delete Account', desc: 'Permanently delete your account and all data', type: 'button', enabled: false, action: 'Delete' },
  ];

  aboutLinks = [
    { icon: 'description', label: 'Terms of Service' },
    { icon: 'privacy_tip', label: 'Privacy Policy' },
    { icon: 'help', label: 'Help Center' },
    { icon: 'groups', label: 'Community Forum' },
    { icon: 'star_rate', label: 'Rate HarvestAI' },
    { icon: 'share', label: 'Share with Friends' },
  ];

  ngOnInit() {
    this.syncProfileForm();
  }

  syncProfileForm() {
    const user = this.state.user();
    this.profileForm = {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      country: user?.country ?? '',
      province: user?.province ?? '',
      role: user?.role === 'admin' ? 'Admin' : user?.role === 'expert' ? 'Agronomist' : 'Farmer',
      avatar: user?.avatar ?? '',
    };
    this.currentLang = this.state.language();
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.profileForm.avatar = result;
      this.state.setUserAvatar(result);
    };
    reader.readAsDataURL(file);
  }

  saveProfile() {
    this.state.updateProfile({
      name: this.profileForm.name,
      email: this.profileForm.email,
      phone: this.profileForm.phone,
      country: this.profileForm.country,
      province: this.profileForm.province,
      role: this.toUserRole(this.profileForm.role),
      avatar: this.profileForm.avatar || undefined,
    });
    this.state.setLanguage(this.currentLang);
    this.toast.success('Profile updated successfully.');
  }

  private toUserRole(role: string): User['role'] {
    if (role === 'Admin') return 'admin';
    if (role === 'Agronomist') return 'expert';
    return 'farmer';
  }
}
