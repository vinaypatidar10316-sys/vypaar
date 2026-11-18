import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
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

  const theme = THEMES.jade;
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
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center ${theme.outerShell}`}
    >
      {/* World-Class Layered Architectural Ambient Background */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${theme.auroraLayer}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42] bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <main className="relative z-10 w-full max-w-md mx-auto lg:py-2 flex items-center justify-center">
        <section
          aria-label="Shop Owner Account"
          className="w-full flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[420px] lg:rounded-[38px] lg:border lg:ring-1 lg:ring-inset px-6 py-5 sm:px-7 sm:py-6 flex flex-col justify-between relative overflow-hidden ${theme.cardSurface}`}
          >
            {/* Soft top mobile handle */}
            <div aria-hidden="true" className="w-full flex items-center justify-center mb-2 shrink-0">
              <div className={`w-12 h-1 rounded-full ${theme.handleBar}`} />
            </div>

            {/* Prominent Flagship Brand Mark Header */}
            <div className="w-full flex items-center justify-center shrink-0 pt-0.5">
              <h1 className="font-display text-[27px] sm:text-[31px] font-extrabold tracking-[-0.03em] text-[#0D1A15] whitespace-nowrap leading-none select-none">
                SMART
                <span className={`${theme.wordmarkGradient} bg-clip-text text-transparent`}>
                  Vyapaar
                </span>
              </h1>
            </div>

            {activeShop ? (
              /* Authenticated Shop Owner Ready State (Google / Microsoft dashboard card aesthetic) */
              <motion.div
                key="shop-ready"
                data-testid="shop-ready-card"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-center py-4"
              >
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-2xl bg-emerald-700/20 animate-ping" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-[0_16px_32px_-10px_rgba(5,150,105,0.5)]">
                    <Store className="w-8 h-8" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 mx-auto text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>{copy.readyBadge}</span>
                </div>

                <h2 className="mt-2 font-display text-[26px] font-extrabold tracking-tight text-[#0D1A15] text-center text-balance leading-tight">
                  {activeShop.shopName}
                </h2>
                <p className="mt-1 text-[13.5px] text-stone-600 text-center max-w-[32ch] mx-auto text-balance">
                  {copy.readySubheading}
                </p>

                <dl className="mt-5 rounded-2xl border border-stone-200/90 bg-white shadow-xs divide-y divide-stone-100 overflow-hidden">
                  <div className="px-4 py-3 flex items-center justify-between gap-4 text-sm">
                    <dt className="text-stone-500 font-medium">{copy.ownerSummaryLabel}</dt>
                    <dd className="font-semibold text-[#0D1A15] truncate">{activeShop.ownerName}</dd>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between gap-4 text-sm">
                    <dt className="text-stone-500 font-medium">{copy.mobileSummaryLabel}</dt>
                    <dd className="font-mono tabular-nums font-semibold text-[#0D1A15]">
                      +91 {activeShop.phone}
                    </dd>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between gap-4 text-sm">
                    <dt className="text-stone-500 font-medium">{copy.languageSummaryLabel}</dt>
                    <dd className="font-semibold text-emerald-800">{copy.languageDisplayName}</dd>
                  </div>
                </dl>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.965 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  onClick={handleSignOut}
                  className="mt-6 w-full min-h-[48px] px-5 py-3 rounded-2xl border border-stone-300/90 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-800 font-display text-[14.5px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 shadow-xs"
                >
                  <LogOut className="w-4 h-4 shrink-0 text-stone-500" aria-hidden="true" />
                  <span>{copy.signOutLabel}</span>
                </motion.button>
              </motion.div>
            ) : (
              /* World-Class Create Account / Login Interactive Form */
              <div className="flex-1 flex flex-col justify-center mt-1">
                {/* Tagline Line Above Shop Icon */}
                <div className="w-full flex items-center justify-center mt-3 mb-5 sm:mt-3.5 sm:mb-6 shrink-0">
                  <p className="font-display text-[16px] sm:text-[18px] font-bold tracking-tight text-emerald-800/95 text-center select-none flex items-center justify-center gap-2.5 text-balance">
                    <span className="w-4 sm:w-6 h-[1.5px] bg-gradient-to-r from-transparent to-emerald-600/45 shrink-0" />
                    <span>{copy.partnerTagline}</span>
                    <span className="w-4 sm:w-6 h-[1.5px] bg-gradient-to-l from-transparent to-emerald-600/45 shrink-0" />
                  </p>
                </div>

                {/* Shop icon like in launch page between SMARTVyapaar and Welcome Back */}
                <div className="w-full flex justify-center mb-3.5 sm:mb-4 shrink-0">
                  <LaunchShopIcon size="xl" />
                </div>

                {/* Localized Heading with Uber/Google Polish */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`auth-head-${mode}-${selectedLanguage}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-1 text-center"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-[21px] sm:text-[23px] font-extrabold tracking-tight text-[#0D1A15] text-balance leading-tight text-left">
                        {mode === 'signup' ? copy.signupHeading : copy.loginHeading}
                      </h2>
                      {mode === 'signup' && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          onClick={handleFillDemo}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-[11.5px] font-semibold transition-colors cursor-pointer"
                          title="Click to fill demo store data"
                        >
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Demo Fill</span>
                        </motion.button>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-stone-600 text-left text-balance">
                      {mode === 'signup' ? copy.signupSubheading : copy.loginSubheading}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Form Fields with Uber/Google Input Focus Elevation */}
                <form onSubmit={handleSubmit} noValidate className="mt-3 space-y-2.5">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-2.5"
                    >
                      <div>
                        <label
                          htmlFor="shop-name-input"
                          className="block text-[12.5px] font-semibold text-stone-700 mb-1"
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
                          className="w-full h-11 px-3.5 rounded-xl border border-stone-300/90 bg-white text-[14.5px] text-[#0D1A15] placeholder:text-stone-400 focus:outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-600/15 transition-all shadow-2xs"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="owner-name-input"
                          className="block text-[12.5px] font-semibold text-stone-700 mb-1"
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
                          className="w-full h-11 px-3.5 rounded-xl border border-stone-300/90 bg-white text-[14.5px] text-[#0D1A15] placeholder:text-stone-400 focus:outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-600/15 transition-all shadow-2xs"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label
                      htmlFor="shop-phone-input"
                      className="block text-[12.5px] font-semibold text-stone-700 mb-1"
                    >
                      {copy.phoneLabel}
                    </label>
                    <div className="flex items-center h-11 rounded-xl border border-stone-300/90 bg-white focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-600/15 transition-all overflow-hidden shadow-2xs">
                      <span className="px-3 h-full flex items-center bg-stone-50 border-r border-stone-200/80 font-mono text-[13.5px] font-semibold text-stone-600 tabular-nums shrink-0">
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
                        className="w-full h-full px-3 bg-transparent text-[14.5px] font-mono tabular-nums text-[#0D1A15] placeholder:font-sans placeholder:text-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Accessible Validation Feedback with Google/Microsoft Alert Polish */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        className="flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200/90 px-3.5 py-2.5 text-[12.5px] font-medium text-rose-800 shadow-xs"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" aria-hidden="true" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.965 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    className="w-full min-h-[48px] mt-1 px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-display text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_16px_32px_-10px_rgba(4,120,87,0.5)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  >
                    <span>{mode === 'signup' ? copy.signupCta : copy.loginCta}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </motion.button>
                </form>

                {/* Quick Mode Switch Footer with Tactile Press Animation */}
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
                    className="min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 text-[13px] text-stone-600 hover:text-[#0D1A15] transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <span>
                      {mode === 'signup' ? copy.switchToLoginPrompt : copy.switchToSignupPrompt}
                    </span>
                    <span className="font-semibold text-emerald-700 underline underline-offset-4">
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
