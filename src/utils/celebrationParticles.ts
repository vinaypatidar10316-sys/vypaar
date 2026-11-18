export const CELEBRATION_PALETTE = [
  '#059669', // Emerald Jade
  '#10B981', // Bright Emerald
  '#047857', // Deep Jade
  '#D97706', // Brushed Gold
  '#F59E0B', // Champagne Amber
  '#FDE68A', // Soft Gold Highlight
  '#A7F3D0', // Jade Mist
] as const;

export type ParticleShape = 'ribbon' | 'sparkle' | 'dot';

export interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: ParticleShape;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
}

export function createCelebrationParticles(
  originX: number,
  originY: number,
  count = 54,
): ConfettiParticle[] {
  const shapes: ParticleShape[] = ['ribbon', 'ribbon', 'ribbon', 'sparkle', 'dot'];
  const particles: ConfettiParticle[] = [];

  for (let i = 0; i < count; i++) {
    // Fan upward between -148 deg and -32 deg for a refined fountain bloom
    const spreadRatio = i / Math.max(1, count - 1);
    const baseAngle = (-148 + spreadRatio * 116) * (Math.PI / 180);
    const jitterAngle = baseAngle + (Math.random() - 0.5) * 0.28;
    const speed = 4.2 + Math.random() * 5.8;

    const shape = shapes[i % shapes.length];
    const size =
      shape === 'ribbon'
        ? 5.5 + Math.random() * 4
        : shape === 'sparkle'
        ? 4.5 + Math.random() * 3.5
        : 2.2 + Math.random() * 2;

    particles.push({
      x: originX + (Math.random() - 0.5) * 44,
      y: originY + (Math.random() - 0.5) * 16,
      vx: Math.cos(jitterAngle) * speed,
      vy: Math.sin(jitterAngle) * speed - 1.2,
      size,
      color: CELEBRATION_PALETTE[i % CELEBRATION_PALETTE.length],
      shape,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.14,
      tilt: Math.random() * Math.PI * 2,
      tiltSpeed: 0.08 + Math.random() * 0.12,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.04 + Math.random() * 0.05,
      alpha: 0,
      maxAlpha: shape === 'dot' ? 0.78 : 0.9,
      life: 0,
      maxLife: 115 + Math.floor(Math.random() * 55),
    });
  }

  return particles;
}
