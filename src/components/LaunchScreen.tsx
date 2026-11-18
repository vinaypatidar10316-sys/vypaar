import { PointerEvent, useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ShopFocusMode, ShopIllustration } from './ShopIllustration';
import { THEMES } from '../utils/themeConfig';

const VERB_ITEMS: { id: ShopFocusMode; label: string }[] = [
  { id: 'manage', label: 'Manage' },
  { id: 'sell', label: 'Sell' },
  { id: 'grow', label: 'Grow' },
];

export function LaunchScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const theme = THEMES.jade;

  const titlePointerX = useMotionValue(0);
  const titlePointerY = useMotionValue(0);
  const smoothTitleX = useSpring(titlePointerX, { stiffness: 220, damping: 20, mass: 0.6 });
  const smoothTitleY = useSpring(titlePointerY, { stiffness: 220, damping: 20, mass: 0.6 });
  const titleRotateY = useTransform(smoothTitleX, [-0.5, 0.5], [-7, 7]);
  const titleRotateX = useTransform(smoothTitleY, [-0.5, 0.5], [6, -6]);
  const titleOffsetX = useTransform(smoothTitleX, [-0.5, 0.5], [-4.5, 4.5]);
  const titleOffsetY = useTransform(smoothTitleY, [-0.5, 0.5], [-3, 3]);

  const handleTitlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse') return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    titlePointerX.set(nx);
    titlePointerY.set(ny);
  };

  const handleTitlePointerLeave = () => {
    titlePointerX.set(0);
    titlePointerY.set(0);
  };

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % VERB_ITEMS.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [isAutoCycling]);

  const activeMode = VERB_ITEMS[activeIndex].id;

  const handleSelectVerb = (idx: number) => {
    setActiveIndex(idx);
    setIsAutoCycling(false);
  };

  return (
    <div
      data-theme="jade"
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-center transition-colors duration-500 ${theme.outerShell}`}
    >
      {/* Layered Architectural Ambient Background */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${theme.auroraLayer}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42] dark:opacity-[0.2] bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <main className="relative z-10 w-full max-w-md mx-auto lg:py-4 flex items-center justify-center">
        {/* Primary Mobile App Launch Surface */}
        <section
          aria-label="SMARTVyapaar Mobile Welcome Screen"
          className="w-full flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full min-h-dvh lg:min-h-0 lg:max-w-[420px] lg:rounded-[38px] lg:border lg:ring-1 lg:ring-inset px-6 py-7 sm:px-8 sm:py-7 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-500 ${theme.cardSurface}`}
          >
            {/* Subtle interior stage spotlight behind storefront */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-all duration-700 ${theme.stageSpotlight}`}
            />

            {/* Clean centered top mobile handle */}
            <div aria-hidden="true" className="relative z-10 w-full flex items-center justify-center mb-5 shrink-0">
              <div className={`w-12 h-1 rounded-full ${theme.handleBar}`} />
            </div>

            {/* 1. TOP: SMARTVyapaar (Desktop magnetic cursor-tilt title block) */}
            <div
              data-testid="magnetic-title-zone"
              onPointerMove={handleTitlePointerMove}
              onPointerLeave={handleTitlePointerLeave}
              style={{ perspective: 700 }}
              className="relative z-10 px-6 py-3 -mx-6 -my-3 rounded-2xl select-none"
            >
              <motion.h1
                data-testid="magnetic-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  rotateX: titleRotateX,
                  rotateY: titleRotateY,
                  x: titleOffsetX,
                  y: titleOffsetY,
                  transformStyle: 'preserve-3d',
                }}
                className={`font-display text-[34px] sm:text-[36px] font-extrabold tracking-[-0.03em] leading-none will-change-transform transition-colors duration-500 ${theme.wordmarkPrimary}`}
              >
                SMART
                <span className={`${theme.wordmarkGradient} bg-clip-text text-transparent`}>
                  Vyapaar
                </span>
              </motion.h1>
            </div>

            {/* 2. BELOW IT: Manage Sell Grow */}
            <motion.nav
              aria-label="Core store capabilities"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-6 flex items-center justify-center gap-6"
            >
              {VERB_ITEMS.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectVerb(idx)}
                    aria-pressed={isActive}
                    className={`relative py-2 px-1.5 font-display text-[18px] sm:text-[19px] font-semibold tracking-tight transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${theme.focusRing} rounded-md ${
                      isActive
                        ? `${theme.verbActiveText} opacity-100`
                        : `${theme.verbInactiveText} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <motion.span
                      animate={{ y: isActive ? -1.5 : 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                      className="inline-block"
                    >
                      {item.label}
                    </motion.span>
                    {isActive && (
                      <motion.span
                        layoutId="verb-active-bar"
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        className={`absolute left-0 right-0 bottom-0 h-[2.5px] rounded-full ${theme.verbActiveBar}`}
                      />
                    )}
                  </button>
                );
              })}
            </motion.nav>

            {/* 3. BELOW IT: Two-line tagline — lighter "Your Complete" + bolder "Business Partner" */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-6 flex flex-col items-center leading-tight"
            >
              <span className={`block text-[14px] font-normal tracking-[0.03em] transition-colors duration-500 ${theme.taglineMuted}`}>
                Your Complete
              </span>
              <span className={`block mt-1 font-display text-[19px] sm:text-[20px] font-bold tracking-tight transition-colors duration-500 ${theme.taglineBold}`}>
                Business Partner
              </span>
            </motion.p>

            {/* 4. CURVED SMILE UNDERLINE BELOW Business Partner */}
            <div
              aria-hidden="true"
              className="relative z-10 mt-2.5 flex flex-col items-center justify-center"
            >
              <svg
                viewBox="0 0 220 26"
                fill="none"
                className="w-52 h-6 overflow-visible"
              >
                <defs>
                  <linearGradient id="sv-smile-grad-light" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={theme.smileLightStops[0]} />
                    <stop offset="52%" stopColor={theme.smileLightStops[1]} />
                    <stop offset="100%" stopColor={theme.smileLightStops[2]} />
                  </linearGradient>
                  <linearGradient id="sv-smile-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Soft luminous back-glow for the smile curve */}
                <motion.path
                  d="M 18 8 Q 110 23.5 202 8"
                  stroke={theme.smileGlowLight}
                  strokeOpacity={0.18}
                  strokeWidth={6}
                  strokeLinecap="round"
                  style={{ filter: 'blur(3.5px)' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3, delay: 0.22 },
                  }}
                />

                {/* Soft secondary echo arc for architectural depth */}
                <motion.path
                  d="M 54 15.5 Q 110 23.5 166 15.5"
                  stroke={theme.smileEchoLight}
                  strokeOpacity={0.24}
                  strokeWidth={1.15}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.65, delay: 0.34, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.25, delay: 0.34 },
                  }}
                />

                {/* Primary gentle upward smile arc with draw-in + ambient pulse */}
                <motion.path
                  d="M 12 7 Q 110 23 208 7"
                  stroke="url(#sv-smile-grad-light)"
                  strokeWidth={2.75}
                  strokeLinecap="round"
                  className="animate-sv-curve-pulse"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.22, delay: 0.22 },
                  }}
                />

                {/* Subtle traveling shimmer pulse after draw-in completes */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.96 }}
                >
                  <path
                    d="M 12 7 Q 110 23 208 7"
                    pathLength={100}
                    stroke="url(#sv-smile-shimmer-grad)"
                    strokeWidth={2.75}
                    strokeLinecap="round"
                    strokeDasharray="24 100"
                    className="animate-sv-curve-shimmer"
                  />
                </motion.g>
              </svg>
            </div>

            {/* 5. BELOW IT: Interactive 3D Tilt Shop */}
            <div className="relative z-10 mt-6 w-full flex justify-center">
              <ShopIllustration
                focusMode={activeMode}
                themeId={theme.shopTheme}
                isDarkSurface={false}
              />
            </div>

            {/* 6. TAPERED LUMINOUS BLINKING LINE ABOVE Building Smarter Business Experience */}
            <div
              aria-hidden="true"
              className="relative z-10 mt-5 w-52 h-5 flex items-center justify-center"
            >
              {/* Ultra-thin horizon hairline that fades smoothly to edges */}
              <span className={`absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent ${theme.horizonHairline} to-transparent transition-colors duration-500`} />
              {/* Synchronized ambient light aura */}
              <span className={`absolute w-40 h-2.5 rounded-full blur-[6px] bg-gradient-to-r from-transparent ${theme.blinkingAura} to-transparent animate-sv-blink-aura`} />
              {/* Primary tapered blinking beam with center filament & sweeping glint */}
              <span className={`relative w-44 h-[2.5px] rounded-full overflow-hidden bg-gradient-to-r from-transparent ${theme.blinkingBeamOuter} to-transparent animate-sv-blink-line`}>
                <span className={`absolute inset-y-0 left-[22%] right-[22%] rounded-full bg-gradient-to-r ${theme.blinkingBeamCore}`} />
                <span className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent via-white/95 to-transparent animate-sv-glint-sweep" />
              </span>
            </div>

            {/* 7. BELOW BLINKING LINE: Building Smarter Business Experience */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 mt-4 text-[15px] font-semibold tracking-[0.015em] max-w-[28ch] text-balance transition-colors duration-500 ${theme.footerText}`}
            >
              Building Smarter Business Experience
            </motion.p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
