import { motion } from 'motion/react';

interface LaunchShopIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Compact Shop Icon mirroring the 3D storefront illustration in Royal Blue & Deep Navy.
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
      initial={{ opacity: 0, scale: 0.94, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
      title="SMARTVyapaar Store"
      aria-label="SMARTVyapaar Storefront Icon"
    >
      <svg
        viewBox="0 0 340 256"
        className={`${sizeClasses} h-auto transition-transform duration-300`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lsi-facade" x1="170" y1="38" x2="170" y2="218" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="lsi-wainscot" x1="120" y1="184" x2="120" y2="218" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <linearGradient id="lsi-window-glow" x1="120" y1="106" x2="120" y2="184" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="52%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <linearGradient id="lsi-door-glass" x1="238" y1="106" x2="238" y2="218" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="lsi-roof" x1="170" y1="14" x2="170" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="lsi-awning-blue" x1="170" y1="53" x2="170" y2="87" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <clipPath id="lsi-window-clip">
            <rect x="64" y="106" width="132" height="76" rx="8" />
          </clipPath>
        </defs>

        {/* Ambient Ground Shadow & Curb */}
        <ellipse cx="170" cy="232" rx="150" ry="10" fill="#0B132B" fillOpacity={0.07} />
        <rect x="18" y="220" width="304" height="9" rx="4.5" fill="#E2E8F0" />
        <rect x="200" y="215" width="76" height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="212" y="216" width="52" height="4" rx="1.5" fill="#1D4ED8" fillOpacity={0.75} />

        {/* Building Facade */}
        <rect x="44" y="44" width="252" height="176" rx="12" fill="url(#lsi-facade)" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="45" y1="98" x2="295" y2="98" stroke="#E2E8F0" strokeWidth="1" />

        {/* Fluted Side Columns */}
        <rect x="44" y="88" width="14" height="132" fill="#F1F5F9" />
        <rect x="282" y="88" width="14" height="132" fill="#F1F5F9" />

        {/* Roof Cornice & Signboard in Deep Navy & Royal Blue */}
        <rect x="66" y="10" width="208" height="8" rx="4" fill="#0B132B" fillOpacity={0.95} />
        <rect x="32" y="16" width="276" height="36" rx="11" fill="url(#lsi-roof)" />
        <rect x="38" y="21" width="264" height="2.5" rx="1.25" fill="#FFFFFF" fillOpacity="0.22" />
        <rect x="92" y="27" width="156" height="18" rx="5.5" fill="#0B132B" stroke="#2563EB" strokeWidth="1.35" />
        <rect x="104" y="34" width="66" height="4" rx="2" fill="#93C5FD" />
        <rect x="176" y="34" width="60" height="4" rx="2" fill="#2563EB" />

        {/* Royal Blue & White Striped Awning */}
        <g style={{ transformOrigin: '170px 53px' }}>
          <path d="M30 53H310L322 87H18L30 53Z" fill="url(#lsi-awning-blue)" />
          <path d="M54 53H85L79 87H44L54 53Z" fill="#FFFFFF" />
          <path d="M116 53H147L144 87H111L116 53Z" fill="#FFFFFF" />
          <path d="M178 53H209L211 87H178L178 53Z" fill="#FFFFFF" />
          <path d="M240 53H271L279 87H245L240 53Z" fill="#FFFFFF" />
          <path d="M30 53H310" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" />

          {[18, 51.7, 85.4, 119.1, 152.8, 186.5, 220.2, 253.9, 287.6].map((x, idx) => (
            <path
              key={x}
              d={`M${x} 87C${x} 95.5 ${x + 33.7} 95.5 ${x + 33.7} 87H${x}Z`}
              fill={idx % 2 === 0 ? '#1D4ED8' : '#FFFFFF'}
              stroke={idx % 2 === 0 ? '#1E3A8A' : '#CBD5E1'}
              strokeWidth="0.6"
            />
          ))}
        </g>

        {/* Showcase Window with Sky Blue Interior */}
        <rect x="64" y="106" width="132" height="76" rx="8" fill="url(#lsi-window-glow)" stroke="#2563EB" strokeWidth="1.8" />
        <rect x="64" y="185" width="132" height="35" rx="4" fill="url(#lsi-wainscot)" />
        {[76, 90, 104, 118, 132, 146, 160, 174].map((x) => (
          <rect key={x} x={x} y="190" width="6.5" height="25" rx="2" fill="#FFFFFF" fillOpacity="0.14" />
        ))}

        {/* Window Interior Scene */}
        <g clipPath="url(#lsi-window-clip)">
          <rect x="72" y="143" width="116" height="3.5" rx="1.75" fill="#1D4ED8" fillOpacity="0.55" />
          <rect x="72" y="169" width="116" height="3.5" rx="1.75" fill="#1D4ED8" fillOpacity="0.55" />

          <rect x="78" y="125" width="15" height="18" rx="3" fill="#2563EB" />
          <rect x="99" y="128" width="14" height="15" rx="2.5" fill="#0B132B" />
          <rect x="119" y="123" width="19" height="20" rx="3.5" fill="#1D4ED8" />
          <rect x="144" y="127" width="19" height="16" rx="2.5" fill="#3B82F6" />
          <circle cx="174" cy="134" r="7.5" fill="#2563EB" fillOpacity="0.85" />

          <rect x="78" y="153" width="25" height="16" rx="3.5" fill="#1D4ED8" fillOpacity="0.85" />
          <rect x="109" y="151" width="20" height="18" rx="3.5" fill="#2563EB" />
          <rect x="135" y="155" width="30" height="14" rx="3" fill="#0B132B" />

          <path d="M74 106H95L74 166V142L74 106Z" fill="#FFFFFF" fillOpacity="0.4" />
        </g>

        {/* Planter Box */}
        <rect x="62" y="180" width="136" height="7" rx="3" fill="#E2E8F0" />
        <circle cx="78" cy="177" r="4.5" fill="#2563EB" />
        <circle cx="86" cy="178" r="3.5" fill="#1D4ED8" />
        <circle cx="172" cy="177" r="4.5" fill="#2563EB" />
        <circle cx="180" cy="178" r="3.5" fill="#1D4ED8" />

        {/* Entrance Door in Royal Blue */}
        <rect x="208" y="106" width="60" height="114" rx="8" fill="url(#lsi-door-glass)" stroke="#1D4ED8" strokeWidth="1.75" />
        <rect x="215" y="113" width="46" height="53" rx="5" fill="#DBEAFE" fillOpacity="0.95" />
        <rect x="254" y="168" width="4" height="17" rx="2" fill="#BFDBFE" />
        <rect x="215" y="212" width="46" height="4" rx="1.5" fill="#0B132B" fillOpacity={0.5} />

        {/* Hanging OPEN Sign */}
        <g>
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
      </svg>
    </motion.div>
  );
}
