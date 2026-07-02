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

// ==================== USER MODELS ====================

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'farmer' | 'admin' | 'expert';
  country: string;
  province: string;
  language: string;
  onboardingComplete: boolean;
  farmSize?: number; // in hectares
  farmType?: 'smallholder' | 'commercial' | 'cooperative';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  preferredCrops: string[];
  farmingExperience: number; // years
  certifications?: string[];
}

// ==================== FARM MODELS ====================

export interface Farm {
  id: string;
  userId: string;
  name: string;
  location: {
    country: string;
    province: string;
    district: string;
    coordinates?: { lat: number; lng: number };
  };
  size: number; // in hectares
  soilType?: string;
  irrigationType?: 'rainfed' | 'drip' | 'sprinkler' | 'flood' | 'none';
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  size: number; // in hectares
  crop?: Crop;
  soilType?: string;
  plantingDate?: string;
  expectedHarvestDate?: string;
  healthScore?: number; // 0-100
  coordinates?: { lat: number; lng: number };
}

// ==================== CROP MODELS ====================

export interface Crop {
  id: string;
  name: string;
  variety?: string;
  category: 'grain' | 'vegetable' | 'fruit' | 'legume' | 'root' | 'tuber' | 'other';
  plantingDate?: string;
  expectedHarvestDate?: string;
  status: 'planned' | 'planted' | 'growing' | 'ready' | 'harvested';
  healthScore?: number; // 0-100
  area: number; // in hectares
  yieldEstimate?: number; // in tons
  diseases?: DiseaseReport[];
}

export interface CropRecommendation {
  crop: string;
  variety?: string;
  suitability: number; // 0-100
  reason: string;
  expectedYield: number;
  plantingWindow: {
    start: string;
    end: string;
  };
  requirements: {
    water: string;
    soil: string;
    fertilizer: string;
  };
}

// ==================== WEATHER MODELS ====================

export interface WeatherData {
  location: {
    country: string;
    province: string;
    district: string;
  };
  current: CurrentWeather;
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
  aiRecommendations: WeatherAIRecommendation[];
  lastUpdated: string;
}

export interface CurrentWeather {
  temperature: number; // Celsius
  humidity: number; // percentage
  windSpeed: number; // km/h
  windDirection: string;
  precipitation: number; // mm
  condition: string;
  icon: string;
  feelsLike: number;
  uvIndex?: number;
}

export interface WeatherForecast {
  date: string;
  day: string;
  temperature: {
    high: number;
    low: number;
  };
  precipitation: {
    probability: number; // percentage
    amount: number; // mm
  };
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export interface WeatherAlert {
  id: string;
  type: 'rain' | 'drought' | 'heat' | 'wind' | 'frost' | 'pest';
  severity: 'low' | 'medium' | 'high' | 'extreme';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  affectedAreas: string[];
  recommendations: string[];
}

export interface WeatherAIRecommendation {
  id: string;
  icon: string;
  title: string;
  description: string;
  day: string;
  priority: 'urgent' | 'advised' | 'opportunity';
  category: 'irrigation' | 'planting' | 'harvest' | 'pest' | 'fertilizer';
}

// ==================== MARKET MODELS ====================

export interface MarketData {
  prices: MarketPrice[];
  trends: PriceTrend[];
  nearbyBuyers: Buyer[];
  lastUpdated: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  currency: string;
  unit: string; // per kg, per ton, per crate
  market: string;
  location: {
    country: string;
    province: string;
    market: string;
  };
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  date: string;
}

export interface PriceTrend {
  crop: string;
  location: string;
  historicalData: {
    date: string;
    price: number;
  }[];
  prediction?: {
    nextWeek: number;
    nextMonth: number;
    confidence: number;
  };
  recommendation: string;
}

export interface Buyer {
  id: string;
  name: string;
  type: 'market' | 'processor' | 'retailer' | 'exporter';
  location: string;
  distance: number; // km
  contact?: {
    phone?: string;
    email?: string;
  };
  crops: string[];
  averagePrice: number;
  rating?: number;
}

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  sellerName: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  currency: string;
  location: string;
  availableFrom: string;
  status: 'available' | 'reserved' | 'sold';
  quality: 'grade_a' | 'grade_b' | 'grade_c';
  images?: string[];
  createdAt: string;
}

// ==================== ANALYTICS MODELS ====================

export interface AnalyticsData {
  kpis: AnalyticsKPI[];
  financial: FinancialData[];
  cropPerformance: CropPerformance[];
  waterUsage: WaterUsageData[];
  diseaseStats: DiseaseStatistics[];
  yieldForecast: YieldForecast;
  aiInsights: AIInsight[];
  period: {
    start: string;
    end: string;
  };
}

export interface AnalyticsKPI {
  label: string;
  value: string;
  trend: number; // percentage change
  sparkline: number[];
  unit?: string;
}

export interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface CropPerformance {
  name: string;
  score: number; // 0-100
  yield: number; // tons per hectare
  revenue: number;
  healthScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface WaterUsageData {
  month: string;
  used: number; // cubic meters
  target: number;
  efficiency: number; // percentage
}

export interface DiseaseStatistics {
  name: string;
  count: number;
  percentage: number;
  color: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface YieldForecast {
  crop: string;
  field: string;
  predictedYield: number; // tons
  confidence: number; // percentage
  factors: {
    weather: number;
    soil: number;
    historical: number;
  };
  recommendations: string[];
  harvestWindow: {
    start: string;
    end: string;
  };
}

export interface AIInsight {
  icon: string;
  color: string;
  title: string;
  text: string;
  category: 'revenue' | 'cost' | 'yield' | 'risk' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

// ==================== DISEASE DETECTION MODELS ====================

export interface DiseaseDetectionResult {
  id: string;
  image: string;
  detected: boolean;
  disease?: DiseaseInfo;
  confidence: number; // 0-100
  alternativeDiagnoses?: DiseaseInfo[];
  treatment: TreatmentPlan;
  timestamp: string;
  crop: string;
  fieldId?: string;
}

export interface DiseaseInfo {
  name: string;
  scientificName?: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'nutritional' | 'environmental';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  symptoms: string[];
  causes: string[];
}

export interface TreatmentPlan {
  immediateActions: string[];
  chemicalTreatment?: {
    product: string;
    dosage: string;
    application: string;
    safetyPrecautions: string[];
  };
  organicTreatment?: {
    method: string;
    ingredients: string[];
    application: string;
  };
  prevention: string[];
  timeline: string;
  estimatedCost?: number;
}

export interface DiseaseReport {
  id: string;
  fieldId: string;
  crop: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  areaAffected: number; // percentage
  detectedDate: string;
  status: 'active' | 'treated' | 'resolved';
  treatment?: string;
  images: string[];
}

// ==================== COMMUNITY MODELS ====================

export interface CommunityData {
  categories: CommunityCategory[];
  experts: Expert[];
  posts: CommunityPostFull[];
  trendingTags: TrendingTag[];
}

export interface CommunityCategory {
  id: string;
  label: string;
  icon: string;
  postCount: number;
}

export interface Expert {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  location: string;
  verification: 'verified' | 'pending';
  rating?: number;
  answerCount: number;
}

export interface CommunityPostFull {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
    location: string;
  };
  title: string;
  content: string;
  category: string;
  tags: string[];
  images?: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  isPinned?: boolean;
}

export interface TrendingTag {
  tag: string;
  count: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

// ==================== NOTIFICATION MODELS ====================

export interface Notification {
  id: string;
  userId: string;
  type: 'weather' | 'disease' | 'market' | 'task' | 'community' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

// ==================== PLANNER MODELS ====================

export interface PlannerData {
  tasks: Task[];
  events: CalendarEvent[];
  reminders: Reminder[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  fieldId?: string;
  crop?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category: 'planting' | 'irrigation' | 'fertilizer' | 'pest_control' | 'harvest' | 'maintenance' | 'other';
  assignedTo?: string;
  completedAt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'planting' | 'harvest' | 'irrigation' | 'fertilizer' | 'market' | 'other';
  fieldId?: string;
  crop?: string;
  notes?: string;
  reminder?: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  type: 'task' | 'event' | 'weather' | 'market' | 'other';
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  completed: boolean;
}

// ==================== AI ASSISTANT MODELS ====================

export interface AIAssistantData {
  messages: AssistantMessage[];
  prompts: string[];
  context?: {
    crop?: string;
    field?: string;
    weather?: string;
  };
}

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
  sources?: string[];
}

// ==================== ADMIN MODELS ====================

export interface AdminDashboardData {
  kpis: AdminKPI[];
  countryStats: CountryStat[];
  diseaseReports: DiseaseStatistics[];
  recentUsers: RecentUser[];
  systemHealth: SystemHealth;
}

export interface AdminKPI {
  icon: string;
  label: string;
  value: string;
  change: number;
  iconClass: string;
}

export interface CountryStat {
  country: string;
  flag: string;
  farmers: number;
  hectares: number;
}

export interface RecentUser {
  name: string;
  country: string;
  farmSize: string;
  crops: string;
  registered: string;
}

export interface SystemHealth {
  apiStatus: 'operational' | 'degraded' | 'down';
  aiServiceStatus: 'operational' | 'degraded' | 'down';
  databaseStatus: 'operational' | 'degraded' | 'down';
  lastSync: string;
}

// ==================== LANDING PAGE MODELS ====================

export interface LandingPageData {
  heroStats: HeroStat[];
  heroCards: HeroCard[];
  countries: Country[];
  features: Feature[];
  benefits: Benefit[];
  caseStudies: CaseStudy[];
  testimonials: TestimonialFull[];
  platformStats: PlatformStat[];
  faqs: FaqItem[];
  footerLinks: FooterLink[];
  languages: Language[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Country {
  name: string;
  flag: string;
  code: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  color: string;
}

export interface Benefit {
  title: string;
  heading: string;
  description: string;
  image: string;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  image: string;
}

export interface TestimonialFull extends Testimonial {
  avatar: string;
  crop: string;
}

export interface PlatformStat {
  value: string;
  label: string;
}

export interface FooterLink {
  title: string;
  links: string[];
}

export interface Language {
  code: string;
  name: string;
}

// ==================== CONFIG MODELS ====================

export interface AppConfig {
  app: {
    name: string;
    version: string;
    defaultLanguage: string;
    supportedLanguages: Language[];
  };
  contact: {
    email: string;
    phone: string;
    address?: string;
  };
  social: {
    linkedin?: string;
    youtube?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
  };
  supportedCountries: Country[];
  currencies: Currency[];
  offline: {
    enabled: boolean;
    syncInterval: number; // minutes
  };
  features: {
    aiAssistant: boolean;
    diseaseDetection: boolean;
    yieldForecasting: boolean;
    marketPrices: boolean;
    community: boolean;
  };
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  countries: string[];
}
