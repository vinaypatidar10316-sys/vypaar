import { MouseEvent, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export type ShopFocusMode = 'manage' | 'sell' | 'grow';
export type ShopThemeId = 'grocery' | 'apparel' | 'electronics' | 'bakery';

interface ShopThemePalette {
  awningMain: string;
  awningDark: string;
  roofTop: string;
  roofBottom: string;
  doorTop: string;
  doorBottom: string;
  wainscotTop: string;
  wainscotBottom: string;
  signBg: string;
  accentHighlight: string;
}

const THEME_PALETTES: Record<ShopThemeId, ShopThemePalette> = {
  grocery: {
    awningMain: '#059669',
    awningDark: '#047857',
    roofTop: '#0C1A14',
    roofBottom: '#1E3B2F',
    doorTop: '#065F46',
    doorBottom: '#042F2E',
    wainscotTop: '#1B362C',
    wainscotBottom: '#0C1914',
    signBg: '#065F46',
    accentHighlight: '#A7F3D0',
  },
  apparel: {
    awningMain: '#3730A3',
    awningDark: '#312E81',
    roofTop: '#0B1026',
    roofBottom: '#1E1B4B',
    doorTop: '#312E81',
    doorBottom: '#1E1B4B',
    wainscotTop: '#312E81',
    wainscotBottom: '#0F172A',
    signBg: '#1E1B4B',
    accentHighlight: '#C7D2FE',
  },
  electronics: {
    awningMain: '#0F766E',
    awningDark: '#115E59',
    roofTop: '#091517',
    roofBottom: '#132A2E',
    doorTop: '#115E59',
    doorBottom: '#082F2C',
    wainscotTop: '#134E4A',
    wainscotBottom: '#042F2E',
    signBg: '#115E59',
    accentHighlight: '#99F6E4',
  },
  bakery: {
    awningMain: '#C2410C',
    awningDark: '#9A3412',
    roofTop: '#23120B',
    roofBottom: '#431D10',
    doorTop: '#7C2D12',
    doorBottom: '#431407',
    wainscotTop: '#7C2D12',
    wainscotBottom: '#431407',
    signBg: '#7C2D12',
    accentHighlight: '#FDE68A',
  },
};

interface ShopIllustrationProps {
  focusMode?: ShopFocusMode;
  themeId?: ShopThemeId;
  isDarkSurface?: boolean;
  onInteract?: (lightsWarm: boolean) => void;
}

export function ShopIllustration({
  focusMode = 'manage',
  themeId = 'grocery',
  isDarkSurface = false,
  onInteract,
}: ShopIllustrationProps) {
  const [lightsWarm, setLightsWarm] = useState(true);
  const [rippleKey, setRippleKey] = useState(0);

  const palette = THEME_PALETTES[themeId];
  const illuminated = lightsWarm || isDarkSurface;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 22 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6.5, 6.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5.5, -5.5]);

  const handlePointerMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleToggleLights = () => {
    const next = !lightsWarm;
    setLightsWarm(next);
    setRippleKey((prev) => prev + 1);
    onInteract?.(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
      style={{ perspective: 900 }}
      className="relative flex flex-col items-center justify-center w-full select-none py-2"
    >
      {/* Dynamic Atmospheric Stage Halo behind Storefront */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-4 top-1 bottom-1 rounded-full blur-2xl transition-all duration-700 animate-sv-breathe ${
          themeId === 'apparel'
            ? isDarkSurface
              ? 'bg-gradient-to-b from-indigo-400/25 via-amber-400/15 to-transparent opacity-100'
              : illuminated
              ? 'bg-gradient-to-b from-indigo-200/45 via-amber-100/35 to-transparent opacity-100'
              : 'bg-gradient-to-b from-slate-200/45 via-indigo-900/10 to-transparent opacity-70'
            : themeId === 'bakery'
            ? isDarkSurface
              ? 'bg-gradient-to-b from-amber-400/25 via-orange-500/20 to-transparent opacity-100'
              : illuminated
              ? 'bg-gradient-to-b from-amber-200/50 via-orange-100/40 to-transparent opacity-100'
              : 'bg-gradient-to-b from-stone-200/45 via-orange-900/10 to-transparent opacity-70'
            : isDarkSurface
            ? 'bg-gradient-to-b from-amber-400/25 via-emerald-500/20 to-transparent opacity-100'
            : illuminated
            ? focusMode === 'grow'
              ? 'bg-gradient-to-b from-amber-200/55 via-emerald-200/35 to-transparent opacity-100'
              : focusMode === 'sell'
              ? 'bg-gradient-to-b from-emerald-200/45 via-teal-100/40 to-transparent opacity-100'
              : 'bg-gradient-to-b from-emerald-200/35 via-amber-100/35 to-transparent opacity-100'
            : 'bg-gradient-to-b from-slate-200/45 via-emerald-900/10 to-transparent opacity-70'
        }`}
      />

      {/* Interactive Chime & Ripple Waves on Tap */}
      <AnimatePresence>
        {rippleKey > 0 && (
          <>
            <motion.span
              key={`ripple-a-${rippleKey}`}
              aria-hidden="true"
              initial={{ opacity: 0.55, scale: 0.72 }}
              animate={{ opacity: 0, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute w-64 h-48 rounded-full border-2 border-emerald-500/50"
            />
            <motion.span
              key={`ripple-b-${rippleKey}`}
              aria-hidden="true"
              initial={{ opacity: 0.35, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.38 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute w-64 h-48 rounded-full border border-amber-500/45"
            />
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleToggleLights}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        aria-label={
          illuminated
            ? 'Interactive 3D storefront with warm lights on, tap to toggle shop lights'
            : 'Interactive 3D storefront in daylight, tap to illuminate warm shop lights'
        }
        className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 rounded-3xl p-1 cursor-pointer"
      >
        <svg
          viewBox="0 0 340 256"
          className="w-[280px] sm:w-[308px] h-auto drop-shadow-[0_24px_38px_rgba(6,78,59,0.16)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sv-facade" x1="170" y1="38" x2="170" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isDarkSurface ? '#F3F4EF' : '#FFFFFF'} />
              <stop offset="100%" stopColor={isDarkSurface ? '#D7DBD2' : '#EAEAE3'} />
            </linearGradient>
            <linearGradient id="sv-wainscot" x1="120" y1="184" x2="120" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={palette.wainscotTop} />
              <stop offset="100%" stopColor={palette.wainscotBottom} />
            </linearGradient>
            <linearGradient id="sv-window-glow" x1="120" y1="106" x2="120" y2="184" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={illuminated ? '#FEF9C3' : '#F1F5F9'} />
              <stop offset="52%" stopColor={illuminated ? '#FDE68A' : '#E2E8F0'} />
              <stop offset="100%" stopColor={illuminated ? '#FCD34D' : '#CBD5E1'} />
            </linearGradient>
            <radialGradient id="sv-lamp-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sv-pavement-spill" x1="130" y1="218" x2="130" y2="244" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity={isDarkSurface ? '0.5' : '0.3'} />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sv-sconce-beam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity={isDarkSurface ? '0.32' : '0.2'} />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sv-door-glass" x1="238" y1="106" x2="238" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={palette.doorTop} />
              <stop offset="100%" stopColor={palette.doorBottom} />
            </linearGradient>
            <linearGradient id="sv-roof" x1="170" y1="14" x2="170" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={palette.roofTop} />
              <stop offset="100%" stopColor={palette.roofBottom} />
            </linearGradient>
            <linearGradient id="sv-awning-green" x1="170" y1="53" x2="170" y2="87" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={palette.awningMain} />
              <stop offset="100%" stopColor={palette.awningDark} />
            </linearGradient>
            <clipPath id="sv-window-clip">
              <rect x="64" y="106" width="132" height="76" rx="8" />
            </clipPath>
          </defs>

          {/* Ground Ambient Occlusion Shadow & Terrazzo Curb */}
          <ellipse
            cx="170"
            cy="232"
            rx="150"
            ry="10"
            fill={isDarkSurface ? '#000000' : '#0F172A'}
            fillOpacity={isDarkSurface ? '0.45' : '0.08'}
          />
          <rect
            x="18"
            y="220"
            width="304"
            height="9"
            rx="4.5"
            fill={isDarkSurface ? '#2A3A33' : '#D5DDD7'}
          />
          <rect
            x="200"
            y="215"
            width="76"
            height="5"
            rx="2.5"
            fill={isDarkSurface ? '#3B4F46' : '#BFCAC1'}
          />

          {/* Warm Interior Light Spill onto Sidewalk */}
          {illuminated && (
            <path d="M62 220H198L216 244H44L62 220Z" fill="url(#sv-pavement-spill)" />
          )}

          {/* Woven Welcome Doormat */}
          <rect x="212" y="216" width="52" height="4" rx="1.5" fill="#92400E" fillOpacity="0.78" />

          {/* Main Architectural Building Shell */}
          <rect
            x="44"
            y="44"
            width="252"
            height="176"
            rx="12"
            fill="url(#sv-facade)"
            stroke={isDarkSurface ? '#52665D' : '#C9D4CC'}
            strokeWidth="1.5"
          />

          {/* Subtle Masonry Joint Lines */}
          <line x1="45" y1="98" x2="295" y2="98" stroke="#DCE3DD" strokeWidth="1" />
          <line x1="58" y1="101" x2="282" y2="101" stroke="#E5E9E3" strokeWidth="0.8" />

          {/* Fluted Side Pilasters & Capitals */}
          <rect x="44" y="88" width="14" height="132" fill="#E0E5DE" />
          <rect x="47.5" y="96" width="2" height="116" rx="1" fill="#C9D2CA" />
          <rect x="52" y="96" width="2" height="116" rx="1" fill="#C9D2CA" />

          <rect x="282" y="88" width="14" height="132" fill="#E0E5DE" />
          <rect x="285.5" y="96" width="2" height="116" rx="1" fill="#C9D2CA" />
          <rect x="290" y="96" width="2" height="116" rx="1" fill="#C9D2CA" />

          {/* Brass Awning Side-Arm Support Brackets */}
          <path d="M38 87L50 98" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M302 87L290 98" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />

          {/* Stepped Art-Deco Parapet & Moulded Cornice */}
          <rect x="66" y="10" width="208" height="8" rx="4" fill={palette.roofTop} fillOpacity="0.94" />
          <rect x="32" y="16" width="276" height="36" rx="11" fill="url(#sv-roof)" />
          <rect x="38" y="21" width="264" height="2.5" rx="1.25" fill="#FFFFFF" fillOpacity="0.16" />
          <rect
            x="92"
            y="27"
            width="156"
            height="18"
            rx="5.5"
            fill={palette.signBg}
            stroke={focusMode === 'grow' ? '#FBBF24' : '#34D399'}
            strokeOpacity={focusMode === 'grow' ? '0.95' : '0.62'}
            strokeWidth="1.35"
          />
          <motion.rect
            x="104"
            y="34"
            width="66"
            height="4"
            rx="2"
            fill={palette.accentHighlight}
            animate={{ opacity: focusMode === 'manage' ? 1 : 0.78 }}
            transition={{ duration: 0.3 }}
          />
          <motion.rect
            x="176"
            y="34"
            width="60"
            height="4"
            rx="2"
            fill="#FBBF24"
            animate={{ opacity: focusMode === 'grow' ? 1 : 0.75 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cast Shadow Under Awning */}
          <rect x="44" y="88" width="252" height="10" fill="#064E3B" fillOpacity="0.12" />

          {/* Storefront Striped Boutique Awning */}
          <motion.g
            key={`awning-${rippleKey}-${themeId}`}
            initial={{ scaleY: 0.88, opacity: 0.85 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            style={{ transformOrigin: '170px 53px' }}
          >
            <path d="M30 53H310L322 87H18L30 53Z" fill="url(#sv-awning-green)" />
            <path d="M54 53H85L79 87H44L54 53Z" fill="#FAF9F6" />
            <path d="M116 53H147L144 87H111L116 53Z" fill="#FAF9F6" />
            <path d="M178 53H209L211 87H178L178 53Z" fill="#FAF9F6" />
            <path d="M240 53H271L279 87H245L240 53Z" fill="#FAF9F6" />
            <path d="M30 53H310" stroke="#FFFFFF" strokeOpacity="0.38" strokeWidth="1.5" />

            {[18, 51.7, 85.4, 119.1, 152.8, 186.5, 220.2, 253.9, 287.6].map((x, idx) => (
              <path
                key={x}
                d={`M${x} 87C${x} 95.5 ${x + 33.7} 95.5 ${x + 33.7} 87H${x}Z`}
                fill={idx % 2 === 0 ? palette.awningDark : '#E7E5E0'}
              />
            ))}
          </motion.g>

          {/* Left Showcase Window Frame */}
          <rect
            x="64"
            y="106"
            width="132"
            height="76"
            rx="8"
            fill="url(#sv-window-glow)"
            stroke={focusMode === 'manage' ? '#10B981' : '#94A3B8'}
            strokeOpacity={focusMode === 'manage' ? '0.75' : '0.45'}
            strokeWidth="1.7"
          />

          {/* Fluted Timber Wainscoting Below Window */}
          <rect x="64" y="185" width="132" height="35" rx="4" fill="url(#sv-wainscot)" />
          {[76, 90, 104, 118, 132, 146, 160, 174].map((x) => (
            <rect key={x} x={x} y="190" width="6.5" height="25" rx="2" fill="#FFFFFF" fillOpacity="0.09" />
          ))}

          {/* Window Interior Clipped Scene */}
          <g clipPath="url(#sv-window-clip)">
            {[78, 94, 110, 126, 142, 158, 174].map((x) => (
              <line
                key={x}
                x1={x}
                y1="106"
                x2={x}
                y2="182"
                stroke="#B45309"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            ))}

            {/* Interior Pendant Lamps & Warm Halos */}
            {illuminated && (
              <>
                <circle cx="98" cy="120" r="28" fill="url(#sv-lamp-halo)" />
                <circle cx="158" cy="120" r="28" fill="url(#sv-lamp-halo)" />
              </>
            )}
            <line x1="98" y1="106" x2="98" y2="115" stroke="#78350F" strokeWidth="1.4" />
            <path d="M90.5 115H105.5L102 109.5H94L90.5 115Z" fill="#1E293B" />
            <circle cx="98" cy="116.5" r="2.6" fill={illuminated ? '#FFFBEB' : '#94A3B8'} />

            <line x1="158" y1="106" x2="158" y2="115" stroke="#78350F" strokeWidth="1.4" />
            <path d="M150.5 115H165.5L162 109.5H154L150.5 115Z" fill="#1E293B" />
            <circle cx="158" cy="116.5" r="2.6" fill={illuminated ? '#FFFBEB' : '#94A3B8'} />

            {/* Hanging Botanical Corner Fern */}
            <circle cx="71" cy="113" r="4" fill="#10B981" fillOpacity="0.72" />
            <circle cx="76" cy="116" r="3.2" fill="#059669" fillOpacity="0.72" />

            {/* Interior Display Shelves */}
            <rect x="72" y="143" width="116" height="3.5" rx="1.75" fill="#92400E" fillOpacity="0.75" />
            <rect x="72" y="169" width="116" height="3.5" rx="1.75" fill="#92400E" fillOpacity="0.75" />

            {/* Top Shelf Artisan Goods */}
            <rect x="78" y="125" width="15" height="18" rx="3" fill="#059669" />
            <rect x="80.5" y="122" width="10" height="3" rx="1.5" fill="#D97706" />
            <rect x="99" y="128" width="14" height="15" rx="2.5" fill="#D97706" />
            <rect x="119" y="123" width="19" height="20" rx="3.5" fill="#14231D" />
            <rect x="144" y="127" width="19" height="16" rx="2.5" fill="#0D9488" />
            <rect x="148.5" y="124" width="10" height="3" rx="1.5" fill="#FDE68A" />
            <circle cx="174" cy="134" r="7.5" fill="#EA580C" fillOpacity="0.92" />

            {/* Bottom Shelf Folded Goods & Baskets */}
            <rect x="78" y="153" width="25" height="16" rx="3.5" fill="#EA580C" fillOpacity="0.88" />
            <rect x="109" y="151" width="20" height="18" rx="3.5" fill="#047857" />
            <rect x="135" y="155" width="30" height="14" rx="3" fill="#334155" />
            <rect x="170" y="152" width="12" height="17" rx="2.5" fill="#D97706" />

            {/* Manage Mode Subtle Inventory Scan Glint */}
            {focusMode === 'manage' && (
              <g className="animate-sv-shimmer">
                <rect x="64" y="106" width="18" height="76" fill="#10B981" fillOpacity="0.16" />
              </g>
            )}

            {/* Static Diagonal Glass Reflection */}
            <path d="M74 106H95L74 166V142L74 106Z" fill="#FFFFFF" fillOpacity={illuminated ? '0.4' : '0.24'} />
            <path d="M105 106H114L86 180H77L105 106Z" fill="#FFFFFF" fillOpacity={illuminated ? '0.24' : '0.14'} />

            {/* Traveling Glass Glint */}
            <g className="animate-sv-shimmer">
              <path d="M126 104H142L112 184H96L126 104Z" fill="#FFFFFF" fillOpacity="0.28" />
            </g>
          </g>

          {/* Window Sill Botanical Planter */}
          <rect x="62" y="180" width="136" height="7" rx="3" fill="#CBD5CE" />
          <circle cx="78" cy="177" r="4.5" fill="#10B981" />
          <circle cx="86" cy="178" r="3.5" fill="#059669" />
          <circle cx="172" cy="177" r="4.5" fill="#10B981" />
          <circle cx="180" cy="178" r="3.5" fill="#047857" />

          {/* Entrance Door (Right Side) + Transom Accent */}
          <rect
            x="208"
            y="106"
            width="60"
            height="114"
            rx="8"
            fill="url(#sv-door-glass)"
            stroke={focusMode === 'sell' ? '#34D399' : 'transparent'}
            strokeOpacity="0.9"
            strokeWidth="1.75"
          />
          <rect
            x="215"
            y="113"
            width="46"
            height="53"
            rx="5"
            fill={illuminated ? '#FEF3C7' : '#ECFDF5'}
            fillOpacity={illuminated ? '0.96' : '0.88'}
          />
          <rect x="215" y="173" width="46" height="35" rx="3.5" fill="#FFFFFF" fillOpacity="0.06" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />
          {/* Brass Door Handle & Kickplate */}
          <rect x="254" y="168" width="4" height="17" rx="2" fill="#F59E0B" />
          <rect x="215" y="212" width="46" height="4" rx="1.5" fill="#D97706" fillOpacity="0.7" />

          {/* Swinging Hanging OPEN Sign */}
          <g className="animate-sv-swing" style={{ transformOrigin: '238px 117px' }}>
            <line x1="238" y1="116" x2="228" y2="129" stroke="#64748B" strokeWidth="1.3" />
            <line x1="238" y1="116" x2="248" y2="129" stroke="#64748B" strokeWidth="1.3" />
            <circle cx="238" cy="116" r="2.2" fill="#D97706" />
            <rect
              x="220"
              y="129"
              width="36"
              height="17"
              rx="4.5"
              fill={focusMode === 'sell' ? '#047857' : palette.awningMain}
              stroke={palette.roofTop}
              strokeWidth="1.1"
            />
            <text
              x="238"
              y="140.5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="7.6"
              fontWeight="700"
              letterSpacing="1"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              OPEN
            </text>
          </g>

          {/* Left Doorstep Wooden Menu A-Frame Easel (Focus-Reactive Chalk Graphics) */}
          <g>
            <path d="M22 197L29 177L36 197" stroke="#92400E" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="19" y="179" width="20" height="24" rx="2.5" fill="#1E293B" stroke="#B45309" strokeWidth="1.6" />
            {focusMode === 'grow' ? (
              <>
                <rect x="23" y="193" width="3" height="5" rx="0.8" fill="#A7F3D0" />
                <rect x="27.5" y="189" width="3" height="9" rx="0.8" fill="#34D399" />
                <rect x="32" y="185" width="3" height="13" rx="0.8" fill="#FBBF24" />
              </>
            ) : focusMode === 'sell' ? (
              <>
                <line x1="23.5" y1="186" x2="34.5" y2="186" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M25 192.5L28 195.5L33.5 190" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <>
                <line x1="24" y1="186" x2="34" y2="186" stroke="#A7F3D0" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="24" y1="191.5" x2="31" y2="191.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="24" y1="196.5" x2="33" y2="196.5" stroke="#A7F3D0" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" />
              </>
            )}
            <path d="M21 203L19 220M37 203L39 220" stroke="#92400E" strokeWidth="2.1" strokeLinecap="round" />
          </g>

          {/* Right Doorstep Potted Topiary Olive Plant */}
          <motion.g
            animate={{ scale: focusMode === 'grow' ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{ transformOrigin: '292px 218px' }}
            className="animate-sv-float"
          >
            <path d="M281 198H303L299 220H285L281 198Z" fill="#B45309" />
            <rect x="279.5" y="195" width="25" height="4" rx="2" fill="#92400E" />
            <line x1="292" y1="181" x2="292" y2="195" stroke="#78350F" strokeWidth="2.1" />
            <circle cx="292" cy="173" r="11" fill="#10B981" />
            <circle cx="285" cy="178" r="7" fill="#059669" />
            <circle cx="299" cy="178" r="7" fill="#047857" />
          </motion.g>

          {/* Architectural Brass Wall Sconces + Warm Downward Light Cones */}
          {illuminated && (
            <g className="animate-sv-luminaire">
              <path d="M51 105L38 158H64L51 105Z" fill="url(#sv-sconce-beam)" />
              <path d="M289 105L276 158H302L289 105Z" fill="url(#sv-sconce-beam)" />
            </g>
          )}
          <circle cx="51" cy="104" r="3.5" fill={illuminated ? '#FBBF24' : '#94A3B8'} />
          <circle cx="51" cy="104" r="11.5" fill={illuminated ? '#FDE68A' : 'transparent'} fillOpacity={isDarkSurface ? '0.68' : '0.5'} />

          <circle cx="289" cy="104" r="3.5" fill={illuminated ? '#FBBF24' : '#94A3B8'} />
          <circle cx="289" cy="104" r="11.5" fill={illuminated ? '#FDE68A' : 'transparent'} fillOpacity={isDarkSurface ? '0.68' : '0.5'} />
        </svg>
      </motion.button>
    </motion.div>
  );
}
