import { LanguageCode } from './languageConfig';

export interface TranslationsSchema {
  common: {
    back: string;
    continue: string;
    save: string;
    verified: string;
    secure: string;
    loading: string;
  };
  dashboard: {
    shopDefault: string;
    owner: string;
    storeActive: string;
    restartTooltip: string;
    tabs: {
      pos: string;
      inventory: string;
      staff: string;
      settings: string;
    };
    pos: {
      quickInvoice: string;
      invoicePrefix: string;
      gstStatus: string;
      createNewBill: string;
      businessSummary: string;
      category: string;
      type: string;
      city: string;
      notSpecified: string;
      language: string;
    };
    inventory: {
      title: string;
      desc: string;
    };
    staff: {
      title: string;
      desc: string;
    };
    settings: {
      title: string;
      desc: string;
    };
    gst: {
      notRegistered: string;
      registered: string;
      composition: string;
      notSure: string;
    };
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationsSchema> = {
  en: {
    common: {
      back: 'Back',
      continue: 'Continue',
      save: 'Save',
      verified: 'Verified',
      secure: 'Secure',
      loading: 'Loading...',
    },
    dashboard: {
      shopDefault: 'Retail Counter',
      owner: 'Owner:',
      storeActive: 'Store Active',
      restartTooltip: 'Restart Setup Wizard',
      tabs: {
        pos: 'Billing & POS',
        inventory: 'Inventory',
        staff: 'Team & Staff',
        settings: 'Settings',
      },
      pos: {
        quickInvoice: 'Quick Invoice Generator',
        invoicePrefix: 'Invoice Prefix',
        gstStatus: 'GST Status',
        createNewBill: 'Create New Bill',
        businessSummary: 'Business Summary',
        category: 'Category:',
        type: 'Type:',
        city: 'City:',
        notSpecified: 'Not specified',
        language: 'Language:',
      },
      inventory: {
        title: 'Inventory Management',
        desc: 'Stock tracking, barcodes, and low-stock alerts are configured ({range} items range).',
      },
      staff: {
        title: 'Team & Staff Access',
        desc: 'Manage cashiers, inventory managers, and branch permissions here.',
      },
      settings: {
        title: 'Business Reports & Tax',
        desc: 'GST filings, daily turnover reports, and cloud backup preferences.',
      },
      gst: {
        notRegistered: 'Not registered (Non-GST)',
        registered: 'GST Registered',
        composition: 'Composition taxpayer',
        notSure: 'Not sure',
      },
    },
  },
  hi: {
    common: {
      back: 'पीछे',
      continue: 'आगे बढ़ें',
      save: 'सहेजें',
      verified: 'सत्यापित',
      secure: 'सुरक्षित',
      loading: 'लोड हो रहा है...',
    },
    dashboard: {
      shopDefault: 'रिटेल काउंटर',
      owner: 'मालिक:',
      storeActive: 'स्टोर सक्रिय',
      restartTooltip: 'सेटअप विज़ार्ड पुनः प्रारंभ करें',
      tabs: {
        pos: 'बिलिंग और पीओएस',
        inventory: 'इन्वेंट्री',
        staff: 'टीम और कर्मचारी',
        settings: 'सेटिंग्स',
      },
      pos: {
        quickInvoice: 'त्वरित इनवॉइस जनरेटर',
        invoicePrefix: 'इनवॉइस प्रिफिक्स',
        gstStatus: 'जीएसटी स्थिति',
        createNewBill: 'नया बिल बनाएं',
        businessSummary: 'व्यापार सारांश',
        category: 'श्रेणी:',
        type: 'प्रकार:',
        city: 'शहर:',
        notSpecified: 'निर्दिष्ट नहीं',
        language: 'भाषा:',
      },
      inventory: {
        title: 'इन्वेंट्री प्रबंधन',
        desc: 'स्टॉक ट्रैकिंग, बारकोड और लो-स्टॉक अलर्ट कॉन्फ़िगर किए गए हैं ({range} उत्पाद सीमा)।',
      },
      staff: {
        title: 'टीम और कर्मचारी पहुंच',
        desc: 'यहाँ कैशियर, इन्वेंट्री मैनेजर और शाखा अनुमतियों को प्रबंधित करें।',
      },
      settings: {
        title: 'व्यापार रिपोर्ट और टैक्स',
        desc: 'जीएसटी फाइलिंग, दैनिक टर्नओवर रिपोर्ट और क्लाउड बैकअप प्राथमिकताएं।',
      },
      gst: {
        notRegistered: 'पंजीकृत नहीं (Non-GST)',
        registered: 'जीएसटी पंजीकृत',
        composition: 'कंपोजिशन करदाता',
        notSure: 'निश्चित नहीं',
      },
    },
  },
  gu: {
    common: {
      back: 'પાછળ',
      continue: 'આગળ વધો',
      save: 'સાચવો',
      verified: 'ચકાસાયેલ',
      secure: 'સુરક્ષિત',
      loading: 'લોડ થઈ રહ્યું છે...',
    },
    dashboard: {
      shopDefault: 'રિટેલ કાઉન્ટર',
      owner: 'માલિક:',
      storeActive: 'સ્ટોર સક્રિય',
      restartTooltip: 'સેટઅપ વિઝાર્ડ ફરી શરૂ કરો',
      tabs: {
        pos: 'બિલિંગ અને પીઓએસ',
        inventory: 'ઇન્વેન્ટરી',
        staff: 'ટીમ અને સ્ટાફ',
        settings: 'સેટિંગ્સ',
      },
      pos: {
        quickInvoice: 'ઝડપી ઇનવોઇસ જનરેટર',
        invoicePrefix: 'ઇનવોઇસ પ્રિફિક્સ',
        gstStatus: 'જીએસટી સ્થિતિ',
        createNewBill: 'નવું બિલ બનાવો',
        businessSummary: 'વ્યાપાર સારાંશ',
        category: 'શ્રેણી:',
        type: 'પ્રકાર:',
        city: 'શહેર:',
        notSpecified: 'ઉલ્લેખ નથી',
        language: 'ભાષા:',
      },
      inventory: {
        title: 'ઇન્વેન્ટરી મેનેજમેન્ટ',
        desc: 'સ્ટોક ટ્રેકિંગ, બારકોડ અને લો-સ્ટોક ચેતવણીઓ ગોઠવેલ છે ({range} આઇટમ શ્રેણી).',
      },
      staff: {
        title: 'ટીમ અને સ્ટાફ પ્રવેશ',
        desc: 'અહીં કેશિયર, ઇન્વેન્ટરી મેનેજર અને શાખા પરવાનગીઓ સંભાળો.',
      },
      settings: {
        title: 'વ્યાપાર અહેવાલો અને ટેક્સ',
        desc: 'જીએસટી ફાઇલિંગ, દૈનિક ટર્નઓવર રિપોર્ટ્સ અને ક્લાઉડ બેકઅપ પ્રાથમિકતાઓ.',
      },
      gst: {
        notRegistered: 'નોંધાયેલ નથી (Non-GST)',
        registered: 'જીએસટી નોંધાયેલ',
        composition: 'કમ્પોઝિશન કરદાતા',
        notSure: 'ખાતરી નથી',
      },
    },
  },
};

/**
 * Direct mapping of common English labels to translation keys
 * for seamless lookup when developers pass english phrases into t(...)
 */
export const ENGLISH_PHRASE_MAP: Record<string, string> = {
  'Retail Counter': 'dashboard.shopDefault',
  'Owner:': 'dashboard.owner',
  'Store Active': 'dashboard.storeActive',
  'Restart Setup Wizard': 'dashboard.restartTooltip',
  'Billing & POS': 'dashboard.tabs.pos',
  'Inventory': 'dashboard.tabs.inventory',
  'Team & Staff': 'dashboard.tabs.staff',
  'Settings': 'dashboard.tabs.settings',
  'Quick Invoice Generator': 'dashboard.pos.quickInvoice',
  'Invoice Prefix': 'dashboard.pos.invoicePrefix',
  'GST Status': 'dashboard.pos.gstStatus',
  'Create New Bill': 'dashboard.pos.createNewBill',
  'Business Summary': 'dashboard.pos.businessSummary',
  'Category:': 'dashboard.pos.category',
  'Type:': 'dashboard.pos.type',
  'City:': 'dashboard.pos.city',
  'Not specified': 'dashboard.pos.notSpecified',
  'Language:': 'dashboard.pos.language',
  'Inventory Management': 'dashboard.inventory.title',
  'Team & Staff Access': 'dashboard.staff.title',
  'Business Reports & Tax': 'dashboard.settings.title',
  'Back': 'common.back',
  'Continue': 'common.continue',
  'Save': 'common.save',
  'Verified': 'common.verified',
  'Secure': 'common.secure',
};
