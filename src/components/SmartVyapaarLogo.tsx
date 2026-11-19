import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SmartVyapaarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'royal';
  animated?: boolean;
}

export function SmartVyapaarLogo({
  className = '',
  size = 'lg',
  variant = 'default',
  animated = false,
}: SmartVyapaarLogoProps) {
  const uid = useId().replace(/:/g, '');
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  const sizeClass = {
    sm: 'w-14 sm:w-16',
    md: 'w-20 sm:w-22',
    lg: 'w-[92px] sm:w-[106px]',
    xl: 'w-28 sm:w-32',
    '2xl': 'w-36 sm:w-44',
  }[size];

  const ids = {
    leftWing: `${uid}-left-wing`,
    rightWing: `${uid}-right-wing`,
    foldShadow: `${uid}-fold-shadow`,
    awningIndigo: `${uid}-awning-indigo`,
    awningGold: `${uid}-awning-gold`,
    awningShadow: `${uid}-awning-shadow`,
    ribbonGrad: `${uid}-ribbon-grad`,
    sheenGrad: `${uid}-sheen-grad`,
    vClip: `${uid}-v-clip`,
    awningClip: `${uid}-awning-clip`,
    ribbonRevealClip: `${uid}-ribbon-reveal-clip`,
  };

  const awningStripes = [
    { xTop1: 141, xTop2: 155, xBot1: 129, xBot2: 145, color: 'indigo' as const },
    { xTop1: 155, xTop2: 169, xBot1: 145, xBot2: 161, color: 'gold' as const },
    { xTop1: 169, xTop2: 183, xBot1: 161, xBot2: 177, color: 'indigo' as const },
    { xTop1: 183, xTop2: 197, xBot1: 177, xBot2: 193, color: 'gold' as const },
    { xTop1: 197, xTop2: 211, xBot1: 193, xBot2: 209, color: 'indigo' as const },
    { xTop1: 211, xTop2: 224, xBot1: 209, xBot2: 225, color: 'gold' as const },
    { xTop1: 224, xTop2: 235, xBot1: 225, xBot2: 240, color: 'indigo' as const },
  ];

  const leftWingStops =
    variant === 'royal'
      ? { top: '#2563EB', mid: '#1D4ED8', bot: '#1E3A8A' }
      : { top: '#0F172A', mid: '#0B132B', bot: '#070D1F' };

  const rightWingStops =
    variant === 'royal'
      ? { top: '#3B82F6', mid: '#2563EB', bot: '#1D4ED8' }
      : { top: '#334155', mid: '#1E293B', bot: '#0F172A' };

  return (
    <div
      data-testid="smartvyapaar-logo"
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 256 196"
        className={`${sizeClass} h-auto overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SMARTVyapaar Emblem"
      >
        <defs>
          {/* Left wing gradient */}
          <linearGradient id={ids.leftWing} x1="26" y1="24" x2="146" y2="176" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={leftWingStops.top} />
            <stop offset="60%" stopColor={leftWingStops.mid} />
            <stop offset="100%" stopColor={leftWingStops.bot} />
          </linearGradient>

          {/* Right wing gradient */}
          <linearGradient id={ids.rightWing} x1="120" y1="42" x2="212" y2="168" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={rightWingStops.top} />
            <stop offset="45%" stopColor={rightWingStops.mid} />
            <stop offset="100%" stopColor={rightWingStops.bot} />
          </linearGradient>

          {/* Crease shadow where left wing overlaps right */}
          <linearGradient id={ids.foldShadow} x1="112" y1="100" x2="152" y2="168" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#111827" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </linearGradient>

          {/* Awning Royal Blue stripe gradient */}
          <linearGradient id={ids.awningIndigo} x1="184" y1="16" x2="184" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Awning crisp white stripe gradient */}
          <linearGradient id={ids.awningGold} x1="184" y1="16" x2="184" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5FF" />
          </linearGradient>

          {/* Soft drop shadow under awning onto V body */}
          <linearGradient id={ids.awningShadow} x1="180" y1="46" x2="180" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#111827" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </linearGradient>

          {/* Crisp white sweeping ribbon */}
          <linearGradient id={ids.ribbonGrad} x1="80" y1="158" x2="210" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="30%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F4F7FF" />
          </linearGradient>

          {/* Diagonal Specular Sheen */}
          <linearGradient id={ids.sheenGrad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.38" />
            <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <clipPath id={ids.vClip}>
            <path d="M 33 24 L 84 24 C 92 24 98 28 103 36 L 122 69 L 136 47 C 141 39 149 35 158 35 L 210 35 C 221 35 227 46 221 56 L 154 166 C 149 175 140 180 129 180 L 106 180 C 95 180 86 175 81 166 L 20 50 C 14 39 21 24 33 24 Z" />
          </clipPath>

          <clipPath id={ids.awningClip}>
            <path d="M 142 16 L 222 16 C 228 16 232 20 235 26 L 240 46 L 129 46 L 136 24 C 138 19 140 16 142 16 Z" />
          </clipPath>

          <clipPath id={ids.ribbonRevealClip}>
            <motion.rect
              x="68"
              y="66"
              height="116"
              initial={shouldAnimate ? { width: 0 } : { width: 160 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.65, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            />
          </clipPath>
        </defs>

        {/* Main Sculpted V Emblem */}
        <g clipPath={`url(#${ids.vClip})`}>
          {/* Right Wing */}
          <motion.path
            d="M 106 86 L 146 28 L 234 28 L 154 184 L 92 184 Z"
            fill={`url(#${ids.rightWing})`}
            initial={shouldAnimate ? { opacity: 0, x: 18, y: -14 } : false}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Fold Crease Shadow */}
          <motion.path
            d="M 106 86 L 154 184 L 126 184 L 94 114 Z"
            fill={`url(#${ids.foldShadow})`}
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          />

          {/* Left Wing */}
          <motion.path
            d="M 14 20 L 96 20 L 160 184 L 78 184 Z"
            fill={`url(#${ids.leftWing})`}
            initial={shouldAnimate ? { opacity: 0, x: -20, y: -18 } : false}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.58, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Precision Top-Left Bevel Highlight */}
          <motion.path
            d="M 22 25 L 86 25 C 93 25 99 29 103 36 L 122 69"
            stroke="#AFC0FF"
            strokeOpacity="0.58"
            strokeWidth="2"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: 0.28 },
            }}
          />

          <motion.rect
            x="122"
            y="42"
            width="114"
            height="22"
            fill={`url(#${ids.awningShadow})`}
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.38 }}
          />

          {/* Sweeping Prosperity Ribbon */}
          <g clipPath={shouldAnimate ? `url(#${ids.ribbonRevealClip})` : undefined}>
            <path
              d="M 80 166 C 74 136 111 114 153 105 C 182 99 199 88 209 75 C 203 101 184 119 152 131 C 118 143 89 150 88 174 Z"
              fill="#111827"
              fillOpacity="0.24"
              transform="translate(0, 2.5)"
            />
            <path
              d="M 79 164 C 72 134 110 112 152 103 C 181 97 198 86 208 73 C 202 98 183 116 151 128 C 117 140 88 148 87 172 C 83 170 80 167 79 164 Z"
              fill={`url(#${ids.ribbonGrad})`}
            />
            <motion.path
              d="M 81 154 C 84 131 115 114 153 106 C 178 100 194 91 204 80"
              stroke="#FFFFFF"
              strokeOpacity="0.92"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.6, delay: 0.56, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2, delay: 0.56 },
              }}
            />
          </g>

          {/* Clipped Diagonal Specular Sheen */}
          {shouldAnimate && (
            <motion.rect
              y="-40"
              width="90"
              height="280"
              transform="rotate(24 128 98)"
              fill={`url(#${ids.sheenGrad})`}
              initial={{ x: -160, opacity: 0 }}
              animate={{ x: [-160, 290], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.15,
                delay: 0.9,
                repeat: Infinity,
                repeatDelay: 2.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}
        </g>

        {/* Crown Store Awning Canopy */}
        <motion.g
          initial={shouldAnimate ? { opacity: 0, y: -16, scale: 0.92 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 22,
            delay: 0.32,
          }}
          style={{ transformOrigin: '184px 32px' }}
        >
          <g clipPath={`url(#${ids.awningClip})`}>
            {awningStripes.map((stripe, idx) => (
              <polygon
                key={idx}
                points={`${stripe.xTop1},16 ${stripe.xTop2},16 ${stripe.xBot2},46 ${stripe.xBot1},46`}
                fill={stripe.color === 'indigo' ? `url(#${ids.awningIndigo})` : `url(#${ids.awningGold})`}
              />
            ))}
            <line
              x1="138"
              y1="18"
              x2="226"
              y2="18"
              stroke="#FFFFFF"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {awningStripes.map((stripe, idx) => {
            const rx = (stripe.xBot2 - stripe.xBot1) / 2;
            return (
              <motion.path
                key={`scallop-${idx}`}
                d={`M ${stripe.xBot1} 45.8 A ${rx} 7.2 0 0 0 ${stripe.xBot2} 45.8 Z`}
                fill={stripe.color === 'indigo' ? '#1D4ED8' : '#FFFFFF'}
                stroke={stripe.color === 'indigo' ? '#1E3A8A' : '#CBD5E1'}
                strokeOpacity={stripe.color === 'indigo' ? '0.35' : '0.65'}
                strokeWidth="0.6"
                initial={shouldAnimate ? { opacity: 0, scaleY: 0.4 } : false}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{
                  duration: 0.28,
                  delay: 0.4 + idx * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${(stripe.xBot1 + stripe.xBot2) / 2}px 45.8px` }}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}
