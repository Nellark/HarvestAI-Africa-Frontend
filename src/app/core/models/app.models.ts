export type ThemeMode = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  helper: string;
  icon: string;
  tone: 'success' | 'warning' | 'danger' | 'accent';
}

export interface FeatureCardData {
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  location: string;
}

export interface TimelineItem {
  title: string;
  description: string;
  time: string;
  tone: 'success' | 'warning' | 'danger' | 'accent';
}

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export interface WeatherDay {
  day: string;
  temp: string;
  rain: string;
  icon: string;
}

export interface PriceRow {
  produce: string;
  price: string;
  trend: 'up' | 'down' | 'flat';
  market: string;
}

export interface CommunityPost {
  title: string;
  author: string;
  excerpt: string;
  tag: string;
}

export interface AdminStat {
  title: string;
  value: string;
  delta: string;
}
