import { motion } from 'motion/react';

interface LaunchShopIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Compact Shop Icon mirroring the 3D storefront illustration from the Launch Screen.
 * Features the signature emerald awning, warm illuminated showcase window,
 * Art-Deco cornice, and swinging OPEN sign.
 */
export function LaunchShopIcon({ className = '', size = 'md' }: LaunchShopIconProps) {
  const sizeClasses = {
    sm: 'w-20 sm:w-24',
    md: 'w-24 sm:w-28',
    lg: 'w-32 sm:w-36',
    xl: 'w-36 sm:w-44',
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
      title="SMARTVyapaar Store"
      aria-label="SMARTVyapaar Storefront Icon"
    >
      {/* Soft radiant ambient glow behind storefront */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-b from-emerald-500/20 via-amber-300/15 to-transparent blur-xl opacity-90"
      />

      <svg
        viewBox="0 0 340 256"
        className={`${sizeClasses} h-auto drop-shadow-[0_12px_24px_rgba(6,78,59,0.18)] transition-transform duration-300`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lsi-facade" x1="170" y1="38" x2="170" y2="218" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EAEAE3" />
          </linearGradient>
          <linearGradient id="lsi-wainscot" x1="120" y1="184" x2="120" y2="218" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1B362C" />
            <stop offset="100%" stopColor="#0C1914" />
          </linearGradient>
          <linearGradient id="lsi-window-glow" x1="120" y1="106" x2="120" y2="184" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="52%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <radialGradient id="lsi-lamp-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lsi-pavement-spill" x1="130" y1="218" x2="130" y2="244" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lsi-door-glass" x1="238" y1="106" x2="238" y2="218" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#042F2E" />
          </linearGradient>
          <linearGradient id="lsi-roof" x1="170" y1="14" x2="170" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0C1A14" />
            <stop offset="100%" stopColor="#1E3B2F" />
          </linearGradient>
          <linearGradient id="lsi-awning-green" x1="170" y1="53" x2="170" y2="87" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <clipPath id="lsi-window-clip">
            <rect x="64" y="106" width="132" height="76" rx="8" />
          </clipPath>
        </defs>

        {/* Ambient Ground Shadow & Curb */}
        <ellipse cx="170" cy="232" rx="150" ry="10" fill="#0F172A" fillOpacity="0.08" />
        <rect x="18" y="220" width="304" height="9" rx="4.5" fill="#D5DDD7" />
        <rect x="200" y="215" width="76" height="5" rx="2.5" fill="#BFCAC1" />

        {/* Warm Light Spill onto Pavement */}
        <path d="M62 220H198L216 244H44L62 220Z" fill="url(#lsi-pavement-spill)" />
        <rect x="212" y="216" width="52" height="4" rx="1.5" fill="#92400E" fillOpacity="0.78" />

        {/* Building Facade */}
        <rect x="44" y="44" width="252" height="176" rx="12" fill="url(#lsi-facade)" stroke="#C9D4CC" strokeWidth="1.5" />
        <line x1="45" y1="98" x2="295" y2="98" stroke="#DCE3DD" strokeWidth="1" />

        {/* Fluted Side Columns */}
        <rect x="44" y="88" width="14" height="132" fill="#E0E5DE" />
        <rect x="282" y="88" width="14" height="132" fill="#E0E5DE" />

        {/* Roof Cornice & Signboard */}
        <rect x="66" y="10" width="208" height="8" rx="4" fill="#0C1A14" fillOpacity="0.94" />
        <rect x="32" y="16" width="276" height="36" rx="11" fill="url(#lsi-roof)" />
        <rect x="38" y="21" width="264" height="2.5" rx="1.25" fill="#FFFFFF" fillOpacity="0.16" />
        <rect x="92" y="27" width="156" height="18" rx="5.5" fill="#065F46" stroke="#34D399" strokeWidth="1.35" />
        <rect x="104" y="34" width="66" height="4" rx="2" fill="#A7F3D0" />
        <rect x="176" y="34" width="60" height="4" rx="2" fill="#FBBF24" />

        {/* Emerald Awning with White Stripes */}
        <g style={{ transformOrigin: '170px 53px' }}>
          <path d="M30 53H310L322 87H18L30 53Z" fill="url(#lsi-awning-green)" />
          <path d="M54 53H85L79 87H44L54 53Z" fill="#FAF9F6" />
          <path d="M116 53H147L144 87H111L116 53Z" fill="#FAF9F6" />
          <path d="M178 53H209L211 87H178L178 53Z" fill="#FAF9F6" />
          <path d="M240 53H271L279 87H245L240 53Z" fill="#FAF9F6" />
          <path d="M30 53H310" stroke="#FFFFFF" strokeOpacity="0.38" strokeWidth="1.5" />

          {[18, 51.7, 85.4, 119.1, 152.8, 186.5, 220.2, 253.9, 287.6].map((x, idx) => (
            <path
              key={x}
              d={`M${x} 87C${x} 95.5 ${x + 33.7} 95.5 ${x + 33.7} 87H${x}Z`}
              fill={idx % 2 === 0 ? '#047857' : '#E7E5E0'}
            />
          ))}
        </g>

        {/* Showcase Window with Warm Light */}
        <rect x="64" y="106" width="132" height="76" rx="8" fill="url(#lsi-window-glow)" stroke="#10B981" strokeWidth="1.7" />
        <rect x="64" y="185" width="132" height="35" rx="4" fill="url(#lsi-wainscot)" />
        {[76, 90, 104, 118, 132, 146, 160, 174].map((x) => (
          <rect key={x} x={x} y="190" width="6.5" height="25" rx="2" fill="#FFFFFF" fillOpacity="0.09" />
        ))}

        {/* Window Interior Scene */}
        <g clipPath="url(#lsi-window-clip)">
          <circle cx="98" cy="120" r="28" fill="url(#lsi-lamp-halo)" />
          <circle cx="158" cy="120" r="28" fill="url(#lsi-lamp-halo)" />

          <rect x="72" y="143" width="116" height="3.5" rx="1.75" fill="#92400E" fillOpacity="0.75" />
          <rect x="72" y="169" width="116" height="3.5" rx="1.75" fill="#92400E" fillOpacity="0.75" />

          {/* Shelved items */}
          <rect x="78" y="125" width="15" height="18" rx="3" fill="#059669" />
          <rect x="99" y="128" width="14" height="15" rx="2.5" fill="#D97706" />
          <rect x="119" y="123" width="19" height="20" rx="3.5" fill="#14231D" />
          <rect x="144" y="127" width="19" height="16" rx="2.5" fill="#0D9488" />
          <circle cx="174" cy="134" r="7.5" fill="#EA580C" fillOpacity="0.92" />

          <rect x="78" y="153" width="25" height="16" rx="3.5" fill="#EA580C" fillOpacity="0.88" />
          <rect x="109" y="151" width="20" height="18" rx="3.5" fill="#047857" />
          <rect x="135" y="155" width="30" height="14" rx="3" fill="#334155" />

          {/* Diagonal Glass Reflection */}
          <path d="M74 106H95L74 166V142L74 106Z" fill="#FFFFFF" fillOpacity="0.38" />
        </g>

        {/* Planter Box */}
        <rect x="62" y="180" width="136" height="7" rx="3" fill="#CBD5CE" />
        <circle cx="78" cy="177" r="4.5" fill="#10B981" />
        <circle cx="86" cy="178" r="3.5" fill="#059669" />
        <circle cx="172" cy="177" r="4.5" fill="#10B981" />
        <circle cx="180" cy="178" r="3.5" fill="#047857" />

        {/* Entrance Door */}
        <rect x="208" y="106" width="60" height="114" rx="8" fill="url(#lsi-door-glass)" stroke="#34D399" strokeWidth="1.75" />
        <rect x="215" y="113" width="46" height="53" rx="5" fill="#FEF3C7" fillOpacity="0.96" />
        <rect x="254" y="168" width="4" height="17" rx="2" fill="#F59E0B" />
        <rect x="215" y="212" width="46" height="4" rx="1.5" fill="#D97706" fillOpacity="0.7" />

        {/* Hanging OPEN Sign */}
        <g>
          <line x1="238" y1="116" x2="228" y2="129" stroke="#64748B" strokeWidth="1.3" />
          <line x1="238" y1="116" x2="248" y2="129" stroke="#64748B" strokeWidth="1.3" />
          <circle cx="238" cy="116" r="2.2" fill="#D97706" />
          <rect x="220" y="129" width="36" height="17" rx="4.5" fill="#047857" stroke="#0C1A14" strokeWidth="1.1" />
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

        {/* Right Potted Olive Plant */}
        <path d="M281 198H303L299 220H285L281 198Z" fill="#B45309" />
        <rect x="279.5" y="195" width="25" height="4" rx="2" fill="#92400E" />
        <line x1="292" y1="181" x2="292" y2="195" stroke="#78350F" strokeWidth="2.1" />
        <circle cx="292" cy="173" r="11" fill="#10B981" />
        <circle cx="285" cy="178" r="7" fill="#059669" />
        <circle cx="299" cy="178" r="7" fill="#047857" />

        {/* Wall Sconces */}
        <circle cx="51" cy="104" r="3.5" fill="#FBBF24" />
        <circle cx="51" cy="104" r="10" fill="#FDE68A" fillOpacity="0.5" />
        <circle cx="289" cy="104" r="3.5" fill="#FBBF24" />
        <circle cx="289" cy="104" r="10" fill="#FDE68A" fillOpacity="0.5" />
      </svg>
    </motion.div>
  );
}
