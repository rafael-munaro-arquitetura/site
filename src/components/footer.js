/**
 * Footer Component
 * Manages the behavior and interactivity of the footer
 */

import { componentLogger } from '../utils/logger.js';

export class FooterComponent {
  constructor(options = {}) {
    this.options = {
      ...options,
    };

    this.footer = null;

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();

    componentLogger.initialized('FooterComponent');
  }

  cacheElements() {
    this.footer = document.querySelector('.footer');

    if (!this.footer) {
      componentLogger.error('FooterComponent', 'Footer element not found');
    }
  }

  bindEvents() {
    // Social media links
    this.bindSocialLinks();

    // Update copyright year
    this.updateCopyrightYear();
  }

  bindSocialLinks() {
    const socialLinks = this.footer?.querySelectorAll('.footer__social-icon');
    if (!socialLinks) return;

    socialLinks.forEach(link => {
      link.addEventListener('click', e => {
        this.handleSocialLinkClick(e, link);
      });
    });
  }

  handleSocialLinkClick(event, link) {
    const platform = link.getAttribute('aria-label') || 'social media';
    const url = link.getAttribute('href');

    // Track social media clicks (future analytics integration)
    componentLogger.event('FooterComponent', 'social_link_click', { platform });

    // Open in new tab for external links
    if (url && url.startsWith('http')) {
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  updateCopyrightYear() {
    const copyrightElement = this.footer?.querySelector('.footer__copyright');
    if (!copyrightElement) return;

    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear.toString());
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
    // Cleanup event listeners if needed
    componentLogger.event('FooterComponent', 'destroyed');
  }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.footerComponent = new FooterComponent();
  });
} else {
  window.footerComponent = new FooterComponent();
}
