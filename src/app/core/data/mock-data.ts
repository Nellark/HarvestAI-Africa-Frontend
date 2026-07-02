import {
  AdminStat,
  AssistantMessage,
  CommunityPost,
  FaqItem,
  FeatureCardData,
  NavItem,
  PriceRow,
  StatCardData,
  Testimonial,
  TimelineItem,
  WeatherDay,
} from '../models/app.models';

export const APP_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: 'space_dashboard' },
  { label: 'My Farm', path: '/app/my-farm', icon: 'yard' },
  { label: 'Disease Detection', path: '/app/disease-detection', icon: 'sick' },
  { label: 'Crop Advisor', path: '/app/crop-advisor', icon: 'psychiatry' },
  { label: 'Weather', path: '/app/weather', icon: 'cloud' },
  { label: 'Yield Forecast', path: '/app/yield-forecast', icon: 'trending_up' },
  { label: 'Market Prices', path: '/app/market-prices', icon: 'sell' },
  { label: 'Marketplace', path: '/app/marketplace', icon: 'storefront' },
  { label: 'Planner', path: '/app/planner', icon: 'event' },
  { label: 'Analytics', path: '/app/analytics', icon: 'monitoring' },
  { label: 'Community', path: '/app/community', icon: 'groups' },
  { label: 'Notifications', path: '/app/notifications', icon: 'notifications_active' },
  { label: 'Settings', path: '/app/settings', icon: 'settings' },
  { label: 'Admin', path: '/app/admin', icon: 'admin_panel_settings' },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/app/dashboard', icon: 'space_dashboard' },
  { label: 'Scan', path: '/app/disease-detection', icon: 'sick' },
  { label: 'Weather', path: '/app/weather', icon: 'cloud' },
  { label: 'Planner', path: '/app/planner', icon: 'event' },
  { label: 'More', path: '/app/settings', icon: 'menu' },
];

export const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'en' },
  { label: 'Swahili', value: 'sw' },
  { label: 'French', value: 'fr' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Arabic', value: 'ar' },
];

export const LANDING_STATS: StatCardData[] = [
  {
    title: 'Farmers supported',
    value: '18K+',
    change: '+32% this quarter',
    helper: 'Across 9 African countries',
    icon: 'groups',
    tone: 'success',
  },
  {
    title: 'Yield uplift',
    value: '24%',
    change: 'AI-guided average gain',
    helper: 'Maize, beans, tomatoes, cassava',
    icon: 'trending_up',
    tone: 'accent',
  },
  {
    title: 'Alerts resolved',
    value: '1.2K',
    change: 'Weather and disease interventions',
    helper: 'Actioned within 24 hours',
    icon: 'shield',
    tone: 'warning',
  },
];

export const FEATURES: FeatureCardData[] = [
  {
    title: 'AI field intelligence',
    description: 'Instant crop, soil, and weather insights tuned for African farming realities.',
    icon: 'auto_awesome',
  },
  {
    title: 'Disease detection',
    description: 'Upload a leaf photo and get a diagnosis, confidence score, and treatment plan.',
    icon: 'medication',
  },
  {
    title: 'Market timing',
    description: 'Track prices, nearby buyers, and the best time to sell produce for stronger margins.',
    icon: 'sell',
  },
  {
    title: 'Offline first',
    description: 'Keep working without reliable internet and sync once connectivity returns.',
    icon: 'wifi_off',
  },
];

export const PARTNERS = ['FAO', 'AGRA', 'IITA', 'Hello Tractor', 'M-KOPA', 'Twiga Foods'];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Thabo M.',
    role: 'Maize farmer, North West',
    quote:
      'HarvestAI helped me time irrigation and spraying better. The weather alerts alone paid for the season.',
    location: 'South Africa',
  },
  {
    name: 'Amina K.',
    role: 'Mixed farmer, Nakuru',
    quote:
      'The disease detection and crop advisor are the first tools that actually feel local to our context.',
    location: 'Kenya',
  },
  {
    name: 'Ngozi E.',
    role: 'Market seller, Kaduna',
    quote:
      'I can now see price trends and buyer demand before harvest. It changed how I plan sales.',
    location: 'Nigeria',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does HarvestAI Africa work offline?',
    answer:
      'Yes. Core recommendations, cached weather, and queued uploads stay available when the connection drops.',
  },
  {
    question: 'Can the app support local languages?',
    answer:
      'The interface supports English, Swahili, French, Portuguese, and Arabic with room to expand.',
  },
  {
    question: 'Is the UI ready for backend integration?',
    answer:
      'The frontend uses clean data models and service boundaries so API integration can start immediately.',
  },
];

export const DASHBOARD_STATS: StatCardData[] = [
  {
    title: 'Active hectares',
    value: '142 ha',
    change: '+8.3% from last season',
    helper: '8 fields across two provinces',
    icon: 'landscape',
    tone: 'success',
  },
  {
    title: 'Expected yield',
    value: '1,280 bags',
    change: '88% confidence',
    helper: 'Maize, beans, and spinach',
    icon: 'bar_chart',
    tone: 'accent',
  },
  {
    title: 'Open alerts',
    value: '4',
    change: '2 weather, 1 pest, 1 market',
    helper: 'Requires action in the next 24h',
    icon: 'warning',
    tone: 'warning',
  },
  {
    title: 'Net margin',
    value: 'ZAR 1.84M',
    change: '+16.1% year over year',
    helper: 'Projected from current pricing',
    icon: 'account_balance_wallet',
    tone: 'success',
  },
];

export const DASHBOARD_TASKS = [
  { title: 'Inspect Field 4 for fungal spotting', due: 'Today, 8:30 AM', crop: 'Tomatoes', status: 'High priority' },
  { title: 'Irrigate spinach beds', due: 'Today, 4:00 PM', crop: 'Spinach', status: 'In progress' },
  { title: 'Update harvest log', due: 'Tomorrow', crop: 'Maize', status: 'Pending' },
];

export const DASHBOARD_TIMELINE: TimelineItem[] = [
  {
    title: 'Rain warning issued',
    description: 'High probability of rainfall in Mpumalanga over the next 48 hours.',
    time: '12m ago',
    tone: 'warning',
  },
  {
    title: 'Fertilizer order synced',
    description: '32 bags of NPK scheduled for delivery to Field 2 on Thursday.',
    time: '48m ago',
    tone: 'success',
  },
  {
    title: 'Pest scan completed',
    description: 'Tomato leaf images look healthy; no late blight detected.',
    time: '2h ago',
    tone: 'accent',
  },
];

export const WEATHER_FORECAST: WeatherDay[] = [
  { day: 'Today', temp: '28°C', rain: '10%', icon: 'wb_sunny' },
  { day: 'Tue', temp: '27°C', rain: '22%', icon: 'partly_cloudy_day' },
  { day: 'Wed', temp: '25°C', rain: '68%', icon: 'rainy' },
  { day: 'Thu', temp: '26°C', rain: '52%', icon: 'thunderstorm' },
  { day: 'Fri', temp: '29°C', rain: '15%', icon: 'sunny' },
  { day: 'Sat', temp: '31°C', rain: '8%', icon: 'wb_sunny' },
  { day: 'Sun', temp: '30°C', rain: '12%', icon: 'cloud' },
];

export const MARKET_PRICES: PriceRow[] = [
  { produce: 'Maize', price: 'ZAR 4,800 / ton', trend: 'up', market: 'Johannesburg Fresh Produce' },
  { produce: 'Tomatoes', price: 'ZAR 110 / crate', trend: 'up', market: 'Lusaka Wholesale' },
  { produce: 'Beans', price: 'ZAR 29 / kg', trend: 'flat', market: 'Nakuru Open Market' },
  { produce: 'Cassava', price: 'GHS 12 / bundle', trend: 'down', market: 'Accra Central Market' },
];

export const ASSISTANT_PROMPTS = [
  'What should I spray for early blight?',
  'Which crop fits a 3-hectare irrigated farm in Limpopo?',
  'Will rain affect my harvest this week?',
  'How do I improve maize yield with a small budget?',
];

export const ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    role: 'assistant',
    content:
      'I analyzed your latest weather, soil, and crop records. The strongest action today is to inspect tomatoes and delay top dressing until after the rain.',
    time: '08:24',
  },
  {
    role: 'user',
    content: 'What is the best treatment for the leaf spots on my tomatoes?',
    time: '08:26',
  },
  {
    role: 'assistant',
    content:
      '**Diagnosis:** early blight risk is moderate.\n\nApply a copper-based fungicide, remove affected leaves, and increase air flow between rows.',
    time: '08:26',
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    title: 'How I doubled spinach output in 90 days',
    author: 'Lerato Dlamini',
    excerpt: 'I switched to drip scheduling, soil moisture checks, and afternoon spraying windows.',
    tag: 'Success story',
  },
  {
    title: 'Experts: best beans varieties for dry zones',
    author: 'Dr. M. Okafor',
    excerpt: 'A short breakdown of varieties that tolerate heat, short rains, and poor soils.',
    tag: 'Expert answer',
  },
  {
    title: 'Community question: maize leaves curling',
    author: 'Farmer circle',
    excerpt: 'Several farmers shared images and the most common cause was a nitrogen imbalance.',
    tag: 'Discussion',
  },
];

export const ADMIN_STATS: AdminStat[] = [
  { title: 'Active farmers', value: '18,420', delta: '+1.8k this month' },
  { title: 'Marketplace orders', value: '6,218', delta: '+12.4% month over month' },
  { title: 'Disease reports', value: '142', delta: '94% resolved within 24h' },
  { title: 'AI sessions', value: '72,998', delta: 'Avg. 7m 14s per session' },
];
