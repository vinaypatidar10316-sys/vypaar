import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COPY,
  LANGUAGE_OPTIONS,
  LANGUAGE_STORAGE_KEY,
  LAUNCH_DURATION_MS,
  loadSavedLanguage,
  resolveLanguageCode,
  saveLanguagePreference,
} from './languageConfig';

test('default language is English and launch timer is 3000ms', () => {
  assert.equal(DEFAULT_LANGUAGE, 'en');
  assert.equal(LAUNCH_DURATION_MS, 3000);
});

test('includes English, Hindi, and Gujarati options with English first', () => {
  const codes = LANGUAGE_OPTIONS.map((opt) => opt.code);
  assert.deepEqual(codes, ['en', 'hi', 'gu']);
});

test('resolveLanguageCode accepts valid codes and falls back to English', () => {
  assert.equal(resolveLanguageCode('gu'), 'gu');
  assert.equal(resolveLanguageCode('hi'), 'hi');
  assert.equal(resolveLanguageCode('en'), 'en');
  assert.equal(resolveLanguageCode(null), 'en');
  assert.equal(resolveLanguageCode(undefined), 'en');
  assert.equal(resolveLanguageCode('fr'), 'en');
});

test('localized copy exists and is non-empty for all languages', () => {
  for (const code of ['en', 'hi', 'gu'] as const) {
    const copy = LANGUAGE_COPY[code];
    assert.ok(copy.heading.length > 0);
    assert.ok(copy.subheading.length > 0);
    assert.ok(copy.ctaLabel.length > 0);
    assert.ok(copy.savedConfirmation.length > 0);
  }
});

test('saveLanguagePreference and loadSavedLanguage round-trip and handle missing/invalid values', () => {
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };

  assert.equal(loadSavedLanguage(mockStorage), 'en');
  assert.equal(saveLanguagePreference('gu', mockStorage), true);
  assert.equal(store.get(LANGUAGE_STORAGE_KEY), 'gu');
  assert.equal(loadSavedLanguage(mockStorage), 'gu');

  store.set(LANGUAGE_STORAGE_KEY, 'unknown');
  assert.equal(loadSavedLanguage(mockStorage), 'en');
  assert.equal(loadSavedLanguage(null), 'en');
  assert.equal(saveLanguagePreference('hi', null), false);
});
