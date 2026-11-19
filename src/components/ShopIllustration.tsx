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

const ROYAL_BLUE_NAVY_PALETTE: ShopThemePalette = {
  awningMain: '#2563EB',
  awningDark: '#1D4ED8',
  roofTop: '#0B132B',
  roofBottom: '#1D4ED8',
  doorTop: '#2563EB',
  doorBottom: '#1D4ED8',
  wainscotTop: '#2563EB',
  wainscotBottom: '#0B132B',
  signBg: '#0B132B',
  accentHighlight: '#93C5FD',
};

const THEME_PALETTES: Record<ShopThemeId, ShopThemePalette> = {
  grocery: ROYAL_BLUE_NAVY_PALETTE,
  apparel: ROYAL_BLUE_NAVY_PALETTE,
  electronics: ROYAL_BLUE_NAVY_PALETTE,
  bakery: ROYAL_BLUE_NAVY_PALETTE,
};

interface ShopIllustrationProps {
  focusMode?: ShopFocusMode;
  themeId?: ShopThemeId;
  isDarkSurface?: boolean;
  onInteract?: (lightsWarm: boolean) => void;
}

export function ShopIllustration({
  focusMode = 'manage',
  themeId = 'apparel',
  isDarkSurface = false,
  onInteract,
}: ShopIllustrationProps) {
  const [lightsWarm, setLightsWarm] = useState(true);
  const [rippleKey, setRippleKey] = useState(0);

  const palette = THEME_PALETTES[themeId] || ROYAL_BLUE_NAVY_PALETTE;
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
              className="pointer-events-none absolute w-64 h-48 rounded-full border-2 border-[#2563EB]/50"
            />
            <motion.span
              key={`ripple-b-${rippleKey}`}
              aria-hidden="true"
              initial={{ opacity: 0.35, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.38 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute w-64 h-48 rounded-full border border-[#3B82F6]/45"
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
            ? 'Interactive 3D storefront with royal blue styling, tap to toggle shop lights'
            : 'Interactive 3D storefront in daylight, tap to illuminate warm shop lights'
        }
        className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-4 rounded-3xl p-1 cursor-pointer"
      >
        <svg
          viewBox="0 0 340 256"
          className="w-[280px] sm:w-[308px] h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Facade linear gradient */}
            <linearGradient id="sv-facade" x1="170" y1="38" x2="170" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>

            {/* Wainscot Royal Blue & Navy */}
            <linearGradient id="sv-wainscot" x1="120" y1="184" x2="120" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>

            {/* Showcase Window Glow */}
            <linearGradient id="sv-window-glow" x1="120" y1="106" x2="120" y2="184" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EFF6FF" />
              <stop offset="50%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>

            {/* Roof Canopy */}
            <linearGradient id="sv-roof" x1="170" y1="14" x2="170" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Awning Royal Blue Stripes */}
            <linearGradient id="sv-awning-blue" x1="170" y1="53" x2="170" y2="87" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Door Royal Blue */}
            <linearGradient id="sv-door-blue" x1="238" y1="106" x2="238" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Chart Upward Arrow Gradient */}
            <linearGradient id="sv-arrow-grad" x1="220" y1="110" x2="310" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* Clip path for window */}
            <clipPath id="sv-window-clip">
              <rect x="64" y="106" width="132" height="76" rx="8" />
            </clipPath>
          </defs>

          {/* ================= BACKGROUND: CITY SKYLINE & GROWTH CHART (Matching Reference Image) ================= */}
          <g opacity={0.65}>
            {/* Background city skyline buildings */}
            <rect x="80" y="68" width="22" height="60" rx="2" fill="#DBEAFE" opacity={0.4} />
            <rect x="105" y="58" width="18" height="70" rx="2" fill="#BFDBFE" opacity={0.45} />
            <rect x="126" y="74" width="20" height="54" rx="2" fill="#DBEAFE" opacity={0.35} />
            <rect x="149" y="62" width="24" height="66" rx="2" fill="#BFDBFE" opacity={0.4} />
            <rect x="176" y="78" width="16" height="50" rx="2" fill="#DBEAFE" opacity={0.35} />
            <rect x="195" y="65" width="22" height="63" rx="2" fill="#BFDBFE" opacity={0.4} />

            {/* Skyline window dots */}
            <circle cx="91" cy="76" r="1.5" fill="#FFFFFF" opacity={0.8} />
            <circle cx="91" cy="84" r="1.5" fill="#FFFFFF" opacity={0.8} />
            <circle cx="114" cy="66" r="1.5" fill="#FFFFFF" opacity={0.8} />
            <circle cx="114" cy="74" r="1.5" fill="#FFFFFF" opacity={0.8} />
            <circle cx="114" cy="82" r="1.5" fill="#FFFFFF" opacity={0.8} />

            {/* Background 4 Ascending Growth Chart Bars on right */}
            <rect x="256" y="86" width="12" height="42" rx="3" fill="#BFDBFE" opacity={0.6} />
            <rect x="272" y="72" width="12" height="56" rx="3" fill="#93C5FD" opacity={0.65} />
            <rect x="288" y="54" width="12" height="74" rx="3" fill="#60A5FA" opacity={0.7} />
            <rect x="304" y="38" width="12" height="90" rx="3" fill="#3B82F6" opacity={0.8} />

            {/* Sweeping Upward Growth Trend Arrow */}
            <path
              d="M 230 114 Q 275 88 316 42"
              stroke="url(#sv-arrow-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              opacity={0.85}
            />
            <path
              d="M 306 40 L 318 40 L 318 52 Z"
              fill="#2563EB"
              opacity={0.9}
            />
          </g>

          {/* ================= GROUND SHADOW & CURB ================= */}
          <ellipse
            cx="170"
            cy="232"
            rx="148"
            ry="9"
            fill="#0B132B"
            fillOpacity={0.07}
          />
          <rect
            x="20"
            y="220"
            width="300"
            height="8"
            rx="4"
            fill="#E2E8F0"
          />
          <rect
            x="200"
            y="215"
            width="76"
            height="5"
            rx="2.5"
            fill="#CBD5E1"
          />

          {/* Welcome Doormat in Navy / Royal Blue */}
          <rect x="212" y="216" width="52" height="4" rx="1.5" fill="#1D4ED8" fillOpacity={0.75} />

          {/* ================= MAIN BUILDING FAÇADE ================= */}
          <rect
            x="44"
            y="44"
            width="252"
            height="176"
            rx="12"
            fill="url(#sv-facade)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Subtle Masonry Lines */}
          <line x1="45" y1="98" x2="295" y2="98" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="58" y1="101" x2="282" y2="101" stroke="#F1F5F9" strokeWidth="0.8" />

          {/* Fluted Side Pilasters */}
          <rect x="44" y="88" width="14" height="132" fill="#F1F5F9" />
          <rect x="48" y="96" width="2" height="116" rx="1" fill="#E2E8F0" />
          <rect x="52" y="96" width="2" height="116" rx="1" fill="#E2E8F0" />

          <rect x="282" y="88" width="14" height="132" fill="#F1F5F9" />
          <rect x="286" y="96" width="2" height="116" rx="1" fill="#E2E8F0" />
          <rect x="290" y="96" width="2" height="116" rx="1" fill="#E2E8F0" />

          {/* Awning Side-Arm Brackets in Royal Blue */}
          <path d="M38 87L50 98" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M302 87L290 98" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />

          {/* Stepped Architectural Parapet in Deep Navy */}
          <rect x="66" y="10" width="208" height="8" rx="4" fill="#0B132B" fillOpacity={0.95} />
          <rect x="32" y="16" width="276" height="36" rx="11" fill="url(#sv-roof)" />
          <rect x="38" y="21" width="264" height="2.5" rx="1.25" fill="#FFFFFF" fillOpacity="0.22" />

          {/* Signboard in Deep Navy with Royal Blue Rim */}
          <rect
            x="92"
            y="27"
            width="156"
            height="18"
            rx="5.5"
            fill="#0B132B"
            stroke="#2563EB"
            strokeOpacity={0.85}
            strokeWidth="1.35"
          />
          <motion.rect
            x="104"
            y="34"
            width="66"
            height="4"
            rx="2"
            fill="#93C5FD"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.rect
            x="176"
            y="34"
            width="60"
            height="4"
            rx="2"
            fill="#2563EB"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cast Shadow Under Awning in Deep Navy */}
          <rect x="44" y="88" width="252" height="10" fill="#0B132B" fillOpacity={0.08} />

          {/* ================= ROYAL BLUE & WHITE STRIPED AWNING ================= */}
          <motion.g
            key={`awning-${rippleKey}`}
            initial={{ scaleY: 0.88, opacity: 0.85 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            style={{ transformOrigin: '170px 53px' }}
          >
            {/* Base Royal Blue Awning Body */}
            <path d="M30 53H310L322 87H18L30 53Z" fill="url(#sv-awning-blue)" />

            {/* Alternating Crisp White Awning Stripes */}
            <path d="M54 53H85L79 87H44L54 53Z" fill="#FFFFFF" />
            <path d="M116 53H147L144 87H111L116 53Z" fill="#FFFFFF" />
            <path d="M178 53H209L211 87H178L178 53Z" fill="#FFFFFF" />
            <path d="M240 53H271L279 87H245L240 53Z" fill="#FFFFFF" />
            <path d="M30 53H310" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" />

            {/* Rounded Scalloped Valance (Royal Blue & White Alternating) */}
            {[18, 51.7, 85.4, 119.1, 152.8, 186.5, 220.2, 253.9, 287.6].map((x, idx) => (
              <path
                key={x}
                d={`M${x} 87C${x} 95.5 ${x + 33.7} 95.5 ${x + 33.7} 87H${x}Z`}
                fill={idx % 2 === 0 ? '#1D4ED8' : '#FFFFFF'}
                stroke={idx % 2 === 0 ? '#1E3A8A' : '#CBD5E1'}
                strokeWidth="0.6"
              />
            ))}
          </motion.g>

          {/* ================= LEFT SHOWCASE WINDOW ================= */}
          <rect
            x="64"
            y="106"
            width="132"
            height="76"
            rx="8"
            fill="url(#sv-window-glow)"
            stroke="#2563EB"
            strokeOpacity={0.85}
            strokeWidth="2"
          />

          {/* Wainscoting Below Window in Royal Blue & Navy */}
          <rect x="64" y="185" width="132" height="35" rx="4" fill="url(#sv-wainscot)" />
          {[76, 90, 104, 118, 132, 146, 160, 174].map((x) => (
            <rect key={x} x={x} y="190" width="6.5" height="25" rx="2" fill="#FFFFFF" fillOpacity={0.15} />
          ))}

          {/* Window Interior Scene */}
          <g clipPath="url(#sv-window-clip)">
            {/* Interior wall vertical pinstripes */}
            {[78, 94, 110, 126, 142, 158, 174].map((x) => (
              <line
                key={x}
                x1={x}
                y1="106"
                x2={x}
                y2="182"
                stroke="#1D4ED8"
                strokeOpacity={0.12}
                strokeWidth="1"
              />
            ))}

            {/* Interior Lights */}
            <circle cx="98" cy="116.5" r="2.8" fill="#FFFFFF" />
            <circle cx="158" cy="116.5" r="2.8" fill="#FFFFFF" />
            <line x1="98" y1="106" x2="98" y2="114" stroke="#0B132B" strokeWidth="1.4" />
            <line x1="158" y1="106" x2="158" y2="114" stroke="#0B132B" strokeWidth="1.4" />

            {/* Interior Display Shelves in Royal Blue */}
            <rect x="72" y="143" width="116" height="3.5" rx="1.75" fill="#1D4ED8" fillOpacity={0.65} />
            <rect x="72" y="169" width="116" height="3.5" rx="1.75" fill="#1D4ED8" fillOpacity={0.65} />

            {/* Top Shelf Products in Royal Blue / Navy / Sky Blue */}
            <rect x="78" y="125" width="15" height="18" rx="3" fill="#2563EB" />
            <rect x="80.5" y="122" width="10" height="3" rx="1.5" fill="#93C5FD" />
            <rect x="99" y="128" width="14" height="15" rx="2.5" fill="#0B132B" />
            <rect x="119" y="123" width="19" height="20" rx="3.5" fill="#1D4ED8" />
            <rect x="144" y="127" width="19" height="16" rx="2.5" fill="#3B82F6" />
            <rect x="148.5" y="124" width="10" height="3" rx="1.5" fill="#BFDBFE" />
            <circle cx="174" cy="134" r="7.5" fill="#2563EB" fillOpacity="0.85" />

            {/* Bottom Shelf Products */}
            <rect x="78" y="153" width="25" height="16" rx="3.5" fill="#1D4ED8" fillOpacity="0.85" />
            <rect x="109" y="151" width="20" height="18" rx="3.5" fill="#2563EB" />
            <rect x="135" y="155" width="30" height="14" rx="3" fill="#0B132B" />
            <rect x="170" y="152" width="12" height="17" rx="2.5" fill="#60A5FA" />

            {/* Diagonal Crisp Glass Reflection */}
            <path d="M74 106H95L74 166V142L74 106Z" fill="#FFFFFF" fillOpacity={0.42} />
            <path d="M105 106H114L86 180H77L105 106Z" fill="#FFFFFF" fillOpacity={0.22} />
            <path d="M136 104H152L122 184H106L136 104Z" fill="#FFFFFF" fillOpacity={0.28} />
          </g>

          {/* Window Sill in Crisp Slate */}
          <rect x="62" y="180" width="136" height="7" rx="3" fill="#E2E8F0" />
          <circle cx="78" cy="177" r="4.5" fill="#2563EB" />
          <circle cx="86" cy="178" r="3.5" fill="#1D4ED8" />
          <circle cx="172" cy="177" r="4.5" fill="#2563EB" />
          <circle cx="180" cy="178" r="3.5" fill="#1D4ED8" />

          {/* ================= ENTRANCE DOOR (RIGHT SIDE) ================= */}
          <rect
            x="208"
            y="106"
            width="60"
            height="114"
            rx="8"
            fill="url(#sv-door-blue)"
            stroke="#1D4ED8"
            strokeOpacity={0.9}
            strokeWidth="1.75"
          />
          {/* Glass Upper Door Window */}
          <rect
            x="215"
            y="113"
            width="46"
            height="53"
            rx="5"
            fill="#DBEAFE"
            fillOpacity={0.95}
          />
          <path d="M218 116H232L220 162H215L218 116Z" fill="#FFFFFF" fillOpacity={0.5} />
          {/* Lower Door Panel */}
          <rect x="215" y="173" width="46" height="35" rx="3.5" fill="#1D4ED8" stroke="#3B82F6" strokeOpacity={0.4} strokeWidth="1" />
          {/* Silver/Light-Blue Door Handle & Kickplate */}
          <rect x="254" y="166" width="4" height="17" rx="2" fill="#BFDBFE" />
          <rect x="215" y="212" width="46" height="4" rx="1.5" fill="#0B132B" fillOpacity={0.5} />

          {/* Hanging OPEN Sign */}
          <g className="animate-sv-swing" style={{ transformOrigin: '238px 117px' }}>
            <line x1="238" y1="116" x2="228" y2="129" stroke="#94A3B8" strokeWidth="1.3" />
            <line x1="238" y1="116" x2="248" y2="129" stroke="#94A3B8" strokeWidth="1.3" />
            <circle cx="238" cy="116" r="2.2" fill="#2563EB" />
            <rect
              x="220"
              y="129"
              width="36"
              height="17"
              rx="4.5"
              fill="#2563EB"
              stroke="#0B132B"
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

          {/* Left Doorstep Menu A-Frame in Navy & Blue */}
          <g>
            <path d="M22 197L29 177L36 197" stroke="#0B132B" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="19" y="179" width="20" height="24" rx="2.5" fill="#0B132B" stroke="#2563EB" strokeWidth="1.6" />
            <line x1="23.5" y1="186" x2="34.5" y2="186" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="24" y1="191.5" x2="31" y2="191.5" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="24" y1="196.5" x2="33" y2="196.5" stroke="#FFFFFF" strokeOpacity={0.85} strokeWidth="1.4" strokeLinecap="round" />
            <path d="M21 203L19 220M37 203L39 220" stroke="#0B132B" strokeWidth="2.1" strokeLinecap="round" />
          </g>

          {/* Right Doorstep Topiary in Royal Blue & Navy */}
          <g className="animate-sv-float" style={{ transformOrigin: '292px 218px' }}>
            <path d="M281 198H303L299 220H285L281 198Z" fill="#1D4ED8" />
            <rect x="279.5" y="195" width="25" height="4" rx="2" fill="#0B132B" />
            <line x1="292" y1="181" x2="292" y2="195" stroke="#0B132B" strokeWidth="2.1" />
            <circle cx="292" cy="173" r="11" fill="#2563EB" />
            <circle cx="285" cy="178" r="7" fill="#1D4ED8" />
            <circle cx="299" cy="178" r="7" fill="#3B82F6" />
          </g>

          {/* Wall Sconces in Royal Blue / Cyan */}
          <circle cx="51" cy="104" r="3.5" fill="#60A5FA" />
          <circle cx="289" cy="104" r="3.5" fill="#60A5FA" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
