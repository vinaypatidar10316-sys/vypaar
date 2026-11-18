import { useCallback, useEffect, useState } from 'react';
import {
  LANGUAGE_CHANGE_EVENT,
  LanguageCode,
  loadSavedLanguage,
  saveLanguagePreference,
} from './languageConfig';
import {
  ENGLISH_PHRASE_MAP,
  TRANSLATIONS,
  TranslationsSchema,
} from './translations';

export interface UseTranslateReturn {
  language: LanguageCode;
  setLanguage: (newLang: LanguageCode) => void;
  t: (
    key: string,
    paramsOrFallback?: Record<string, string | number> | string,
    fallback?: string,
  ) => string;
  translations: TranslationsSchema;
}

/**
 * Resolves a nested property path from a dictionary object (e.g. 'dashboard.pos.quickInvoice')
 */
function getNestedValue(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Pure translation resolver for given language, key, and parameters.
 */
export function translate(
  key: string,
  language: LanguageCode,
  paramsOrFallback?: Record<string, string | number> | string,
  fallback?: string,
): string {
  let params: Record<string, string | number> | undefined;
  let customFallback: string | undefined = fallback;

  if (typeof paramsOrFallback === 'string') {
    customFallback = paramsOrFallback;
  } else if (paramsOrFallback && typeof paramsOrFallback === 'object') {
    params = paramsOrFallback;
  }

  // Check if key is a literal english phrase mapped to a key path
  const resolvedKey = ENGLISH_PHRASE_MAP[key] ?? key;

  // 1. Try resolving in requested language
  let text = getNestedValue(TRANSLATIONS[language], resolvedKey);

  // 2. Fallback to English dictionary
  if (!text && language !== 'en') {
    text = getNestedValue(TRANSLATIONS.en, resolvedKey);
  }

  // 3. Fallback to custom fallback or original key
  if (!text) {
    text = customFallback ?? key;
  }

  // 4. Interpolate parameters (e.g., {range})
  if (params && Object.keys(params).length > 0) {
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }
  }

  return text;
}

/**
 * Custom React hook that manages translations for the entire application.
 * Reads the selected language from localStorage and synchronizes with storage events
 * and language change notifications.
 */
export function useTranslate(preferredLanguage?: LanguageCode | null): UseTranslateReturn {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    if (preferredLanguage) return preferredLanguage;
    return loadSavedLanguage(typeof window !== 'undefined' ? window.localStorage : null);
  });

  // Sync if preferredLanguage prop changes
  useEffect(() => {
    if (preferredLanguage && preferredLanguage !== currentLang) {
      setCurrentLang(preferredLanguage);
    }
  }, [preferredLanguage]);

  // Synchronize with external changes to localStorage and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      if (!preferredLanguage) {
        const saved = loadSavedLanguage(
          typeof window !== 'undefined' ? window.localStorage : null,
        );
        setCurrentLang(saved);
      }
    };

    const handleCustomChange = (e: Event) => {
      if (!preferredLanguage) {
        const customEvt = e as CustomEvent<LanguageCode>;
        if (customEvt?.detail) {
          setCurrentLang(customEvt.detail);
        } else {
          handleStorageChange();
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener(LANGUAGE_CHANGE_EVENT, handleCustomChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleCustomChange);
      };
    }
  }, [preferredLanguage]);

  const setLanguage = useCallback((newLang: LanguageCode) => {
    saveLanguagePreference(
      newLang,
      typeof window !== 'undefined' ? window.localStorage : null,
    );
    setCurrentLang(newLang);
  }, []);

  const t = useCallback(
    (
      key: string,
      paramsOrFallback?: Record<string, string | number> | string,
      fallback?: string,
    ): string => {
      const activeLang = preferredLanguage ?? currentLang;
      return translate(key, activeLang, paramsOrFallback, fallback);
    },
    [preferredLanguage, currentLang],
  );

  return {
    language: preferredLanguage ?? currentLang,
    setLanguage,
    t,
    translations: TRANSLATIONS[preferredLanguage ?? currentLang],
  };
}
