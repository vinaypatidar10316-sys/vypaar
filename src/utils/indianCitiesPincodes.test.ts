import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INDIAN_CITIES,
  filterIndianCities,
  isValidIndianPincode,
  lookupIndianPincode,
} from './indianCitiesPincodes';

test('INDIAN_CITIES includes cities across all Indian regions', () => {
  assert.ok(INDIAN_CITIES.length > 250);
  assert.ok(INDIAN_CITIES.some((c) => c.city === 'Ahmedabad' && c.state === 'Gujarat'));
  assert.ok(INDIAN_CITIES.some((c) => c.city === 'Mumbai' && c.state === 'Maharashtra'));
  assert.ok(INDIAN_CITIES.some((c) => c.city === 'Indore' && c.state === 'Madhya Pradesh'));
  assert.ok(INDIAN_CITIES.some((c) => c.city === 'Bengaluru' && c.state === 'Karnataka'));
  assert.ok(INDIAN_CITIES.some((c) => c.city === 'Port Blair' && c.state === 'Andaman & Nicobar Islands'));
});

test('isValidIndianPincode validates 6-digit Indian PIN codes', () => {
  assert.equal(isValidIndianPincode('380001'), true);
  assert.equal(isValidIndianPincode('400001'), true);
  assert.equal(isValidIndianPincode('012345'), false);
  assert.equal(isValidIndianPincode('38001'), false);
});

test('lookupIndianPincode auto-fills Indian city and state from PIN code', () => {
  assert.deepEqual(lookupIndianPincode('380015'), {
    city: 'Ahmedabad',
    state: 'Gujarat',
    source: 'prefix',
  });
  assert.deepEqual(lookupIndianPincode('400001'), {
    city: 'Mumbai',
    state: 'Maharashtra',
    source: 'prefix',
  });
  assert.deepEqual(lookupIndianPincode('201301'), {
    city: 'Noida',
    state: 'Uttar Pradesh',
    source: 'exact',
  });
  assert.deepEqual(lookupIndianPincode('560034'), {
    city: 'Bengaluru',
    state: 'Karnataka',
    source: 'prefix',
  });
  assert.equal(lookupIndianPincode('12345'), null);
});

test('filterIndianCities filters by city or state name', () => {
  const gujarat = filterIndianCities('Surat');
  assert.equal(gujarat[0]?.city, 'Surat');
  assert.equal(gujarat[0]?.state, 'Gujarat');
});
