/**
 * Navigation Component
 * Gerencia navegação, breadcrumbs e indicações visuais
 */

import { debounce, throttle, addClass, removeClass } from '../utils/helpers.js';
import { componentLogger } from '../utils/logger.js';

export class NavigationComponent {
  constructor(options = {}) {
    this.options = {
      updateInterval: 100,
      headerOffset: 100,
      ...options,
    };

    this.header = null;
    this.menuLinks = [];
    this.currentSection = '';
    this.sections = [];

    this.init();
  }

  init() {
    this.cacheElements();
    this.discoverSections();
    this.bindEvents();
    this.updateActiveSection();

    componentLogger.initialized('NavigationComponent');
  }

  cacheElements() {
    this.header = document.querySelector('.header');
    this.menuLinks = Array.from(document.querySelectorAll('.header__menu-link[href^="#"]'));

    if (!this.header) {
      componentLogger.error('NavigationComponent', 'Header element not found');
    }
  }

  discoverSections() {
    // Find all sections with IDs
    const sectionElements = document.querySelectorAll('section[id], main[id]');
    this.sections = Array.from(sectionElements).map(section => ({
      id: section.id,
      element: section,
      top: section.offsetTop,
      height: section.offsetHeight,
    }));

    componentLogger.event('NavigationComponent', 'sections_discovered', {
      count: this.sections.length,
      sections: this.sections.map(s => s.id),
    });
  }

  bindEvents() {
    // Scroll event to update active section (throttled)
    window.addEventListener(
      'scroll',
      throttle(() => {
        this.updateActiveSection();
      }, this.options.updateInterval)
    );

    // Resize event to recalculate section positions
    window.addEventListener(
      'resize',
      debounce(() => {
        this.recalculateSections();
      }, 250)
    );

    // Menu link clicks
    this.menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        this.handleMenuLinkClick(e, link);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      this.handleKeyboardNavigation(e);
    });
  }

  handleMenuLinkClick(event, link) {
    const targetId = link.getAttribute('href').substring(1); // Remove #
    const targetSection = this.sections.find(section => section.id === targetId);

    if (targetSection) {
      event.preventDefault();
      this.scrollToSection(targetSection);
      this.updateActiveLink(targetId);

      // Dispatch custom event
      this.dispatchEvent('navigation:sectionChanged', {
        sectionId: targetId,
        triggeredBy: 'menuClick',
      });
    }
  }

  handleKeyboardNavigation(event) {
    // Handle keyboard shortcuts for navigation
    if (event.altKey) {
      const key = event.key.toLowerCase();
      const shortcuts = {
        1: 'home',
        2: 'about',
        3: 'services',
        4: 'portfolio',
        5: 'contact',
      };

      if (shortcuts[key]) {
        event.preventDefault();
        const targetSection = this.sections.find(section => section.id === shortcuts[key]);
        if (targetSection) {
          this.scrollToSection(targetSection);
        }
      }
    }
  }

  scrollToSection(section) {
    const headerHeight = this.header?.offsetHeight || 0;
    const offset = this.options.headerOffset;
    const targetPosition = section.top - headerHeight - offset;

    window.scrollTo({
      top: targetPosition,
    });

    // Update URL hash without triggering scroll
    history.replaceState(null, null, `#${section.id}`);
  }

  updateActiveSection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = this.header?.offsetHeight || 0;
    const currentPosition = scrollTop + headerHeight + this.options.headerOffset;

    let activeSectionId = '';

    // Find the current section based on scroll position
    for (const section of this.sections) {
      if (currentPosition >= section.top && currentPosition < section.top + section.height) {
        activeSectionId = section.id;
        break;
      }
    }

    // If no section found and we're near the top, use first section
    if (!activeSectionId && scrollTop < 100) {
      activeSectionId = this.sections[0]?.id || '';
    }

    if (activeSectionId !== this.currentSection) {
      this.currentSection = activeSectionId;
      this.updateActiveLink(activeSectionId);

      // Dispatch custom event
      this.dispatchEvent('navigation:sectionChanged', {
        sectionId: activeSectionId,
        triggeredBy: 'scroll',
      });
    }

    // Update progress indicator if exists
    this.updateScrollProgress();
  }

  updateActiveLink(sectionId) {
    // Remove active class from all links
    this.menuLinks.forEach(link => {
      removeClass(link, 'header__menu-link--active');
      link.removeAttribute('aria-current');
    });

    // Add active class to current link
    const activeLink = this.menuLinks.find(link => {
      const href = link.getAttribute('href');
      return href === `#${sectionId}`;
    });

    if (activeLink) {
      addClass(activeLink, 'header__menu-link--active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  recalculateSections() {
    // Recalculate section positions after resize
    this.sections.forEach(section => {
      section.top = section.element.offsetTop;
      section.height = section.element.offsetHeight;
    });

    // Update active section immediately
    this.updateActiveSection();
  }

  updateScrollProgress() {
    // Optional: Update scroll progress indicator
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;

    // Dispatch progress event
    this.dispatchEvent('navigation:scrollProgress', {
      progress: Math.min(scrolled, 100),
    });
  }

  // Public API methods
  getCurrentSection() {
    return this.currentSection;
  }

  getSections() {
    return this.sections.map(section => ({
      id: section.id,
      title: this.getSectionTitle(section.id),
    }));
  }

  getSectionTitle(sectionId) {
    const titles = {
      home: 'Início',
      about: 'Sobre',
      services: 'Serviços',
      portfolio: 'Portfólio',
      contact: 'Contato',
    };
    return titles[sectionId] || sectionId;
  }

  navigateToSection(sectionId) {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      this.scrollToSection(section);
    }
  }

  navigateNext() {
    const currentIndex = this.sections.findIndex(s => s.id === this.currentSection);
    const nextIndex = Math.min(currentIndex + 1, this.sections.length - 1);
    const nextSection = this.sections[nextIndex];

    if (nextSection) {
      this.scrollToSection(nextSection);
    }
  }

  navigatePrevious() {
    const currentIndex = this.sections.findIndex(s => s.id === this.currentSection);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const prevSection = this.sections[prevIndex];

    if (prevSection) {
      this.scrollToSection(prevSection);
    }
  }

  createBreadcrumbs() {
    // Future: Create breadcrumb navigation
    const breadcrumbs = [];
    const currentSection = this.sections.find(s => s.id === this.currentSection);

    if (currentSection) {
      breadcrumbs.push({
        title: 'Início',
        url: '#home',
        current: currentSection.id === 'home',
      });

      if (currentSection.id !== 'home') {
        breadcrumbs.push({
          title: this.getSectionTitle(currentSection.id),
          url: `#${currentSection.id}`,
          current: true,
        });
      }
    }

    return breadcrumbs;
  }

  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        component: this,
        ...detail,
      },
    });

    document.dispatchEvent(event);
  }

  destroy() {
    // Cleanup event listeners
    this.menuLinks.forEach(link => {
      link.removeEventListener('click', this.handleMenuLinkClick);
    });

    componentLogger.event('NavigationComponent', 'destroyed');
  }
}

// Keyboard shortcut hints (could be shown in help modal)
NavigationComponent.keyboardShortcuts = {
  'Alt + 1': 'Ir para Início',
  'Alt + 2': 'Ir para Sobre',
  'Alt + 3': 'Ir para Serviços',
  'Alt + 4': 'Ir para Portfólio',
  'Alt + 5': 'Ir para Contato',
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.navigationComponent = new NavigationComponent();
  });
} else {
  window.navigationComponent = new NavigationComponent();
}
