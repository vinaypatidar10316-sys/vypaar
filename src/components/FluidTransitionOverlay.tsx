import { motion } from 'motion/react';
import { Store } from 'lucide-react';

interface FluidTransitionOverlayProps {
  isActive: boolean;
  stepName?: string;
}

/**
 * Fluid, multi-layered organic transition veil that sweeps across the screen
 * when navigating between authentication, setup, and dashboard steps.
 * Features an Emerald Jade silk sweep, luminous liquid shimmer edge,
 * and a centered pulsing storefront crest.
 */
export function FluidTransitionOverlay({
  isActive,
  stepName,
}: FluidTransitionOverlayProps) {
  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none"
    >
      {/* Primary Sweeping Fluid Veil */}
      <motion.div
        initial={{ y: '100%', opacity: 0.95 }}
        animate={{
          y: ['100%', '0%', '0%', '-100%'],
          opacity: [0.95, 1, 1, 0.9],
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.38, 0.62, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 bg-gradient-to-b from-[#063b2a] via-[#054934] to-[#04281c] flex flex-col items-center justify-center shadow-2xl"
      >
        {/* Leading Luminous Liquid Wave Edge at the Top */}
        <div className="absolute top-0 inset-x-0 -translate-y-full h-16 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full fill-[#063b2a] drop-shadow-md"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
          </svg>
          {/* Golden Shimmer Ripple on the Crest */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent blur-[1px]" />
        </div>

        {/* Ambient radial glow inside the curtain */}
        <div className="absolute w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl" />

        {/* Center Iconic Pulse Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.08, 1, 0.92],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 0.72,
            times: [0, 0.35, 0.62, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center"
        >
          {/* Glowing Storefront Icon */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-[0_0_35px_rgba(52,211,153,0.5)] border border-emerald-300/40">
            <Store className="w-8 h-8 drop-shadow" />
            <span className="absolute -inset-1 rounded-2xl border border-amber-300/40 animate-ping opacity-35" />
          </div>

          <p className="mt-3 font-display text-lg font-bold tracking-tight text-white drop-shadow-sm">
            SMART<span className="text-emerald-300">Vyapaar</span>
          </p>

          {stepName && (
            <p className="mt-0.5 text-xs font-medium text-emerald-200/80 tracking-wide capitalize">
              {stepName}
            </p>
          )}
        </motion.div>

        {/* Trailing Luminous Liquid Wave Edge at the Bottom */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full h-16 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full fill-[#04281c] drop-shadow-md"
          >
            <path d="M0,0 L1200,0 L1200,60 C1050,10 800,110 650,40 C500,-30 250,80 0,20 Z" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
