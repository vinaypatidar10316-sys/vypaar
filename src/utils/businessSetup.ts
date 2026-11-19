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
  bankBranch?: string;
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

  gstStatus: 'GST registered',
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
  bankBranch: '',
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

/**
 * Validates Indian Income Tax PAN format: AAAAA0000A
 * - Chars 1-3: AAA-ZZZ
 * - Char 4: Holder status (P, C, H, F, A, T, B, L, J, G)
 * - Char 5: First letter of surname/entity
 * - Chars 6-9: Sequential digits 0001-9999
 * - Char 10: Alphabetic check digit
 */
export function isValidIndianPan(rawPan: string): boolean {
  const pan = rawPan.trim().toUpperCase();
  return /^[A-Z]{3}[PCHFATBLJG][A-Z](?!0000)\d{4}[A-Z]$/.test(pan);
}

/**
 * Validates Indian 15-character GSTIN format: 00AAAAA0000A0Z0
 * - Chars 1-2: State code (01-38, 97, 99)
 * - Chars 3-12: Valid 10-character PAN
 * - Char 13: Entity number (1-9, A-Z)
 * - Char 14: Default letter Z
 * - Char 15: Alphanumeric check code (0-9, A-Z)
 */
export function isValidIndianGstin(rawGstin: string): boolean {
  const gstin = rawGstin.trim().toUpperCase();
  return /^(0[1-9]|[12]\d|3[0-8]|97|99)[A-Z]{3}[PCHFATBLJG][A-Z](?!0000)\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
    gstin,
  );
}

export function isValidUpiId(rawUpi: string): boolean {
  const upi = rawUpi.trim();
  return /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z][a-zA-Z0-9]{1,63}$/.test(upi);
}

export function isValidIfscCode(rawIfsc: string): boolean {
  const ifsc = rawIfsc.trim().toUpperCase();
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
}

export function isValidBankAccountNumber(rawAccount: string): boolean {
  const acc = rawAccount.replace(/\s+/g, '');
  return /^\d{9,18}$/.test(acc);
}

/**
 * Returns true when a partially typed PAN already violates the AAAAA0000A format.
 */
export function hasInvalidPanInputPrefix(rawPan: string): boolean {
  const pan = rawPan.trim().toUpperCase();
  if (!pan) return false;
  if (/[^A-Z]/.test(pan.slice(0, 3))) return true;
  if (pan.length >= 4 && !/[PCHFATBLJG]/.test(pan[3])) return true;
  if (pan.length >= 5 && /[^A-Z]/.test(pan[4])) return true;
  if (pan.length >= 6 && /[^0-9]/.test(pan.slice(5, 9))) return true;
  if (pan.length >= 9 && pan.slice(5, 9) === '0000') return true;
  if (pan.length >= 10) return !isValidIndianPan(pan);
  return false;
}

/**
 * Returns true when a partially typed GSTIN already violates the 00AAAAA0000A0Z0 format.
 */
export function hasInvalidGstinInputPrefix(rawGstin: string): boolean {
  const gstin = rawGstin.trim().toUpperCase();
  if (!gstin) return false;
  if (/[^0-9]/.test(gstin.slice(0, 2))) return true;
  if (gstin.length >= 2 && !/^(0[1-9]|[12]\d|3[0-8]|97|99)$/.test(gstin.slice(0, 2))) {
    return true;
  }
  if (gstin.length > 2 && hasInvalidPanInputPrefix(gstin.slice(2, 12))) return true;
  if (gstin.length >= 13 && !/[1-9A-Z]/.test(gstin[12])) return true;
  if (gstin.length >= 14 && gstin[13] !== 'Z') return true;
  if (gstin.length >= 15) return !isValidIndianGstin(gstin);
  return false;
}

/**
 * Returns true when a partially typed IFSC code already violates AAAA0000000 / AAAA0AAAAAA.
 */
export function hasInvalidIfscInputPrefix(rawIfsc: string): boolean {
  const ifsc = rawIfsc.trim().toUpperCase();
  if (!ifsc) return false;
  if (/[^A-Z]/.test(ifsc.slice(0, 4))) return true;
  if (ifsc.length >= 5 && ifsc[4] !== '0') return true;
  if (ifsc.length >= 11) return !isValidIfscCode(ifsc);
  return false;
}

/**
 * Masks all characters before '@' in a UPI ID except the last 5 characters.
 */
export function maskUpiId(rawUpi: string): string {
  const upi = rawUpi.trim();
  const atIndex = upi.indexOf('@');
  if (atIndex === -1) return upi;
  const localPart = upi.slice(0, atIndex);
  const handlePart = upi.slice(atIndex);
  if (localPart.length <= 5) {
    return `${localPart}${handlePart}`;
  }
  const maskedCount = localPart.length - 5;
  return `${'•'.repeat(maskedCount)}${localPart.slice(-5)}${handlePart}`;
}

