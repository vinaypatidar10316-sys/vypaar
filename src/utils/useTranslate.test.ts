import test from 'node:test';
import assert from 'node:assert/strict';
import { translate } from './useTranslate';
import { TRANSLATIONS } from './translations';
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  LanguageCode,
  loadSavedLanguage,
  saveLanguagePreference,
} from './languageConfig';

test('translate resolves nested keys across all supported languages', () => {
  assert.equal(translate('dashboard.tabs.pos', 'en'), 'Billing & POS');
  assert.equal(translate('dashboard.tabs.pos', 'hi'), 'बिलिंग और पीओएस');
  assert.equal(translate('dashboard.tabs.pos', 'gu'), 'બિલિંગ અને પીઓએસ');

  assert.equal(translate('dashboard.pos.createNewBill', 'en'), 'Create New Bill');
  assert.equal(translate('dashboard.pos.createNewBill', 'hi'), 'नया बिल बनाएं');
  assert.equal(translate('dashboard.pos.createNewBill', 'gu'), 'નવું બિલ બનાવો');
});

test('translate maps common English phrases via ENGLISH_PHRASE_MAP', () => {
  assert.equal(translate('Billing & POS', 'hi'), 'बिलिंग और पीओएस');
  assert.equal(translate('Create New Bill', 'gu'), 'નવું બિલ બનાવો');
  assert.equal(translate('Store Active', 'hi'), 'स्टोर सक्रिय');
});

test('translate correctly interpolates dynamic parameters like {range}', () => {
  const enResult = translate('dashboard.inventory.desc', 'en', { range: '500–5,000' });
  assert.ok(enResult.includes('500–5,000'));
  assert.ok(!enResult.includes('{range}'));

  const hiResult = translate('dashboard.inventory.desc', 'hi', { range: '100–500' });
  assert.ok(hiResult.includes('100–500'));
  assert.ok(!hiResult.includes('{range}'));
});

test('translate provides custom fallback when key is missing', () => {
  assert.equal(translate('non.existent.key', 'en', 'Custom Fallback'), 'Custom Fallback');
  assert.equal(translate('non.existent.key', 'en'), 'non.existent.key');
});

test('all required dashboard keys are populated in TRANSLATIONS for en, hi, and gu', () => {
  const languages: LanguageCode[] = ['en', 'hi', 'gu'];
  for (const lang of languages) {
    const d = TRANSLATIONS[lang].dashboard;
    assert.ok(d.shopDefault.length > 0);
    assert.ok(d.owner.length > 0);
    assert.ok(d.storeActive.length > 0);
    assert.ok(d.restartTooltip.length > 0);
    assert.ok(d.tabs.pos.length > 0);
    assert.ok(d.tabs.inventory.length > 0);
    assert.ok(d.tabs.staff.length > 0);
    assert.ok(d.tabs.settings.length > 0);
    assert.ok(d.pos.quickInvoice.length > 0);
    assert.ok(d.pos.invoicePrefix.length > 0);
    assert.ok(d.pos.gstStatus.length > 0);
    assert.ok(d.pos.createNewBill.length > 0);
    assert.ok(d.pos.businessSummary.length > 0);
    assert.ok(d.pos.category.length > 0);
    assert.ok(d.pos.type.length > 0);
    assert.ok(d.pos.city.length > 0);
    assert.ok(d.pos.notSpecified.length > 0);
    assert.ok(d.pos.language.length > 0);
    assert.ok(d.inventory.title.length > 0);
    assert.ok(d.inventory.desc.length > 0);
    assert.ok(d.staff.title.length > 0);
    assert.ok(d.staff.desc.length > 0);
    assert.ok(d.settings.title.length > 0);
    assert.ok(d.settings.desc.length > 0);
  }
});

test('saveLanguagePreference updates storage and constant matches', () => {
  assert.equal(LANGUAGE_CHANGE_EVENT, 'smartvyapaar_language_changed');
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
  saveLanguagePreference('gu', mockStorage);
  assert.equal(store.get(LANGUAGE_STORAGE_KEY), 'gu');
  assert.equal(loadSavedLanguage(mockStorage), 'gu');
});
