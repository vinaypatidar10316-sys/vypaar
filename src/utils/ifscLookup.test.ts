import test from 'node:test';
import assert from 'node:assert/strict';
import { lookupIfscLocal } from './ifscLookup';

test('lookupIfscLocal resolves known Indian IFSC codes and bank codes', () => {
  const hdfc = lookupIfscLocal('HDFC0001234');
  assert.ok(hdfc);
  assert.equal(hdfc.bank, 'HDFC Bank');
  assert.equal(hdfc.branch, 'Navrangpura Main Branch');

  const sbi = lookupIfscLocal('sbin0000691');
  assert.ok(sbi);
  assert.equal(sbi.ifsc, 'SBIN0000691');
  assert.equal(sbi.bank, 'State Bank of India');
  assert.equal(sbi.branch, 'Sansad Marg Main Branch');

  const axis = lookupIfscLocal('UTIB0004321');
  assert.ok(axis);
  assert.equal(axis.bank, 'Axis Bank');
  assert.match(axis.branch, /004321/);

  assert.equal(lookupIfscLocal('INVALID'), null);
  assert.equal(lookupIfscLocal('HDFC1001234'), null);
});
