import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AUTH_COPY,
  clearActiveShop,
  loginShopAccount,
  normalizePhone,
  readActiveShop,
  readStoredAccounts,
  registerShopAccount,
} from './shopAuth';

function createMemoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
  };
}

test('normalizePhone strips +91 and non-digits to 10 digits', () => {
  assert.equal(normalizePhone('+91 98765 43210'), '9876543210');
  assert.equal(normalizePhone('09876543210'), '9876543210');
  assert.equal(normalizePhone('98765-43210'), '9876543210');
});

test('registerShopAccount validates fields and prevents duplicate phone numbers', () => {
  const storage = createMemoryStorage();

  const badPhone = registerShopAccount(
    {
      shopName: 'Patel Store',
      ownerName: 'Ramesh Patel',
      phone: '12345',
      preferredLanguage: 'gu',
    },
    storage,
  );
  assert.equal(badPhone.ok, false);
  assert.equal(badPhone.errorCode, 'invalid_phone');

  const created = registerShopAccount(
    {
      shopName: 'Patel Kirana Store',
      ownerName: 'Ramesh Patel',
      phone: '9876543210',
      preferredLanguage: 'gu',
    },
    storage,
  );
  assert.equal(created.ok, true);
  assert.equal(created.account?.shopName, 'Patel Kirana Store');
  assert.equal(readStoredAccounts(storage).length, 1);
  assert.equal(readActiveShop(storage)?.phone, '9876543210');

  const duplicate = registerShopAccount(
    {
      shopName: 'Patel Kirana Store',
      ownerName: 'Ramesh Patel',
      phone: '+91 9876543210',
      preferredLanguage: 'gu',
    },
    storage,
  );
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.errorCode, 'duplicate_phone');
});

test('loginShopAccount authenticates existing shop owner and handles missing account', () => {
  const storage = createMemoryStorage();
  registerShopAccount(
    {
      shopName: 'Shree Laxmi Traders',
      ownerName: 'Vikram Shah',
      phone: '9988776655',
      preferredLanguage: 'hi',
    },
    storage,
  );
  clearActiveShop(storage);
  assert.equal(readActiveShop(storage), null);

  const missing = loginShopAccount({ phone: '9111111111' }, storage);
  assert.equal(missing.ok, false);
  assert.equal(missing.errorCode, 'account_not_found');

  const loggedIn = loginShopAccount({ phone: '9988776655' }, storage);
  assert.equal(loggedIn.ok, true);
  assert.equal(loggedIn.account?.ownerName, 'Vikram Shah');
  assert.equal(readActiveShop(storage)?.shopName, 'Shree Laxmi Traders');
});

test('AUTH_COPY provides complete localized strings for en, hi, and gu', () => {
  for (const code of ['en', 'hi', 'gu'] as const) {
    const c = AUTH_COPY[code];
    assert.ok(c.signupTab.length > 0);
    assert.ok(c.loginTab.length > 0);
    assert.ok(c.signupCta.length > 0);
    assert.ok(c.partnerTagline.length > 0);
    assert.ok(c.loginCta.length > 0);
    assert.ok(c.errors.duplicate_phone.length > 0);
    assert.ok(c.errors.account_not_found.length > 0);
  }
});
