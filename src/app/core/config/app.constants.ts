import { environment } from '../../../environments/environment';

// App Constants
export const APP_NAME = environment.app.name;
export const APP_VERSION = environment.app.version;
export const DEFAULT_LANGUAGE = environment.app.defaultLanguage;

// Supported Languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Swahili' },
  { code: 'fr', name: 'Français' },
  { code: 'pt', name: 'Português' },
  { code: 'ar', name: 'العربية' },
  { code: 'zu', name: 'isiZulu' },
] as const;

// Supported African Countries
export const SUPPORTED_COUNTRIES = [
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', currencySymbol: 'R' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', currencySymbol: 'KSh' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', currencySymbol: '₦' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', currencySymbol: 'GH₵' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', currency: 'ZWD', currencySymbol: 'Z$' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', currency: 'ZMW', currencySymbol: 'ZK' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX', currencySymbol: 'USh' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', currency: 'MZN', currencySymbol: 'MT' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', currency: 'BWP', currencySymbol: 'P' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS', currencySymbol: 'TSh' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', currency: 'MWK', currencySymbol: 'MK' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', currency: 'XOF', currencySymbol: 'CFA' },
] as const;

// Supported Crops (African context)
export const SUPPORTED_CROPS = [
  'Maize', 'Beans', 'Tomatoes', 'Cassava', 'Groundnuts',
  'Spinach', 'Potatoes', 'Onions', 'Carrots', 'Cabbage',
  'Sorghum', 'Millet', 'Rice', 'Wheat', 'Soybeans',
  'Sweet Potatoes', 'Yams', 'Bananas', 'Mangoes', 'Avocados',
] as const;

// Crop Categories
export const CROP_CATEGORIES = {
  grain: ['Maize', 'Sorghum', 'Millet', 'Rice', 'Wheat'],
  vegetable: ['Tomatoes', 'Spinach', 'Potatoes', 'Onions', 'Carrots', 'Cabbage'],
  legume: ['Beans', 'Groundnuts', 'Soybeans'],
  root: ['Cassava', 'Sweet Potatoes', 'Yams'],
  fruit: ['Bananas', 'Mangoes', 'Avocados'],
} as const;

// Common African Crop Diseases
export const COMMON_DISEASES = [
  'Fall Armyworm',
  'Early Blight',
  'Late Blight',
  'Northern Corn Leaf Blight',
  'Cassava Mosaic Virus',
  'Powdery Mildew',
  'Bacterial Leaf Spot',
  'Anthracnose',
] as const;

// Pagination Defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Date/Time Formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DISPLAY_DATE_FORMAT = 'DD MMM YYYY';
export const DISPLAY_DATE_TIME_FORMAT = 'DD MMM YYYY, HH:mm';

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'harvestai-token',
  USER: 'harvestai-user',
  THEME: 'harvestai-theme',
  LANGUAGE: 'harvestai-language',
  OFFLINE_QUEUE: 'harvestai-offline-queue',
  CACHED_DATA: 'harvestai-cache',
} as const;

// Offline Configuration
export const OFFLINE_CONFIG = {
  ENABLED: environment.offline.enabled,
  SYNC_INTERVAL: environment.offline.syncInterval * 60 * 1000, // Convert to ms
  CACHE_SIZE: environment.offline.cacheSize * 1024 * 1024, // Convert to bytes
  SYNC_ON_RECONNECT: environment.offline.syncOnReconnect,
} as const;

// Feature Flags
export const FEATURE_FLAGS = environment.features;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: environment.contact.email,
  PHONE: environment.contact.phone,
  ADDRESS: environment.contact.address,
} as const;

// Social Media Links
export const SOCIAL_LINKS = environment.social;

// API Configuration
export const API_CONFIG = {
  BASE_URL: environment.api.baseUrl,
  TIMEOUT: environment.api.timeout,
  RETRY_ATTEMPTS: environment.api.retryAttempts,
  RETRY_DELAY: environment.api.retryDelay,
} as const;
