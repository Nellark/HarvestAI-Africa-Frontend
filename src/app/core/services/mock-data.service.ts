import { Injectable } from '@angular/core';

export interface DemoPageContent {
  heroStats?: Array<{ value: string; label: string }>;
  countries?: string[];
  features?: Array<{ icon: string; title: string; description: string; bgColor: string; color: string }>;
  steps?: Array<{ step: number; icon: string; title: string; description: string }>;
  testimonials?: Array<{ name: string; location: string; crop: string; quote: string; avatar: string }>;
  platformStats?: Array<{ value: string; label: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  footerLinks?: Array<{ title: string; links: string[] }>;
  languages?: Array<{ code: string; name: string }>;
}

@Injectable({ providedIn: 'root' })
export class MockDataService {
  readonly landing: DemoPageContent = {
    heroStats: [
      { value: '24K+', label: 'Active Farmers' },
      { value: '9', label: 'African Countries' },
      { value: '42%', label: 'Avg Yield Increase' },
      { value: '4.9★', label: 'User Rating' },
    ],
    countries: ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Zimbabwe', 'Zambia', 'Uganda', 'Mozambique', 'Botswana'],
    features: [
      { icon: 'psychology', title: 'AI Chat Assistant', description: 'Ask anything about your farm — crop diseases, planting advice, market insights — in your local language.', bgColor: 'rgba(46,125,50,0.1)', color: '#2E7D32' },
      { icon: 'biotech', title: 'Disease Detection', description: 'Upload a photo of your crop and our AI will identify diseases and prescribe treatments instantly.', bgColor: 'rgba(239,68,68,0.1)', color: '#DC2626' },
      { icon: 'tips_and_updates', title: 'Crop Advisor', description: 'Get AI-powered recommendations on what to plant based on your soil, climate, budget, and season.', bgColor: 'rgba(245,158,11,0.1)', color: '#D97706' },
      { icon: 'wb_sunny', title: 'Weather Intelligence', description: 'Hyperlocal weather forecasts with AI farming advice tailored to your crops and location.', bgColor: 'rgba(59,130,246,0.1)', color: '#2563EB' },
      { icon: 'trending_up', title: 'Yield Forecasting', description: 'AI-powered yield predictions with confidence intervals to plan your sales and logistics.', bgColor: 'rgba(16,185,129,0.1)', color: '#059669' },
      { icon: 'price_check', title: 'Market Prices', description: 'Real-time market prices from major African exchanges with AI timing recommendations.', bgColor: 'rgba(139,92,246,0.1)', color: '#7C3AED' },
      { icon: 'storefront', title: 'Marketplace', description: 'Buy inputs at fair prices and sell your produce directly to verified buyers across the continent.', bgColor: 'rgba(236,72,153,0.1)', color: '#DB2777' },
      { icon: 'groups', title: 'Farmer Community', description: 'Connect with farmers, experts, and agronomists across Africa to share knowledge and experiences.', bgColor: 'rgba(234,179,8,0.1)', color: '#CA8A04' },
    ],
    steps: [
      { step: 1, icon: 'person_add', title: 'Create Your Account', description: 'Sign up for free in 2 minutes. No credit card needed.' },
      { step: 2, icon: 'yard', title: 'Set Up Your Farm', description: 'Enter your farm details, crops, and location to personalise your experience.' },
      { step: 3, icon: 'psychology', title: 'Get AI Insights', description: 'Receive personalised recommendations, alerts, and insights powered by AI.' },
      { step: 4, icon: 'trending_up', title: 'Grow & Prosper', description: 'Increase yields, reduce losses, and sell at better prices.' },
    ],
    testimonials: [
      { name: 'Amara Osei', location: 'Kumasi, Ghana', crop: 'Maize Farmer', quote: 'HarvestAI helped me identify Fall Armyworm on my maize before it destroyed my crop. The AI gave me the exact treatment and I saved 80% of my harvest.', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face' },
      { name: 'Dr. Grace Mwangi', location: 'Nairobi, Kenya', crop: 'Horticulture', quote: 'The market price feature is invaluable. I waited 2 weeks based on the AI recommendation and sold my tomatoes at 35% above the price I was originally offered.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face' },
      { name: 'Thabo Nkosi', location: 'Limpopo, SA', crop: 'Mixed Farming', quote: 'I was sceptical about AI at first, but the crop advisor recommended I try drip irrigation for my tomatoes. My water use dropped 60% and yields increased by 3 tons per hectare.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    ],
    platformStats: [
      { value: '24,000+', label: 'Active Farmers' },
      { value: '9', label: 'Countries' },
      { value: '2.8M+', label: 'Hectares Managed' },
      { value: 'R1.2B', label: 'Crop Value Managed' },
    ],
    faqs: [
      { question: 'Is HarvestAI free to use?', answer: 'Yes! HarvestAI offers a free plan with full access to core features including the AI assistant, disease detection, and weather. Premium plans unlock advanced analytics and unlimited API calls.' },
      { question: 'Does the app work offline?', answer: 'Yes, HarvestAI is designed to work in areas with poor connectivity. Core features like the farm diary, tasks, and cached weather data are available offline. Data syncs automatically when you reconnect.' },
      { question: 'Which languages are supported?', answer: 'HarvestAI currently supports English with full translation support coming for isiZulu, Swahili, French, Portuguese, and Arabic — covering the majority of African farming communities.' },
      { question: 'How accurate is the disease detection?', answer: 'Our disease detection model has been trained on over 500,000 images of African crop diseases and achieves 88–95% accuracy on the top 50 most common crop diseases in sub-Saharan Africa.' },
      { question: 'Can I connect my existing IoT sensors?', answer: 'Yes, HarvestAI supports integration with popular IoT soil sensors and weather stations. Our API allows you to push data directly from your devices for real-time monitoring.' },
    ],
    footerLinks: [
      { title: 'Product', links: ['Dashboard', 'AI Assistant', 'Disease Detection', 'Market Prices', 'Marketplace', 'Mobile App'] },
      { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'] },
      { title: 'Support', links: ['Documentation', 'API Reference', 'Community Forum', 'Help Center', 'Status', 'Privacy Policy'] },
    ],
    languages: [
      { code: 'en', name: 'English' },
      { code: 'sw', name: 'Swahili' },
      { code: 'fr', name: 'Français' },
      { code: 'pt', name: 'Português' },
      { code: 'ar', name: 'العربية' },
    ],
  };

  readonly auth = {
    languages: [
      { code: 'en', name: 'English' },
      { code: 'sw', name: 'Swahili' },
      { code: 'fr', name: 'Français' },
      { code: 'pt', name: 'Português' },
      { code: 'zu', name: 'isiZulu' },
    ],
    features: [
      { icon: 'psychology', text: 'AI-powered crop recommendations' },
      { icon: 'biotech', text: 'Instant disease detection' },
      { icon: 'price_check', text: 'Real-time market prices' },
      { icon: 'cloud_sync', text: 'Works offline in the field' },
    ],
    countries: ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Zimbabwe', 'Zambia', 'Uganda', 'Mozambique', 'Botswana', 'Tanzania', 'Malawi', 'Senegal'],
    stats: [
      { value: '24K+', label: 'Farmers' },
      { value: '9', label: 'Countries' },
      { value: '42%', label: 'More Yield' },
      { value: 'Free', label: 'Forever' },
    ],
  };

  readonly dashboard = {
    statCards: [
      { icon: 'yard', label: 'Farm Size', value: '12.5 ha', trend: 0, trendLabel: 'stable', iconClass: 'icon-wrap-primary' },
      { icon: 'grass', label: 'Active Crops', value: '5 crops', trend: 1, trendLabel: '+1 planted', iconClass: 'icon-wrap-accent' },
      { icon: 'health_and_safety', label: 'Avg. Health Score', value: '87%', trend: 1, trendLabel: '+4% this week', iconClass: 'icon-wrap-primary' },
      { icon: 'trending_up', label: 'Predicted Yield', value: '6.2 t/ha', trend: 1, trendLabel: '+29% vs last yr', iconClass: 'icon-wrap-warning' },
    ],
    aiRecommendations: [
      { icon: 'water_drop', title: 'Irrigate tomato field today', description: 'Soil moisture analysis shows tomatoes need 25mm of water. Rain not expected until Thursday.', priority: 'Urgent', iconClass: 'icon-wrap-info', badgeClass: 'badge-danger' },
      { icon: 'bug_report', title: 'Monitor maize for Fall Armyworm', description: 'Risk elevated in your region based on temperature and rainfall data. Check plants at field edges.', priority: 'Important', iconClass: 'icon-wrap-danger', badgeClass: 'badge-warning' },
      { icon: 'local_florist', title: 'Harvest tomatoes before Thursday', description: 'Heavy rain forecast increases blight risk. Early harvest recommended to protect yield quality.', priority: 'Advised', iconClass: 'icon-wrap-primary', badgeClass: 'badge-info' },
    ],
    quickActions: [
      { icon: 'biotech', label: 'Scan Crop', route: '/app/disease-detection' },
      { icon: 'psychology', label: 'Ask AI', route: '/app/ai-assistant' },
      { icon: 'price_check', label: 'Prices', route: '/app/market-prices' },
      { icon: 'calendar_month', label: 'Planner', route: '/app/planner' },
      { icon: 'wb_sunny', label: 'Weather', route: '/app/weather' },
      { icon: 'storefront', label: 'Sell Now', route: '/app/marketplace' },
    ],
    timeline: [
      { icon: 'psychology', title: 'AI analysis completed', description: 'Farm health report generated — 87% overall health score', time: '2 hours ago', iconClass: 'icon-wrap-primary' },
      { icon: 'water_drop', title: 'Irrigation completed', description: 'Field 2 (Tomatoes) — 25mm applied via drip system', time: '4 hours ago', iconClass: 'icon-wrap-info' },
      { icon: 'warning', title: 'Weather alert received', description: 'Heavy rain warning for Thursday–Friday', time: '6 hours ago', iconClass: 'icon-wrap-warning' },
      { icon: 'trending_up', title: 'Market price surge', description: 'Spinach prices up 14% — good time to sell', time: 'Yesterday', iconClass: 'icon-wrap-accent' },
      { icon: 'check_circle', title: 'Task completed', description: 'Borehole pump inspection completed successfully', time: '2 days ago', iconClass: 'icon-wrap-primary' },
    ],
  };

  readonly analytics = {
    kpis: [
      { label: 'Total Revenue', value: 'R 43,090', trend: 18, sparkline: [10, 14, 9, 16, 12, 18, 15, 20, 22] },
      { label: 'Total Expenses', value: 'R 24,850', trend: -5, sparkline: [12, 11, 15, 13, 11, 10, 9, 11, 10] },
      { label: 'Avg Yield', value: '5.8 t/ha', trend: 21, sparkline: [5, 6, 4, 7, 5, 6, 8, 7, 9] },
      { label: 'Farm Health', value: '87%', trend: 4, sparkline: [78, 80, 76, 82, 83, 85, 84, 86, 87] },
    ],
    monthlyFinancial: [
      { month: 'Nov', revenue: 2000, expense: 4200 },
      { month: 'Dec', revenue: 4500, expense: 3800 },
      { month: 'Jan', revenue: 7200, expense: 5100 },
      { month: 'Feb', revenue: 9800, expense: 4600 },
      { month: 'Mar', revenue: 12400, expense: 4100 },
      { month: 'Apr', revenue: 8100, expense: 3050 },
    ],
    cropPerformance: [
      { name: 'Tomatoes', score: 92 },
      { name: 'Groundnuts', score: 88 },
      { name: 'Maize', score: 83 },
      { name: 'Cassava', score: 80 },
      { name: 'Beans', score: 75 },
      { name: 'Spinach', score: 72 },
    ],
    waterUsage: [
      { month: 'Nov', used: 120 }, { month: 'Dec', used: 180 }, { month: 'Jan', used: 320 },
      { month: 'Feb', used: 460 }, { month: 'Mar', used: 380 }, { month: 'Apr', used: 240 },
    ],
    diseaseStats: [
      { name: 'Northern Corn Leaf Blight', pct: 35, color: '#EF4444' },
      { name: 'Early Blight (Tomatoes)', pct: 25, color: '#F59E0B' },
      { name: 'Powdery Mildew', pct: 20, color: '#8B5CF6' },
      { name: 'Fall Armyworm', pct: 15, color: '#EC4899' },
      { name: 'Other', pct: 5, color: '#9CA3AF' },
    ],
    aiInsights: [
      { icon: 'trending_up', color: '#4CAF50', title: 'Revenue Growth Opportunity', text: 'Shifting 1ha from maize to tomatoes could increase revenue by R 12,000 per season based on current market prices.' },
      { icon: 'water_drop', color: '#3B82F6', title: 'Irrigation Efficiency', text: 'Your water usage is 23% above regional average for similar crops. Switching to drip irrigation could save R 3,200/season.' },
      { icon: 'bug_report', color: '#EF4444', title: 'Disease Pattern Alert', text: 'NCLB incidence is 18% higher than last season. Preventive fungicide application recommended before the rainy season.' },
    ],
  };

  readonly admin = {
    kpis: [
      { icon: 'groups', label: 'Total Farmers', value: '24,318', change: 12.4, iconClass: 'icon-wrap-primary' },
      { icon: 'yard', label: 'Hectares Managed', value: '2.8M', change: 8.7, iconClass: 'icon-wrap-accent' },
      { icon: 'storefront', label: 'Marketplace Sales', value: 'R 1.2B', change: 22.1, iconClass: 'icon-wrap-warning' },
      { icon: 'biotech', label: 'Disease Scans', value: '486K', change: 31.5, iconClass: 'icon-wrap-danger' },
    ],
    countryStats: [
      { country: 'South Africa', flag: '🇿🇦', farmers: 7840 },
      { country: 'Kenya', flag: '🇰🇪', farmers: 5120 },
      { country: 'Nigeria', flag: '🇳🇬', farmers: 4380 },
      { country: 'Ghana', flag: '🇬🇭', farmers: 2910 },
      { country: 'Zimbabwe', flag: '🇿🇼', farmers: 1780 },
      { country: 'Zambia', flag: '🇿🇲', farmers: 1240 },
      { country: 'Uganda', flag: '🇺🇬', farmers: 890 },
      { country: 'Mozambique', flag: '🇲🇿', farmers: 158 },
    ],
    diseaseReports: [
      { name: 'Fall Armyworm (Maize)', reports: 3842, pct: 90 },
      { name: 'Early Blight (Tomatoes)', reports: 2156, pct: 72 },
      { name: 'Northern Corn Leaf Blight', reports: 1893, pct: 62 },
      { name: 'Cassava Mosaic Virus', reports: 1240, pct: 48 },
      { name: 'Powdery Mildew', reports: 980, pct: 38 },
    ],
    recentUsers: [
      { name: 'Amara Osei', country: 'Ghana', farmSize: '8 ha', crops: 'Maize, Cassava', registered: '2026-06-28' },
      { name: 'Faith Ndlovu', country: 'Zimbabwe', farmSize: '4.5 ha', crops: 'Tomatoes, Beans', registered: '2026-06-27' },
      { name: 'Samuel Kiprotich', country: 'Kenya', farmSize: '12 ha', crops: 'Tea, Maize', registered: '2026-06-27' },
      { name: 'Grace Bello', country: 'Nigeria', farmSize: '6 ha', crops: 'Groundnuts, Millet', registered: '2026-06-26' },
      { name: 'Tendai Moyo', country: 'Zambia', farmSize: '3.5 ha', crops: 'Sorghum, Cassava', registered: '2026-06-25' },
    ],
  };

  readonly marketPrices = {
    filters: ['All', 'Grains', 'Vegetables', 'Legumes', 'Other'],
    nearbyBuyers: [
      { name: 'Polokwane Fresh Produce Market', location: '12 km away', price: 7.8 },
      { name: 'Pick n Pay Distribution Centre', location: '28 km away', price: 8.2 },
      { name: 'Local Hawkers Market', location: '5 km away', price: 6.5 },
    ],
  };

  readonly weather = {
    aiRecs: [
      { icon: 'local_florist', title: 'Harvest tomatoes by Wednesday', description: 'Heavy rain on Thursday risks blight and quality loss. Early harvest recommended.', day: 'Today', priority: 'Urgent', iconClass: 'icon-wrap-danger', badgeClass: 'badge-danger' },
      { icon: 'water_drop', title: 'No irrigation needed Wednesday', description: 'High rainfall probability. Skip irrigation to avoid waterlogging.', day: 'Wed–Thu', priority: 'Advised', iconClass: 'icon-wrap-info', badgeClass: 'badge-info' },
      { icon: 'grass', title: 'Ideal conditions for planting spinach', description: 'Saturday and Sunday forecast is perfect for transplanting seedlings.', day: 'Sat–Sun', priority: 'Opportunity', iconClass: 'icon-wrap-primary', badgeClass: 'badge-success' },
    ],
    weatherAlerts: [
      { icon: 'thunderstorm', title: 'Heavy Rain Warning', description: 'Up to 45mm expected Thursday–Friday. Risk of flash flooding in low-lying fields.', time: 'Valid Thu 01:00 – Fri 18:00', severity: 'high', badgeClass: 'badge-danger' },
      { icon: 'heat', title: 'High UV Alert', description: 'UV Index of 8–9 forecast for the weekend. Protect outdoor workers.', time: 'Valid Sat–Sun', severity: 'medium', badgeClass: 'badge-warning' },
      { icon: 'air', title: 'Moderate Wind Advisory', description: 'Winds of 35–45 km/h expected from the north on Monday.', time: 'Valid Monday morning', severity: 'low', badgeClass: 'badge-info' },
    ],
  };

  readonly community = {
    categories: [
      { id: 'all', label: 'All', icon: 'apps' },
      { id: 'question', label: 'Questions', icon: 'help_outline' },
      { id: 'success', label: 'Success Stories', icon: 'emoji_events' },
      { id: 'tip', label: 'Tips', icon: 'tips_and_updates' },
      { id: 'discussion', label: 'Discussion', icon: 'forum' },
    ],
    experts: [
      { name: 'Dr. Amina Diallo', specialty: 'Soil Science · Mali' },
      { name: 'Prof. James Okonkwo', specialty: 'Crop Genetics · Nigeria' },
      { name: 'Eng. Sarah Kamau', specialty: 'Irrigation Systems · Kenya' },
    ],
    trendingTags: [
      { tag: '#FallArmyworm', count: 234 },
      { tag: '#MaizeYield2026', count: 198 },
      { tag: '#DroughtTolerant', count: 156 },
      { tag: '#OrganicFarming', count: 132 },
      { tag: '#IrrigationTips', count: 118 },
      { tag: '#MarketPrices', count: 95 },
    ],
    posts: [
      {
        id: '1',
        author: { name: 'Amara Osei', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face', role: 'Farmer', location: 'Kumasi, Ghana' },
        title: 'How I doubled my maize yield using HarvestAI crop advisor',
        content: 'Last season I was struggling with low yields. I followed the AI crop advisor recommendations for fertilizer timing and irrigation scheduling. The results were incredible — I went from 3.2 tons/ha to 6.8 tons/ha!',
        category: 'success',
        tags: ['maize', 'yield', 'AI', 'success-story'],
        likes: 234,
        comments: 45,
        views: 1840,
        createdAt: new Date(Date.now() - 86400000 * 2),
      },
      {
        id: '2',
        author: { name: 'Dr. Grace Mwangi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face', role: 'Agronomist', location: 'Nairobi, Kenya' },
        title: 'Understanding Fall Armyworm: Early detection tips for smallholders',
        content: 'Fall Armyworm remains one of the biggest threats to maize production in sub-Saharan Africa. Here are 5 early detection methods that any farmer can apply without expensive equipment...',
        category: 'tip',
        tags: ['FAW', 'maize', 'pest', 'detection'],
        likes: 412,
        comments: 78,
        views: 3200,
        createdAt: new Date(Date.now() - 86400000 * 5),
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=300&fit=crop',
      },
      {
        id: '3',
        author: { name: 'Ibrahim Diallo', avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=80&h=80&fit=crop&crop=face', role: 'Farmer', location: 'Bamako, Mali' },
        title: 'Best time to sell groundnuts in West Africa — AI market insights',
        content: 'I have been using HarvestAI market price feature for 3 months now and found that prices peak in November–December every year. Has anyone else noticed this pattern?',
        category: 'question',
        tags: ['groundnuts', 'market', 'price', 'West Africa'],
        likes: 89,
        comments: 23,
        views: 650,
        createdAt: new Date(Date.now() - 86400000),
      },
    ],
  };
}
