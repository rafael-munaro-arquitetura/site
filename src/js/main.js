/**
 * Main Application JavaScript
 * Arquitetura modular e moderna com ES6+
 */

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
    portfolioItems: '.portfolio-item'
  },

  // Breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  },

  // Animation durations
  animations: {
    fast: 150,
    normal: 250,
    slow: 350
  },

  // API endpoints (futuro)
  api: {
    contact: '/api/contact',
    portfolio: '/api/portfolio'
  }
};

// ===========================================
// UTILITÁRIOS GLOBAIS
// ===========================================

/**
 * Debounce function para otimizar performance
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function para controlar frequência de execução
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função throttled
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Verifica se elemento está visível na viewport
 * @param {Element} element - Elemento a ser verificado
 * @param {number} threshold - Threshold de visibilidade (0-1)
 * @returns {boolean} Verdadeiro se visível
 */
const isElementVisible = (element, threshold = 0.1) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const elementHeight = rect.height;

  return (visibleHeight / elementHeight) >= threshold;
};

/**
 * Anima scroll suave para elemento
 * @param {Element} element - Elemento alvo
 * @param {number} offset - Offset adicional em pixels
 */
const scrollToElement = (element, offset = 0) => {
  if (!element) return;

  const elementPosition = element.offsetTop;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// ===========================================
// CLASSES DOS COMPONENTES
// ===========================================

/**
 * Classe para gerenciar o header responsivo
 */
class HeaderManager {
  constructor() {
    this.header = document.querySelector(CONFIG.selectors.header);
    this.mobileToggle = document.querySelector(CONFIG.selectors.mobileToggle);
    this.menu = document.querySelector(CONFIG.selectors.menu);
    this.menuOverlay = document.querySelector('.header__nav-overlay');
    this.isMenuOpen = false;
    this.lastScrollY = window.scrollY;

    this.init();
  }

  init() {
    if (!this.header || !this.mobileToggle || !this.menu) return;

    // Event listeners
    this.mobileToggle.addEventListener('click', () => this.toggleMenu());
    
    if (this.menuOverlay) {
      this.menuOverlay.addEventListener('click', () => this.closeMenu());
    }
    
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 10));

    // Close menu on resize
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth >= CONFIG.breakpoints.mobile) {
        this.closeMenu();
      }
    }, 250));

    // Ativar links do menu
    this.initMenuLinks();
  }

  initMenuLinks() {
    const menuLinks = this.menu.querySelectorAll('.header__menu-link');
    
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active de todos
        menuLinks.forEach(l => l.classList.remove('header__menu-link--active'));
        // Adiciona active ao clicado
        link.classList.add('header__menu-link--active');
        
        // Fecha menu mobile se aberto
        if (this.isMenuOpen) {
          setTimeout(() => this.closeMenu(), 300);
        }
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isMenuOpen = true;
    this.menu.setAttribute('aria-hidden', 'false');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    
    if (this.menuOverlay) {
      this.menuOverlay.setAttribute('aria-hidden', 'false');
    }
    
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.menu.setAttribute('aria-hidden', 'true');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    
    if (this.menuOverlay) {
      this.menuOverlay.setAttribute('aria-hidden', 'true');
    }
    
    document.body.style.overflow = '';
  }

  handleOutsideClick(event) {
    if (!this.menu.contains(event.target) &&
        !this.mobileToggle.contains(event.target) &&
        this.isMenuOpen) {
      this.closeMenu();
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove sticky class
    if (currentScrollY > 50) {
      this.header.classList.add('header--sticky');
    } else {
      this.header.classList.remove('header--sticky');
    }

    this.lastScrollY = currentScrollY;
  }
}

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

    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
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
      behavior: 'smooth'
    });
  }
}

/**
 * Classe para gerenciar animações de scroll
 */
class ScrollAnimationManager {
  constructor() {
    this.animatedElements = document.querySelectorAll('[data-animate]');
    this.observedElements = new Set();

    this.init();
  }

  init() {
    if (!this.animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  animateElement(element) {
    const animationType = element.dataset.animate || 'fade-in';
    element.classList.add(`animate-${animationType}`);
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

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Máscara para telefone (opcional)
    const phoneInput = this.form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => this.formatPhone(e.target));
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
      console.error('Erro ao enviar formulário:', error);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Formulário enviado:', data);
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
      ${type === 'success'
        ? 'background-color: rgba(16, 185, 129, 0.1); color: var(--color-success); border: 1px solid var(--color-success);'
        : 'background-color: rgba(239, 68, 68, 0.1); color: var(--color-error); border: 1px solid var(--color-error);'
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
    window.addEventListener('resize', debounce(() => this.handleResize(), 250));

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
      filter.classList.toggle('portfolio__filter--active',
        filter.dataset.filter === filterValue);
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
    this.track.style.transform = `translateX(0)`;

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

    // Inicializar componentes
    this.initComponents();

    // Configurar navegação suave
    this.initSmoothScrolling();

    // Configurar lazy loading de imagens
    this.initLazyLoading();

    // Configurar tema (futuro)
    this.initTheme();

    console.log('🚀 Rafael Munaro Arquitetura - Aplicação inicializada');
  }

  hideLoading() {
    const loading = document.querySelector(CONFIG.selectors.loading);
    if (loading) {
      setTimeout(() => {
        loading.hidden = true;
      }, 500);
    }
  }

  initComponents() {
    // Header responsivo
    this.components.header = new HeaderManager();

    // Botão voltar ao topo
    this.components.backToTop = new BackToTopManager();

    // Animações de scroll
    this.components.scrollAnimation = new ScrollAnimationManager();

    // Formulário de contato
    this.components.contactForm = new ContactFormManager();

    // Filtros do portfólio
    this.components.portfolio = new PortfolioManager();
  }

  initSmoothScrolling() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          scrollToElement(target, 80); // Offset para o header fixo

          // Fechar menu mobile se estiver aberto
          if (this.components.header?.isMenuOpen) {
            this.components.header.closeMenu();
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
      console.log(`⏱️ Página carregada em ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
    });
  }
});

// ===========================================
// ERROR HANDLING GLOBAL
// ===========================================

window.addEventListener('error', (event) => {
  console.error('❌ Erro global:', event.error);
  // Aqui você pode enviar para serviço de monitoramento como Sentry
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promise rejeitada:', event.reason);
  // Aqui você pode enviar para serviço de monitoramento
});
