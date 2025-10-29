/**
 * NEW-DESIGN.JS - Microinterações e Comportamentos
 * Baseado em princípios de UX e performance
 * 
 * ⚠️ AVISO: Este arquivo é LEGACY e não está sendo usado no projeto.
 * O sistema ativo usa main.js
 * Mantido apenas para referência histórica.
 */

// ============================================================================
// Imports
// ============================================================================
import { throttle } from '../utils/helpers.js';

// ============================================================================
// Utilities
// ============================================================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ============================================================================
// Navigation
// ============================================================================

class Navigation {
  constructor() {
    this.nav = $('#nav');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    this.handleScroll();
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
      this.nav.style.boxShadow = 'var(--shadow-md)';
    } else {
      this.nav.style.boxShadow = 'none';
    }

    // Hide/show nav on scroll (optional)
    // if (currentScroll > this.lastScroll && currentScroll > 500) {
    //   this.nav.style.transform = 'translateY(-100%)';
    // } else {
    //   this.nav.style.transform = 'translateY(0)';
    // }

    this.lastScroll = currentScroll;
  }
}

// ============================================================================
// Smooth Scroll
// ============================================================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = $(anchor.getAttribute('href'));
        if (target) {
          const offset = 80; // Header height
          const targetPosition = target.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            
          });
        }
      });
    });
  }
}

// ============================================================================
// Form Handling
// ============================================================================

class ContactForm {
  constructor() {
    this.form = $('#contactForm');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  validateField(field) {
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    }

    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Email inválido';
      }
    }

    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Telefone inválido';
      }
    }

    // Show/hide error
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form__error')) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = isValid ? 'none' : 'block';
    }

    // Visual feedback
    if (isValid) {
      field.style.borderColor = 'var(--color-primary)';
    } else {
      field.style.borderColor = '#ef4444';
    }

    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const fields = this.form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    submitBtn.disabled = true;

    try {
      // Simulate API call (replace with actual endpoint)
      await this.simulateAPICall(data);
      
      // Success
      this.showSuccess();
      this.form.reset();
      
    } catch (error) {
      // Error
      this.showError(error.message);
    } finally {
      // Restore button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  simulateAPICall(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data:', data);
        resolve();
      }, 1500);
    });
  }

  showSuccess() {
    const message = document.createElement('div');
    message.className = 'form__success';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    message.textContent = '✓ Mensagem enviada com sucesso!';
    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  showError(errorMessage) {
    const message = document.createElement('div');
    message.className = 'form__error';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    message.textContent = `✗ ${errorMessage}`;
    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }
}

// ============================================================================
// Scroll Reveal Animations
// ============================================================================

class ScrollReveal {
  constructor() {
    this.elements = $$('[data-reveal]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersect(entries),
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      this.elements.forEach(el => this.observer.observe(el));
    } else {
      // Fallback for older browsers
      this.elements.forEach(el => el.classList.add('revealed'));
    }
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ============================================================================
// Lazy Loading Images
// ============================================================================

class LazyLoad {
  constructor() {
    this.images = $$('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersect(entries),
        { threshold: 0.01 }
      );

      this.images.forEach(img => this.observer.observe(img));
    } else {
      // Fallback
      this.images.forEach(img => this.loadImage(img));
    }
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    img.src = src;
    img.removeAttribute('data-src');
    img.classList.add('loaded');
  }
}

// ============================================================================
// Performance Monitoring
// ============================================================================

class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    }
  }
}

// ============================================================================
// Accessibility Enhancements
// ============================================================================

class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    // Skip to main content
    this.addSkipLink();
    
    // Focus visible for keyboard navigation
    this.handleFocusVisible();
    
    // ARIA live regions for dynamic content
    this.setupLiveRegions();
  }

  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      z-index: 100;
    `;
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  handleFocusVisible() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  setupLiveRegions() {
    // Add aria-live regions for form validation
    $$('.form__error').forEach(el => {
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
    });
  }
}

// ============================================================================
// Initialize All
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  new Navigation();
  new SmoothScroll();
  new ContactForm();
  new ScrollReveal();
  new LazyLoad();
  new AccessibilityEnhancements();
  
  // Initialize sophisticated topographic background
  if (typeof TopographicBackground !== 'undefined') {
    window.topoBackground = new TopographicBackground({
      maxLines: 3,
      spawnInterval: 8000, // Subtle, slow appearance
      colors: [
        'rgba(155, 161, 135, 1)', // moss-light
        'rgba(84, 89, 67, 1)',     // moss dark
        'rgba(232, 218, 203, 1)',  // beige
      ]
    });
  }
  
  // Performance monitoring (only in development)
  if (window.location.hostname === 'localhost') {
    new PerformanceMonitor();
  }

  // Log initialization
  console.log('🏗️ Site initialized successfully');
  console.log('📊 Performance metrics available in console');
});

// ============================================================================
// Export for testing
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navigation,
    SmoothScroll,
    ContactForm,
    ScrollReveal,
    LazyLoad
  };
}
