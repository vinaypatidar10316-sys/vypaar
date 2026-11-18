import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { createCelebrationParticles } from '../utils/celebrationParticles';

interface CelebrationConfettiProps {
  active: boolean;
  burstKey?: number;
}

/**
 * Subtle, high-end Porcelain, Emerald & Champagne Gold particle burst
 * rendered at 60fps on a Retina-scaled fixed canvas overlay.
 */
export function CelebrationConfetti({ active, burstKey = 0 }: CelebrationConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Anchor bloom around the upper-center celebration crest inside the card
    const originX = width * 0.5;
    const originY = Math.min(height * 0.36, 300);
    const particles = createCelebrationParticles(originX, originY, 54);

    let rafId = 0;

    const drawSparkle = (c: CanvasRenderingContext2D, r: number) => {
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const innerAngle = angle + Math.PI / 4;
        const outerX = Math.cos(angle) * r;
        const outerY = Math.sin(angle) * r;
        const innerX = Math.cos(innerAngle) * (r * 0.34);
        const innerY = Math.sin(innerAngle) * (r * 0.34);
        if (i === 0) {
          c.moveTo(outerX, outerY);
        } else {
          c.lineTo(outerX, outerY);
        }
        c.lineTo(innerX, innerY);
      }
      c.closePath();
      c.fill();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      let aliveCount = 0;

      for (const p of particles) {
        p.life += 1;
        if (p.life >= p.maxLife) continue;
        aliveCount += 1;

        // Smooth air resistance + gentle gravity + lateral silk flutter
        p.vx *= 0.982;
        p.vy = p.vy * 0.982 + 0.13;
        p.x += p.vx + Math.sin(p.life * p.swaySpeed + p.swayPhase) * 0.42;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        const progress = p.life / p.maxLife;
        if (progress < 0.08) {
          p.alpha = p.maxAlpha * (progress / 0.08);
        } else if (progress > 0.62) {
          const fadeRatio = (1 - progress) / 0.38;
          p.alpha = p.maxAlpha * Math.max(0, fadeRatio * fadeRatio);
        } else {
          p.alpha = p.maxAlpha;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'ribbon') {
          const tumbleScale = Math.max(0.22, Math.abs(Math.cos(p.tilt)));
          const w = p.size;
          const h = p.size * 0.46 * tumbleScale;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(-w / 2, -h / 2, w, h, 1.2);
          } else {
            ctx.rect(-w / 2, -h / 2, w, h);
          }
          ctx.fill();
        } else if (p.shape === 'sparkle') {
          const pulse = 0.8 + 0.2 * Math.sin(p.tilt);
          drawSparkle(ctx, p.size * pulse);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [active, burstKey, prefersReducedMotion]);

  if (!active || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      data-testid="celebration-confetti"
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none select-none"
    />
  );
}
