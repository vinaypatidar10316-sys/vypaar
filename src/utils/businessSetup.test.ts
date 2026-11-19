import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hasInvalidGstinInputPrefix,
  hasInvalidIfscInputPrefix,
  hasInvalidPanInputPrefix,
  isValidBankAccountNumber,
  isValidIfscCode,
  isValidIndianGstin,
  isValidIndianPan,
  isValidUpiId,
  maskUpiId,
} from './businessSetup';

test('isValidIndianPan enforces Income Tax AAAAA0000A structure', () => {
  assert.equal(isValidIndianPan('ABCPE1234F'), true);
  assert.equal(isValidIndianPan('AAACB0001Z'), true);
  assert.equal(isValidIndianPan('AAACH9999K'), true);

  // Invalid 4th character (D is not a valid PAN holder status)
  assert.equal(isValidIndianPan('ABCDE1234F'), false);
  // Sequential numbers cannot be 0000
  assert.equal(isValidIndianPan('ABCPE0000F'), false);
  // Wrong length or wrong character positions
  assert.equal(isValidIndianPan('1BCPE1234F'), false);
  assert.equal(isValidIndianPan('ABCPE12345'), false);
  assert.equal(isValidIndianPan('ABCPE123F'), false);

  assert.equal(hasInvalidPanInputPrefix('ABCP'), false);
  assert.equal(hasInvalidPanInputPrefix('ABCZ'), true);
  assert.equal(hasInvalidPanInputPrefix('1BC'), true);
  assert.equal(hasInvalidPanInputPrefix('ABCPE0000'), true);
});

test('isValidIndianGstin enforces 15-char 00AAAAA0000A0Z0 structure', () => {
  assert.equal(isValidIndianGstin('24AABCP1234A1Z5'), true);
  assert.equal(isValidIndianGstin('27AABCU9603R1ZM'), true);
  assert.equal(isValidIndianGstin('23AAACH7409R1Z1'), true);
  assert.equal(isValidIndianGstin('07AAACR5055K1Z7'), true);

  // Invalid state code 00 or 45
  assert.equal(isValidIndianGstin('00AABCP1234A1Z5'), false);
  assert.equal(isValidIndianGstin('45AABCP1234A1Z5'), false);
  // Invalid embedded PAN (0000 digits)
  assert.equal(isValidIndianGstin('24AAAAA0000A1Z5'), false);
  // Entity number 0 is invalid (1-9, A-Z)
  assert.equal(isValidIndianGstin('24AABCP1234A0Z5'), false);
  // 14th character must be Z
  assert.equal(isValidIndianGstin('24AABCP1234A1X5'), false);
  // Wrong length
  assert.equal(isValidIndianGstin('24AABCP1234A1Z'), false);

  assert.equal(hasInvalidGstinInputPrefix('24AABCP'), false);
  assert.equal(hasInvalidGstinInputPrefix('00'), true);
  assert.equal(hasInvalidGstinInputPrefix('24AABCP1234A0'), true);
  assert.equal(hasInvalidGstinInputPrefix('24AABCP1234A1X'), true);
});

test('payment validation helpers validate UPI ID, IFSC code, and bank account numbers', () => {
  assert.equal(isValidUpiId('yourshop@upi'), true);
  assert.equal(isValidUpiId('9876543210@ybl'), true);
  assert.equal(isValidUpiId('patel.store@okhdfcbank'), true);
  assert.equal(isValidUpiId('shop_1@oksbi'), true);
  assert.equal(isValidUpiId('invalid-upi'), false);
  assert.equal(isValidUpiId('a@b'), false);
  assert.equal(isValidUpiId('shop@123'), false);

  assert.equal(isValidIfscCode('HDFC0001234'), true);
  assert.equal(isValidIfscCode('SBIN0000456'), true);
  assert.equal(isValidIfscCode('ICIC0AB1234'), true);
  assert.equal(isValidIfscCode('HDFC1001234'), false); // 5th char must be 0
  assert.equal(isValidIfscCode('12340001234'), false); // first 4 must be alphabetic
  assert.equal(isValidIfscCode('HDFC00012'), false);
  assert.equal(hasInvalidIfscInputPrefix('HDFC0'), false);
  assert.equal(hasInvalidIfscInputPrefix('HDFC1'), true);
  assert.equal(hasInvalidIfscInputPrefix('12'), true);

  assert.equal(isValidBankAccountNumber('123456789'), true); // 9 digits
  assert.equal(isValidBankAccountNumber('123456789012345678'), true); // 18 digits
  assert.equal(isValidBankAccountNumber('12345678'), false); // < 9 digits
  assert.equal(isValidBankAccountNumber('1234567890123456789'), false); // > 18 digits
});

test('maskUpiId hides all characters before @ except the last 5 characters', () => {
  assert.equal(maskUpiId('9876543210@okicici'), '•••••43210@okicici');
  assert.equal(maskUpiId('yourshop@upi'), '•••rshop@upi');
  assert.equal(maskUpiId('myshop@ybl'), '•yshop@ybl');
  assert.equal(maskUpiId('store@oksbi'), 'store@oksbi');
  assert.equal(maskUpiId('shop@upi'), 'shop@upi');
});

