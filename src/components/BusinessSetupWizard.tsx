import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Landmark,
  Loader2,
  MapPin,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { LanguageCode } from '../utils/languageConfig';
import {
  BUSINESS_CATEGORIES,
  BusinessSetupData,
  DEFAULT_BUSINESS_SETUP,
  hasInvalidGstinInputPrefix,
  hasInvalidIfscInputPrefix,
  hasInvalidPanInputPrefix,
  isValidBankAccountNumber,
  isValidIfscCode,
  isValidIndianGstin,
  isValidIndianPan,
  isValidUpiId,
  maskUpiId,
  saveBusinessProfile,
} from '../utils/businessSetup';
import { fetchIfscBranchDetails, IfscBranchInfo } from '../utils/ifscLookup';
import {
  fetchIndianPincodeRemote,
  filterIndianCities,
  isValidIndianPincode,
  lookupIndianPincode,
} from '../utils/indianCitiesPincodes';
import { SETUP_COPY } from '../utils/setupCopy';
import { THEMES } from '../utils/themeConfig';
import { CelebrationConfetti } from './CelebrationConfetti';
import { LaunchShopIcon } from './LaunchShopIcon';

interface BusinessSetupWizardProps {
  initialLanguage: LanguageCode;
  onCompleteSetup: (data: BusinessSetupData) => void;
  onBackToLogin: () => void;
}

export function BusinessSetupWizard({
  initialLanguage,
  onCompleteSetup,
  onBackToLogin,
}: BusinessSetupWizardProps) {
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const [formData, setFormData] = useState<BusinessSetupData>(() => ({
    ...DEFAULT_BUSINESS_SETUP,
    preferredLanguage: initialLanguage,
    gstStatus: 'GST registered',
  }));

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [celebrationBurstKey, setCelebrationBurstKey] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<boolean>(false);
  const [cityQuery, setCityQuery] = useState<string>('');
  const [upiVerified, setUpiVerified] = useState<boolean>(false);
  const [bankVerified, setBankVerified] = useState<boolean>(false);
  const [ifscBranchInfo, setIfscBranchInfo] = useState<IfscBranchInfo | null>(null);
  const [ifscLookupLoading, setIfscLookupLoading] = useState<boolean>(false);
  const [isRedirectPaused, setIsRedirectPaused] = useState<boolean>(false);
  const [redirectElapsedMs, setRedirectElapsedMs] = useState<number>(0);

  const cityPickerRef = useRef<HTMLDivElement | null>(null);
  const pinAbortRef = useRef<AbortController | null>(null);
  const ifscAbortRef = useRef<AbortController | null>(null);
  const latestPinRef = useRef<string>('');
  const latestIfscRef = useRef<string>('');
  const redirectElapsedRef = useRef<number>(0);
  const latestFormDataRef = useRef<BusinessSetupData>(formData);
  const onCompleteSetupRef = useRef(onCompleteSetup);
  latestFormDataRef.current = formData;
  onCompleteSetupRef.current = onCompleteSetup;

  const theme = THEMES.platinum;
  const totalSteps = 6;
  const REDIRECT_DURATION_MS = 5000;
  const copy = SETUP_COPY[formData.preferredLanguage] ?? SETUP_COPY.en;

  const filteredCities = useMemo(
    () => filterIndianCities(cityQuery, 350),
    [cityQuery],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityPickerRef.current && !cityPickerRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      pinAbortRef.current?.abort();
      ifscAbortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (currentStep !== totalSteps || isRedirectPaused) return;
    const startElapsed = redirectElapsedRef.current;
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const nextElapsed = Math.min(
        REDIRECT_DURATION_MS,
        startElapsed + (Date.now() - startedAt),
      );
      redirectElapsedRef.current = nextElapsed;
      setRedirectElapsedMs(nextElapsed);
      if (nextElapsed >= REDIRECT_DURATION_MS) {
        window.clearInterval(interval);
        const latest = latestFormDataRef.current;
        saveBusinessProfile(latest, storage);
        onCompleteSetupRef.current(latest);
      }
    }, 50);
    return () => window.clearInterval(interval);
  }, [currentStep, isRedirectPaused, storage, totalSteps]);

  const updateField = <K extends keyof BusinessSetupData>(key: K, value: BusinessSetupData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === 'upiId') {
      setUpiVerified(false);
    }
    if (key === 'bankAccountName' || key === 'bankAccountNumber' || key === 'ifscCode') {
      setBankVerified(false);
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleIfscCodeChange = (rawValue: string) => {
    const cleaned = rawValue
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 11);
    latestIfscRef.current = cleaned;
    ifscAbortRef.current?.abort();
    setBankVerified(false);
    setIfscBranchInfo(null);
    setFormData((prev) => ({
      ...prev,
      ifscCode: cleaned,
      bankName: '',
      bankBranch: '',
    }));

    if (errorMessage) setErrorMessage(null);

    if (cleaned && hasInvalidIfscInputPrefix(cleaned)) {
      setIfscLookupLoading(false);
      setErrorMessage(getFieldErrorText('ifsc'));
      return;
    }

    if (isValidIfscCode(cleaned)) {
      setIfscLookupLoading(true);
      const controller = new AbortController();
      ifscAbortRef.current = controller;
      void fetchIfscBranchDetails(cleaned, controller.signal).then((info) => {
        if (latestIfscRef.current !== cleaned) return;
        setIfscLookupLoading(false);
        setIfscBranchInfo(info);
        if (info) {
          setFormData((prev) => {
            if (prev.ifscCode !== cleaned) return prev;
            return {
              ...prev,
              bankName: info.bank,
              bankBranch: info.branch,
            };
          });
        }
      });
    } else {
      setIfscLookupLoading(false);
    }
  };

  const handlePincodeChange = (rawValue: string) => {
    const digits = rawValue.replace(/\D/g, '').slice(0, 6);
    latestPinRef.current = digits;
    pinAbortRef.current?.abort();

    if (isValidIndianPincode(digits)) {
      const localMatch = lookupIndianPincode(digits);
      if (localMatch) {
        setFormData((prev) => ({
          ...prev,
          pinCode: digits,
          city: localMatch.city,
          state: localMatch.state,
        }));
        setCityQuery('');
      } else {
        setFormData((prev) => ({ ...prev, pinCode: digits }));
      }

      const controller = new AbortController();
      pinAbortRef.current = controller;
      void fetchIndianPincodeRemote(digits, controller.signal).then((remoteMatch) => {
        if (!remoteMatch || latestPinRef.current !== digits) return;
        setFormData((prev) => {
          if (prev.pinCode !== digits) return prev;
          return {
            ...prev,
            city: remoteMatch.city,
            state: remoteMatch.state,
          };
        });
      });
    } else {
      setFormData((prev) => ({ ...prev, pinCode: digits }));
    }

    if (errorMessage) setErrorMessage(null);
  };

  const handleSelectCity = (city: string, state: string) => {
    setFormData((prev) => ({
      ...prev,
      city,
      state,
    }));
    setCityQuery('');
    setCityDropdownOpen(false);
    if (errorMessage) setErrorMessage(null);
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(cat);
      if (exists && prev.categories.length === 1) return prev;
      const updated = exists
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: updated };
    });
  };

  const getFieldErrorText = (
    field: 'pan' | 'gstin' | 'upi' | 'bankAccount' | 'ifsc',
  ): string => {
    const lang = formData.preferredLanguage;
    switch (field) {
      case 'pan':
        return lang === 'hi'
          ? 'कृपया मान्य पैन नंबर दर्ज करें।'
          : lang === 'gu'
          ? 'કૃપા કરીને માન્ય પાન નંબર દાખલ કરો.'
          : 'Please enter a valid PAN number.';
      case 'gstin':
        return lang === 'hi'
          ? 'कृपया मान्य GSTIN दर्ज करें।'
          : lang === 'gu'
          ? 'કૃપા કરીને માન્ય GSTIN દાખલ કરો.'
          : 'Please enter a valid GSTIN.';
      case 'upi':
        return lang === 'hi'
          ? 'कृपया मान्य UPI आईडी दर्ज करें।'
          : lang === 'gu'
          ? 'કૃપા કરીને માન્ય UPI આઈડી દાખલ કરો.'
          : 'Please enter a valid UPI ID.';
      case 'bankAccount':
        return lang === 'hi'
          ? 'कृपया मान्य बैंक खाता संख्या दर्ज करें।'
          : lang === 'gu'
          ? 'કૃપા કરીને માન્ય બેંક ખાતા નંબર દાખલ કરો.'
          : 'Please enter a valid bank account number.';
      case 'ifsc':
        return lang === 'hi'
          ? 'कृपया मान्य IFSC कोड दर्ज करें।'
          : lang === 'gu'
          ? 'કૃપા કરીને માન્ય IFSC કોડ દાખલ કરો.'
          : 'Please enter a valid IFSC code.';
    }
  };

  const handleVerifyUpi = () => {
    setErrorMessage(null);
    if (!isValidUpiId(formData.upiId ?? '')) {
      setUpiVerified(false);
      setErrorMessage(getFieldErrorText('upi'));
      return;
    }
    setUpiVerified(true);
  };

  const handleVerifyBank = () => {
    setErrorMessage(null);
    const holder = (formData.bankAccountName ?? '').trim();
    const accNo = (formData.bankAccountNumber ?? '').trim();
    const ifsc = (formData.ifscCode ?? '').trim().toUpperCase();

    if (holder.length < 2) {
      setBankVerified(false);
      setErrorMessage(
        formData.preferredLanguage === 'hi'
          ? 'कृपया खाताधारक का पूरा नाम दर्ज करें।'
          : formData.preferredLanguage === 'gu'
          ? 'કૃપા કરીને ખાતાધારકનું પૂરું નામ દાખલ કરો.'
          : 'Please enter the account holder name.',
      );
      return;
    }
    if (!isValidBankAccountNumber(accNo)) {
      setBankVerified(false);
      setErrorMessage(getFieldErrorText('bankAccount'));
      return;
    }
    if (!isValidIfscCode(ifsc)) {
      setBankVerified(false);
      setErrorMessage(getFieldErrorText('ifsc'));
      return;
    }
    setBankVerified(true);
  };

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!formData.ownerName.trim() || formData.ownerName.trim().length < 2) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया मालिक का पूरा नाम दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને માલિકનું પૂરું નામ દાખલ કરો.'
            : 'Please enter the owner full name.',
        );
        return;
      }
      if (!/^\d{10}$/.test(formData.mobileNumber)) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને માન્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો.'
            : 'Please enter a valid 10-digit mobile number.',
        );
        return;
      }
      const trimmedEmail = (formData.email ?? '').trim();
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया सही ईमेल आईडी दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને માન્ય ઈમેલ આઈડી દાખલ કરો.'
            : 'Please enter a valid email address.',
        );
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.shopName.trim() || formData.shopName.trim().length < 2) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया दुकान का नाम दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને દુકાનનું નામ દાખલ કરો.'
            : 'Please enter your shop or business name.',
        );
        return;
      }
      if (!formData.shopAddress.trim()) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया दुकान का पता दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને દુકાનનું સરનામું દાખલ કરો.'
            : 'Please enter your shop address.',
        );
        return;
      }
      if (!isValidIndianPincode(formData.pinCode)) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया वैध 6-अंकों का भारतीय पिन कोड दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને માન્ય 6-અંકનો ભારતીય પિન કોડ દાખલ કરો.'
            : 'Please enter a valid 6-digit Indian PIN code.',
        );
        return;
      }
      if (!formData.city.trim() || formData.city.trim().length < 2) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया अपना शहर चुनें या दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને તમારું શહેર પસંદ કરો અથવા દાખલ કરો.'
            : 'Please select or enter your city.',
        );
        return;
      }
    }
    if (currentStep === 4) {
      if (formData.gstStatus === 'GST registered') {
        if (!isValidIndianGstin(formData.gstin ?? '')) {
          setErrorMessage(getFieldErrorText('gstin'));
          return;
        }
      } else if (formData.gstStatus === 'Not registered') {
        if (!isValidIndianPan(formData.pan ?? '')) {
          setErrorMessage(getFieldErrorText('pan'));
          return;
        }
      }
    }
    if (currentStep === 5) {
      if (!isValidUpiId(formData.upiId ?? '')) {
        setErrorMessage(getFieldErrorText('upi'));
        return;
      }
      if (!upiVerified) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया आगे बढ़ने से पहले "UPI आईडी सत्यापित करें" पर क्लिक करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને આગળ વધતા પહેલા "UPI આઈડી ચકાસો" પર ક્લિક કરો.'
            : 'Please click "Verify UPI ID" to verify your UPI ID.',
        );
        return;
      }
      if ((formData.bankAccountName ?? '').trim().length < 2) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया खाताधारक का नाम दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને ખાતાધારકનું નામ દાખલ કરો.'
            : 'Please enter the account holder name.',
        );
        return;
      }
      if (!isValidBankAccountNumber(formData.bankAccountNumber ?? '')) {
        setErrorMessage(getFieldErrorText('bankAccount'));
        return;
      }
      if (!isValidIfscCode(formData.ifscCode ?? '')) {
        setErrorMessage(getFieldErrorText('ifsc'));
        return;
      }
      if (!bankVerified) {
        setErrorMessage(
          formData.preferredLanguage === 'hi'
            ? 'कृपया आगे बढ़ने से पहले "बैंक विवरण सत्यापित करें" पर क्लिक करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને આગળ વધતા પહેલા "બેંક વિગતો ચકાસો" પર ક્લિક કરો.'
            : 'Please click "Verify Bank Details" to verify your bank account.',
        );
        return;
      }
    }

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCityDropdownOpen(false);
      if (nextStep === totalSteps) {
        redirectElapsedRef.current = 0;
        setRedirectElapsedMs(0);
        setIsRedirectPaused(false);
        setCelebrationBurstKey((k) => k + 1);
      }
      setCurrentStep(nextStep);
    } else {
      saveBusinessProfile(formData, storage);
      onCompleteSetup(formData);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    setCityDropdownOpen(false);
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    } else {
      onBackToLogin();
    }
  };

  return (
    <div
      data-testid="business-setup-wizard"
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center transition-colors duration-300 ${theme.outerShell}`}
    >
      <CelebrationConfetti active={currentStep === totalSteps} burstKey={celebrationBurstKey} />
      <main className="relative z-10 w-full max-w-lg mx-auto lg:py-4 flex items-center justify-center">
        <section aria-label="Business Setup Wizard" className="w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[490px] lg:rounded-[38px] lg:border px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between relative overflow-visible transition-colors duration-300 ${theme.cardSurface}`}
          >
            {/* Header with Unified SMARTVyapaar Wordmark (no top back arrow) */}
            <div className="flex items-center justify-center shrink-0 pt-0.5">
              <h1 className="font-display text-[24px] sm:text-[26px] font-extrabold tracking-[-0.03em] whitespace-nowrap leading-none select-none">
                <span className="text-[#0B132B]">SMART</span>
                <span className="text-[#2563EB]">Vyapaar</span>
              </h1>
            </div>

            <div className="flex-1 flex flex-col justify-between py-4">
              {/* Interactive Architectural Step Progress (hidden on final confirmation screen) */}
              {currentStep < totalSteps && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#667085] dark:text-[#A4AEC0] mb-2">
                    <span>
                      Step {currentStep} of {totalSteps - 1}
                    </span>
                    <span className="text-[#0B132B] dark:text-[#A9B9FF] font-display">
                      {copy.stepTitles[currentStep - 1]}
                    </span>
                  </div>
                  <div className="relative flex items-center justify-between gap-1.5 mb-2">
                    {Array.from({ length: totalSteps - 1 }, (_, idx) => {
                      const stepNum = idx + 1;
                      const isCompleted = stepNum < currentStep;
                      const isCurrent = stepNum === currentStep;
                      return (
                        <div key={stepNum} className="flex-1 flex items-center">
                          <div
                            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                              isCompleted
                                ? 'bg-[#2563EB] dark:bg-[#7891FF]'
                                : isCurrent
                                ? 'bg-gradient-to-r from-[#0B132B] via-[#2563EB] to-[#3B82F6] dark:from-[#7891FF] dark:via-[#AFC0FF] dark:to-[#A9B9FF]'
                                : 'bg-[#E6E9F0] dark:bg-[#344157]'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="my-4 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`wizard-step-${currentStep}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                {currentStep === 1 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {copy.ownerAccountHeading}
                    </h2>
                    <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">{copy.ownerAccountSub}</p>

                    <div>
                      <label
                        htmlFor="wizard-owner-name"
                        className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                      >
                        {copy.ownerNameLabel}
                      </label>
                      <input
                        id="wizard-owner-name"
                        type="text"
                        autoComplete="name"
                        value={formData.ownerName}
                        onChange={(e) => updateField('ownerName', e.target.value)}
                        placeholder={copy.ownerNamePlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-mobile-number"
                        className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                      >
                        {copy.mobileLabel}
                      </label>
                      <div className="flex items-center h-12 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] focus-within:border-[#2563EB] dark:focus-within:border-[#7891FF] focus-within:ring-2 focus-within:ring-[#2563EB]/20 overflow-hidden">
                        <span className="px-3.5 h-full flex items-center bg-[#F7F8FC] dark:bg-[#1B2434] border-r border-[#E6E9F0] dark:border-[#344157] font-mono text-[13.5px] font-semibold text-[#667085] dark:text-[#A4AEC0] tabular-nums shrink-0">
                          +91
                        </span>
                        <input
                          id="wizard-mobile-number"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          maxLength={10}
                          value={formData.mobileNumber}
                          onChange={(e) => {
                            updateField('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10));
                          }}
                          placeholder={copy.mobilePlaceholder}
                          className="w-full h-full px-3.5 bg-transparent font-mono text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:font-sans placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-owner-email"
                        className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                      >
                        {copy.emailLabel}
                      </label>
                      <input
                        id="wizard-owner-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email ?? ''}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder={copy.emailPlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {copy.shopDetailsHeading}
                    </h2>
                    <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">{copy.shopDetailsSub}</p>

                    <div>
                      <label
                        htmlFor="wizard-shop-name"
                        className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                      >
                        {copy.shopNameLabel}
                      </label>
                      <input
                        id="wizard-shop-name"
                        type="text"
                        autoComplete="organization"
                        value={formData.shopName}
                        onChange={(e) => updateField('shopName', e.target.value)}
                        placeholder={copy.shopNamePlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-shop-address"
                        className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                      >
                        {copy.addressLabel}
                      </label>
                      <input
                        id="wizard-shop-address"
                        type="text"
                        autoComplete="street-address"
                        value={formData.shopAddress}
                        onChange={(e) => updateField('shopAddress', e.target.value)}
                        placeholder={copy.addressPlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>

                    {/* PIN Code (1st) + Searchable City Selector (2nd) */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="wizard-pincode"
                          className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                        >
                          {copy.pinLabel}
                        </label>
                        <input
                          id="wizard-pincode"
                          type="text"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={6}
                          value={formData.pinCode}
                          onChange={(e) => handlePincodeChange(e.target.value)}
                          placeholder={copy.pinPlaceholder}
                          className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] font-mono tabular-nums text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:font-sans placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                        />
                      </div>

                      <div ref={cityPickerRef} className="sm:col-span-3 relative">
                        <label
                          htmlFor="wizard-city-input"
                          className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                        >
                          {copy.cityLabel}
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="wizard-city-input"
                            type="text"
                            role="combobox"
                            aria-expanded={cityDropdownOpen}
                            aria-controls="indian-city-listbox"
                            aria-autocomplete="list"
                            value={cityDropdownOpen ? cityQuery : formData.city}
                            onFocus={() => {
                              setCityQuery('');
                              setCityDropdownOpen(true);
                            }}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCityQuery(val);
                              updateField('city', val);
                              if (!cityDropdownOpen) setCityDropdownOpen(true);
                            }}
                            placeholder={formData.city ? formData.city : copy.cityPlaceholder}
                            className="w-full h-12 pl-3.5 pr-14 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                          {formData.city && (
                            <button
                              type="button"
                              onClick={() => {
                                updateField('city', '');
                                setCityQuery('');
                                setCityDropdownOpen(true);
                              }}
                              aria-label="Clear city"
                              className="absolute right-8 p-1 text-[#667085] dark:text-[#A4AEC0] hover:text-[#202536] dark:hover:text-[#F7F8FC] cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setCityQuery('');
                              setCityDropdownOpen((open) => !open);
                            }}
                            aria-label="Toggle cities list"
                            className="absolute right-2.5 p-1 text-[#667085] dark:text-[#A4AEC0] hover:text-[#2563EB] dark:hover:text-[#7891FF] cursor-pointer"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-150 ${
                                cityDropdownOpen ? 'rotate-180 text-[#2563EB] dark:text-[#7891FF]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {cityDropdownOpen && (
                          <div
                            id="indian-city-listbox"
                            role="listbox"
                            aria-label="Indian Cities"
                            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-2xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] shadow-[0_18px_40px_-12px_rgba(32,37,54,0.22)] overflow-hidden"
                          >
                            <div className="px-3 py-2 bg-[#F7F8FC] dark:bg-[#253148] border-b border-[#E6E9F0] dark:border-[#344157] flex items-center gap-2 text-[11.5px] text-[#667085] dark:text-[#A4AEC0]">
                              <Search className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#7891FF] shrink-0" />
                              <span>
                                {filteredCities.length}{' '}
                                {filteredCities.length === 1 ? 'city' : 'cities'}
                              </span>
                            </div>
                            <div className="max-h-48 overflow-y-auto divide-y divide-[#E6E9F0]/60 dark:divide-[#344157]/60">
                              {filteredCities.length > 0 ? (
                                filteredCities.map((entry) => {
                                  const isSelected =
                                    formData.city.toLowerCase() === entry.city.toLowerCase();
                                  return (
                                    <button
                                      key={`${entry.city}-${entry.state}`}
                                      type="button"
                                      role="option"
                                      aria-selected={isSelected}
                                      onClick={() => handleSelectCity(entry.city, entry.state)}
                                      className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 text-[13.5px] transition-colors cursor-pointer ${
                                        isSelected
                                          ? 'bg-[#EFF6FF] dark:bg-[#28365B] text-[#0B132B] dark:text-[#A9B9FF] font-semibold'
                                          : 'hover:bg-[#F7F8FC] dark:hover:bg-[#253148] text-[#202536] dark:text-[#F7F8FC]'
                                      }`}
                                    >
                                      <span className="truncate">{entry.city}</span>
                                      <span className="text-[11.5px] text-[#667085] dark:text-[#A4AEC0] shrink-0 truncate max-w-[48%]">
                                        {entry.state}
                                      </span>
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="px-3.5 py-3 text-xs text-[#667085] dark:text-[#A4AEC0]">
                                  No matching city in directory. Continue typing to use{' '}
                                  <strong className="text-[#202536] dark:text-[#F7F8FC]">{cityQuery}</strong>.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {copy.categoryHeading}
                    </h2>
                    <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">{copy.categorySub}</p>

                    <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto">
                      {BUSINESS_CATEGORIES.map((cat) => {
                        const isSelected = formData.categories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`min-h-[46px] p-3 rounded-xl border text-left font-display text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#EFF6FF] dark:bg-[#28365B] border-[#2563EB] dark:border-[#7891FF] ring-1 ring-[#2563EB] dark:ring-[#7891FF] text-[#0B132B] dark:text-[#A9B9FF]'
                                : 'bg-[#FFFFFF] dark:bg-[#253148] border-[#E6E9F0] dark:border-[#344157] hover:border-[#3B82F6]/70 text-[#202536] dark:text-[#F7F8FC]'
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#7891FF]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {copy.legalHeading}
                    </h2>
                    <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">{copy.legalSub}</p>

                    <div>
                      <span className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-2">
                        {copy.gstStatusLabel}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(
                          [
                            {
                              value: 'GST registered' as const,
                              label: copy.gstRegisteredOption,
                            },
                            {
                              value: 'Not registered' as const,
                              label: copy.gstNotRegisteredOption,
                            },
                          ] as const
                        ).map((option) => {
                          const isChecked = formData.gstStatus === option.value;
                          return (
                            <label
                              key={option.value}
                              className={`relative flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all select-none ${
                                isChecked
                                  ? 'bg-[#EFF6FF] border-[#2563EB]'
                                  : 'bg-[#FFFFFF] border-[#E6E9F0] hover:border-[#3B82F6]/60 hover:bg-[#F7F8FC]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => updateField('gstStatus', option.value)}
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                  isChecked
                                    ? 'bg-[#2563EB] dark:bg-[#7891FF] border-[#2563EB] dark:border-[#7891FF] text-white'
                                    : 'bg-[#FFFFFF] dark:bg-[#1B2434] border-[#E6E9F0] dark:border-[#344157] text-transparent'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                              <span className="min-w-0 font-display text-[13.5px] font-bold text-[#202536] dark:text-[#F7F8FC] leading-snug">
                                {option.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {formData.gstStatus === 'GST registered' ? (
                      <div>
                        <label
                          htmlFor="wizard-gstin"
                          className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                        >
                          {copy.gstinLabel}
                        </label>
                        <input
                          id="wizard-gstin"
                          type="text"
                          maxLength={15}
                          value={formData.gstin}
                          onChange={(e) => {
                            const cleaned = e.target.value
                              .replace(/[^a-zA-Z0-9]/g, '')
                              .toUpperCase()
                              .slice(0, 15);
                            updateField('gstin', cleaned);
                            if (cleaned && hasInvalidGstinInputPrefix(cleaned)) {
                              setErrorMessage(getFieldErrorText('gstin'));
                            }
                          }}
                          onBlur={() => {
                            const val = (formData.gstin ?? '').trim();
                            if (val.length > 0 && !isValidIndianGstin(val)) {
                              setErrorMessage(getFieldErrorText('gstin'));
                            }
                          }}
                          placeholder="e.g. 24AABCP1234A1Z5"
                          className={`w-full h-12 px-3.5 rounded-xl border bg-[#FFFFFF] dark:bg-[#253148] font-mono text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:ring-2 ${
                            errorMessage === getFieldErrorText('gstin')
                              ? 'border-[#D64545] dark:border-[#FF7777] focus:border-[#D64545] focus:ring-[#D64545]/20'
                              : 'border-[#E6E9F0] dark:border-[#344157] focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-[#2563EB]/20'
                          }`}
                        />
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor="wizard-pan"
                          className="block text-[12.5px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                        >
                          {copy.panLabel}
                        </label>
                        <input
                          id="wizard-pan"
                          type="text"
                          maxLength={10}
                          value={formData.pan}
                          onChange={(e) => {
                            const cleaned = e.target.value
                              .replace(/[^a-zA-Z0-9]/g, '')
                              .toUpperCase()
                              .slice(0, 10);
                            updateField('pan', cleaned);
                            if (cleaned && hasInvalidPanInputPrefix(cleaned)) {
                              setErrorMessage(getFieldErrorText('pan'));
                            }
                          }}
                          onBlur={() => {
                            const val = (formData.pan ?? '').trim();
                            if (val.length > 0 && !isValidIndianPan(val)) {
                              setErrorMessage(getFieldErrorText('pan'));
                            }
                          }}
                          placeholder="ABCPE1234F"
                          className={`w-full h-12 px-3.5 rounded-xl border bg-[#FFFFFF] dark:bg-[#253148] font-mono text-[14.5px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:ring-2 ${
                            errorMessage === getFieldErrorText('pan')
                              ? 'border-[#D64545] dark:border-[#FF7777] focus:border-[#D64545] focus:ring-[#D64545]/20'
                              : 'border-[#E6E9F0] dark:border-[#344157] focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-[#2563EB]/20'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-display text-[20px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                        {copy.paymentHeading}
                      </h2>
                      <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0] mt-0.5">{copy.paymentSub}</p>
                    </div>

                    {/* UPI Payments Section */}
                    <div className="p-3.5 rounded-2xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF] shrink-0" />
                          <h3 className="font-display text-[14.5px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                            {copy.upiSectionTitle}
                          </h3>
                        </div>
                        {upiVerified && (
                          <span className="text-xs font-semibold text-[#16865D] dark:text-[#50C69A]">
                            {copy.upiVerifiedStatus} ✓
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-upi-id"
                          className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                        >
                          {copy.upiIdLabel}
                        </label>
                        <input
                          id="wizard-upi-id"
                          type="text"
                          value={formData.upiId ?? ''}
                          onChange={(e) => updateField('upiId', e.target.value.trim())}
                          onBlur={() => {
                            const val = (formData.upiId ?? '').trim();
                            if (val.length > 0 && !isValidUpiId(val)) {
                              setErrorMessage(getFieldErrorText('upi'));
                            }
                          }}
                          placeholder={copy.upiIdPlaceholder}
                          className={`w-full h-11 px-3.5 rounded-xl border bg-[#FFFFFF] dark:bg-[#1B2434] text-[14px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:ring-2 ${
                            errorMessage === getFieldErrorText('upi')
                              ? 'border-[#D64545] dark:border-[#FF7777] focus:border-[#D64545] focus:ring-[#D64545]/20'
                              : 'border-[#E6E9F0] dark:border-[#344157] focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-[#2563EB]/20'
                          }`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyUpi}
                        className={`w-full min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          upiVerified
                            ? 'bg-[#16865D]/10 dark:bg-[#50C69A]/15 border border-[#16865D]/35 dark:border-[#50C69A]/35 text-[#16865D] dark:text-[#50C69A]'
                            : 'bg-[#0B132B] hover:bg-[#0B132B] dark:bg-[#2563EB] dark:hover:bg-[#6680F5] text-white'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>
                          {upiVerified ? `${copy.upiVerifiedStatus} ✓` : copy.verifyUpiBtn}
                        </span>
                      </button>
                    </div>

                    {/* Bank Account Section */}
                    <div className="p-3.5 rounded-2xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF] shrink-0" />
                          <h3 className="font-display text-[14.5px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                            {copy.bankSectionTitle}
                          </h3>
                        </div>
                        {bankVerified && (
                          <span className="text-xs font-semibold text-[#16865D] dark:text-[#50C69A]">
                            {copy.bankConnectedStatus} ✓
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-bank-holder"
                          className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                        >
                          {copy.accountHolderLabel}
                        </label>
                        <input
                          id="wizard-bank-holder"
                          type="text"
                          value={formData.bankAccountName ?? ''}
                          onChange={(e) => updateField('bankAccountName', e.target.value)}
                          placeholder={copy.accountHolderPlaceholder}
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] text-[14px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-2 focus:ring-[#2563EB]/20"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label
                            htmlFor="wizard-bank-number"
                            className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                          >
                            {copy.accountNumberLabel}
                          </label>
                          <input
                            id="wizard-bank-number"
                            type="text"
                            inputMode="numeric"
                            maxLength={18}
                            value={formData.bankAccountNumber ?? ''}
                            onChange={(e) =>
                              updateField(
                                'bankAccountNumber',
                                e.target.value.replace(/\D/g, '').slice(0, 18),
                              )
                            }
                            onBlur={() => {
                              const val = (formData.bankAccountNumber ?? '').trim();
                              if (val.length > 0 && !isValidBankAccountNumber(val)) {
                                setErrorMessage(getFieldErrorText('bankAccount'));
                              }
                            }}
                            placeholder={copy.accountNumberPlaceholder}
                            className={`w-full h-11 px-3.5 rounded-xl border bg-[#FFFFFF] dark:bg-[#1B2434] font-mono tabular-nums text-[14px] text-[#202536] dark:text-[#F7F8FC] placeholder:font-sans placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:ring-2 ${
                              errorMessage === getFieldErrorText('bankAccount')
                                ? 'border-[#D64545] dark:border-[#FF7777] focus:border-[#D64545] focus:ring-[#D64545]/20'
                                : 'border-[#E6E9F0] dark:border-[#344157] focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-[#2563EB]/20'
                            }`}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="wizard-bank-ifsc"
                            className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                          >
                            {copy.ifscLabel}
                          </label>
                          <input
                            id="wizard-bank-ifsc"
                            type="text"
                            maxLength={11}
                            value={formData.ifscCode ?? ''}
                            onChange={(e) => handleIfscCodeChange(e.target.value)}
                            onBlur={() => {
                              const val = (formData.ifscCode ?? '').trim();
                              if (val.length > 0 && !isValidIfscCode(val)) {
                                setErrorMessage(getFieldErrorText('ifsc'));
                              }
                            }}
                            placeholder={copy.ifscPlaceholder}
                            className={`w-full h-11 px-3.5 rounded-xl border bg-[#FFFFFF] dark:bg-[#1B2434] font-mono tabular-nums text-[14px] text-[#202536] dark:text-[#F7F8FC] placeholder:font-sans placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:ring-2 ${
                              errorMessage === getFieldErrorText('ifsc')
                                ? 'border-[#D64545] dark:border-[#FF7777] focus:border-[#D64545] focus:ring-[#D64545]/20'
                                : 'border-[#E6E9F0] dark:border-[#344157] focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:ring-[#2563EB]/20'
                            }`}
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {(ifscLookupLoading || ifscBranchInfo) && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="px-3 py-2 rounded-xl bg-[#EFF6FF] dark:bg-[#28365B] border border-[#3B82F6]/40 dark:border-[#7891FF]/40 flex items-start gap-2 text-[12px]"
                          >
                            {ifscLookupLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF] animate-spin shrink-0 mt-0.5" />
                                <span className="text-[#0B132B] dark:text-[#A9B9FF] font-medium">
                                  {formData.preferredLanguage === 'hi'
                                    ? 'शाखा विवरण खोजा जा रहा है...'
                                    : formData.preferredLanguage === 'gu'
                                    ? 'શાખાની વિગતો શોધાઈ રહી છે...'
                                    : 'Fetching bank & branch name...'}
                                </span>
                              </>
                            ) : ifscBranchInfo ? (
                              <>
                                <Building2 className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF] shrink-0 mt-0.5" />
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-[#202536] dark:text-[#F7F8FC] truncate">
                                    {ifscBranchInfo.bank}
                                  </p>
                                  <p className="text-[11.5px] text-[#0B132B] dark:text-[#A9B9FF] flex items-center gap-1 flex-wrap">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span>
                                      {ifscBranchInfo.branch}
                                      {ifscBranchInfo.city ? `, ${ifscBranchInfo.city}` : ''}
                                      {ifscBranchInfo.state ? `, ${ifscBranchInfo.state}` : ''}
                                    </span>
                                  </p>
                                </div>
                              </>
                            ) : null}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="button"
                        onClick={handleVerifyBank}
                        className={`w-full min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          bankVerified
                            ? 'bg-[#16865D]/10 dark:bg-[#50C69A]/15 border border-[#16865D]/35 dark:border-[#50C69A]/35 text-[#16865D] dark:text-[#50C69A]'
                            : 'bg-[#0B132B] hover:bg-[#0B132B] dark:bg-[#2563EB] dark:hover:bg-[#6680F5] text-white'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>
                          {bankVerified ? `${copy.bankConnectedStatus} ✓` : copy.verifyBankBtn}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 text-center py-1"
                  >
                    {/* Storefront & Verification Crest */}
                    <div className="relative flex items-center justify-center pt-1 pb-1">
                      <div className="relative inline-flex items-center justify-center">
                        <LaunchShopIcon size="md" />
                        <motion.div
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 360, damping: 18, delay: 0.14 }}
                          className="absolute -bottom-1 -right-2 w-8 h-8 rounded-full bg-[#16865D] dark:bg-[#50C69A] text-white dark:text-[#111827] ring-4 ring-[#FFFFFF] dark:ring-[#1B2434] shadow-md flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-4.5 h-4.5" aria-hidden="true" />
                        </motion.div>
                      </div>
                    </div>

                    <p className="text-[14.5px] text-[#667085] dark:text-[#A4AEC0] max-w-[34ch] mx-auto text-balance">
                      {formData.preferredLanguage === 'hi'
                        ? `आपका स्टोर ${formData.shopName || 'रिटेल काउंटर'} पूरी तरह से सेट हो गया है।`
                        : formData.preferredLanguage === 'gu'
                        ? `તમારો સ્ટોર ${formData.shopName || 'રિટેલ કાઉન્ટર'} પૂરી રીતે સેટ થઈ ગયો છે.`
                        : (
                          <>
                            Your store{' '}
                            <span className="font-semibold text-[#202536] dark:text-[#F7F8FC]">
                              {formData.shopName || 'Retail Counter'}
                            </span>{' '}
                            is fully configured.
                          </>
                        )}
                    </p>

                    {/* Complete Create-Account Summary Dossier (no row icons) */}
                    <div className="rounded-2xl border border-[#E6E9F0] bg-[#FFFFFF] overflow-hidden text-left divide-y divide-[#E6E9F0]">
                      {/* Shop Identity & Location Header Band */}
                      <div className="px-4 py-3 bg-[#EFF6FF]/65 dark:bg-[#28365B]/70">
                        <p className="font-display text-[15px] font-bold text-[#0B132B] dark:text-[#A9B9FF] truncate">
                          {formData.shopName || 'Retail Counter'}
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#667085] dark:text-[#A4AEC0] leading-snug">
                          {formData.shopAddress}
                          {formData.city ? `, ${formData.city}` : ''}
                          {formData.state ? `, ${formData.state}` : ''}
                          {formData.pinCode ? (
                            <>
                              {' '}
                              – <span className="font-mono tabular-nums">{formData.pinCode}</span>
                            </>
                          ) : null}
                        </p>
                        <p className="mt-1 text-[11.5px] font-medium text-[#2563EB] dark:text-[#7891FF]">
                          {formData.categories.join(' · ')}
                        </p>
                      </div>

                      {/* Owner & Tax Details */}
                      <dl className="px-4 py-2.5 space-y-1.5 text-[12px]">
                        <div className="flex items-center justify-between gap-3">
                          <dt className="text-[#667085] dark:text-[#A4AEC0] shrink-0">
                            {formData.preferredLanguage === 'hi'
                              ? 'मालिक'
                              : formData.preferredLanguage === 'gu'
                              ? 'માલિક'
                              : 'Owner'}
                          </dt>
                          <dd className="font-semibold text-[#202536] dark:text-[#F7F8FC] text-right truncate">
                            {formData.ownerName}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <dt className="text-[#667085] dark:text-[#A4AEC0] shrink-0">
                            {formData.preferredLanguage === 'hi'
                              ? 'मोबाइल'
                              : formData.preferredLanguage === 'gu'
                              ? 'મોબાઇલ'
                              : 'Mobile'}
                          </dt>
                          <dd className="font-mono tabular-nums font-semibold text-[#202536] dark:text-[#F7F8FC]">
                            +91 {formData.mobileNumber}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <dt className="text-[#667085] dark:text-[#A4AEC0] shrink-0">
                            {formData.preferredLanguage === 'hi'
                              ? 'ईमेल'
                              : formData.preferredLanguage === 'gu'
                              ? 'ઈમેલ'
                              : 'Email'}
                          </dt>
                          <dd className="font-semibold text-[#202536] dark:text-[#F7F8FC] text-right truncate">
                            {formData.email}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <dt className="text-[#667085] dark:text-[#A4AEC0] shrink-0">
                            {formData.gstStatus === 'GST registered'
                              ? copy.gstRegisteredOption
                              : copy.gstNotRegisteredOption}
                          </dt>
                          <dd className="font-mono tabular-nums font-semibold text-[#202536] dark:text-[#F7F8FC] text-right">
                            {formData.gstStatus === 'GST registered'
                              ? formData.gstin
                              : `PAN · ${formData.pan}`}
                          </dd>
                        </div>
                      </dl>

                      {/* Payment & Bank Details */}
                      <dl className="px-4 py-2.5 space-y-1.5 text-[12px] bg-[#F7F8FC]/70 dark:bg-[#1B2434]/60">
                        {formData.upiId && (
                          <div className="flex items-center justify-between gap-3">
                            <dt className="text-[#667085] dark:text-[#A4AEC0] shrink-0">UPI ID</dt>
                            <dd className="font-mono font-semibold text-[#202536] dark:text-[#F7F8FC] text-right truncate">
                              {maskUpiId(formData.upiId)}
                            </dd>
                          </div>
                        )}
                        {formData.bankAccountNumber && (
                          <div className="flex items-center justify-between gap-3">
                            <dt className="text-[#667085] dark:text-[#A4AEC0] shrink-0">
                              {formData.preferredLanguage === 'hi'
                                ? 'बैंक खाता'
                                : formData.preferredLanguage === 'gu'
                                ? 'બેંક ખાતું'
                                : 'Bank Account'}
                            </dt>
                            <dd className="font-mono tabular-nums font-semibold text-[#202536] dark:text-[#F7F8FC] text-right truncate">
                              ••••{formData.bankAccountNumber.slice(-4)}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Pauseable Auto-Redirect Bar (no Open Dashboard button) */}
                    <div className="pt-1 space-y-2 text-left">
                      <div className="flex items-center justify-between gap-2 text-[12px] font-semibold">
                        <span
                          className={
                            isRedirectPaused
                              ? 'text-[#C58A24] dark:text-[#F0BE61]'
                              : 'text-[#2563EB] dark:text-[#7891FF]'
                          }
                        >
                          {isRedirectPaused
                            ? formData.preferredLanguage === 'hi'
                              ? 'डैशबोर्ड रीडायरेक्ट रुका हुआ है'
                              : formData.preferredLanguage === 'gu'
                              ? 'ડેશબોર્ડ રીડાયરેક્ટ રોકાયેલું છે'
                              : 'Redirect paused'
                            : formData.preferredLanguage === 'hi'
                            ? 'आपका डैशबोर्ड खुल रहा है...'
                            : formData.preferredLanguage === 'gu'
                            ? 'તમારું ડેશબોર્ડ ખુલી રહ્યું છે...'
                            : 'Opening your dashboard...'}
                        </span>

                        <button
                          type="button"
                          onClick={() => setIsRedirectPaused((paused) => !paused)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11.5px] font-semibold border transition-colors cursor-pointer ${
                            isRedirectPaused
                              ? 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#7891FF] dark:hover:bg-[#6680F5] border-[#2563EB] dark:border-[#7891FF] text-white'
                              : 'bg-[#FFFFFF] dark:bg-[#253148] hover:bg-[#F7F8FC] dark:hover:bg-[#2D3B56] border-[#E6E9F0] dark:border-[#344157] text-[#202536] dark:text-[#F7F8FC]'
                          }`}
                        >
                          {isRedirectPaused ? (
                            <>
                              <Play className="w-3 h-3 fill-current" />
                              <span>
                                {formData.preferredLanguage === 'hi'
                                  ? 'जारी रखें'
                                  : formData.preferredLanguage === 'gu'
                                  ? 'ચાલુ રાખો'
                                  : 'Resume'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Pause className="w-3 h-3 fill-current" />
                              <span>
                                {formData.preferredLanguage === 'hi'
                                  ? 'रोकें'
                                  : formData.preferredLanguage === 'gu'
                                  ? 'રોકો'
                                  : 'Pause'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="w-full h-2 rounded-full bg-[#E6E9F0] dark:bg-[#344157] overflow-hidden">
                        <div
                          style={{
                            transform: `scaleX(${Math.min(1, redirectElapsedMs / REDIRECT_DURATION_MS)})`,
                            transformOrigin: 'left',
                          }}
                          className={`h-full w-full rounded-full transition-colors duration-200 ${
                            isRedirectPaused
                              ? 'bg-[#C58A24] dark:bg-[#F0BE61]'
                              : 'bg-gradient-to-r from-[#0B132B] via-[#2563EB] to-[#3B82F6] dark:from-[#7891FF] dark:via-[#AFC0FF] dark:to-[#A9B9FF]'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Error Banner */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-[#D64545]/10 dark:bg-[#FF7777]/12 border border-[#D64545]/30 dark:border-[#FF7777]/35 text-xs font-medium text-[#D64545] dark:text-[#FF7777]"
                  >
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons + Login Redirect Link */}
              {currentStep < totalSteps && (
                <div className="shrink-0">
                  <div className="flex gap-2.5">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                        onClick={handlePrevStep}
                        className="w-1/3 min-h-[48px] rounded-2xl border border-[#E6E9F0] bg-[#FFFFFF] hover:bg-[#F7F8FC] font-semibold text-[#202536] cursor-pointer transition-colors"
                      >
                        {copy.back}
                      </motion.button>
                    )}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.965 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      onClick={handleNextStep}
                      className="flex-1 min-h-[48px] rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#0B132B] text-white font-display font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>{copy.saveAndContinue}</span>
                    </motion.button>
                  </div>

                  <div className="mt-2 text-center">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      onClick={() => {
                        setErrorMessage(null);
                        setCityDropdownOpen(false);
                        onBackToLogin();
                      }}
                      className="min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 text-[13px] text-[#667085] hover:text-[#202536] transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                    >
                      <span>{copy.alreadyHaveAccountPrompt}</span>
                      <span className="font-semibold text-[#2563EB] underline underline-offset-4">
                        {copy.loginLinkAction}
                      </span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
