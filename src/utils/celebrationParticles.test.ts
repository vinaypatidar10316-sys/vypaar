import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CELEBRATION_PALETTE,
  createCelebrationParticles,
} from './celebrationParticles';

test('createCelebrationParticles spawns bounded upward particles in Porcelain/Emerald/Gold palette', () => {
  const particles = createCelebrationParticles(240, 260, 54);
  assert.equal(particles.length, 54);

  const shapes = new Set(particles.map((p) => p.shape));
  assert.equal(shapes.has('ribbon'), true);
  assert.equal(shapes.has('sparkle'), true);
  assert.equal(shapes.has('dot'), true);

  for (const p of particles) {
    assert.ok((CELEBRATION_PALETTE as readonly string[]).includes(p.color));
    assert.ok(p.vy < 0, 'particles should initially bloom upward');
    assert.ok(Math.abs(p.x - 240) <= 25);
    assert.ok(Math.abs(p.y - 260) <= 10);
    assert.ok(p.maxLife >= 115 && p.maxLife <= 170);
  }
});
