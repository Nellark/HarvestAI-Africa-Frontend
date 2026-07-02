export const environment = {
  production: false,
  apiUrl: '/api',
  // API Endpoints
  api: {
    baseUrl: '/api',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
  // Feature Flags
  features: {
    aiAssistant: true,
    diseaseDetection: true,
    yieldForecasting: true,
    marketPrices: true,
    community: true,
    offlineMode: true,
    pushNotifications: false,
  },
  // Offline Configuration
  offline: {
    enabled: true,
    syncInterval: 5, // minutes
    cacheSize: 50, // MB
    syncOnReconnect: true,
  },
  // CDN Configuration
  cdn: {
    baseUrl: 'https://cdn.harvestai.africa',
    imageBaseUrl: 'https://images.harvestai.africa',
    enabled: true,
  },
  // App Configuration
  app: {
    name: 'HarvestAI Africa',
    version: '1.0.0',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'sw', 'fr', 'pt', 'ar', 'zu'],
    defaultCountry: 'South Africa',
  },
  // Contact Information
  contact: {
    email: 'hello@harvestai.africa',
    phone: '+1 800 123 4567',
    address: 'Johannesburg, South Africa',
  },
  // Social Media
  social: {
    linkedin: 'https://linkedin.com/company/harvestai-africa',
    youtube: 'https://youtube.com/@harvestai-africa',
    facebook: 'https://facebook.com/harvestai-africa',
    tiktok: 'https://tiktok.com/@harvestai-africa',
    twitter: 'https://twitter.com/harvestai-africa',
  },
  // Supported African Countries
  countries: [
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', currency: 'ZWD' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲', currency: 'ZMW' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', currency: 'MZN' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼', currency: 'BWP' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS' },
    { code: 'MW', name: 'Malawi', flag: '🇲🇼', currency: 'MWK' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳', currency: 'XOF' },
  ],
  // Supported Crops
  crops: [
    'Maize', 'Beans', 'Tomatoes', 'Cassava', 'Groundnuts',
    'Spinach', 'Potatoes', 'Onions', 'Carrots', 'Cabbage',
    'Sorghum', 'Millet', 'Rice', 'Wheat', 'Soybeans',
    'Sweet Potatoes', 'Yams', 'Bananas', 'Mangoes', 'Avocados',
  ],
  // Analytics
  analytics: {
    enabled: true,
    trackingId: 'GA-XXXXXXXXXX',
  },
  // Logging
  logging: {
    enabled: true,
    level: 'info', // debug, info, warn, error
  },
} as const;
