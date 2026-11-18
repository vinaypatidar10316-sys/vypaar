export type LanguageCode = 'en' | 'hi' | 'gu';

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
export const LAUNCH_DURATION_MS = 3000;
export const LANGUAGE_STORAGE_KEY = 'smartvyapaar_language';

export interface LanguageOption {
  code: LanguageCode;
  nativeLabel: string;
  englishLabel: string;
  scriptMark: string;
  descriptor: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    nativeLabel: 'English',
    englishLabel: 'English',
    scriptMark: 'Aa',
    descriptor: 'Default · Billing & GST Ready',
  },
  {
    code: 'hi',
    nativeLabel: 'हिन्दी',
    englishLabel: 'Hindi',
    scriptMark: 'अ',
    descriptor: 'Hindi · बिलिंग और स्टॉक',
  },
  {
    code: 'gu',
    nativeLabel: 'ગુજરાતી',
    englishLabel: 'Gujarati',
    scriptMark: 'ગુ',
    descriptor: 'Gujarati · બિલિંગ અને સ્ટોક',
  },
];

export interface LocalizedScreenCopy {
  heading: string;
  subheading: string;
  previewLine: string;
  ctaLabel: string;
  savedConfirmation: string;
}

export const LANGUAGE_COPY: Record<LanguageCode, LocalizedScreenCopy> = {
  en: {
    heading: 'Choose Your Language',
    subheading: 'Select your preferred language for billing, inventory, and store insights.',
    previewLine: 'Namaste — Your SMARTVyapaar counter is ready in English.',
    ctaLabel: 'Continue in English',
    savedConfirmation: 'Language preference saved: English',
  },
  hi: {
    heading: 'अपनी भाषा चुनें',
    subheading: 'बिलिंग, स्टॉक और व्यापार रिपोर्ट के लिए अपनी पसंदीदा भाषा चुनें।',
    previewLine: 'नमस्ते — आपका SMARTVyapaar काउंटर हिन्दी में तैयार है।',
    ctaLabel: 'हिन्दी में जारी रखें',
    savedConfirmation: 'भाषा सहेजी गई: हिन्दी',
  },
  gu: {
    heading: 'તમારી ભાષા પસંદ કરો',
    subheading: 'બિલિંગ, સ્ટોક અને વ્યાપાર માહિતી માટે તમારી પસંદગીની ભાષા પસંદ કરો.',
    previewLine: 'નમસ્તે — તમારું SMARTVyapaar કાઉન્ટર ગુજરાતીમાં તૈયાર છે.',
    ctaLabel: 'ગુજરાતીમાં આગળ વધો',
    savedConfirmation: 'ભાષા સાચવવામાં આવી: ગુજરાતી',
  },
};

export function resolveLanguageCode(value?: string | null): LanguageCode {
  if (value === 'en' || value === 'hi' || value === 'gu') {
    return value;
  }
  return DEFAULT_LANGUAGE;
}

export function loadSavedLanguage(
  storage?: Pick<Storage, 'getItem'> | null,
): LanguageCode {
  if (!storage) return DEFAULT_LANGUAGE;
  try {
    return resolveLanguageCode(storage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export const LANGUAGE_CHANGE_EVENT = 'smartvyapaar_language_changed';

export function saveLanguagePreference(
  code: LanguageCode,
  storage?: Pick<Storage, 'setItem'> | null,
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(LANGUAGE_STORAGE_KEY, code);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: code }));
      } catch {
        // Ignore custom event dispatch failure in non-standard runtimes
      }
    }
    return true;
  } catch {
    return false;
  }
}

