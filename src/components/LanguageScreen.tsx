import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import {
  LANGUAGE_COPY,
  LANGUAGE_OPTIONS,
  LanguageCode,
  saveLanguagePreference,
} from '../utils/languageConfig';
import { THEMES } from '../utils/themeConfig';

const languageListVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.26,
      staggerChildren: 0.14,
    },
  },
};

const languageCardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface LanguageScreenProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (code: LanguageCode) => void;
  onContinue: () => void;
}

export function LanguageScreen({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
}: LanguageScreenProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const theme = THEMES.jade;
  const copy = LANGUAGE_COPY[selectedLanguage];

  const handleChooseLanguage = (code: LanguageCode) => {
    onSelectLanguage(code);
    saveLanguagePreference(code, typeof window !== 'undefined' ? window.localStorage : null);
    setIsConfirmed(false);
  };

  const handleContinue = () => {
    saveLanguagePreference(
      selectedLanguage,
      typeof window !== 'undefined' ? window.localStorage : null,
    );
    setIsConfirmed(true);
    onContinue();
  };

  return (
    <div
      data-testid="language-screen"
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center ${theme.outerShell}`}
    >
      {/* Layered Architectural Ambient Background matching Launch Screen */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${theme.auroraLayer}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42] bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <main className="relative z-10 w-full max-w-md mx-auto lg:py-4 flex items-center justify-center">
        <section
          aria-label="Language Selection"
          className="w-full flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[420px] lg:rounded-[38px] lg:border lg:ring-1 lg:ring-inset px-6 py-7 sm:px-8 sm:py-7 flex flex-col justify-between relative overflow-hidden ${theme.cardSurface}`}
          >
            {/* Soft top handle */}
            <div aria-hidden="true" className="w-full flex items-center justify-center mb-4 shrink-0">
              <div className={`w-12 h-1 rounded-full ${theme.handleBar}`} />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {/* Quiet Brand Mark Header */}
              <p className="font-display text-sm font-bold tracking-[-0.02em] text-center text-[#0D1A15]">
                SMART
                <span className={`${theme.wordmarkGradient} bg-clip-text text-transparent`}>
                  Vyapaar
                </span>
              </p>

              {/* Localized Heading & Subheading */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${selectedLanguage}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 text-center"
                >
                  <h1 className="font-display text-[26px] sm:text-[28px] font-bold tracking-tight text-[#0D1A15] text-balance leading-tight">
                    {copy.heading}
                  </h1>
                  <p className="mt-2 text-[14px] leading-relaxed text-stone-600 max-w-[34ch] mx-auto text-balance">
                    {copy.subheading}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* 3 Generous Touch-Friendly Language Cards with Staggered Entrance */}
              <motion.div
                role="radiogroup"
                aria-label="Select application language"
                variants={languageListVariants}
                initial="hidden"
                animate="visible"
                className="mt-7 space-y-3"
              >
                {LANGUAGE_OPTIONS.map((option) => {
                  const isSelected = option.code === selectedLanguage;
                  return (
                    <motion.button
                      key={option.code}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      variants={languageCardVariants}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleChooseLanguage(option.code)}
                      className={`w-full min-h-[72px] p-3.5 rounded-2xl border flex items-center gap-3.5 text-left transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${theme.focusRing} ${
                        isSelected
                          ? 'bg-emerald-50/75 border-emerald-700 ring-1 ring-emerald-700/80 shadow-[0_10px_28px_-14px_rgba(5,150,105,0.4)]'
                          : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/60'
                      }`}
                    >
                      {/* Script Glyph Emblem */}
                      <span
                        aria-hidden="true"
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-display text-lg font-bold shrink-0 transition-colors duration-200 ${
                          isSelected
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {option.scriptMark}
                      </span>

                      {/* Language Name & Unboxed Descriptor */}
                      <div className="min-w-0 flex-1">
                        <span className="block font-display text-[17px] font-semibold leading-tight text-[#0D1A15] truncate">
                          {option.nativeLabel}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] text-stone-500 truncate">
                          {option.descriptor}
                        </span>
                      </div>

                      {/* Selection Radio Indicator */}
                      <span
                        aria-hidden="true"
                        className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-700 text-white scale-100'
                            : 'border-stone-300 bg-transparent scale-95'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.75]" />}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Subtle Live Localized Preview Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.62 }}
                className="mt-5 pt-4 border-t border-stone-200/80 text-center"
              >
                <p className="text-[13px] font-medium text-stone-600 min-h-[20px]">
                  {copy.previewLine}
                </p>
              </motion.div>
            </div>

            {/* Bottom Primary Action & Confirmation */}
            <div className="mt-5 space-y-2.5 shrink-0">
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.965 }}
                onClick={handleContinue}
                className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-display text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_14px_30px_-10px_rgba(4,120,87,0.5)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <span>{copy.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </motion.button>

              <AnimatePresence>
                {isConfirmed && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-emerald-800"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{copy.savedConfirmation}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
