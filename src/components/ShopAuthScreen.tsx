import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  LogOut,
  Sparkles,
  Store,
} from 'lucide-react';
import { LanguageCode } from '../utils/languageConfig';
import { LaunchShopIcon } from './LaunchShopIcon';
import {
  AUTH_COPY,
  AuthMode,
  ShopAccount,
  clearActiveShop,
  loginShopAccount,
  normalizePhone,
  readActiveShop,
} from '../utils/shopAuth';
import { THEMES } from '../utils/themeConfig';

interface ShopAuthScreenProps {
  selectedLanguage: LanguageCode;
  onBackToLanguage?: () => void;
  onStartSetup: () => void;
}

export function ShopAuthScreen({
  selectedLanguage,
  onBackToLanguage: _onBackToLanguage,
  onStartSetup,
}: ShopAuthScreenProps) {
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const [mode, setMode] = useState<AuthMode>('login');
  const [activeShop, setActiveShop] = useState<ShopAccount | null>(() =>
    readActiveShop(storage),
  );
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const theme = THEMES.platinum;
  const copy = AUTH_COPY[selectedLanguage];

  const handleSwitchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMessage(null);
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (errorMessage) setErrorMessage(null);
  };

  const handleFillDemo = () => {
    setShopName('Patel Hyper Mart');
    setOwnerName('Rameshbhai Patel');
    setPhone('9876543210');
    setErrorMessage(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'signup') {
      onStartSetup();
      return;
    }

    const result = loginShopAccount(
      {
        phone: normalizePhone(phone),
      },
      storage,
    );
    if (!result.ok || !result.account) {
      const key = result.errorCode ?? 'account_not_found';
      setErrorMessage(copy.errors[key] ?? 'No account found for this mobile number. Please create one.');
      return;
    }
    setActiveShop(result.account);
  };

  const handleSignOut = () => {
    clearActiveShop(storage);
    setActiveShop(null);
    setErrorMessage(null);
    setMode('login');
  };

  return (
    <div
      data-testid="shop-auth-screen"
      style={{
        backgroundImage: "url('/assets/aistudio/image_66c8f664.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center transition-colors duration-300 ${theme.outerShell}`}
    >
      <main className="relative z-10 w-full max-w-md mx-auto lg:py-2 flex items-center justify-center">
        <section
          aria-label="Shop Owner Account"
          className="w-full flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundImage: "url('/assets/aistudio/image_66c8f664.png')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[420px] lg:rounded-[38px] lg:border px-6 py-5 sm:px-7 sm:py-6 flex flex-col justify-between relative overflow-y-auto lg:overflow-hidden transition-colors duration-300 ${theme.cardSurface}`}
          >
            {activeShop ? (
              <>
                <div className="w-full flex items-center justify-center shrink-0 pt-0.5">
                  <h1 className="font-display text-[24px] sm:text-[26px] font-extrabold tracking-[-0.03em] whitespace-nowrap leading-none select-none">
                    <span className="text-[#0B132B]">SMART</span>
                    <span className="text-[#2563EB]">Vyapaar</span>
                  </h1>
                </div>
                <motion.div
                  key="shop-ready"
                  data-testid="shop-ready-card"
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex flex-col justify-center py-4"
                >
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="relative w-16 h-16 rounded-2xl bg-[#0B132B] text-white flex items-center justify-center">
                      <Store className="w-8 h-8" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#16865D]/10 border border-[#16865D]/30 mx-auto text-xs font-semibold text-[#16865D]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{copy.readyBadge}</span>
                  </div>

                  <h2 className="mt-2 font-display text-[24px] font-bold tracking-tight text-[#202536] text-center text-balance leading-tight">
                    {activeShop.shopName}
                  </h2>
                  <p className="mt-1 text-[13.5px] text-[#667085] text-center max-w-[32ch] mx-auto text-balance">
                    {copy.readySubheading}
                  </p>

                  <dl className="mt-5 rounded-2xl border border-[#E6E9F0] bg-[#FFFFFF] shadow-xs divide-y divide-[#E6E9F0] overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between gap-4 text-sm">
                      <dt className="text-[#667085] font-medium">{copy.ownerSummaryLabel}</dt>
                      <dd className="font-semibold text-[#202536] truncate">{activeShop.ownerName}</dd>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between gap-4 text-sm">
                      <dt className="text-[#667085] font-medium">{copy.mobileSummaryLabel}</dt>
                      <dd className="font-mono tabular-nums font-semibold text-[#202536]">
                        +91 {activeShop.phone}
                      </dd>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between gap-4 text-sm">
                      <dt className="text-[#667085] font-medium">{copy.languageSummaryLabel}</dt>
                      <dd className="font-semibold text-[#2563EB]">{copy.languageDisplayName}</dd>
                    </div>
                  </dl>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.965 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    onClick={handleSignOut}
                    className="mt-6 w-full min-h-[48px] px-5 py-3 rounded-2xl border border-[#E6E9F0] bg-[#FFFFFF] hover:bg-[#F7F8FC] text-[#202536] font-display text-[14.5px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] shadow-xs"
                  >
                    <LogOut className="w-4 h-4 shrink-0 text-[#667085]" aria-hidden="true" />
                    <span>{copy.signOutLabel}</span>
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center">
                {/* Flagship Brand Mark Header */}
                <div className="w-full flex items-center justify-center shrink-0">
                  <h1 className="font-display text-[24px] sm:text-[26px] font-extrabold tracking-[-0.03em] whitespace-nowrap leading-none select-none">
                    <span className="text-[#0B132B]">SMART</span>
                    <span className="text-[#2563EB]">Vyapaar</span>
                  </h1>
                </div>

                {/* Tagline Line Above Shop Icon */}
                <div className="w-full flex items-center justify-center mt-7 mb-2.5 sm:mt-8 sm:mb-3 shrink-0">
                  <p className="font-display text-[15px] sm:text-[17px] font-bold tracking-tight text-[#0B132B] text-center select-none flex items-center justify-center gap-2 text-balance">
                    <span className="w-4 sm:w-6 h-[1.5px] bg-gradient-to-r from-transparent to-[#2563EB]/55 shrink-0" />
                    <span>{copy.partnerTagline}</span>
                    <span className="w-4 sm:w-6 h-[1.5px] bg-gradient-to-l from-transparent to-[#2563EB]/55 shrink-0" />
                  </p>
                </div>

                {/* Shop icon with balanced spacing above Welcome Back */}
                <div className="w-full flex justify-center mb-6 sm:mb-7 shrink-0">
                  <LaunchShopIcon size="xl" />
                </div>

                {/* Localized Heading */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`auth-head-${mode}-${selectedLanguage}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-1 text-center"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-[21px] sm:text-[23px] font-bold tracking-tight text-[#202536] text-balance leading-tight text-left">
                        {mode === 'signup' ? copy.signupHeading : copy.loginHeading}
                      </h2>
                      {mode === 'signup' && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          onClick={handleFillDemo}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#2563EB]/30 text-[#0B132B] text-[11.5px] font-semibold transition-colors cursor-pointer"
                          title="Click to fill demo store data"
                        >
                          <Sparkles className="w-3 h-3 text-[#2563EB]" />
                          <span>Demo Fill</span>
                        </motion.button>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-[#667085] text-left text-balance">
                      {mode === 'signup' ? copy.signupSubheading : copy.loginSubheading}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-2.5">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-2.5"
                    >
                      <div>
                        <label
                          htmlFor="shop-name-input"
                          className="block text-[12.5px] font-semibold text-[#202536] mb-1"
                        >
                          {copy.shopNameLabel}
                        </label>
                        <input
                          id="shop-name-input"
                          name="shopName"
                          type="text"
                          autoComplete="organization"
                          value={shopName}
                          onChange={(e) => {
                            setShopName(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder={copy.shopNamePlaceholder}
                          className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] bg-[#FFFFFF] text-[14.5px] text-[#202536] placeholder:text-[#667085]/70 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="owner-name-input"
                          className="block text-[12.5px] font-semibold text-[#202536] mb-1"
                        >
                          {copy.ownerNameLabel}
                        </label>
                        <input
                          id="owner-name-input"
                          name="ownerName"
                          type="text"
                          autoComplete="name"
                          value={ownerName}
                          onChange={(e) => {
                            setOwnerName(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder={copy.ownerNamePlaceholder}
                          className="w-full h-12 px-3.5 rounded-xl border border-[#E6E9F0] bg-[#FFFFFF] text-[14.5px] text-[#202536] placeholder:text-[#667085]/70 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label
                      htmlFor="shop-phone-input"
                      className="block text-[12.5px] font-semibold text-[#202536] mb-1"
                    >
                      {copy.phoneLabel}
                    </label>
                    <div className="flex items-center h-12 rounded-xl border border-[#E6E9F0] bg-[#FFFFFF] focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/15 transition-all overflow-hidden">
                      <span className="px-3.5 h-full flex items-center bg-[#F7F8FC] border-r border-[#E6E9F0] font-mono text-[13.5px] font-semibold text-[#667085] tabular-nums shrink-0">
                        +91
                      </span>
                      <input
                        id="shop-phone-input"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={copy.phonePlaceholder}
                        className="w-full h-full px-3.5 bg-transparent text-[14.5px] font-mono tabular-nums text-[#202536] placeholder:font-sans placeholder:text-[#667085]/70 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Validation Feedback */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        className="flex items-start gap-2.5 rounded-xl bg-[#D64545]/10 border border-[#D64545]/30 px-3.5 py-2.5 text-[12.5px] font-medium text-[#D64545]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-4 sm:pt-5">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.965 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#0B132B] text-white font-display text-[15px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                    >
                      <span>{mode === 'signup' ? copy.signupCta : copy.loginCta}</span>
                    </motion.button>
                  </div>
                </form>

                {/* Quick Mode Switch Footer */}
                <div className="mt-2 text-center">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    onClick={() => {
                      if (mode === 'login') {
                        onStartSetup();
                      } else {
                        handleSwitchMode('login');
                      }
                    }}
                    className="min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 text-[13px] text-[#667085] hover:text-[#202536] transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <span>
                      {mode === 'signup' ? copy.switchToLoginPrompt : copy.switchToSignupPrompt}
                    </span>
                    <span className="font-semibold text-[#2563EB] underline underline-offset-4">
                      {mode === 'signup' ? copy.switchToLoginAction : copy.switchToSignupAction}
                    </span>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
