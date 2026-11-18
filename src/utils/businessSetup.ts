import { LanguageCode } from './languageConfig';

export interface BusinessSetupData {
  // Step 1: Account
  ownerName: string;
  mobileNumber: string;
  otpVerified: boolean;
  email?: string;
  preferredLanguage: LanguageCode;
  password: string;
  accountRole: 'Owner' | 'Admin';

  // Step 2: Shop Details
  shopName: string;
  businessType:
    | 'Retail shop'
    | 'Wholesale business'
    | 'Distributor'
    | 'Manufacturer'
    | 'Service provider'
    | 'Online business'
    | 'Retail + Wholesale'
    | 'Other';
  shopMobile: string;
  shopAddress: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;

  // Step 3: Categories (Multiple allowed)
  categories: string[];

  // Step 4: Legal & Tax
  gstStatus: 'GST registered' | 'Not registered' | 'Composition taxpayer' | 'Not sure';
  gstin?: string;
  pan?: string;
  udyamNumber?: string;
  fssaiLicence?: string;
  drugLicence?: string;

  // Step 5: Billing
  invoiceFormat:
    | 'GST invoice'
    | 'Bill of supply'
    | 'Non-GST invoice'
    | 'Estimate / quotation'
    | 'Proforma invoice';
  invoicePrefix: string;
  startingInvoiceNo: string;
  defaultCurrency: string;
  defaultTaxMode: 'Inclusive' | 'Exclusive' | 'Tax-Free';
  paymentMethods: string[];

  // Step 6: Payments & Bank
  upiId?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  acceptsCash: boolean;
  acceptsCard: boolean;
  udhaarEnabled: boolean;

  // Step 7: Inventory
  maintainStock: boolean;
  productCountRange: 'Under 100' | '100–500' | '500–5,000' | '5,000+';
  useBarcodes: boolean;
  sellByWeight: boolean;
  trackExpiry: boolean;
  trackBatches: boolean;
  purchaseFromSuppliers: boolean;
  lowStockAlerts: boolean;
  multipleWarehouses: boolean;

  // Step 8: Staff & Operations
  employeeCount: string;
  branchCount: string;
  openingTime: string;
  closingTime: string;
  weeklyHoliday: string;

  // Extra features
  hasExcelProducts: boolean;
  previousSoftware?: string;
  enableCloudBackup: boolean;
  enableOfflineMode: boolean;
}

export const SUPPORTED_LANGUAGES: { code: LanguageCode | string; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export const BUSINESS_TYPES = [
  'Retail shop',
  'Wholesale business',
  'Distributor',
  'Manufacturer',
  'Service provider',
  'Online business',
  'Retail + Wholesale',
  'Other',
] as const;

export const BUSINESS_CATEGORIES = [
  'Grocery & Kirana',
  'Clothing & Fashion',
  'Electronics',
  'Medical & Pharmacy',
  'Hardware & Tools',
  'Books & Stationery',
  'Restaurant & Cafe',
  'Jewellery & Watches',
  'Furniture',
  'Wholesale & Distribution',
  'Salon & Services',
  'Other Retail',
];

export const DEFAULT_BUSINESS_SETUP: BusinessSetupData = {
  ownerName: '',
  mobileNumber: '',
  otpVerified: false,
  email: '',
  preferredLanguage: 'en',
  password: '',
  accountRole: 'Owner',

  shopName: '',
  businessType: 'Retail shop',
  shopMobile: '',
  shopAddress: '',
  city: '',
  state: 'Gujarat',
  pinCode: '',
  country: 'India',

  categories: ['Grocery & Kirana'],

  gstStatus: 'Not registered',
  gstin: '',
  pan: '',
  udyamNumber: '',
  fssaiLicence: '',
  drugLicence: '',

  invoiceFormat: 'Estimate / quotation',
  invoicePrefix: 'SV',
  startingInvoiceNo: '101',
  defaultCurrency: '₹ INR',
  defaultTaxMode: 'Inclusive',
  paymentMethods: ['Cash', 'UPI', 'Udhaar'],

  upiId: '',
  bankAccountName: '',
  bankAccountNumber: '',
  ifscCode: '',
  bankName: '',
  acceptsCash: true,
  acceptsCard: true,
  udhaarEnabled: true,

  maintainStock: true,
  productCountRange: '100–500',
  useBarcodes: true,
  sellByWeight: true,
  trackExpiry: false,
  trackBatches: false,
  purchaseFromSuppliers: true,
  lowStockAlerts: true,
  multipleWarehouses: false,

  employeeCount: '1-3',
  branchCount: '1',
  openingTime: '09:00 AM',
  closingTime: '09:00 PM',
  weeklyHoliday: 'None',

  hasExcelProducts: false,
  enableCloudBackup: true,
  enableOfflineMode: true,
};

export const BUSINESS_SETUP_STORAGE_KEY = 'smartvyapaar_business_profile';

export function saveBusinessProfile(data: BusinessSetupData, storage?: Pick<Storage, 'setItem'> | null): void {
  if (!storage) return;
  try {
    storage.setItem(BUSINESS_SETUP_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadBusinessProfile(storage?: Pick<Storage, 'getItem'> | null): BusinessSetupData | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(BUSINESS_SETUP_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BusinessSetupData;
  } catch {
    return null;
  }
}
