import { LanguageCode } from './languageConfig';

export interface SetupLocalizedCopy {
  stepTitles: string[];
  ownerAccountHeading: string;
  ownerAccountSub: string;
  ownerNameLabel: string;
  ownerNamePlaceholder: string;
  mobileLabel: string;
  mobilePlaceholder: string;
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
  cityPlaceholder: string;
  pinPlaceholder: string;

  categoryHeading: string;
  categorySub: string;

  legalHeading: string;
  legalSub: string;
  gstStatusLabel: string;
  gstinLabel: string;
  panLabel: string;

  billingHeading: string;
  billingSub: string;
  invoiceFormatLabel: string;
  invoicePrefixLabel: string;
  startingNoLabel: string;

  paymentHeading: string;
  paymentSub: string;
  upiLabel: string;
  upiPlaceholder: string;
  securityNote: string;

  inventoryHeading: string;
  inventorySub: string;
  maintainStockCheck: string;
  barcodesCheck: string;
  weightCheck: string;
  lowStockCheck: string;

  readyHeading: string;
  readySub: string;
  openDashboard: string;
  saveAndContinue: string;
  back: string;
}

export const SETUP_COPY: Record<LanguageCode, SetupLocalizedCopy> = {
  en: {
    stepTitles: [
      'Owner Account',
      'Shop & Location',
      'Business Category',
      'Legal & Tax (GST)',
      'Inventory Settings',
      'Ready for Business',
    ],
    ownerAccountHeading: '1. Owner Account Details',
    ownerAccountSub: 'Required details to identify the store owner and secure your account.',
    ownerNameLabel: "Owner's Full Name *",
    ownerNamePlaceholder: 'e.g. Ramesh Patel',
    mobileLabel: 'Mobile Number *',
    mobilePlaceholder: '10-digit mobile number',
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
    shopDetailsSub: 'Tell us your trade name and store address.',
    shopNameLabel: 'Shop / Business Name *',
    shopNamePlaceholder: 'e.g. Shree Ram General Store',
    businessTypeLabel: 'Business Type *',
    addressLabel: 'Shop Address & City *',
    addressPlaceholder: 'Market Road, Opp. SBI Bank',
    cityPlaceholder: 'City / District',
    pinPlaceholder: 'PIN Code',

    categoryHeading: '3. Business Category',
    categorySub: 'Select one or more categories that match your inventory and billing requirements.',

    legalHeading: '4. Legal & Tax Information',
    legalSub: 'GST registration status is mandatory. If not registered, PAN number is required.',
    gstStatusLabel: 'GST Registration Status *',
    gstinLabel: 'GSTIN (15-digit GST Number) *',
    panLabel: 'PAN Number (Mandatory when Not Registered) *',

    billingHeading: '5. Billing Configuration',
    billingSub: 'Determine how invoices and estimates are generated.',
    invoiceFormatLabel: 'Default Invoice Document Type',
    invoicePrefixLabel: 'Invoice Prefix',
    startingNoLabel: 'Starting Number',

    paymentHeading: '6. Payments & Bank Details',
    paymentSub: 'Set up UPI QR codes and accepted payment modes. (Optional initially)',
    upiLabel: 'UPI ID (Google Pay / PhonePe / Paytm)',
    upiPlaceholder: 'shopname@okhdfcbank',
    securityNote: '🔒 Note: SMARTVyapaar never asks for your UPI PIN, ATM PIN, or banking passwords.',

    inventoryHeading: '5. Inventory Configuration',
    inventorySub: 'Configure stock management and barcode scanning preferences.',
    maintainStockCheck: 'Do you maintain stock?',
    barcodesCheck: 'Do you use barcodes?',
    weightCheck: 'Sell products by weight (kg/g)?',
    lowStockCheck: 'Enable low-stock alerts?',

    readyHeading: "You're Ready for Business!",
    readySub: 'Your store is fully configured. Click below to open your business dashboard.',
    openDashboard: 'Open Dashboard 🚀',
    saveAndContinue: 'Save & Continue',
    back: 'Back',
  },
  hi: {
    stepTitles: [
      'मालिक खाता',
      'दुकान और पता',
      'व्यापार श्रेणी',
      'कानूनी और टैक्स (GST)',
      'इन्वेंट्री सेटिंग्स',
      'दुकान तैयार है',
    ],
    ownerAccountHeading: '1. मालिक खाता विवरण',
    ownerAccountSub: 'दुकानदार की पहचान और आपके खाते की सुरक्षा के लिए आवश्यक जानकारी।',
    ownerNameLabel: 'मालिक का पूरा नाम *',
    ownerNamePlaceholder: 'जैसे: रमेश पटेल',
    mobileLabel: 'मोबाइल नंबर *',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
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
    shopDetailsSub: 'अपनी दुकान का नाम और पता दर्ज करें।',
    shopNameLabel: 'दुकान / व्यापार का नाम *',
    shopNamePlaceholder: 'जैसे: श्री राम जनरल स्टोर',
    businessTypeLabel: 'व्यापार का प्रकार *',
    addressLabel: 'दुकान का पता और शहर *',
    addressPlaceholder: 'मार्केट रोड, एसबीआई बैंक के सामने',
    cityPlaceholder: 'शहर / जिला',
    pinPlaceholder: 'पिन कोड',

    categoryHeading: '3. व्यापार श्रेणी',
    categorySub: 'अपनी इन्वेंट्री और बिलिंग आवश्यकताओं के अनुसार एक या अधिक श्रेणियां चुनें।',

    legalHeading: '4. कानूनी और टैक्स जानकारी',
    legalSub: 'जीएसटी पंजीकरण स्थिति अनिवार्य है। यदि पंजीकृत नहीं हैं, तो पैन नंबर आवश्यक है।',
    gstStatusLabel: 'जीएसटी पंजीकरण स्थिति *',
    gstinLabel: 'जीएसटीआईएन (15-अंकों का जीएसटी नंबर) *',
    panLabel: 'पैन नंबर (बिना जीएसटी पंजीकरण के अनिवार्य) *',

    billingHeading: '5. बिलिंग कॉन्फ़िगरेशन',
    billingSub: 'निर्धारित करें कि इनवॉइस और एस्टीमेट कैसे जनरेट होंगे।',
    invoiceFormatLabel: 'डिफ़ॉल्ट इनवॉइस दस्तावेज़ प्रकार',
    invoicePrefixLabel: 'इनवॉइस प्रिफिक्स',
    startingNoLabel: 'शुरुआती नंबर',

    paymentHeading: '6. भुगतान और बैंक विवरण',
    paymentSub: 'यूपीआई क्यूआर कोड और स्वीकार्य भुगतान मोड सेट करें।',
    upiLabel: 'यूपीआई आईडी (Google Pay / PhonePe / Paytm)',
    upiPlaceholder: 'shopname@okhdfcbank',
    securityNote: '🔒 नोट: SMARTVyapaar कभी भी आपका यूपीआई पिन, एटीएम पिन या पासवर्ड नहीं मांगता है।',

    inventoryHeading: '5. इन्वेंट्री कॉन्फ़िगरेशन',
    inventorySub: 'स्टॉक प्रबंधन और बारकोड स्कैनिंग प्राथमिकताएं सेट करें।',
    maintainStockCheck: 'क्या आप स्टॉक रखते हैं?',
    barcodesCheck: 'क्या आप बारकोड का उपयोग करते हैं?',
    weightCheck: 'क्या वजन के हिसाब से उत्पाद बेचते हैं (किलो/ग्राम)?',
    lowStockCheck: 'कम स्टॉक होने पर अलर्ट चालू करें?',

    readyHeading: 'आप व्यापार के लिए तैयार हैं!',
    readySub: 'आपका स्टोर पूरी तरह से सेट हो गया है। डैशबोर्ड खोलने के लिए नीचे क्लिक करें।',
    openDashboard: 'डैशबोर्ड खोलें 🚀',
    saveAndContinue: 'सहेजें और आगे बढ़ें',
    back: 'पीछे',
  },
  gu: {
    stepTitles: [
      'માલિક ખાતું',
      'દુકાન અને સ્થળ',
      'વ્યાપાર શ્રેણી',
      'કાનૂની અને ટેક્સ (GST)',
      'ઇન્વેન્ટરી સેટિંગ્સ',
      'સ્ટોર તૈયાર છે',
    ],
    ownerAccountHeading: '1. માલિક ખાતાની વિગતો',
    ownerAccountSub: 'દુકાનદારની ઓળખ અને તમારા ખાતાની સુરક્ષા માટે જરૂરી વિગતો.',
    ownerNameLabel: 'માલિકનું પૂરું નામ *',
    ownerNamePlaceholder: 'દા.ત. રમેશ પટેલ',
    mobileLabel: 'મોબાઇલ નંબર *',
    mobilePlaceholder: '10 અંકનો મોબાઇલ નંબર',
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
    shopDetailsSub: 'તમારી દુકાનનું નામ અને સરનામું જણાવો.',
    shopNameLabel: 'દુકાન / વ્યાપારનું નામ *',
    shopNamePlaceholder: 'દા.ત. શ્રી રામ જનરલ સ્ટોર',
    businessTypeLabel: 'વ્યાપારનો પ્રકાર *',
    addressLabel: 'દુકાનનું સરનામું અને શહેર *',
    addressPlaceholder: 'માર્કેટ રોડ, એસબીઆઈ બેંક સામે',
    cityPlaceholder: 'શહેર / જિલ્લો',
    pinPlaceholder: 'પિન કોડ',

    categoryHeading: '3. વ્યાપાર શ્રેણી',
    categorySub: 'તમારી ઇન્વેન્ટરી અને બિલિંગ જરૂરિયાતો મુજબ એક કે વધુ શ્રેણીઓ પસંદ કરો.',

    legalHeading: '4. કાનૂની અને ટેક્સ માહિતી',
    legalSub: 'જીએસટી નોંધણી સ્થિતિ ફરજિયાત છે. જો નોંધાયેલ નથી, તો પાન નંબર આવશ્યક છે.',
    gstStatusLabel: 'જીએસટી નોંધણી સ્થિતિ *',
    gstinLabel: 'જીએસટીઆઈએન (15-અંકનો જીએસટી નંબર) *',
    panLabel: 'પાન નંબર (બિન-નોંધાયેલ માટે ફરજિયાત) *',

    billingHeading: '5. બિલિંગ ગોઠવણી',
    billingSub: 'નક્કી કરો કે ઇનવોઇસ અને એસ્ટીમેટ કેવી રીતે જનરેટ થશે.',
    invoiceFormatLabel: 'ડિફોલ્ટ ઇનવોઇस દસ્તાવેજ પ્રકાર',
    invoicePrefixLabel: 'ઇનવોઇસ પ્રિફિક્સ',
    startingNoLabel: 'શરૂઆતનો નંબર',

    paymentHeading: '6. ચુકવણી અને બેંક વિગતો',
    paymentSub: 'યુપીઆઈ ક્યૂઆર કોડ અને સ્વીકાર્ય ચુકવણી મોડ ગોઠવો.',
    upiLabel: 'યુપીઆઈ આઈડી (Google Pay / PhonePe / Paytm)',
    upiPlaceholder: 'shopname@okhdfcbank',
    securityNote: '🔒 નોંધ: SMARTVyapaar ક્યારેય તમારો યુપીઆઈ પિન, એટીએમ પિન કે પાસવર્ડ માંગતું નથી.',

    inventoryHeading: '5. ઇન્વેન્ટરી ગોઠવણી',
    inventorySub: 'સ્ટોક મેનેજમેન્ટ અને બારકોડ સ્કેનિંગ પ્રાથમિકતાઓ ગોઠવો.',
    maintainStockCheck: 'શું તમે સ્ટોક રાખો છો?',
    barcodesCheck: 'શું તમે બારકોડ વાપરો છો?',
    weightCheck: 'શું વજનના આધારે પ્રોડક્ટ વેચો છો (કિલો/ગ્રામ)?',
    lowStockCheck: 'ઓછા સ્ટોક પર એલર્ટ ચાલુ રાખવું છે?',

    readyHeading: 'તમે વ્યાપાર માટે તૈયાર છો!',
    readySub: 'તમારો સ્ટોર પૂરી રીતે સેટ થઈ ગયો છે. ડેશબોર્ડ ખોલવા માટે નીચે ક્લિક કરો.',
    openDashboard: 'ડેશબોર્ડ ખોલો 🚀',
    saveAndContinue: 'સાચવો અને આગળ વધો',
    back: 'પાછળ',
  },
};
