/**
 * Scroll Reveal Module
 * Sistema de animações baseadas em scroll usando Intersection Observer
 *
 * @version 1.0.0
 * @author Rafael Munaro Arquitetura
 */

import { logger } from '../utils/logger.js';

/**
 * Classe para gerenciar animações de scroll reveal
 */
class ScrollReveal {
  constructor() {
    this.revealElements = null;
    this.observer = null;

    this.init();
  }

  init() {
    // Remove no-js class
    document.documentElement.classList.remove('no-js');

    // Configuração do observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    // Criar observer
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
        }
      });
    }, observerOptions);

    // Encontrar e observar elementos
    this.observeElements();

    logger.debug('ScrollReveal initialized', {
      elementsFound: this.revealElements?.length || 0,
    });
  }

  observeElements() {
    // Encontrar todos os elementos com classes reveal
    this.revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    // Observar cada elemento
    this.revealElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  revealElement(element) {
    element.classList.add('revealed');
    logger.debug('Element revealed', { element: element.className });
  }

  /**
   * Método para observar novos elementos adicionados dinamicamente
   * @param {NodeList|Array} elements - Elementos para observar
   */
  observeNewElements(elements) {
    elements.forEach(element => {
      this.observer.observe(element);
    });
  }

  /**
   * Limpar observer quando não for mais necessário
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      logger.debug('ScrollReveal destroyed');
    }
  }
}

// Exportar classe
export { ScrollReveal };

// Auto-inicialização quando importado
export default ScrollReveal;
