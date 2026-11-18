import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { LanguageCode } from '../utils/languageConfig';
import {
  BUSINESS_CATEGORIES,
  BusinessSetupData,
  DEFAULT_BUSINESS_SETUP,
  saveBusinessProfile,
} from '../utils/businessSetup';
import { SETUP_COPY } from '../utils/setupCopy';
import { THEMES } from '../utils/themeConfig';
import { CelebrationConfetti } from './CelebrationConfetti';

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
    gstStatus: 'Not registered',
  }));

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [celebrationBurstKey, setCelebrationBurstKey] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const theme = THEMES.jade;
  const totalSteps = 6;
  const copy = SETUP_COPY[formData.preferredLanguage] ?? SETUP_COPY.en;

  const updateField = <K extends keyof BusinessSetupData>(key: K, value: BusinessSetupData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!formData.ownerName.trim() || formData.ownerName.length < 2) {
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
    }
    if (currentStep === 2) {
      if (!formData.shopName.trim() || formData.shopName.length < 2) {
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
            ? 'कृपया दुकान का पता और शहर दर्ज करें।'
            : formData.preferredLanguage === 'gu'
            ? 'કૃપા કરીને દુકાનનું સરનામું અને શહેર દાખલ કરો.'
            : 'Please enter your shop address and city.',
        );
        return;
      }
    }
    if (currentStep === 4) {
      if (formData.gstStatus === 'GST registered') {
        if (!formData.gstin || formData.gstin.trim().length < 15) {
          setErrorMessage(
            formData.preferredLanguage === 'hi'
              ? 'कृपया वैध 15-अंकों का जीएसटी नंबर दर्ज करें।'
              : formData.preferredLanguage === 'gu'
              ? 'કૃપા કરીને માન્ય 15-અંકનો જીએસટી નંબર દાખલ કરો.'
              : 'Please enter a valid 15-digit GSTIN number.',
          );
          return;
        }
      } else if (formData.gstStatus === 'Not registered') {
        if (!formData.pan || formData.pan.trim().length !== 10) {
          setErrorMessage(
            formData.preferredLanguage === 'hi'
              ? 'चूँकि आप जीएसटी पंजीकृत नहीं हैं, 10-अंकों का पैन नंबर दर्ज करना अनिवार्य है।'
              : formData.preferredLanguage === 'gu'
              ? 'ચૂંકે તમે જીએસટી નોંધાયેલ નથી, 10 અંકનો પાન નંબર દાખલ કરવો ફરજિયાત છે.'
              : 'Since you are not GST registered, entering a valid 10-character PAN number is mandatory.',
          );
          return;
        }
      }
    }

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === totalSteps) {
        setCelebrationBurstKey((k) => k + 1);
      }
    } else {
      saveBusinessProfile(formData, storage);
      onCompleteSetup(formData);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    } else {
      onBackToLogin();
    }
  };

  return (
    <div
      data-testid="business-setup-wizard"
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center ${theme.outerShell}`}
    >
      <CelebrationConfetti active={currentStep === totalSteps} burstKey={celebrationBurstKey} />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${theme.auroraLayer}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42] bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <main className="relative z-10 w-full max-w-lg mx-auto lg:py-4 flex items-center justify-center">
        <section aria-label="Business Setup Wizard" className="w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[480px] lg:rounded-[38px] lg:border lg:ring-1 lg:ring-inset px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between relative overflow-hidden ${theme.cardSurface}`}
          >
            {/* Top Handle */}
            <div aria-hidden="true" className="w-full flex items-center justify-center mb-2 shrink-0">
              <div className={`w-12 h-1 rounded-full ${theme.handleBar}`} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrevStep}
                className={`min-h-[44px] min-w-[44px] -ml-2 rounded-full flex items-center justify-center transition-colors cursor-pointer ${theme.iconBtn}`}
                aria-label={copy.back}
              >
                <ArrowLeft className="w-4.5 h-4.5" aria-hidden="true" />
              </button>

              <p className="font-display text-sm font-bold tracking-[-0.02em] text-[#0D1A15]">
                SMART
                <span className={`${theme.wordmarkGradient} bg-clip-text text-transparent`}>
                  Vyapaar
                </span>
              </p>

              <div className="w-[44px]" aria-hidden="true" />
            </div>

            <div className="flex-1 flex flex-col justify-between py-4">
              {/* Step Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                  <span>
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="text-emerald-700">
                    {copy.stepTitles[currentStep - 1]}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-700 transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="my-5 flex-1 overflow-y-auto max-h-[52vh] pr-1">
                {currentStep === 1 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#0D1A15]">
                      {copy.ownerAccountHeading}
                    </h2>
                    <p className="text-[13px] text-stone-600">{copy.ownerAccountSub}</p>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                        {copy.ownerNameLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => updateField('ownerName', e.target.value)}
                        placeholder={copy.ownerNamePlaceholder}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[14.5px] focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                        {copy.mobileLabel}
                      </label>
                      <div className="flex items-center h-11 rounded-xl border border-stone-300 bg-white focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-600/20 overflow-hidden">
                        <span className="px-3 h-full flex items-center bg-stone-50 border-r border-stone-200 font-mono text-[13.5px] font-semibold text-stone-600 tabular-nums shrink-0">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.mobileNumber}
                          onChange={(e) => {
                            updateField('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10));
                          }}
                          placeholder={copy.mobilePlaceholder}
                          className="w-full h-full px-3.5 bg-transparent font-mono text-[14.5px] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#0D1A15]">
                      {copy.shopDetailsHeading}
                    </h2>
                    <p className="text-[13px] text-stone-600">{copy.shopDetailsSub}</p>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                        {copy.shopNameLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.shopName}
                        onChange={(e) => updateField('shopName', e.target.value)}
                        placeholder={copy.shopNamePlaceholder}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[14.5px] focus:outline-none focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                        {copy.addressLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.shopAddress}
                        onChange={(e) => updateField('shopAddress', e.target.value)}
                        placeholder={copy.addressPlaceholder}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[14.5px] focus:outline-none focus:border-emerald-700 mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          placeholder={copy.cityPlaceholder}
                          className="h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[14.5px]"
                        />
                        <input
                          type="text"
                          value={formData.pinCode}
                          onChange={(e) => updateField('pinCode', e.target.value)}
                          placeholder={copy.pinPlaceholder}
                          className="h-11 px-3.5 rounded-xl border border-stone-300 bg-white font-mono text-[14.5px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#0D1A15]">
                      {copy.categoryHeading}
                    </h2>
                    <p className="text-[13px] text-stone-600">{copy.categorySub}</p>

                    <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto">
                      {BUSINESS_CATEGORIES.map((cat) => {
                        const isSelected = formData.categories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`p-3 rounded-xl border text-left font-display text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-700 ring-1 ring-emerald-700 text-[#0D1A15]'
                                : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#0D1A15]">
                      {copy.legalHeading}
                    </h2>
                    <p className="text-[13px] text-stone-600">{copy.legalSub}</p>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                        {copy.gstStatusLabel}
                      </label>
                      <select
                        value={formData.gstStatus}
                        onChange={(e) => updateField('gstStatus', e.target.value as any)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[14.5px]"
                      >
                        <option value="Not registered">Not registered (Non-GST)</option>
                        <option value="GST registered">GST Registered</option>
                      </select>
                    </div>

                    {formData.gstStatus === 'GST registered' ? (
                      <div>
                        <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                          {copy.gstinLabel}
                        </label>
                        <input
                          type="text"
                          maxLength={15}
                          value={formData.gstin}
                          onChange={(e) => updateField('gstin', e.target.value.toUpperCase())}
                          placeholder="e.g. 24AAAAA0000A1Z5"
                          className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white font-mono text-[14.5px]"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[12.5px] font-semibold text-stone-700 mb-1">
                          {copy.panLabel}
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          value={formData.pan}
                          onChange={(e) => updateField('pan', e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                          className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white font-mono text-[14.5px]"
                        />
                        <p className="mt-1 text-[11.5px] text-amber-700 font-medium">
                          PAN number is mandatory when GST registration is Not Registered.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-3.5">
                    <h2 className="font-display text-[20px] font-bold text-[#0D1A15]">
                      {copy.inventoryHeading}
                    </h2>
                    <p className="text-[13px] text-stone-600">{copy.inventorySub}</p>

                    <div className="space-y-2.5">
                      <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                        <span className="text-sm font-medium text-stone-800">
                          {copy.maintainStockCheck}
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.maintainStock}
                          onChange={(e) => updateField('maintainStock', e.target.checked)}
                          className="w-5 h-5 accent-emerald-700 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                        <span className="text-sm font-medium text-stone-800">
                          {copy.barcodesCheck}
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.useBarcodes}
                          onChange={(e) => updateField('useBarcodes', e.target.checked)}
                          className="w-5 h-5 accent-emerald-700 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                        <span className="text-sm font-medium text-stone-800">
                          {copy.weightCheck}
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.sellByWeight}
                          onChange={(e) => updateField('sellByWeight', e.target.checked)}
                          className="w-5 h-5 accent-emerald-700 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                        <span className="text-sm font-medium text-stone-800">
                          {copy.lowStockCheck}
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.lowStockAlerts}
                          onChange={(e) => updateField('lowStockAlerts', e.target.checked)}
                          className="w-5 h-5 accent-emerald-700 rounded"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3.5 text-center py-2"
                  >
                    <div className="relative w-14 h-14 mx-auto">
                      <motion.div
                        aria-hidden="true"
                        initial={{ scale: 0.75, opacity: 0.7 }}
                        animate={{ scale: 1.65, opacity: 0 }}
                        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 rounded-2xl bg-emerald-500/35 ring-2 ring-amber-400/50"
                      />
                      <motion.div
                        initial={{ scale: 0.65, rotate: -8 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 18, delay: 0.06 }}
                        className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-[0_14px_28px_-8px_rgba(5,150,105,0.5)]"
                      >
                        <CheckCircle2 className="w-7 h-7" />
                      </motion.div>
                    </div>
                    <h2 className="font-display text-[22px] font-bold text-[#0D1A15]">
                      {copy.readyHeading}
                    </h2>
                    <p className="text-[13.5px] text-stone-600 max-w-[32ch] mx-auto">
                      {formData.preferredLanguage === 'hi'
                        ? `आपका स्टोर ${formData.shopName || 'रिटेल काउंटर'} पूरी तरह से सेट हो गया है।`
                        : formData.preferredLanguage === 'gu'
                        ? `તમારો સ્ટોર ${formData.shopName || 'રિટેલ કાઉન્ટર'} પૂરી રીતે સેટ થઈ ગયો છે.`
                        : `Your store `}
                      {formData.preferredLanguage === 'en' && (
                        <span className="font-semibold text-stone-900">
                          {formData.shopName || 'Retail Counter'}
                        </span>
                      )}
                      {formData.preferredLanguage === 'en' && ` is fully configured. `}
                      {copy.readySub}
                    </p>

                    <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-1.5 text-emerald-900">
                      <div className="flex justify-between">
                        <span>{formData.preferredLanguage === 'hi' ? 'मालिक:' : formData.preferredLanguage === 'gu' ? 'માલિક:' : 'Owner:'}</span>
                        <strong className="font-semibold">{formData.ownerName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>{formData.preferredLanguage === 'hi' ? 'मोबाइल:' : formData.preferredLanguage === 'gu' ? 'મોબાઇલ:' : 'Mobile:'}</span>
                        <strong className="font-mono">+91 {formData.mobileNumber}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>{formData.preferredLanguage === 'hi' ? 'श्रेणी:' : formData.preferredLanguage === 'gu' ? 'શ્રેણી:' : 'Category:'}</span>
                        <strong className="font-semibold">{formData.categories.join(', ')}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Error Banner */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800"
                  >
                    <HelpCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons with Tactile Press-Scale Animation */}
              <div className="flex gap-2.5 shrink-0">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    onClick={handlePrevStep}
                    className="w-1/3 min-h-[48px] rounded-2xl border border-stone-300 bg-white font-semibold text-stone-700 cursor-pointer"
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
                  className="flex-1 min-h-[48px] rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-display font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{currentStep === totalSteps ? copy.openDashboard : copy.saveAndContinue}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
