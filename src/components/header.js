/**
 * Header Component
 * Gerencia o comportamento do header responsivo
 */

import { dom } from '../js/utils.js';
import { debounce, throttle } from '../utils/helpers.js';

export class HeaderComponent {
  constructor(options = {}) {
    this.options = {
      stickyOffset: 100,
      mobileBreakpoint: 768,
      ...options
    };

    this.header = null;
    this.mobileToggle = null;
    this.menu = null;
    this.isMenuOpen = false;
    this.isSticky = false;
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.setupAccessibility();

    console.log('Header component initialized');
  }

  cacheElements() {
    this.header = document.querySelector('.header');
    this.mobileToggle = document.querySelector('.header__mobile-toggle');
    this.menu = document.querySelector('.header__menu');

    if (!this.header) {
      console.warn('Header element not found');
      return;
    }
  }

  bindEvents() {
    if (!this.header) return;

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Scroll events (throttled)
    window.addEventListener('scroll', throttle(() => {
      this.handleScroll();
    }, 10));

    // Resize events (debounced)
    window.addEventListener('resize', debounce(() => {
      this.handleResize();
    }, 250));

    // Outside click to close menu
    document.addEventListener('click', (e) => {
      this.handleOutsideClick(e);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });

    // Smooth scroll for menu links
    this.bindMenuLinks();
  }

  bindMenuLinks() {
    const menuLinks = this.menu?.querySelectorAll('a[href^="#"]');
    if (!menuLinks) return;

    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          this.scrollToTarget(targetElement);
          this.closeMobileMenu();
        }
      });
    });
  }

  setupAccessibility() {
    if (!this.mobileToggle) return;

    // ARIA attributes
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.setAttribute('aria-controls', 'main-menu');
    this.mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');

    if (this.menu) {
      this.menu.setAttribute('id', 'main-menu');
      this.menu.setAttribute('role', 'navigation');
      this.menu.setAttribute('aria-label', 'Main navigation');
    }
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.menu || !this.mobileToggle) return;

    this.isMenuOpen = true;
    dom.addClass(this.menu, 'header__menu--open');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus trap
    this.focusFirstMenuItem();

    // Dispatch custom event
    this.dispatchEvent('header:menuOpened');
  }

  closeMobileMenu() {
    if (!this.menu || !this.mobileToggle) return;

    this.isMenuOpen = false;
    dom.removeClass(this.menu, 'header__menu--open');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Return focus to toggle button
    this.mobileToggle.focus();

    // Dispatch custom event
    this.dispatchEvent('header:menuClosed');
  }

  focusFirstMenuItem() {
    const firstLink = this.menu?.querySelector('a');
    if (firstLink) {
      firstLink.focus();
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    const shouldBeSticky = currentScrollY > this.options.stickyOffset;

    if (shouldBeSticky !== this.isSticky) {
      this.isSticky = shouldBeSticky;

      if (shouldBeSticky) {
        dom.addClass(this.header, 'header--sticky');
        this.dispatchEvent('header:stickyActivated');
      } else {
        dom.removeClass(this.header, 'header--sticky');
        this.dispatchEvent('header:stickyDeactivated');
      }
    }

    this.lastScrollY = currentScrollY;
  }

  handleResize() {
    // Close mobile menu on desktop resize
    if (window.innerWidth >= this.options.mobileBreakpoint && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  handleOutsideClick(event) {
    if (!this.isMenuOpen) return;

    const isClickInsideHeader = this.header.contains(event.target);
    const isClickOnToggle = this.mobileToggle.contains(event.target);

    if (!isClickInsideHeader || (!isClickOnToggle && !this.menu.contains(event.target))) {
      this.closeMobileMenu();
    }
  }

  handleKeydown(event) {
    // ESC key closes menu
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Tab navigation within menu
    if (this.isMenuOpen && this.menu.contains(event.target)) {
      this.handleMenuKeyboardNavigation(event);
    }
  }

  handleMenuKeyboardNavigation(event) {
    if (event.key !== 'Tab') return;

    const menuLinks = Array.from(this.menu.querySelectorAll('a'));
    const currentIndex = menuLinks.indexOf(event.target);

    if (event.shiftKey) {
      // Shift+Tab - move to previous item or close menu
      if (currentIndex === 0) {
        event.preventDefault();
        this.closeMobileMenu();
      }
    } else {
      // Tab - move to next item or close menu
      if (currentIndex === menuLinks.length - 1) {
        event.preventDefault();
        this.closeMobileMenu();
      }
    }
  }

  scrollToTarget(targetElement) {
    const headerHeight = this.header.offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px offset

    window.scrollTo({
      top: targetPosition,
      
    });
  }

  updateActiveMenuItem() {
    const menuLinks = this.menu?.querySelectorAll('a[href^="#"]');
    if (!menuLinks) return;

    const scrollPosition = window.scrollY + this.header.offsetHeight + 50;

    menuLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetTop = targetElement.offsetTop;
        const targetBottom = targetTop + targetElement.offsetHeight;

        if (scrollPosition >= targetTop && scrollPosition < targetBottom) {
          dom.addClass(link, 'header__menu-link--active');
        } else {
          dom.removeClass(link, 'header__menu-link--active');
        }
      }
    });
  }

  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        component: this,
        ...detail
      }
    });

    document.dispatchEvent(event);
  }

  // Public API methods
  isMobileMenuOpen() {
    return this.isMenuOpen;
  }

  openMenu() {
    this.openMobileMenu();
  }

  closeMenu() {
    this.closeMobileMenu();
  }

  destroy() {
    // Remove event listeners and cleanup
    this.closeMobileMenu();
    console.log('Header component destroyed');
  }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.headerComponent = new HeaderComponent();
  });
} else {
  window.headerComponent = new HeaderComponent();
}
