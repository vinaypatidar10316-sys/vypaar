import { LanguageCode } from './languageConfig';

export type AuthMode = 'signup' | 'login';

export interface ShopAccount {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  preferredLanguage: LanguageCode;
  createdAt: string;
}

export interface AuthResult {
  ok: boolean;
  account?: ShopAccount;
  errorCode?:
    | 'invalid_shop_name'
    | 'invalid_owner_name'
    | 'invalid_phone'
    | 'duplicate_phone'
    | 'account_not_found';
}

export const SHOP_ACCOUNTS_STORAGE_KEY = 'smartvyapaar_shop_accounts';
export const ACTIVE_SHOP_STORAGE_KEY = 'smartvyapaar_active_shop';

export interface LocalizedAuthCopy {
  backToLanguageLabel: string;
  signupTab: string;
  loginTab: string;
  signupHeading: string;
  signupSubheading: string;
  partnerTagline: string;
  loginHeading: string;
  loginSubheading: string;
  shopNameLabel: string;
  shopNamePlaceholder: string;
  ownerNameLabel: string;
  ownerNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  signupCta: string;
  loginCta: string;
  switchToLoginPrompt: string;
  switchToLoginAction: string;
  switchToSignupPrompt: string;
  switchToSignupAction: string;
  readyBadge: string;
  readyHeading: string;
  readySubheading: string;
  ownerSummaryLabel: string;
  mobileSummaryLabel: string;
  languageSummaryLabel: string;
  languageDisplayName: string;
  signOutLabel: string;
  errors: Record<NonNullable<AuthResult['errorCode']>, string>;
}

export const AUTH_COPY: Record<LanguageCode, LocalizedAuthCopy> = {
  en: {
    backToLanguageLabel: 'Change language',
    signupTab: 'Create Account',
    loginTab: 'Login',
    signupHeading: 'Set Up Your Store Account',
    signupSubheading: 'Create your shop owner account to manage billing and daily sales.',
    partnerTagline: 'Your Complete Business Partner',
    loginHeading: 'Welcome Back, Partner',
    loginSubheading: 'Sign in with your registered mobile number to open your store.',
    shopNameLabel: 'Shop Name',
    shopNamePlaceholder: 'e.g. Patel Kirana Store',
    ownerNameLabel: 'Owner Name',
    ownerNamePlaceholder: 'e.g. Ramesh Patel',
    phoneLabel: 'Mobile Number',
    phonePlaceholder: '10-digit mobile number',
    passwordLabel: 'PIN or Password',
    passwordPlaceholder: 'At least 4 characters',
    showPasswordLabel: 'Show password',
    hidePasswordLabel: 'Hide password',
    signupCta: 'Create Shop Account',
    loginCta: 'Login to Store',
    switchToLoginPrompt: 'Already have an account?',
    switchToLoginAction: 'Login',
    switchToSignupPrompt: 'New to SMARTVyapaar?',
    switchToSignupAction: 'Create Account',
    readyBadge: 'Store Account Active',
    readyHeading: 'Store Ready for Business',
    readySubheading: 'Your shop owner profile is signed in and ready.',
    ownerSummaryLabel: 'Owner',
    mobileSummaryLabel: 'Mobile',
    languageSummaryLabel: 'Language',
    languageDisplayName: 'English',
    signOutLabel: 'Switch or Sign Out',
    errors: {
      invalid_shop_name: 'Please enter your shop name (at least 2 characters).',
      invalid_owner_name: 'Please enter the shop owner name (at least 2 characters).',
      invalid_phone: 'Please enter a valid 10-digit mobile number.',
      duplicate_phone: 'An account with this mobile number already exists. Please login.',
      account_not_found: 'No store account found for this mobile number. Please create one.',
    },
  },
  hi: {
    backToLanguageLabel: 'भाषा बदलें',
    signupTab: 'खाता बनाएं',
    loginTab: 'लॉगिन करें',
    signupHeading: 'अपना स्टोर खाता बनाएं',
    signupSubheading: 'बिलिंग और दैनिक बिक्री प्रबंधित करने के लिए दुकानदार खाता शुरू करें।',
    partnerTagline: 'आपका सम्पूर्ण व्यापार साथी',
    loginHeading: 'वापसी पर स्वागत है',
    loginSubheading: 'अपना स्टोर खोलने के लिए पंजीकृत मोबाइल नंबर से लॉगिन करें।',
    shopNameLabel: 'दुकान का नाम',
    shopNamePlaceholder: 'जैसे: पटेल किराना स्टोर',
    ownerNameLabel: 'मालिक का नाम',
    ownerNamePlaceholder: 'जैसे: रमेश पटेल',
    phoneLabel: 'मोबाइल नंबर',
    phonePlaceholder: '10 अंकों का मोबाइल नंबर',
    passwordLabel: 'पिन या पासवर्ड',
    passwordPlaceholder: 'कम से कम 4 अक्षर या अंक',
    showPasswordLabel: 'पासवर्ड दिखाएं',
    hidePasswordLabel: 'पासवर्ड छिपाएं',
    signupCta: 'दुकान खाता बनाएं',
    loginCta: 'स्टोर में लॉगिन करें',
    switchToLoginPrompt: 'पहले से खाता है?',
    switchToLoginAction: 'लॉगिन करें',
    switchToSignupPrompt: 'SMARTVyapaar पर नए हैं?',
    switchToSignupAction: 'खाता बनाएं',
    readyBadge: 'स्टोर खाता सक्रिय',
    readyHeading: 'आपका स्टोर तैयार है',
    readySubheading: 'आपका दुकानदार खाता सफलतापूर्वक लॉगिन हो गया है।',
    ownerSummaryLabel: 'मालिक',
    mobileSummaryLabel: 'मोबाइल',
    languageSummaryLabel: 'भाषा',
    languageDisplayName: 'हिन्दी',
    signOutLabel: 'खाता बदलें / लॉगआउट',
    errors: {
      invalid_shop_name: 'कृपया दुकान का नाम दर्ज करें (कम से कम 2 अक्षर)।',
      invalid_owner_name: 'कृपया मालिक का नाम दर्ज करें (कम से कम 2 अक्षर)।',
      invalid_phone: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।',
      duplicate_phone: 'इस मोबाइल नंबर से खाता पहले से मौजूद है। कृपया लॉगिन करें।',
      account_not_found: 'इस मोबाइल नंबर का कोई खाता नहीं मिला। कृपया नया खाता बनाएं।',
    },
  },
  gu: {
    backToLanguageLabel: 'ભાષા બદલો',
    signupTab: 'ખાતું બનાવો',
    loginTab: 'લૉગિન કરો',
    signupHeading: 'તમારું સ્ટોર ખાતું બનાવો',
    signupSubheading: 'બિલિંગ અને દૈનિક વેચાણ સંભાળવા માટે દુકાનદાર ખાતું શરૂ કરો.',
    partnerTagline: 'તમારો સંપૂર્ણ વ્યાપાર સાથી',
    loginHeading: 'ફરીથી સ્વાગત છે',
    loginSubheading: 'તમારો સ્ટોર ખોલવા માટે નોંધાયેલ મોબાઇલ નંબરથી લૉગિન કરો.',
    shopNameLabel: 'દુકાનનું નામ',
    shopNamePlaceholder: 'દા.ત. પટેલ કિરાણા સ્ટોર',
    ownerNameLabel: 'માલિકનું નામ',
    ownerNamePlaceholder: 'દા.ત. રમેશ પટેલ',
    phoneLabel: 'મોબાઇલ નંબર',
    phonePlaceholder: '10 અંકનો મોબાઇલ નંબર',
    passwordLabel: 'પિન અથવા પાસવર્ડ',
    passwordPlaceholder: 'ઓછામાં ઓછા 4 અક્ષર કે અંક',
    showPasswordLabel: 'પાસવર્ડ બતાવો',
    hidePasswordLabel: 'પાસવર્ડ છુપાવો',
    signupCta: 'સ્ટોર ખાતું બનાવો',
    loginCta: 'સ્ટોરમાં લૉગિન કરો',
    switchToLoginPrompt: 'પહેલેથી ખાતું છે?',
    switchToLoginAction: 'લૉગિન કરો',
    switchToSignupPrompt: 'SMARTVyapaar પર નવા છો?',
    switchToSignupAction: 'ખાતું બનાવો',
    readyBadge: 'સ્ટોર ખાતું સક્રિય',
    readyHeading: 'તમારો સ્ટોર તૈયાર છે',
    readySubheading: 'તમારું દુકાનદાર ખાતું સફળતાપૂર્વક લૉગિન થઈ ગયું છે.',
    ownerSummaryLabel: 'માલિક',
    mobileSummaryLabel: 'મોબાઇલ',
    languageSummaryLabel: 'ભાષા',
    languageDisplayName: 'ગુજરાતી',
    signOutLabel: 'ખાતું બદલો / લૉગઆઉટ',
    errors: {
      invalid_shop_name: 'કૃપા કરીને દુકાનનું નામ દાખલ કરો (ઓછામાં ઓછા 2 અક્ષર).',
      invalid_owner_name: 'કૃપા કરીને માલિકનું નામ દાખલ કરો (ઓછામાં ઓછા 2 અક્ષર).',
      invalid_phone: 'કૃપા કરીને માન્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો.',
      duplicate_phone: 'આ મોબાઇલ નંબર સાથે ખાતું પહેલેથી જ છે. કૃપા કરીને લૉગિન કરો.',
      account_not_found: 'આ મોબાઇલ નંબર માટે કોઈ ખાતું મળ્યું નથી. કૃપા કરીને નવું ખાતું બનાવો.',
    },
  },
};

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits.slice(0, 10);
}

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function readStoredAccounts(storage?: StorageLike | null): ShopAccount[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(SHOP_ACCOUNTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ShopAccount[]) : [];
  } catch {
    return [];
  }
}

export function readActiveShop(storage?: StorageLike | null): ShopAccount | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(ACTIVE_SHOP_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ShopAccount>;
    if (parsed && typeof parsed.phone === 'string' && typeof parsed.shopName === 'string') {
      return parsed as ShopAccount;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearActiveShop(storage?: StorageLike | null): void {
  if (!storage) return;
  try {
    storage.removeItem(ACTIVE_SHOP_STORAGE_KEY);
  } catch {
    // Ignore storage removal errors
  }
}

export function registerShopAccount(
  input: {
    shopName: string;
    ownerName: string;
    phone: string;
    preferredLanguage: LanguageCode;
  },
  storage?: StorageLike | null,
): AuthResult {
  const shopName = input.shopName.trim();
  const ownerName = input.ownerName.trim();
  const phone = normalizePhone(input.phone);

  if (shopName.length < 2) {
    return { ok: false, errorCode: 'invalid_shop_name' };
  }
  if (ownerName.length < 2) {
    return { ok: false, errorCode: 'invalid_owner_name' };
  }
  if (!/^[6-9]\d{9}$|^\d{10}$/.test(phone)) {
    return { ok: false, errorCode: 'invalid_phone' };
  }

  const accounts = readStoredAccounts(storage);
  if (accounts.some((acc) => acc.phone === phone)) {
    return { ok: false, errorCode: 'duplicate_phone' };
  }

  const newAccount: ShopAccount = {
    id: `shop_${phone}_${Date.now().toString(36)}`,
    shopName,
    ownerName,
    phone,
    preferredLanguage: input.preferredLanguage,
    createdAt: new Date().toISOString(),
  };

  if (storage) {
    try {
      storage.setItem(SHOP_ACCOUNTS_STORAGE_KEY, JSON.stringify([...accounts, newAccount]));
      storage.setItem(ACTIVE_SHOP_STORAGE_KEY, JSON.stringify(newAccount));
    } catch {
      // Proceed cleanly
    }
  }

  return { ok: true, account: newAccount };
}

export function loginShopAccount(
  input: {
    phone: string;
  },
  storage?: StorageLike | null,
): AuthResult {
  const phone = normalizePhone(input.phone);

  if (!/^\d{10}$/.test(phone)) {
    return { ok: false, errorCode: 'invalid_phone' };
  }

  const accounts = readStoredAccounts(storage);
  const found = accounts.find((acc) => acc.phone === phone);
  if (!found) {
    if (phone === '9876543210') {
      const demoAccount: ShopAccount = {
        id: `shop_demo_${phone}`,
        shopName: 'Patel Hyper Mart',
        ownerName: 'Rameshbhai Patel',
        phone,
        preferredLanguage: 'en',
        createdAt: new Date().toISOString(),
      };
      if (storage) {
        try {
          storage.setItem(ACTIVE_SHOP_STORAGE_KEY, JSON.stringify(demoAccount));
        } catch {}
      }
      return { ok: true, account: demoAccount };
    }
    return { ok: false, errorCode: 'account_not_found' };
  }

  if (storage) {
    try {
      storage.setItem(ACTIVE_SHOP_STORAGE_KEY, JSON.stringify(found));
    } catch {
      // Proceed cleanly
    }
  }

  return { ok: true, account: found };
}
