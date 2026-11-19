import { LanguageCode } from './languageConfig';

export interface SetupLocalizedCopy {
  stepTitles: string[];
  ownerAccountHeading: string;
  ownerAccountSub: string;
  ownerNameLabel: string;
  ownerNamePlaceholder: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  sendOtp: string;
  resendOtp: string;
  verified: string;
  otpLabel: string;
  otpPlaceholder: string;
  verifyOtp: string;
  languageLabel: string;
  passwordLabel: string;
  passwordPlaceholder: string;

  shopDetailsHeading: string;
  shopDetailsSub: string;
  shopNameLabel: string;
  shopNamePlaceholder: string;
  businessTypeLabel: string;
  addressLabel: string;
  addressPlaceholder: string;
  pinLabel: string;
  pinPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  pinHint: string;

  categoryHeading: string;
  categorySub: string;

  legalHeading: string;
  legalSub: string;
  gstStatusLabel: string;
  gstRegisteredOption: string;
  gstNotRegisteredOption: string;
  gstinLabel: string;
  panLabel: string;

  paymentHeading: string;
  paymentSetupTag: string;
  paymentSub: string;
  upiSectionTitle: string;
  upiEnabledStatus: string;
  upiVerifiedStatus: string;
  upiIdLabel: string;
  upiIdPlaceholder: string;
  upiQrLabel: string;
  verifyUpiBtn: string;
  bankSectionTitle: string;
  bankNotConnectedStatus: string;
  bankConnectedStatus: string;
  accountHolderLabel: string;
  accountHolderPlaceholder: string;
  accountNumberLabel: string;
  accountNumberPlaceholder: string;
  ifscLabel: string;
  ifscPlaceholder: string;
  verifyBankBtn: string;

  readyHeading: string;
  readySub: string;
  openDashboard: string;
  saveAndContinue: string;
  back: string;
  alreadyHaveAccountPrompt: string;
  loginLinkAction: string;
}

export const SETUP_COPY: Record<LanguageCode, SetupLocalizedCopy> = {
  en: {
    stepTitles: [
      'Owner Account',
      'Shop & Location',
      'Business Category',
      'Legal & Tax (GST)',
      'Payment Settings',
      'Ready for Business',
    ],
    ownerAccountHeading: '1. Owner Account Details',
    ownerAccountSub: 'Required details to identify the store owner and secure your account.',
    ownerNameLabel: "Owner's Full Name *",
    ownerNamePlaceholder: 'e.g. Ramesh Patel',
    mobileLabel: 'Mobile Number *',
    mobilePlaceholder: '10-digit mobile number',
    emailLabel: 'Email ID *',
    emailPlaceholder: 'e.g. owner@yourshop.com',
    sendOtp: 'Send OTP',
    resendOtp: 'Resend OTP',
    verified: 'Verified ✓',
    otpLabel: 'Enter OTP',
    otpPlaceholder: 'e.g. 4829',
    verifyOtp: 'Verify OTP',
    languageLabel: 'Preferred Language',
    passwordLabel: 'Create PIN / Password *',
    passwordPlaceholder: 'At least 4 characters',

    shopDetailsHeading: '2. Business & Shop Details',
    shopDetailsSub: 'Enter your trade name, address, PIN code, and city.',
    shopNameLabel: 'Shop / Business Name *',
    shopNamePlaceholder: 'e.g. Shree Ram General Store',
    businessTypeLabel: 'Business Type *',
    addressLabel: 'Shop Address *',
    addressPlaceholder: 'Market Road, Opp. SBI Bank',
    pinLabel: 'PIN Code *',
    pinPlaceholder: '6-digit PIN',
    cityLabel: 'City *',
    cityPlaceholder: 'Select or search city',
    pinHint: 'Enter 6-digit PIN first to auto-fill city, or select from the list.',

    categoryHeading: '3. Business Category',
    categorySub: 'Select one or more categories that match your inventory and billing requirements.',

    legalHeading: '4. Legal & Tax Information',
    legalSub: 'GST registration status is mandatory. If not registered, PAN number is required.',
    gstStatusLabel: 'GST Registration Status *',
    gstRegisteredOption: 'GST Registration',
    gstNotRegisteredOption: 'Non Registration',
    gstinLabel: 'GSTIN (15-digit GST Number) *',
    panLabel: 'PAN Number *',

    paymentHeading: 'Payment Settings',
    paymentSetupTag: 'Setup',
    paymentSub: 'Configure how your shop receives payments.',
    upiSectionTitle: 'UPI Payments',
    upiEnabledStatus: 'Enabled',
    upiVerifiedStatus: 'Verified',
    upiIdLabel: 'UPI ID *',
    upiIdPlaceholder: 'yourshop@upi',
    upiQrLabel: 'UPI QR code',
    verifyUpiBtn: 'Verify UPI ID',
    bankSectionTitle: 'Bank Account',
    bankNotConnectedStatus: 'Not connected',
    bankConnectedStatus: 'Verified',
    accountHolderLabel: 'Account holder name *',
    accountHolderPlaceholder: 'e.g. Rameshbhai Patel',
    accountNumberLabel: 'Account number *',
    accountNumberPlaceholder: 'Enter bank account number',
    ifscLabel: 'IFSC code *',
    ifscPlaceholder: 'e.g. HDFC0001234',
    verifyBankBtn: 'Verify Bank Details',

    readyHeading: "You're Ready for Business!",
    readySub: 'Your store is fully configured. Click below to open your business dashboard.',
    openDashboard: 'Open Dashboard',
    saveAndContinue: 'Save & Continue',
    back: 'Back',
    alreadyHaveAccountPrompt: 'Already have an account?',
    loginLinkAction: 'Login',
  },
  hi: {
    stepTitles: [
      'मालिक खाता',
      'दुकान और पता',
      'व्यापार श्रेणी',
      'कानूनी और टैक्स (GST)',
      'भुगतान सेटिंग्स',
      'दुकान तैयार है',
    ],
    ownerAccountHeading: '1. मालिक खाता विवरण',
    ownerAccountSub: 'दुकानदार की पहचान और आपके खाते की सुरक्षा के लिए आवश्यक जानकारी।',
    ownerNameLabel: 'मालिक का पूरा नाम *',
    ownerNamePlaceholder: 'जैसे: रमेश पटेल',
    mobileLabel: 'मोबाइल नंबर *',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
    emailLabel: 'ईमेल आईडी *',
    emailPlaceholder: 'जैसे: owner@yourshop.com',
    sendOtp: 'ओटीपी भेजें',
    resendOtp: 'पुनः भेजें',
    verified: 'सत्यापित ✓',
    otpLabel: 'ओटीपी दर्ज करें',
    otpPlaceholder: 'जैसे: 4829',
    verifyOtp: 'सत्यापित करें',
    languageLabel: 'पसंदीदा भाषा',
    passwordLabel: 'पिन / पासवर्ड बनाएं *',
    passwordPlaceholder: 'कम से कम 4 अक्षर',

    shopDetailsHeading: '2. व्यापार और दुकान विवरण',
    shopDetailsSub: 'अपनी दुकान का नाम, पता, पिन कोड और शहर दर्ज करें।',
    shopNameLabel: 'दुकान / व्यापार का नाम *',
    shopNamePlaceholder: 'जैसे: श्री राम जनरल स्टोर',
    businessTypeLabel: 'व्यापार का प्रकार *',
    addressLabel: 'दुकान का पता *',
    addressPlaceholder: 'मार्केट रोड, एसबीआई बैंक के सामने',
    pinLabel: 'पिन कोड *',
    pinPlaceholder: '6-अंकों का पिन',
    cityLabel: 'शहर *',
    cityPlaceholder: 'शहर चुनें या खोजें',
    pinHint: 'शहर अपने आप भरने के लिए पहले 6 अंकों का पिन कोड डालें या सूची से चुनें।',

    categoryHeading: '3. व्यापार श्रेणी',
    categorySub: 'अपनी इन्वेंट्री और बिलिंग आवश्यकताओं के अनुसार एक या अधिक श्रेणियां चुनें।',

    legalHeading: '4. कानूनी और टैक्स जानकारी',
    legalSub: 'जीएसटी पंजीकरण स्थिति अनिवार्य है। यदि पंजीकृत नहीं हैं, तो पैन नंबर आवश्यक है।',
    gstStatusLabel: 'जीएसटी पंजीकरण स्थिति *',
    gstRegisteredOption: 'GST पंजीकरण (GST Registration)',
    gstNotRegisteredOption: 'गैर-पंजीकरण (Non Registration)',
    gstinLabel: 'जीएसटीआईएन (15-अंकों का जीएसटी नंबर) *',
    panLabel: 'पैन नंबर *',

    paymentHeading: 'भुगतान सेटिंग्स',
    paymentSetupTag: 'सेटअप',
    paymentSub: 'तय करें कि आपकी दुकान को भुगतान कैसे प्राप्त होगा।',
    upiSectionTitle: 'UPI भुगतान',
    upiEnabledStatus: 'सक्रिय',
    upiVerifiedStatus: 'सत्यापित',
    upiIdLabel: 'UPI आईडी *',
    upiIdPlaceholder: 'yourshop@upi',
    upiQrLabel: 'UPI QR कोड',
    verifyUpiBtn: 'UPI आईडी सत्यापित करें',
    bankSectionTitle: 'बैंक खाता',
    bankNotConnectedStatus: 'कनेक्ट नहीं है',
    bankConnectedStatus: 'सत्यापित',
    accountHolderLabel: 'खाताधारक का नाम *',
    accountHolderPlaceholder: 'जैसे: रमेशभाई पटेल',
    accountNumberLabel: 'खाता संख्या *',
    accountNumberPlaceholder: 'बैंक खाता संख्या दर्ज करें',
    ifscLabel: 'IFSC कोड *',
    ifscPlaceholder: 'जैसे: HDFC0001234',
    verifyBankBtn: 'बैंक विवरण सत्यापित करें',

    readyHeading: 'आप व्यापार के लिए तैयार हैं!',
    readySub: 'आपका स्टोर पूरी तरह से सेट हो गया है। डैशबोर्ड खोलने के लिए नीचे क्लिक करें।',
    openDashboard: 'डैशबोर्ड खोलें',
    saveAndContinue: 'सहेजें और आगे बढ़ें',
    back: 'पीछे',
    alreadyHaveAccountPrompt: 'पहले से खाता है?',
    loginLinkAction: 'लॉगिन करें',
  },
  gu: {
    stepTitles: [
      'માલિક ખાતું',
      'દુકાન અને સ્થળ',
      'વ્યાપાર શ્રેણી',
      'કાનૂની અને ટેક્સ (GST)',
      'ચુકવણી સેટિંગ્સ',
      'સ્ટોર તૈયાર છે',
    ],
    ownerAccountHeading: '1. માલિક ખાતાની વિગતો',
    ownerAccountSub: 'દુકાનદારની ઓળખ અને તમારા ખાતાની સુરક્ષા માટે જરૂરી વિગતો.',
    ownerNameLabel: 'માલિકનું પૂરું નામ *',
    ownerNamePlaceholder: 'દા.ત. રમેશ પટેલ',
    mobileLabel: 'મોબાઇલ નંબર *',
    mobilePlaceholder: '10 અંકનો મોબાઇલ નંબર',
    emailLabel: 'ઈમેલ આઈડી *',
    emailPlaceholder: 'દા.ત. owner@yourshop.com',
    sendOtp: 'ઓટીપી મોકલો',
    resendOtp: 'ફરીથી મોકલો',
    verified: 'ચકાસાયેલ ✓',
    otpLabel: 'ઓટીપી દાખલ કરો',
    otpPlaceholder: 'દા.ત. 4829',
    verifyOtp: 'ઓટીપી ચકાસો',
    languageLabel: 'પસંદગીની ભાષા',
    passwordLabel: 'પિન / પાસવર્ડ બનાવો *',
    passwordPlaceholder: 'ઓછામાં ઓછા 4 અક્ષર',

    shopDetailsHeading: '2. વ્યાપાર અને દુકાનની વિગતો',
    shopDetailsSub: 'તમારી દુકાનનું નામ, સરનામું, પિન કોડ અને શહેર દાખલ કરો.',
    shopNameLabel: 'દુકાન / વ્યાપારનું નામ *',
    shopNamePlaceholder: 'દા.ત. શ્રી રામ જનરલ સ્ટોર',
    businessTypeLabel: 'વ્યાપારનો પ્રકાર *',
    addressLabel: 'દુકાનનું સરનામું *',
    addressPlaceholder: 'માર્કેટ રોડ, એસબીઆઈ બેંક સામે',
    pinLabel: 'પિન કોડ *',
    pinPlaceholder: '6-અંકનો પિન',
    cityLabel: 'શહેર *',
    cityPlaceholder: 'શહેર પસંદ કરો અથવા શોધો',
    pinHint: 'શહેર આપમેળે ભરવા માટે પહેલા 6-અંકનો પિન કોડ નાખો અથવા યાદીમાંથી પસંદ કરો.',

    categoryHeading: '3. વ્યાપાર શ્રેણી',
    categorySub: 'તમારી ઇન્વેન્ટરી અને બિલિંગ જરૂરિયાતો મુજબ એક કે વધુ શ્રેણીઓ પસંદ કરો.',

    legalHeading: '4. કાનૂની અને ટેક્સ માહિતી',
    legalSub: 'જીએસટી નોંધણી સ્થિતિ ફરજિયાત છે. જો નોંધાયેલ નથી, તો પાન નંબર આવશ્યક છે.',
    gstStatusLabel: 'જીએસટી નોંધણી સ્થિતિ *',
    gstRegisteredOption: 'GST નોંધણી (GST Registration)',
    gstNotRegisteredOption: 'બિન-નોંધણી (Non Registration)',
    gstinLabel: 'જીએસટીઆઈએન (15-અંકનો જીએસટી નંબર) *',
    panLabel: 'પાન નંબર *',

    paymentHeading: 'ચુકવણી સેટિંગ્સ',
    paymentSetupTag: 'સેટઅપ',
    paymentSub: 'તમારી દુકાન ચુકવણી કેવી રીતે મેળવશે તે ગોઠવો.',
    upiSectionTitle: 'UPI ચુકવણી',
    upiEnabledStatus: 'સક્રિય',
    upiVerifiedStatus: 'ચકાસાયેલ',
    upiIdLabel: 'UPI આઈડી *',
    upiIdPlaceholder: 'yourshop@upi',
    upiQrLabel: 'UPI QR કોડ',
    verifyUpiBtn: 'UPI આઈડી ચકાસો',
    bankSectionTitle: 'બેંક ખાતું',
    bankNotConnectedStatus: 'કનેક્ટ નથી',
    bankConnectedStatus: 'ચકાસાયેલ',
    accountHolderLabel: 'ખાતાધારકનું નામ *',
    accountHolderPlaceholder: 'દા.ત. રમેશભાઈ પટેલ',
    accountNumberLabel: 'ખાતા નંબર *',
    accountNumberPlaceholder: 'બેંક ખાતા નંબર દાખલ કરો',
    ifscLabel: 'IFSC કોડ *',
    ifscPlaceholder: 'દા.ત. HDFC0001234',
    verifyBankBtn: 'બેંક વિગતો ચકાસો',

    readyHeading: 'તમે વ્યાપાર માટે તૈયાર છો!',
    readySub: 'તમારો સ્ટોર પૂરી રીતે સેટ થઈ ગયો છે. ડેશબોર્ડ ખોલવા માટે નીચે ક્લિક કરો.',
    openDashboard: 'ડેશબોર્ડ ખોલો',
    saveAndContinue: 'સાચવો અને આગળ વધો',
    back: 'પાછળ',
    alreadyHaveAccountPrompt: 'પહેલેથી ખાતું છે?',
    loginLinkAction: 'લૉગિન કરો',
  },
};
