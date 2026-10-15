import React, { memo, useEffect, useRef } from 'react';
import styles from './DesktopScene.module.css';

/*
 * Decorative, semi-interactive 3D wallpaper layer for the desktop.
 *
 * Rendered with Canvas 2D: glass spheres, a tilting glass ring, atmospheric
 * light glows and sparse particles. Every object is pre-rendered once into an
 * offscreen sprite (including depth-of-field blur) and per frame we only
 * position sprites, so the loop does no gradient work and no allocations.
 *
 * The layer never receives pointer events, never re-renders React, follows the
 * existing `data-theme` attribute, honours prefers-reduced-motion and falls back
 * to the existing wallpaper (by simply not drawing) if anything fails.
 */

const TAU = Math.PI * 2;

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const AMBER = [255, 170, 88];
const BRONZE = [214, 140, 82];
const EMBER = [255, 110, 70];
const TEAL = [70, 190, 210];

// Composition is expressed in container-relative units so it matches the
// existing wallpaper at any size: icons live top-left, the dock bottom-centre.
const GLOWS = [
  { x: 0.30, y: 0.42, r: 0.42, color: EMBER, depth: 0.15, period: 29, phase: 0 },
  { x: 0.80, y: 0.28, r: 0.50, color: AMBER, depth: 0.10, period: 37, phase: 1.7 },
  { x: 0.52, y: 0.72, r: 0.36, color: TEAL, depth: 0.20, period: 23, phase: 3.1 },
];

const SPHERES = [
  // x, y: centre; r: radius as a fraction of min(width, height); depth: 0 far → 1 near
  { x: 0.44, y: 0.20, r: 0.030, depth: 0.25, blur: 5, tint: BRONZE, caustic: TEAL, amp: 7, speed: 0.11, phase: 2.2, desktopOnly: true },
  { x: 0.77, y: 0.33, r: 0.200, depth: 0.35, blur: 9, tint: AMBER, caustic: TEAL, amp: 10, speed: 0.06, phase: 0.0 },
  { x: 0.61, y: 0.62, r: 0.075, depth: 0.65, blur: 1.5, tint: TEAL, caustic: AMBER, amp: 9, speed: 0.09, phase: 1.3 },
  { x: 0.89, y: 0.75, r: 0.045, depth: 1.00, blur: 0, tint: EMBER, caustic: AMBER, amp: 12, speed: 0.13, phase: 4.0 },
];

const RING = { x: 0.34, y: 0.70, r: 0.075, depth: 0.55, desktopOnly: true };

const THEMES = {
  dark: {
    glowBlend: 'screen',
    glowAlpha: 0.11,
    body: 0.09,
    rim: 0.34,
    rimColor: [255, 236, 214],
    edge: 'rgba(255,255,255,0.10)',
    caustic: 0.24,
    highlight: 0.55,
    shade: 'rgba(0,0,0,0.22)',
    particleBlend: 'screen',
    particleColors: [[255, 214, 168], [170, 228, 240]],
    particleAlpha: 0.6,
    ring: [255, 222, 186],
    ringAlpha: 0.38,
  },
  light: {
    glowBlend: 'source-over',
    glowAlpha: 0.075,
    body: 0.12,
    rim: 0.30,
    rimColor: [150, 104, 60],
    edge: 'rgba(80,56,32,0.16)',
    caustic: 0.30,
    highlight: 0.9,
    shade: 'rgba(90,60,30,0.10)',
    particleBlend: 'source-over',
    particleColors: [[176, 120, 70], [60, 140, 160]],
    particleAlpha: 0.35,
    ring: [150, 104, 60],
    ringAlpha: 0.32,
  },
};

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c;
}

function releaseCanvas(c) {
  if (c) {
    c.width = 0;
    c.height = 0;
  }
}

let filterSupport = null;
function supportsCanvasFilter() {
  if (filterSupport === null) {
    try {
      const ctx = makeCanvas(1, 1).getContext('2d');
      ctx.filter = 'blur(2px)';
      filterSupport = ctx.filter === 'blur(2px)';
    } catch (e) {
      filterSupport = false;
    }
  }
  return filterSupport;
}

// Apply depth-of-field blur to a sprite once, at build time.
function blurred(source, blurPx) {
  if (blurPx < 0.5 || !supportsCanvasFilter()) return source;
  const out = makeCanvas(source.width, source.height);
  const g = out.getContext('2d');
  g.filter = `blur(${blurPx}px)`;
  g.drawImage(source, 0, 0);
  releaseCanvas(source);
  return out;
}

function buildGlowSprite(color) {
  const size = 128;
  const c = makeCanvas(size, size);
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gr.addColorStop(0, rgba(color, 1));
  gr.addColorStop(0.35, rgba(color, 0.5));
  gr.addColorStop(0.7, rgba(color, 0.14));
  gr.addColorStop(1, rgba(color, 0));
  g.fillStyle = gr;
  g.fillRect(0, 0, size, size);
  return c;
}

function buildParticleSprite(color) {
  const size = 32;
  const c = makeCanvas(size, size);
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gr.addColorStop(0, rgba(color, 1));
  gr.addColorStop(0.25, rgba(color, 0.6));
  gr.addColorStop(1, rgba(color, 0));
  g.fillStyle = gr;
  g.fillRect(0, 0, size, size);
  return c;
}

// Glass sphere body: tinted volume, fresnel rim, bottom caustic and an edge line.
function buildSphereSprite(r, blurPx, sphere, theme, scale) {
  const pad = Math.ceil(blurPx * 2.5 + 2);
  const size = Math.ceil((r + pad) * 2 * scale);
  const c = makeCanvas(size, size);
  const g = c.getContext('2d');
  g.scale(scale, scale);
  const m = size / scale / 2;

  g.save();
  g.beginPath();
  g.arc(m, m, r, 0, TAU);
  g.clip();

  let gr = g.createRadialGradient(m - r * 0.35, m - r * 0.4, 0, m, m, r * 1.15);
  gr.addColorStop(0, rgba(sphere.tint, theme.body * 1.5));
  gr.addColorStop(0.6, rgba(sphere.tint, theme.body * 0.6));
  gr.addColorStop(1, rgba(sphere.tint, theme.body * 1.9));
  g.fillStyle = gr;
  g.fillRect(0, 0, m * 2, m * 2);

  // Volume: the side away from the light falls off slightly.
  gr = g.createRadialGradient(m - r * 0.45, m - r * 0.5, r * 0.6, m, m, r * 1.05);
  gr.addColorStop(0, 'rgba(0,0,0,0)');
  gr.addColorStop(1, theme.shade);
  g.fillStyle = gr;
  g.fillRect(0, 0, m * 2, m * 2);

  // Light gathered at the bottom of the glass.
  gr = g.createRadialGradient(m + r * 0.28, m + r * 0.48, 0, m + r * 0.28, m + r * 0.48, r * 0.7);
  gr.addColorStop(0, rgba(sphere.caustic, theme.caustic));
  gr.addColorStop(1, rgba(sphere.caustic, 0));
  g.fillStyle = gr;
  g.fillRect(0, 0, m * 2, m * 2);

  // Fresnel rim.
  gr = g.createRadialGradient(m, m, r * 0.6, m, m, r);
  gr.addColorStop(0, rgba(theme.rimColor, 0));
  gr.addColorStop(0.86, rgba(theme.rimColor, theme.rim * 0.45));
  gr.addColorStop(1, rgba(theme.rimColor, theme.rim));
  g.fillStyle = gr;
  g.fillRect(0, 0, m * 2, m * 2);
  g.restore();

  g.beginPath();
  g.arc(m, m, r - 0.5, 0, TAU);
  g.strokeStyle = theme.edge;
  g.lineWidth = 1;
  g.stroke();

  return blurred(c, blurPx * scale);
}

// Specular highlight, drawn separately so it can slide with the pointer.
function buildHighlightSprite(r, blurPx, theme, scale) {
  const pad = Math.ceil(blurPx * 2.5 + 2);
  const size = Math.ceil((r + pad) * 2 * scale);
  const c = makeCanvas(size, size);
  const g = c.getContext('2d');
  g.scale(scale, scale);
  const m = size / scale / 2;

  g.translate(m - r * 0.36, m - r * 0.42);
  g.rotate(-0.62);
  g.scale(1, 0.6);
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, r * 0.3);
  gr.addColorStop(0, `rgba(255,255,255,${theme.highlight})`);
  gr.addColorStop(0.45, `rgba(255,255,255,${theme.highlight * 0.35})`);
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.beginPath();
  g.arc(0, 0, r * 0.3, 0, TAU);
  g.fill();

  g.setTransform(scale, 0, 0, scale, 0, 0);
  g.beginPath();
  g.arc(m - r * 0.42, m - r * 0.48, Math.max(0.8, r * 0.04), 0, TAU);
  g.fillStyle = `rgba(255,255,255,${Math.min(1, theme.highlight * 1.3)})`;
  g.fill();

  return blurred(c, blurPx * scale);
}

function rectsOverlapCircle(rects, cx, cy, r) {
  for (let i = 0; i < rects.length; i++) {
    const q = rects[i];
    const nx = Math.max(q.x, Math.min(cx, q.x + q.w));
    const ny = Math.max(q.y, Math.min(cy, q.y + q.h));
    const dx = cx - nx;
    const dy = cy - ny;
    if (dx * dx + dy * dy < r * r) return true;
  }
  return false;
}

function pointInRects(rects, x, y) {
  for (let i = 0; i < rects.length; i++) {
    const q = rects[i];
    if (x >= q.x && x <= q.x + q.w && y >= q.y && y <= q.y + q.h) return true;
  }
  return false;
}

function DesktopScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas && canvas.parentElement;
    if (!canvas || !container || typeof window === 'undefined') return undefined;

    let ctx;
    try {
      ctx = canvas.getContext('2d', { alpha: true });
    } catch (e) {
      ctx = null;
    }
    // Unsupported: keep the existing wallpaper untouched.
    if (!ctx) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const nav = window.navigator || {};
    const lowPower =
      (nav.deviceMemory && nav.deviceMemory <= 2) ||
      (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) ||
      (nav.connection && nav.connection.saveData);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let small = false;
    let quality = 1; // 1 = full, 0 = reduced (governor fallback)
    let staticMode = lowPower || motionQuery.matches;
    let themeName = 'dark';
    let theme = THEMES.dark;

    let glowSprites = [];
    let particleSprites = [];
    let sphereSprites = [];
    let ring = null;
    let particles = [];
    let quietRects = [];

    // Pointer parallax state (plain variables, never React state).
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    let rafId = 0;
    let running = false;
    let lastTime = 0;
    let lastDraw = 0;
    let elapsed = 0;
    let disposed = false;
    let revealed = false;
    let costSum = 0;
    let costFrames = 0;
    let rebuildQueued = 0;

    const readTheme = () =>
      document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

    const freeSprites = () => {
      glowSprites.forEach(releaseCanvas);
      particleSprites.forEach(releaseCanvas);
      sphereSprites.forEach((s) => {
        releaseCanvas(s.body);
        releaseCanvas(s.highlight);
      });
      glowSprites = [];
      particleSprites = [];
      sphereSprites = [];
    };

    // Keep the areas behind desktop icons/labels and the dock visually quiet.
    const measureQuietZones = () => {
      const base = container.getBoundingClientRect();
      const pad = 18;
      const rects = [];
      container.querySelectorAll('.desktop-shortcut, .desktop-dock-wrapper').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.width && b.height) {
          rects.push({ x: b.left - base.left - pad, y: b.top - base.top - pad, w: b.width + pad * 2, h: b.height + pad * 2 });
        }
      });
      quietRects = rects;
    };

    const seedParticles = () => {
      const count = Math.round((small ? 14 : width < 1100 ? 24 : 36) * (quality ? 1 : 0.5) * (themeName === 'light' ? 0.7 : 1));
      particles = new Array(count);
      for (let i = 0; i < count; i++) {
        const depth = 0.2 + Math.random() * 0.8;
        particles[i] = {
          x: Math.random(),
          y: Math.random(),
          depth,
          size: (1.4 + Math.random() * 2.6) * (0.55 + depth * 0.6),
          vy: -(0.004 + Math.random() * 0.008) * (0.5 + depth),
          wander: 0.004 + Math.random() * 0.006,
          freq: 0.15 + Math.random() * 0.3,
          phase: Math.random() * TAU,
          twinkle: 0.3 + Math.random() * 0.6,
          sprite: Math.random() < 0.7 ? 0 : 1,
          quiet: false,
        };
      }
    };

    const build = () => {
      if (disposed) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;

      small = width < 768;
      themeName = readTheme();
      theme = THEMES[themeName];

      // Cap backing-store resolution; the scene is soft so it does not need full DPR.
      const maxDpr = small || !quality ? 1 : 1.5;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const maxPixels = 2.6e6;
      if (width * height * dpr * dpr > maxPixels) dpr = Math.sqrt(maxPixels / (width * height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      measureQuietZones();
      freeSprites();

      const minDim = Math.min(width, height);
      glowSprites = GLOWS.map((g) => buildGlowSprite(g.color));
      particleSprites = theme.particleColors.map(buildParticleSprite);
      sphereSprites = SPHERES.map((s) => {
        if (small && s.desktopOnly) return null;
        const r = s.r * minDim * (small ? 0.85 : 1);
        const blur = s.blur * (small ? 0.6 : 1);
        const cx = s.x * width;
        const cy = s.y * height;
        return {
          def: s,
          r,
          body: buildSphereSprite(r, blur, s, theme, dpr),
          highlight: buildHighlightSprite(r, blur, theme, dpr),
          alpha: rectsOverlapCircle(quietRects, cx, cy, r) ? 0.45 : 1,
        };
      }).filter(Boolean);

      if (!small) {
        const R = RING.r * minDim;
        const grad = ctx.createLinearGradient(-R, 0, R, 0);
        grad.addColorStop(0, rgba(theme.ring, 0.04));
        grad.addColorStop(0.5, rgba(theme.ring, theme.ringAlpha));
        grad.addColorStop(1, rgba(theme.ring, 0.04));
        ring = { R, grad, alpha: rectsOverlapCircle(quietRects, RING.x * width, RING.y * height, R) ? 0.4 : 1 };
      } else {
        ring = null;
      }

      seedParticles();
    };

    const draw = (t) => {
      const W = width;
      const H = height;
      const maxDim = Math.max(W, H);
      const shift = small ? 0 : 16; // max parallax in CSS px for the nearest layer
      const px = pointerX;
      const py = pointerY;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Atmospheric light: slow drift and breathing.
      ctx.globalCompositeOperation = theme.glowBlend;
      for (let i = 0; i < GLOWS.length; i++) {
        const g = GLOWS[i];
        const w = (t * TAU) / g.period + g.phase;
        const size = g.r * maxDim * 2;
        const gx = (g.x + 0.02 * Math.sin(w)) * W - px * shift * g.depth;
        const gy = (g.y + 0.015 * Math.cos(w * 0.8)) * H - py * shift * g.depth;
        ctx.globalAlpha = theme.glowAlpha * (1 + 0.22 * Math.sin(w * 1.3 + 0.7));
        ctx.drawImage(glowSprites[i], gx - size / 2, gy - size / 2, size, size);
      }

      // 2. Far particles, 3. glass forms, 4. near particles.
      drawParticles(t, W, H, shift, px, py, 0, 0.55);

      ctx.globalCompositeOperation = 'source-over';
      if (ring) drawRing(t, W, H, shift, px, py);
      for (let i = 0; i < sphereSprites.length; i++) {
        const s = sphereSprites[i];
        const d = s.def;
        const w = t * TAU * d.speed + d.phase;
        const cx = d.x * W + Math.cos(w * 0.7) * d.amp * 0.6 - px * shift * d.depth;
        const cy = d.y * H + Math.sin(w) * d.amp - py * shift * d.depth;
        const breathe = 1 + 0.012 * Math.sin(w * 0.5);
        const bw = (s.body.width / dpr) * breathe;
        const bh = (s.body.height / dpr) * breathe;
        ctx.globalAlpha = s.alpha;
        ctx.drawImage(s.body, cx - bw / 2, cy - bh / 2, bw, bh);
        // The highlight slides against the pointer, suggesting a fixed light on a curved surface.
        const hx = cx - px * s.r * 0.08;
        const hy = cy - py * s.r * 0.08;
        ctx.drawImage(s.highlight, hx - bw / 2, hy - bh / 2, bw, bh);
      }

      drawParticles(t, W, H, shift, px, py, 0.55, 1.01);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const drawRing = (t, W, H, shift, px, py) => {
      const { R, grad } = ring;
      const tilt = 1.12 + 0.16 * Math.sin((t * TAU) / 41);
      const rot = -0.38 + 0.1 * Math.sin((t * TAU) / 53 + 1.1);
      const ry = Math.max(1, R * Math.cos(tilt));
      const cx = RING.x * W + Math.cos((t * TAU) / 31) * 6 - px * shift * RING.depth;
      const cy = RING.y * H + Math.sin((t * TAU) / 27) * 8 - py * shift * RING.depth;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.globalAlpha = ring.alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, R, ry, 0, 0, TAU);
      ctx.lineWidth = R * 0.14;
      ctx.strokeStyle = rgba(theme.ring, themeName === 'light' ? 0.05 : 0.045);
      ctx.stroke();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = grad;
      ctx.stroke();
      ctx.restore();
    };

    const drawParticles = (t, W, H, shift, px, py, minDepth, maxDepth) => {
      ctx.globalCompositeOperation = theme.particleBlend;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.depth < minDepth || p.depth >= maxDepth) continue;
        const x = p.x * W - px * shift * p.depth;
        const y = p.y * H - py * shift * p.depth;
        const edge = Math.min(1, (p.y + 0.05) / 0.15, (1.05 - p.y) / 0.15);
        if (edge <= 0) continue;
        const twinkle = 0.65 + 0.35 * Math.sin(t * p.twinkle + p.phase);
        const quiet = pointInRects(quietRects, x, y) ? 0.3 : 1;
        ctx.globalAlpha = theme.particleAlpha * edge * twinkle * quiet * (0.5 + p.depth * 0.5);
        const s = p.size * 2.2;
        ctx.drawImage(particleSprites[p.sprite], x - s / 2, y - s / 2, s, s);
      }
    };

    const step = (dt, t) => {
      // Frame-rate independent exponential damping toward the pointer target.
      const k = 1 - Math.exp(-dt * 3);
      pointerX += (targetX - pointerX) * k;
      pointerY += (targetY - pointerY) * k;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy * dt;
        p.x += Math.sin(t * p.freq + p.phase) * p.wander * dt;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        if (p.x < -0.02) p.x += 1.04;
        else if (p.x > 1.02) p.x -= 1.04;
      }
    };

    const reveal = () => {
      if (!revealed) {
        revealed = true;
        canvas.classList.add(styles.ready);
      }
    };

    const fail = () => {
      stop();
      canvas.style.display = 'none';
    };

    const renderStatic = () => {
      try {
        pointerX = 0;
        pointerY = 0;
        draw(0);
        reveal();
      } catch (e) {
        fail();
      }
    };

    const frame = (now) => {
      if (!running) return;
      rafId = window.requestAnimationFrame(frame);
      const minInterval = small ? 1000 / 30 : 0; // half rate on small screens
      if (minInterval && now - lastDraw < minInterval - 1) return;
      const dt = Math.min(0.1, lastTime ? (now - lastTime) / 1000 : 0.016);
      lastTime = now;
      lastDraw = now;
      elapsed += dt;
      try {
        const start = performance.now();
        step(dt, elapsed);
        draw(elapsed);
        reveal();
        governor(performance.now() - start);
      } catch (e) {
        fail();
      }
    };

    // Downgrade if drawing is expensive on this device: first lower quality, then go static.
    const governor = (cost) => {
      costSum += cost;
      costFrames += 1;
      if (costFrames < 90) return;
      const avg = costSum / costFrames;
      costSum = 0;
      costFrames = 0;
      if (avg > 7) {
        if (quality) {
          quality = 0;
          build();
        } else {
          staticMode = true;
          stop();
          renderStatic();
        }
      }
    };

    function start() {
      if (running || staticMode || document.hidden || disposed) return;
      running = true;
      lastTime = 0;
      lastDraw = 0;
      rafId = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    const refresh = () => {
      try {
        build();
      } catch (e) {
        fail();
        return;
      }
      if (staticMode) renderStatic();
      else if (!running) {
        renderStatic();
        start();
      }
    };

    const queueRefresh = () => {
      if (rebuildQueued) return;
      rebuildQueued = window.requestAnimationFrame(() => {
        rebuildQueued = 0;
        refresh();
      });
    };

    // --- Listeners -------------------------------------------------------
    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse' || !finePointerQuery.matches || staticMode) return;
      const b = container.getBoundingClientRect();
      if (!b.width || !b.height) return;
      targetX = Math.max(-1, Math.min(1, ((e.clientX - b.left) / b.width) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, ((e.clientY - b.top) / b.height) * 2 - 1));
    };
    const resetPointer = () => {
      targetX = 0;
      targetY = 0;
    };
    const onMouseOut = (e) => {
      if (!e.relatedTarget) resetPointer();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMotionChange = () => {
      staticMode = lowPower || motionQuery.matches;
      if (staticMode) {
        stop();
        resetPointer();
        renderStatic();
      } else {
        start();
      }
    };
    const onContextLost = (e) => {
      e.preventDefault();
      stop();
    };
    const onContextRestored = () => refresh();

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(queueRefresh) : null;
    if (resizeObserver) resizeObserver.observe(container);
    else window.addEventListener('resize', queueRefresh);

    const themeObserver = new MutationObserver(queueRefresh);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', resetPointer);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('contextlost', onContextLost);
    canvas.addEventListener('contextrestored', onContextRestored);
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange);
    else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);

    refresh();

    return () => {
      disposed = true;
      stop();
      if (rebuildQueued) window.cancelAnimationFrame(rebuildQueued);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', queueRefresh);
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', resetPointer);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('contextlost', onContextLost);
      canvas.removeEventListener('contextrestored', onContextRestored);
      if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', onMotionChange);
      else if (motionQuery.removeListener) motionQuery.removeListener(onMotionChange);
      freeSprites();
      particles = [];
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.scene} aria-hidden="true" />;
}

export default memo(DesktopScene);
