import type { User, Farm, WeatherData, CropPrice, Notification, PlannerTask, AIMessage, DiseaseDetection, MarketplaceListing, CommunityPost, YieldForecast } from '../shared/models/app.models';

export const MOCK_USER: User = {
  id: '1',
  name: 'Yonela Kulati',
  email: 'yonela.kulati@example.com',
  phone: '+27 82 456 7890',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  role: 'farmer',
  country: 'South Africa',
  province: 'Limpopo',
  language: 'en',
  onboardingComplete: true,
};

export const MOCK_FARM: Farm = {
  id: '1',
  name: 'Ngoakoana Mphago Farm',
  size: 12.5,
  sizeUnit: 'ha',
  province: 'Limpopo',
  country: 'South Africa',
  soilType: 'Sandy Loam',
  waterSource: 'Borehole + Rainwater Harvesting',
  image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop',
  crops: [
    { id: '1', name: 'Maize', variety: 'PAN 6Q-508', plantedDate: '2025-11-01', expectedHarvestDate: '2026-04-15', area: 5, areaUnit: 'ha', status: 'growing', healthScore: 87, icon: 'grass' },
    { id: '2', name: 'Tomatoes', variety: 'Roma', plantedDate: '2025-12-15', expectedHarvestDate: '2026-03-20', area: 1.5, areaUnit: 'ha', status: 'ready', healthScore: 92, icon: 'local_florist' },
    { id: '3', name: 'Beans', variety: 'Climbing', plantedDate: '2025-11-20', expectedHarvestDate: '2026-03-01', area: 2, areaUnit: 'ha', status: 'growing', healthScore: 78, icon: 'eco' },
    { id: '4', name: 'Groundnuts', variety: 'Valencia', plantedDate: '2025-10-15', expectedHarvestDate: '2026-02-28', area: 2, areaUnit: 'ha', status: 'harvested', healthScore: 95, icon: 'spa' },
    { id: '5', name: 'Spinach', variety: 'Hybrid F1', plantedDate: '2026-01-10', expectedHarvestDate: '2026-03-10', area: 0.5, areaUnit: 'ha', status: 'planted', healthScore: 82, icon: 'yard' },
    { id: '6', name: 'Cassava', variety: 'TME-419', plantedDate: '2025-09-01', expectedHarvestDate: '2026-09-01', area: 1.5, areaUnit: 'ha', status: 'growing', healthScore: 88, icon: 'agriculture' },
  ],
  livestock: [
    { id: '1', type: 'Cattle', breed: 'Nguni', count: 24, healthStatus: 'good' },
    { id: '2', type: 'Goats', breed: 'Boer', count: 45, healthStatus: 'good' },
    { id: '3', type: 'Chickens', breed: 'Indigenous', count: 120, healthStatus: 'fair' },
  ],
};

export const MOCK_WEATHER: WeatherData = {
  temperature: 28,
  feelsLike: 31,
  humidity: 62,
  windSpeed: 14,
  condition: 'Partly Cloudy',
  icon: 'partly_cloudy_day',
  location: 'Polokwane, Limpopo',
  uvIndex: 7,
  rainfall: 3.2,
  forecast: [
    { day: 'Mon', high: 29, low: 17, condition: 'Sunny', icon: 'sunny', rain: 0 },
    { day: 'Tue', high: 27, low: 16, condition: 'Partly Cloudy', icon: 'partly_cloudy_day', rain: 10 },
    { day: 'Wed', high: 24, low: 15, condition: 'Rainy', icon: 'rainy', rain: 65 },
    { day: 'Thu', high: 22, low: 14, condition: 'Thunderstorm', icon: 'thunderstorm', rain: 80 },
    { day: 'Fri', high: 26, low: 15, condition: 'Partly Cloudy', icon: 'partly_cloudy_day', rain: 20 },
    { day: 'Sat', high: 30, low: 18, condition: 'Sunny', icon: 'sunny', rain: 0 },
    { day: 'Sun', high: 31, low: 19, condition: 'Sunny', icon: 'sunny', rain: 0 },
  ],
};

export const MOCK_PRICES: CropPrice[] = [
  { id: '1', name: 'Maize', price: 3850, unit: 'ton', currency: 'ZAR', change: 120, changePercent: 3.2, market: 'SAFEX', lastUpdated: '2 hours ago', trend: 'up' },
  { id: '2', name: 'Tomatoes', price: 8.50, unit: 'kg', currency: 'ZAR', change: -0.80, changePercent: -8.6, market: 'FreshProduce', lastUpdated: '1 hour ago', trend: 'down' },
  { id: '3', name: 'Beans', price: 18.20, unit: 'kg', currency: 'ZAR', change: 0.40, changePercent: 2.2, market: 'Local Market', lastUpdated: '3 hours ago', trend: 'up' },
  { id: '4', name: 'Groundnuts', price: 14.60, unit: 'kg', currency: 'ZAR', change: 0, changePercent: 0, market: 'FreshProduce', lastUpdated: '5 hours ago', trend: 'stable' },
  { id: '5', name: 'Cassava', price: 3.20, unit: 'kg', currency: 'ZAR', change: 0.15, changePercent: 4.9, market: 'Local Market', lastUpdated: '1 hour ago', trend: 'up' },
  { id: '6', name: 'Millet', price: 6.80, unit: 'kg', currency: 'ZAR', change: -0.20, changePercent: -2.9, market: 'SAFEX', lastUpdated: '4 hours ago', trend: 'down' },
  { id: '7', name: 'Sorghum', price: 4.90, unit: 'kg', currency: 'ZAR', change: 0.30, changePercent: 6.5, market: 'FreshProduce', lastUpdated: '2 hours ago', trend: 'up' },
  { id: '8', name: 'Spinach', price: 12.00, unit: 'kg', currency: 'ZAR', change: 1.50, changePercent: 14.3, market: 'FreshProduce', lastUpdated: '30 min ago', trend: 'up' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'weather', title: 'Heavy Rain Alert', message: 'Heavy rainfall expected Thursday. Protect your maize crop.', timestamp: new Date(Date.now() - 3600000), read: false, priority: 'high', icon: 'thunderstorm' },
  { id: '2', type: 'disease', title: 'Disease Risk Elevated', message: 'Fall Armyworm risk elevated in your region. Monitor maize immediately.', timestamp: new Date(Date.now() - 7200000), read: false, priority: 'high', icon: 'bug_report' },
  { id: '3', type: 'market', title: 'Tomato Prices Up 14%', message: 'Great time to sell! Tomato prices are at seasonal high in Johannesburg.', timestamp: new Date(Date.now() - 10800000), read: false, priority: 'medium', icon: 'trending_up' },
  { id: '4', type: 'planner', title: 'Irrigation Reminder', message: 'Scheduled irrigation for Field 2 (Tomatoes) is due today.', timestamp: new Date(Date.now() - 14400000), read: true, priority: 'medium', icon: 'water_drop' },
  { id: '5', type: 'ai', title: 'AI Insight Available', message: 'AI has analyzed your farm data and found 3 yield improvement opportunities.', timestamp: new Date(Date.now() - 86400000), read: true, priority: 'low', icon: 'psychology' },
  { id: '6', type: 'system', title: 'Data Synced', message: 'Your offline data has been successfully synced to the cloud.', timestamp: new Date(Date.now() - 172800000), read: true, priority: 'low', icon: 'cloud_sync' },
];

export const MOCK_TASKS: PlannerTask[] = [
  { id: '1', title: 'Apply fungicide to tomatoes', category: 'spraying', dueDate: '2026-07-01', status: 'pending', priority: 'high' },
  { id: '2', title: 'Irrigate Field 2 (Tomatoes)', category: 'irrigation', dueDate: '2026-06-30', status: 'in-progress', priority: 'high' },
  { id: '3', title: 'Fertilize maize – Field 1', category: 'fertilizing', dueDate: '2026-07-03', status: 'pending', priority: 'medium' },
  { id: '4', title: 'Harvest groundnuts – Field 4', category: 'harvesting', dueDate: '2026-07-05', status: 'pending', priority: 'medium' },
  { id: '5', title: 'Plant spinach seedlings', category: 'planting', dueDate: '2026-07-08', status: 'pending', priority: 'low' },
  { id: '6', title: 'Check borehole pump', category: 'other', dueDate: '2026-07-10', status: 'done', priority: 'low' },
];

export const MOCK_AI_MESSAGES: AIMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello Yonela! I am your HarvestAI assistant. I can help you with crop management, disease detection, weather advice, market insights, and much more. How can I help you today?',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    role: 'user',
    content: 'My maize leaves are turning yellow. What could be causing this?',
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '3',
    role: 'assistant',
    content: `Yellowing maize leaves (chlorosis) can have several causes. Based on your location in Limpopo and current weather patterns, here are the most likely causes:

**1. Nitrogen Deficiency (Most Likely)**
- Symptoms: Yellowing starts from the tip of older leaves, moving inward in a V-shape
- Fix: Apply 50–60 kg/ha of LAN (28%) immediately

**2. Waterlogging / Root Rot**
- Symptoms: Yellowing of all leaves uniformly
- Fix: Check drainage; improve furrow irrigation efficiency

**3. Fall Armyworm Damage**
- Symptoms: Yellowing plus visible holes in leaves
- Fix: Apply Coragen or Ampligo at the recommended rate

**AI Recommendation:** Upload a photo of the affected leaves so I can give a more precise diagnosis. Based on the current seasonal data, nitrogen deficiency accounts for 68% of similar reports in your area right now.

Would you like me to generate a detailed treatment plan?`,
    timestamp: new Date(Date.now() - 180000),
  },
];

export const MOCK_DISEASE_DETECTIONS: DiseaseDetection[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
    cropType: 'Maize',
    disease: 'Northern Corn Leaf Blight',
    confidence: 91.4,
    severity: 'medium',
    treatment: [
      'Apply Propiconazole fungicide at 250ml/100L water',
      'Spray in the early morning or evening',
      'Repeat application after 14 days if symptoms persist',
    ],
    recommendations: [
      'Remove and destroy severely infected plant material',
      'Avoid overhead irrigation to reduce leaf wetness',
      'Consider resistant varieties for next planting season',
      'Improve field drainage to reduce disease spread',
    ],
    detectedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
    cropType: 'Tomatoes',
    disease: 'Early Blight',
    confidence: 88.2,
    severity: 'low',
    treatment: [
      'Apply Mancozeb or Chlorothalonil fungicide',
      'Prune lower infected leaves',
      'Maintain adequate plant spacing',
    ],
    recommendations: [
      'Mulch around plants to prevent soil splash',
      'Water at the base of plants',
      'Monitor for spread to other plants',
    ],
    detectedAt: new Date(Date.now() - 172800000),
  },
];

export const MOCK_MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  { id: '1', title: 'Premium Maize Seed – PAN 6Q-508', description: '50kg bag of high-yield maize seed. Suitable for dryland conditions in southern Africa.', price: 1250, currency: 'ZAR', unit: '50kg bag', category: 'inputs', seller: 'AgriSeed SA', location: 'Polokwane, Limpopo', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop', rating: 4.8, reviews: 124, stock: 230, verified: true },
  { id: '2', title: 'Fresh Tomatoes – Roma Variety', description: 'Grade A Roma tomatoes, freshly harvested. Suitable for wholesale and retail buyers.', price: 7.50, currency: 'ZAR', unit: 'kg', category: 'produce', seller: 'Ngoakoana Mphago Farm', location: 'Polokwane, Limpopo', image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&h=200&fit=crop', rating: 4.6, reviews: 48, stock: 500, verified: true },
  { id: '3', title: 'Irrigation Drip Kit – 1 ha', description: 'Complete drip irrigation system for 1 hectare. Includes mainline, drippers, filters, and fittings.', price: 4800, currency: 'ZAR', unit: 'kit', category: 'equipment', seller: 'IrriTech SA', location: 'Johannesburg, Gauteng', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop', rating: 4.9, reviews: 212, stock: 45, verified: true },
  { id: '4', title: 'Organic Fertilizer – Chicken Manure', description: 'Well-composted chicken manure. Rich in NPK. Perfect for vegetable gardens.', price: 280, currency: 'ZAR', unit: '25kg bag', category: 'inputs', seller: 'GreenGrow Organics', location: 'Tzaneen, Limpopo', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop', rating: 4.4, reviews: 89, stock: 600, verified: false },
  { id: '5', title: 'Fresh Spinach – Hybrid F1', description: 'Crispy, fresh spinach. Perfect for local supermarkets and restaurants.', price: 11.00, currency: 'ZAR', unit: 'kg', category: 'produce', seller: 'GreenLeaf Farms', location: 'Tzaneen, Limpopo', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop', rating: 4.7, reviews: 35, stock: 200, verified: true },
  { id: '6', title: 'Tractor Hire – Ploughing & Planting', description: 'Professional tractor services for land preparation and planting. Available weekdays.', price: 800, currency: 'ZAR', unit: 'ha', category: 'services', seller: 'AgriMech Limpopo', location: 'Louis Trichardt, Limpopo', image: 'https://images.unsplash.com/photo-1591086661413-da9aa5ef5d81?w=300&h=200&fit=crop', rating: 4.5, reviews: 67, stock: 999, verified: true },
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  { id: '1', author: { name: 'Amara Osei', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face', role: 'Farmer', location: 'Kumasi, Ghana' }, title: 'How I doubled my maize yield using HarvestAI crop advisor', content: 'Last season I was struggling with low yields. I followed the AI crop advisor recommendations for fertilizer timing and irrigation scheduling. The results were incredible — I went from 3.2 tons/ha to 6.8 tons/ha!', category: 'success', tags: ['maize', 'yield', 'AI', 'success-story'], likes: 234, comments: 45, views: 1840, createdAt: new Date(Date.now() - 86400000 * 2) },
  { id: '2', author: { name: 'Dr. Grace Mwangi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face', role: 'Agronomist', location: 'Nairobi, Kenya' }, title: 'Understanding Fall Armyworm: Early detection tips for smallholders', content: 'Fall Armyworm remains one of the biggest threats to maize production in sub-Saharan Africa. Here are 5 early detection methods that any farmer can apply without expensive equipment...', category: 'tip', tags: ['FAW', 'maize', 'pest', 'detection'], likes: 412, comments: 78, views: 3200, createdAt: new Date(Date.now() - 86400000 * 5), image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=300&fit=crop' },
  { id: '3', author: { name: 'Ibrahim Diallo', avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=80&h=80&fit=crop&crop=face', role: 'Farmer', location: 'Bamako, Mali' }, title: 'Best time to sell groundnuts in West Africa — AI market insights', content: 'I have been using HarvestAI market price feature for 3 months now and found that prices peak in November–December every year. Has anyone else noticed this pattern?', category: 'question', tags: ['groundnuts', 'market', 'price', 'West Africa'], likes: 89, comments: 23, views: 650, createdAt: new Date(Date.now() - 86400000 * 1) },
];

export const MOCK_YIELD_FORECAST: YieldForecast = {
  cropName: 'Maize',
  predictedYield: 6.2,
  historicalYield: 4.8,
  unit: 'tons/ha',
  confidence: 84,
  factors: [
    { name: 'Rainfall', impact: 'positive', score: 78, description: 'Above-average rainfall forecast for planting season' },
    { name: 'Temperature', impact: 'neutral', score: 50, description: 'Temperatures within normal range' },
    { name: 'Soil Health', impact: 'positive', score: 85, description: 'Good soil moisture and nutrient levels' },
    { name: 'Pest Pressure', impact: 'negative', score: 35, description: 'Elevated Fall Armyworm pressure in region' },
    { name: 'Variety Choice', impact: 'positive', score: 90, description: 'High-yielding drought-tolerant variety selected' },
  ],
  monthlyData: [
    { month: 'Nov', predicted: 0, historical: 0 },
    { month: 'Dec', predicted: 0.5, historical: 0.3 },
    { month: 'Jan', predicted: 1.8, historical: 1.2 },
    { month: 'Feb', predicted: 3.5, historical: 2.8 },
    { month: 'Mar', predicted: 5.2, historical: 4.1 },
    { month: 'Apr', predicted: 6.2, historical: 4.8 },
  ],
};
