/**
 * TOPOGRAPHIC-BACKGROUND.JS
 * Animação de fundo com curvas de nível topográficas
 *
 * Conceito: Linhas de isoípsas sendo desenhadas em tempo real,
 * evocando o processo criativo e técnico da arquitetura.
 */

// ============================================================================
// IMPORTS
// ============================================================================
import { logger } from '../utils/logger.js';

// ============================================================================
// Utilities - Perlin Noise for Organic Movement
// ============================================================================

class SimplexNoise {
  constructor(seed = Math.random()) {
    this.p = this.buildPermutationTable(seed);
  }

  buildPermutationTable(seed) {
    const p = [];
    for (let i = 0; i < 256; i++) {
      p[i] = i;
    }
    // Shuffle using seed
    for (let i = 255; i > 0; i--) {
      const n = Math.floor(seed * (i + 1));
      const q = p[i];
      p[i] = p[n % 256];
      p[n % 256] = q;
      seed = (seed * 16807) % 2147483647;
    }
    return p.concat(p);
  }

  noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const A = this.p[X] + Y;
    const B = this.p[X + 1] + Y;

    return this.lerp(
      v,
      this.lerp(u, this.grad(this.p[A], x, y), this.grad(this.p[B], x - 1, y)),
      this.lerp(u, this.grad(this.p[A + 1], x, y - 1), this.grad(this.p[B + 1], x - 1, y - 1))
    );
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(t, a, b) {
    return a + t * (b - a);
  }

  grad(hash, x, y) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
}

// ============================================================================
// Contour Line Class
// ============================================================================

class ContourLine {
  constructor(canvas, config, sharedNoise, sharedNoise2) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;

    // Shared noise instances (performance optimization)
    this.noise = sharedNoise;
    this.noise2 = sharedNoise2;

    // Line properties - sophisticated topographic style
    this.centerX = config.centerX || canvas.width / 2;
    this.centerY = config.centerY || canvas.height / 2;
    this.baseRadius = config.baseRadius || 150;

    // Sophisticated organic parameters
    this.radiusVariationX = 0.8 + Math.random() * 0.4; // Horizontal stretch
    this.radiusVariationY = 0.7 + Math.random() * 0.3; // Vertical stretch
    this.rotation = Math.random() * Math.PI * 2; // Random rotation
    this.irregularity = 0.15 + Math.random() * 0.25; // Organic irregularity

    this.amplitude = config.amplitude || 25;
    this.frequency = config.frequency || 0.012;
    this.speed = config.speed || 0.00015; // Much slower
    this.opacity = 0;
    this.targetOpacity = config.opacity || 0.08; // Ultra-subtle
    this.lineWidth = config.lineWidth || 0.8;
    this.color = config.color || 'rgba(155, 161, 135, 1)';

    // Animation state
    this.offset = Math.random() * 1000;
    this.phase = 0;
    this.drawProgress = 0;
    this.lifecycle = 'appearing';
    this.age = 0;
    this.maxAge = config.maxAge || 35000; // Longer life
    this.appearDuration = 6000; // Very slow appearance
    this.disappearDuration = 4000;

    // Topographic sophistication - reduced segments for performance
    this.segments = 120; // Reduced from 200 for better performance
    this.noiseScale = config.noiseScale || 1;
    this.noiseOctaves = 2; // Reduced from 3 for performance

    // Cache for performance optimization
    this.cachedPoints = null;
    this.lastCacheTime = 0;
    this.cacheInterval = 100; // Cache points every 100ms
  }

  update(deltaTime) {
    this.age += deltaTime;
    this.phase += this.speed * deltaTime;

    // Lifecycle management
    if (this.lifecycle === 'appearing') {
      const appearProgress = this.age / this.appearDuration;
      this.opacity = Math.min(this.targetOpacity, appearProgress * this.targetOpacity);
      this.drawProgress = Math.min(1, this.age / this.appearDuration);

      if (this.age >= this.appearDuration) {
        this.lifecycle = 'visible';
      }
    } else if (this.lifecycle === 'visible') {
      this.drawProgress = 1;

      if (this.age >= this.maxAge - this.disappearDuration) {
        this.lifecycle = 'disappearing';
      }
    } else if (this.lifecycle === 'disappearing') {
      const disappearStart = this.maxAge - this.disappearDuration;
      const disappearProgress = (this.age - disappearStart) / this.disappearDuration;
      this.opacity = this.targetOpacity * (1 - disappearProgress);

      if (this.age >= this.maxAge) {
        this.lifecycle = 'dead';
      }
    }
  }

  generatePoints(dpr) {
    const points = [];

    // Generate sophisticated organic topographic contour
    for (let i = 0; i <= this.segments; i++) {
      const angle = (i / this.segments) * Math.PI * 2;
      const rotatedAngle = angle + this.rotation;

      // Base elliptical radius with stretch
      let radius = this.baseRadius;
      const ellipseX = Math.cos(rotatedAngle) * this.radiusVariationX;
      const ellipseY = Math.sin(rotatedAngle) * this.radiusVariationY;
      const ellipseFactor = Math.sqrt(ellipseX * ellipseX + ellipseY * ellipseY);

      radius *= ellipseFactor;

      // Optimized Perlin noise calculation (reduced octaves for performance)
      const noiseValue1 = this.noise.noise(
        Math.cos(angle) * this.frequency + this.phase * 0.5,
        Math.sin(angle) * this.frequency + this.offset
      );

      const noiseValue2 =
        this.noise2.noise(
          Math.cos(angle) * this.frequency * 1.5 + this.phase * 0.3, // Reduced multiplier
          Math.sin(angle) * this.frequency * 1.5 + this.offset * 0.7
        ) * 0.5;

      // Combined organic variation with irregularity
      const combinedNoise = (noiseValue1 + noiseValue2) * this.irregularity;
      radius += combinedNoise * this.amplitude * this.noiseScale;

      // Calculate final position with rotation
      const x = this.centerX / dpr + Math.cos(angle) * radius;
      const y = this.centerY / dpr + Math.sin(angle) * radius;

      points.push({ x, y });
    }

    return points;
  }

  draw() {
    if (this.lifecycle === 'dead' || this.opacity <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    const now = performance.now();

    // Use cached points if available and recent (performance optimization)
    let points = this.cachedPoints;
    if (!points || now - this.lastCacheTime > this.cacheInterval) {
      points = this.generatePoints(dpr);
      this.cachedPoints = points;
      this.lastCacheTime = now;
    }

    // Draw the contour line
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Create smooth closed curve
    this.ctx.beginPath();

    if (points.length > 0) {
      this.ctx.moveTo(points[0].x, points[0].y);

      // Use quadratic curves for smooth appearance
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        this.ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      // Close the loop smoothly
      const xc = (points[points.length - 1].x + points[0].x) / 2;
      const yc = (points[points.length - 1].y + points[0].y) / 2;
      this.ctx.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, xc, yc);
      this.ctx.quadraticCurveTo(xc, yc, points[0].x, points[0].y);
    }

    // Apply draw progress (gradual drawing animation)
    if (this.drawProgress < 1) {
      const totalLength = this.baseRadius * Math.PI * 2; // Approximation
      const dashLength = totalLength * this.drawProgress;
      this.ctx.setLineDash([dashLength, totalLength]);
      this.ctx.lineDashOffset = 0;
    } else {
      this.ctx.setLineDash([]);
    }

    this.ctx.stroke();
    this.ctx.restore();
  }

  isDead() {
    return this.lifecycle === 'dead';
  }
}

// ============================================================================
// Topographic Background Main Class
// ============================================================================

class TopographicBackground {
  constructor(options = {}) {
    this.options = {
      maxLines: 4,
      spawnInterval: 4000, // New line every 4 seconds
      colors: [
        'rgba(155, 161, 135, 1)', // moss-light
        'rgba(84, 89, 67, 1)', // moss (darker, subtle)
        'rgba(232, 218, 203, 1)', // beige (very subtle)
      ],
      ...options,
    };

    this.canvas = null;
    this.ctx = null;
    this.lines = [];
    this.lastSpawnTime = 0;
    this.lastFrameTime = performance.now();
    this.animationId = null;
    this.isRunning = false;

    // Performance optimizations
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isVisible = !document.hidden;

    // Single shared noise instances for all lines (critical performance improvement)
    this.sharedNoise = new SimplexNoise(Math.random());
    this.sharedNoise2 = new SimplexNoise(Math.random() * 100);

    // Performance monitoring
    this.frameCount = 0;
    this.fps = 0;
    this.lastFpsUpdate = performance.now();

    this.init();
  }

  init() {
    this.createCanvas();
    this.setupEventListeners();

    // Only start if user doesn't prefer reduced motion
    if (!this.prefersReducedMotion) {
      this.start();
    }

    logger.debug('TopographicBackground initialized', {
      maxLines: this.options.maxLines,
      prefersReducedMotion: this.prefersReducedMotion,
    });
  }

  createCanvas() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'topographic-background';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      background: transparent;
    `;

    // Ensure body has transparent or no background
    if (!document.body.style.background && !document.body.style.backgroundColor) {
      // Don't override if already set
    }

    // Insert as first child of body
    document.body.insertBefore(this.canvas, document.body.firstChild);

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.resize();
  }

  setupEventListeners() {
    // Resize handler
    const resizeHandler = () => {
      this.resize();
    };
    window.addEventListener('resize', resizeHandler);

    // Performance: Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (document.hidden || this.prefersReducedMotion) {
        this.pause();
      } else {
        this.resume();
      }
    });

    // Accessibility: Respect prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = e => {
      this.prefersReducedMotion = e.matches;
      if (this.prefersReducedMotion) {
        this.pause();
      } else if (this.isVisible) {
        this.resume();
      }
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    this.prefersReducedMotion = reducedMotionQuery.matches;
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  spawnLine() {
    if (this.lines.length >= this.options.maxLines) return;

    const dpr = window.devicePixelRatio || 1;
    const viewportWidth = this.canvas.width / dpr;
    const viewportHeight = this.canvas.height / dpr;

    // Random position for contour center (weighted towards middle and sides)
    const sectorRandom = Math.random();
    let centerX, centerY;

    if (sectorRandom < 0.4) {
      // Left or right side
      centerX =
        Math.random() < 0.5
          ? viewportWidth * (0.1 + Math.random() * 0.3)
          : viewportWidth * (0.6 + Math.random() * 0.3);
      centerY = viewportHeight * (0.2 + Math.random() * 0.6);
    } else {
      // Center area
      centerX = viewportWidth * (0.3 + Math.random() * 0.4);
      centerY = viewportHeight * (0.2 + Math.random() * 0.6);
    }

    const config = {
      centerX: centerX * dpr,
      centerY: centerY * dpr,
      baseRadius: 120 + Math.random() * 180, // Larger, more elegant
      amplitude: 20 + Math.random() * 30,
      frequency: 0.008 + Math.random() * 0.006,
      speed: 0.00012 + Math.random() * 0.00018, // Very slow
      opacity: 0.06 + Math.random() * 0.04, // Ultra-subtle (0.06-0.10)
      lineWidth: 0.6 + Math.random() * 0.4, // Delicate (0.6-1.0px)
      color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
      maxAge: 30000 + Math.random() * 20000, // Long life
      noiseScale: 0.9 + Math.random() * 0.3,
      isClosedLoop: true,
    };

    const line = new ContourLine(this.canvas, config, this.sharedNoise, this.sharedNoise2);
    this.lines.push(line);
  }

  update(deltaTime) {
    // Update all lines
    this.lines.forEach(line => line.update(deltaTime));

    // Remove dead lines
    this.lines = this.lines.filter(line => !line.isDead());

    // Spawn new lines
    const now = performance.now();
    if (now - this.lastSpawnTime > this.options.spawnInterval) {
      this.spawnLine();
      this.lastSpawnTime = now;
    }
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw all lines
    this.lines.forEach(line => line.draw());
  }

  animate() {
    if (!this.isRunning) return;

    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.update(deltaTime);
    this.draw();

    // Performance monitoring
    this.frameCount++;
    if (now - this.lastFpsUpdate >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;

      // Performance metrics available for debugging
      // Uncomment: console.log(`Topographic FPS: ${this.fps}, Lines: ${this.lines.length}`);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.lastSpawnTime = performance.now();

    // Spawn initial line with subtle delay
    setTimeout(() => this.spawnLine(), 1000);

    this.animate();
  }

  pause() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resume() {
    if (!this.isRunning) {
      this.start();
    }
  }

  destroy() {
    this.pause();
    this.lines = [];
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// ============================================================================
// Export and Auto-Initialize
// ============================================================================

// Export as ES6 module
export default TopographicBackground;

// Export class name for named imports
export { TopographicBackground };
