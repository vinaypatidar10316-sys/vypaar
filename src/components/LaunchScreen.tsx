import { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { SmartVyapaarLogo } from './SmartVyapaarLogo';
import { THEMES } from '../utils/themeConfig';

interface LaunchScreenProps {
  onComplete?: () => void;
}

export function LaunchScreen({ onComplete }: LaunchScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const theme = THEMES.platinum;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 240, damping: 24, mass: 0.55 });
  const smoothY = useSpring(pointerY, { stiffness: 240, damping: 24, mass: 0.55 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse') return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      key="launch-screen"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.07, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-dvh w-full relative overflow-hidden flex flex-col justify-center items-center ${theme.outerShell}`}
    >
      <main className="relative z-10 w-full max-w-md mx-auto px-4 flex items-center justify-center">
        <section
          aria-label="SMARTVyapaar Launch Screen"
          className="w-full flex items-center justify-center relative py-12"
        >
          {/* Crisp Geometric Concentric Framing Rings (no color blur halos) */}
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.72, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[240px] h-[240px] sm:w-[276px] sm:h-[276px] rounded-full border border-[#2563EB]/10 pointer-events-none"
          />

          {/* Precision Orbital Sweep Ring */}
          <svg
            aria-hidden="true"
            viewBox="0 0 280 280"
            className="absolute w-[224px] h-[224px] sm:w-[256px] sm:h-[256px] -rotate-90 pointer-events-none"
            fill="none"
          >
            <circle
              cx="140"
              cy="140"
              r="134"
              stroke="#E6E9F0"
              strokeWidth="1.25"
            />
            <motion.circle
              cx="140"
              cy="140"
              r="134"
              stroke="#2563EB"
              strokeOpacity="0.45"
              strokeWidth="1.75"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          {/* Interactive 3D Floating Royal Blue Logo (no box/card around logo) */}
          <motion.div
            onClick={onComplete}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
            style={{
              perspective: 1000,
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative z-10 cursor-pointer select-none p-8 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.86, opacity: 0, y: 12 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      scale: 1,
                      opacity: 1,
                      y: [0, -7, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : {
                      scale: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.45, ease: 'easeOut' },
                      y: {
                        duration: 3.4,
                        delay: 0.65,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
              className="relative flex items-center justify-center"
            >
              <SmartVyapaarLogo size="2xl" variant="royal" animated />
            </motion.div>

            {/* Synchronized Ground Contact Shadow */}
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? { opacity: 0.16 } : { opacity: 0, scaleX: 0.6 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.16 }
                  : {
                      opacity: [0.18, 0.1, 0.18],
                      scaleX: [1, 0.86, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : {
                      duration: 3.4,
                      delay: 0.65,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="mt-3 w-24 sm:w-28 h-2.5 rounded-full bg-[#0B132B]/15 blur-[4px]"
            />
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
}
