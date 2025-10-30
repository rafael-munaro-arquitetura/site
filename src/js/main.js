/**
 * Main Application JavaScript
 * Arquitetura modular e moderna com ES6+
 */

// ===========================================
// IMPORTS - Hierarquia de Dependências
// ===========================================

// Estilos CSS - Importados para que Vite os processe corretamente
import '../styles/components.css';
import '../styles/footer.css';
import '../styles/main.css';
import '../styles/sections.css';
import '../styles/variables.css';

// Utilitários críticos (sempre carregados primeiro)
import { debounce, scrollToElement, throttle } from '../utils/helpers.js';
import { componentLogger, logger, performanceLogger } from '../utils/logger.js';

// Componentes críticos (performance e UX)
import { HeaderComponent } from '../components/header.js';
import ScrollReveal from './scroll-reveal.js';
import TopographicBackground from './topographic-background.js';

// ===========================================
// CONFIGURAÇÃO E CONSTANTES
// ===========================================

const CONFIG = {
  // Selectors
  selectors: {
    header: '.header',
    mobileToggle: '.header__mobile-toggle',
    menu: '.header__menu',
    backToTop: '.back-to-top',
    loading: '#loading',
    contactForm: '.contact__form',
    portfolioFilters: '.portfolio__filter',
    portfolioItems: '.portfolio-item',
  },

  // Breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
  },

  // Animation durations
  animations: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  // API endpoints (futuro)
  api: {
    contact: '/api/contact',
    portfolio: '/api/portfolio',
  },
};

// ===========================================
// UTILITÁRIOS GLOBAIS
// ===========================================

// As funções utilitárias foram movidas para imports
// isElementInViewport disponível via import

// ===========================================
// CLASSES DOS COMPONENTES
// ===========================================

/**
 * HeaderComponent agora importado de ../components/header.js
 * Implementação completa com WCAG 2.1 AA, focus trap, keyboard navigation
 */

/**
 * Classe para gerenciar o botão "Voltar ao Topo"
 */
class BackToTopManager {
  constructor() {
    this.button = document.querySelector(CONFIG.selectors.backToTop);
    this.isVisible = false;

    this.init();
  }

  init() {
    if (!this.button) return;

    window.addEventListener(
      'scroll',
      throttle(() => this.handleScroll(), 100)
    );
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    const shouldBeVisible = window.scrollY > 400;

    if (shouldBeVisible !== this.isVisible) {
      this.isVisible = shouldBeVisible;

      if (shouldBeVisible) {
        this.button.classList.add('show');
        this.button.hidden = false;
      } else {
        this.button.classList.remove('show');
        setTimeout(() => {
          if (!this.isVisible) {
            this.button.hidden = true;
          }
        }, 300);
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }
}

/**
 * Classe para gerenciar animações de scroll
 */
class ScrollAnimationManager {
  constructor() {
    // Observar tanto elementos data-animate quanto classes reveal
    this.animatedElements = document.querySelectorAll('[data-animate]');
    this.revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    this.observedElements = new Set();

    this.init();
  }

  init() {
    if (!this.animatedElements.length && !this.revealElements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observar elementos data-animate
    this.animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Observar elementos com classes reveal
    this.revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  animateElement(element) {
    // Para elementos data-animate: adicionar classe animate-*
    if (element.hasAttribute('data-animate')) {
      const animationType = element.dataset.animate || 'fade-in';
      element.classList.add(`animate-${animationType}`);
    }

    // Para elementos com classes reveal: adicionar classe revealed
    const hasRevealClass =
      element.classList.contains('reveal') ||
      element.classList.contains('reveal-left') ||
      element.classList.contains('reveal-right') ||
      element.classList.contains('reveal-scale');

    if (hasRevealClass) {
      element.classList.add('revealed');
    }
  }
}

/**
 * Classe para gerenciar o formulário de contato
 */
class ContactFormManager {
  constructor() {
    this.form = document.querySelector(CONFIG.selectors.contactForm);
    this.isSubmitting = false;

    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', e => this.handleSubmit(e));

    // Máscara para telefone (opcional)
    const phoneInput = this.form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', e => this.formatPhone(e.target));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.isSubmitting) return;

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Validação básica
    if (!this.validateForm(data)) {
      return;
    }

    this.setSubmitting(true);

    try {
      // Simulação de envio (substitua por chamada real da API)
      await this.submitForm(data);

      this.showSuccessMessage();
      this.form.reset();
    } catch (error) {
      componentLogger.error('ContactFormManager', error);
      this.showErrorMessage('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      this.setSubmitting(false);
    }
  }

  validateForm(data) {
    const required = ['name', 'email', 'subject', 'message'];

    for (const field of required) {
      if (!data[field] || !data[field].trim()) {
        this.showFieldError(field, 'Este campo é obrigatório');
        return false;
      }
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.showFieldError('email', 'Email inválido');
      return false;
    }

    return true;
  }

  showFieldError(fieldName, message) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.textContent = message;
    } else {
      const errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.textContent = message;
      errorElement.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-1);
        display: block;
      `;
      field.parentNode.appendChild(errorElement);
    }

    field.focus();
    field.style.borderColor = 'var(--color-error)';
  }

  setSubmitting(submitting) {
    this.isSubmitting = submitting;
    const submitBtn = this.form.querySelector('button[type="submit"]');

    if (submitting) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Mensagem';
    }
  }

  async submitForm(data) {
    // Simulação de delay da API
    return new Promise(resolve => {
      setTimeout(() => {
        componentLogger.event('ContactFormManager', 'form_submitted', {
          fields_count: Object.keys(data).length,
        });
        resolve({ success: true });
      }, 2000);
    });
  }

  showSuccessMessage() {
    this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
  }

  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
      padding: var(--spacing-4);
      border-radius: var(--border-radius-lg);
      margin-bottom: var(--spacing-4);
      font-weight: var(--font-weight-medium);
      ${
        type === 'success'
          ? 'background-color: rgba(16, 185, 129, 0.1); ' +
            'color: var(--color-success); border: 1px solid var(--color-success);'
          : 'background-color: rgba(239, 68, 68, 0.1); ' +
            'color: var(--color-error); border: 1px solid var(--color-error);'
      }
    `;

    this.form.insertBefore(messageElement, this.form.firstChild);

    // Remove mensagem após 5 segundos
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  formatPhone(input) {
    // Remove tudo que não é dígito
    let value = input.value.replace(/\D/g, '');

    // Aplica máscara brasileira
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }

    input.value = value;
  }
}

/**
 * Classe para gerenciar filtros do portfólio e slider
 */
class PortfolioManager {
  constructor() {
    this.filters = document.querySelectorAll(CONFIG.selectors.portfolioFilters);
    this.items = document.querySelectorAll(CONFIG.selectors.portfolioItems);
    this.slider = document.querySelector('.portfolio-slider');
    this.track = document.querySelector('.portfolio-slider__track');
    this.leftArrow = document.querySelector('.portfolio-slider__arrow--left');
    this.rightArrow = document.querySelector('.portfolio-slider__arrow--right');
    this.activeFilter = 'all';
    this.currentIndex = 0;
    this.visibleItems = this.getVisibleItems();

    this.init();
  }

  getVisibleItems() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 3;
    return 2;
  }

  init() {
    if (!this.filters.length || !this.items.length) return;

    // Filtros
    this.filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const filterValue = filter.dataset.filter;
        this.setActiveFilter(filterValue);
      });
    });

    // Arrows
    if (this.leftArrow) {
      this.leftArrow.addEventListener('click', () => this.navigate(-1));
    }
    if (this.rightArrow) {
      this.rightArrow.addEventListener('click', () => this.navigate(1));
    }

    // Resize
    window.addEventListener(
      'resize',
      debounce(() => this.handleResize(), 250)
    );

    this.updateArrowStates();
  }

  handleResize() {
    this.visibleItems = this.getVisibleItems();
    this.setActiveFilter(this.activeFilter);
  }

  setActiveFilter(filterValue) {
    if (this.activeFilter === filterValue) return;

    this.activeFilter = filterValue;
    this.currentIndex = 0;

    // Update filter buttons
    this.filters.forEach(filter => {
      filter.classList.toggle('portfolio__filter--active', filter.dataset.filter === filterValue);
    });

    // Filter items
    const filteredItems = Array.from(this.items).filter(item => {
      const itemCategory = item.dataset.category;
      return filterValue === 'all' || itemCategory === filterValue;
    });

    // Hide all items first
    this.items.forEach(item => {
      item.style.display = 'none';
    });

    // Show filtered items
    filteredItems.forEach(item => {
      item.style.display = 'block';
    });

    // Reset track position
    this.track.style.transform = 'translateX(0)';

    this.updateArrowStates();
  }

  navigate(direction) {
    const visibleItems = Array.from(this.items).filter(item => item.style.display !== 'none');
    const maxIndex = Math.max(0, visibleItems.length - this.visibleItems);

    this.currentIndex += direction;
    this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));

    const itemWidth = 296; // 280px + 16px margin
    const translateX = -this.currentIndex * itemWidth;
    this.track.style.transform = `translateX(${translateX}px)`;

    this.updateArrowStates();
  }

  updateArrowStates() {
    const visibleItems = Array.from(this.items).filter(item => item.style.display !== 'none');
    const maxIndex = Math.max(0, visibleItems.length - this.visibleItems);

    if (this.leftArrow) {
      this.leftArrow.disabled = this.currentIndex === 0;
    }
    if (this.rightArrow) {
      this.rightArrow.disabled = this.currentIndex >= maxIndex;
    }
  }
}

// ===========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ===========================================

/**
 * Classe principal da aplicação
 */
class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Inicializar loading
    this.hideLoading();

    // Fase 1: Componentes críticos (performance e UX imediata)
    this.initCriticalComponents();

    // Fase 2: Componentes não-críticos (lazy loading)
    this.initNonCriticalComponents();

    // Configurar navegação suave
    this.initSmoothScrolling();

    // Configurar lazy loading de imagens
    this.initLazyLoading();

    // Configurar tema (futuro)
    this.initTheme();

    componentLogger.initialized('App');
  }

  initCriticalComponents() {
    // Componentes que afetam performance crítica e UX imediata
    this.components.topographicBackground = new TopographicBackground({
      maxLines: 3,
      spawnInterval: 5000,
      colors: ['rgba(155, 161, 135, 1)', 'rgba(84, 89, 67, 1)', 'rgba(232, 218, 203, 1)'],
    });

    this.components.header = new HeaderComponent();
    this.components.backToTop = new BackToTopManager();
    this.components.scrollAnimation = new ScrollAnimationManager();

    componentLogger.initialized('Critical components');
  }

  initNonCriticalComponents() {
    // Componentes que podem ser carregados após a página estar visível
    // Usando requestIdleCallback para melhor performance
    const initWhenIdle = () => {
      this.components.scrollReveal = new ScrollReveal();
      this.components.contactForm = new ContactFormManager();
      this.components.portfolio = new PortfolioManager();
      componentLogger.initialized('Non-critical components');
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initWhenIdle);
    } else {
      // Fallback para browsers que não suportam
      setTimeout(initWhenIdle, 100);
    }
  }

  hideLoading() {
    const loading = document.querySelector(CONFIG.selectors.loading);
    if (loading) {
      setTimeout(() => {
        loading.hidden = true;
      }, 500);
    }
  }

  initSmoothScrolling() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          scrollToElement(target, 80); // Offset para o header fixo

          // Fechar menu mobile se estiver aberto
          if (this.components.header?.isMenuOpen) {
            this.components.header.closeMobileMenu();
          }
        }
      });
    });
  }

  initLazyLoading() {
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  initTheme() {
    // Suporte a tema escuro/claro (futuro)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }
}

// ===========================================
// INICIALIZAÇÃO QUANDO DOM ESTIVER PRONTO
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar aplicação
  window.app = new App();

  // Performance monitoring (opcional)
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      performanceLogger.pageLoad(perfData.loadEventEnd - perfData.loadEventStart);
    });
  }
});

// ===========================================
// ERROR HANDLING GLOBAL
// ===========================================

window.addEventListener('error', event => {
  logger.error('Erro global:', event.error);
  // Aqui você pode enviar para serviço de monitoramento como Sentry
});

window.addEventListener('unhandledrejection', event => {
  logger.error('Promise rejeitada:', event.reason);
  // Aqui você pode enviar para serviço de monitoramento
});
