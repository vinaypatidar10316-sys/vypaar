import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, CheckCircle2 } from 'lucide-react';
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
      delayChildren: 0.16,
      staggerChildren: 0.1,
    },
  },
};

const languageCardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
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
  const theme = THEMES.platinum;
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
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center transition-colors duration-300 ${theme.outerShell}`}
    >
      <main className="relative z-10 w-full max-w-md mx-auto lg:py-4 flex items-center justify-center">
        <section
          aria-label="Language Selection"
          className="w-full flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[420px] lg:rounded-[38px] lg:border flex flex-col justify-between relative overflow-y-auto lg:overflow-hidden transition-colors duration-300 ${theme.cardSurface}`}
          >
            {/* Upper area with background image up to the line above welcome line */}
            <div
              style={{
                backgroundImage: "url('/assets/aistudio/image_04fe245c.png')",
                backgroundSize: '100% 100%',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
              }}
              className="flex-1 flex flex-col border-b border-[#E6E9F0]"
            >
              {/* Full-bleed Banner Image with SMARTVyapaar brand header overlay above shop */}
              <div className="w-full shrink-0 relative">
                <img
                  src="/assets/aistudio/image_e76edc4f.png"
                  alt="SMARTVyapaar — Storefront and growth illustration"
                  className="w-full h-auto block select-none pointer-events-none"
                />

                {/* Brand header above shop as on launch app & language page */}
                <div className="absolute inset-x-0 top-0 pt-7 sm:pt-9 flex flex-col items-center text-center px-4 pointer-events-none select-none">
                  <h1 className="font-display text-[23px] sm:text-[26px] font-extrabold tracking-[-0.03em] leading-none">
                    <span className="text-[#0B132B]">SMART</span>
                    <span className="text-[#2563EB]">Vyapaar</span>
                  </h1>
                  <p className="mt-1 text-[13px] sm:text-[14px] font-medium text-[#475467] tracking-tight">
                    Business, beautifully simplified.
                  </p>
                  <div
                    aria-hidden="true"
                    className="mt-1.5 sm:mt-2 w-20 sm:w-24 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-80"
                  />
                </div>

                {/* Below shop ON IMAGE: Choose Your Language heading and descriptor */}
                <div className="absolute inset-x-0 bottom-0 pb-2 sm:pb-3 flex flex-col items-center text-center px-4 pointer-events-none select-none">
                  <h2 className="font-display text-[20px] sm:text-[22px] font-extrabold text-[#0B132B] tracking-[-0.02em] leading-tight">
                    Choose Your Language
                  </h2>
                  <p className="mt-0.5 sm:mt-1 text-[12px] sm:text-[13px] text-[#475467] leading-snug max-w-[34ch] mx-auto">
                    Select your preferred language for{' '}
                    <span className="font-semibold text-[#2563EB]">
                      billing, inventory, and store insights.
                    </span>
                  </p>
                </div>
              </div>

              {/* 3 Generous Touch-Friendly Language Cards */}
              <div className="flex-1 flex flex-col justify-center px-6 pt-3 pb-3.5 sm:px-8 sm:pt-3.5 sm:pb-4">
                <motion.div
                  role="radiogroup"
                  aria-label="Select application language"
                  variants={languageListVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2.5"
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
                      className={`w-full min-h-[66px] sm:min-h-[70px] p-3 sm:p-3.5 rounded-2xl border flex items-center gap-3.5 text-left transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${theme.focusRing} ${
                        isSelected
                          ? 'bg-[#E9EEFF] border-[#526DE5]'
                          : 'bg-[#FFFFFF] border-[#E6E9F0] hover:border-[#8195F5]/60 hover:bg-[#F7F8FC]'
                      }`}
                    >
                      {/* Script Glyph Emblem */}
                      <span
                        aria-hidden="true"
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-display text-lg font-bold shrink-0 transition-colors duration-200 ${
                          isSelected
                            ? 'bg-[#526DE5] text-white'
                            : 'bg-[#F7F8FC] text-[#253B80]'
                        }`}
                      >
                        {option.scriptMark}
                      </span>

                      {/* Language Name & Unboxed Descriptor */}
                      <div className="min-w-0 flex-1">
                        <span className="block font-display text-[17px] font-semibold leading-tight text-[#202536] truncate">
                          {option.nativeLabel}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] text-[#667085] truncate">
                          {option.descriptor}
                        </span>
                      </div>

                      {/* Selection Radio Indicator */}
                      <span
                        aria-hidden="true"
                        className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? 'border-[#526DE5] bg-[#526DE5] text-white scale-100'
                            : 'border-[#E6E9F0] bg-transparent scale-95'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.75]" />}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
              </div>
            </div>

            {/* Lower area below the line above welcome line */}
            <div className="px-6 py-4 sm:px-8 sm:py-5 bg-[#FFFFFF] shrink-0">
              {/* Subtle Live Localized Preview Line (Welcome Line) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.36 }}
                className="text-center"
              >
                <p className="text-[13px] font-medium text-[#667085] min-h-[20px]">
                  {copy.previewLine}
                </p>
              </motion.div>

              {/* Bottom Primary Action & Confirmation */}
              <div className="mt-3.5 space-y-2 shrink-0">
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.965 }}
                  onClick={handleContinue}
                  className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-[#526DE5] hover:bg-[#3F59D2] active:bg-[#253B80] text-white font-display text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526DE5] focus-visible:ring-offset-2"
                >
                  <span>{copy.ctaLabel}</span>
                </motion.button>

                <AnimatePresence>
                  {isConfirmed && (
                    <motion.p
                      role="status"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#16865D]"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{copy.savedConfirmation}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
