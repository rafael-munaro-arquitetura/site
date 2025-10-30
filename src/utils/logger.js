/**
 * Sistema de Logging Condicional
 * Substitui console.* por logging seguro em produção
 *
 * @version 1.0.0
 * @author Rafael Munaro Arquitetura
 */

const isDevelopment =
  process.env.NODE_ENV === 'development' ||
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

/**
 * Logger principal com controle de ambiente
 */
export const logger = {
  /**
   * Log de desenvolvimento - só aparece em dev
   * @param {string} message - Mensagem
   * @param {*} data - Dados opcionais
   */
  debug: (message, data = null) => {
    if (isDevelopment) {
      if (data !== null) {
        console.log(`🔧 ${message}`, data);
      } else {
        console.log(`🔧 ${message}`);
      }
    }
  },

  /**
   * Log de informação - só em dev
   * @param {string} message - Mensagem
   * @param {*} data - Dados opcionais
   */
  info: (message, data = null) => {
    if (isDevelopment) {
      if (data !== null) {
        console.info(`ℹ️ ${message}`, data);
      } else {
        console.info(`ℹ️ ${message}`);
      }
    }
  },

  /**
   * Log de warning - só em dev
   * @param {string} message - Mensagem
   * @param {*} data - Dados opcionais
   */
  warn: (message, data = null) => {
    if (isDevelopment) {
      if (data !== null) {
        console.warn(`⚠️ ${message}`, data);
      } else {
        console.warn(`⚠️ ${message}`);
      }
    }
  },

  /**
   * Log de erro - sempre loga, mas sem dados sensíveis
   * @param {string} message - Mensagem de erro
   * @param {Error|string} error - Erro ou mensagem adicional
   */
  error: (message, error = null) => {
    // Sempre loga erros, mas sanitiza dados sensíveis
    const sanitizedError =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Erro desconhecido';

    console.error(`❌ ${message}`, sanitizedError);
  },

  /**
   * Log de performance - só em dev
   * @param {string} metric - Métrica sendo medida
   * @param {number} value - Valor da métrica
   * @param {string} unit - Unidade (ms, px, etc)
   */
  performance: (metric, value, unit = '') => {
    if (isDevelopment) {
      console.log(`⏱️ ${metric}: ${value}${unit}`);
    }
  },

  /**
   * Log de inicialização de componentes - só em dev
   * @param {string} componentName - Nome do componente
   */
  componentInit: componentName => {
    if (isDevelopment) {
      console.log(`🏗️ ${componentName} inicializado`);
    }
  },

  /**
   * Log de eventos do usuário - só em dev
   * @param {string} event - Tipo do evento
   * @param {*} data - Dados do evento (sanitizados)
   */
  userEvent: (event, data = null) => {
    if (isDevelopment) {
      console.log(`👆 Evento: ${event}`, data);
    }
  },
};

/**
 * Logger específico para performance monitoring
 */
export const performanceLogger = {
  /**
   * Log LCP (Largest Contentful Paint)
   * @param {number} value - Valor em ms
   */
  lcp: value => {
    logger.performance('Largest Contentful Paint', value, 'ms');
  },

  /**
   * Log FID (First Input Delay)
   * @param {number} value - Valor em ms
   */
  fid: value => {
    logger.performance('First Input Delay', value, 'ms');
  },

  /**
   * Log CLS (Cumulative Layout Shift)
   * @param {number} value - Valor da métrica
   */
  cls: value => {
    logger.performance('Cumulative Layout Shift', value);
  },

  /**
   * Log tempo de carregamento da página
   * @param {number} loadTime - Tempo em ms
   */
  pageLoad: loadTime => {
    logger.performance('Página carregada em', loadTime, 'ms');
  },
};

/**
 * Logger específico para componentes
 */
export const componentLogger = {
  /**
   * Log de inicialização de componente
   * @param {string} name - Nome do componente
   */
  initialized: name => {
    logger.componentInit(name);
  },

  /**
   * Log de erro em componente
   * @param {string} component - Nome do componente
   * @param {Error|string} error - Erro ocorrido
   */
  error: (component, error) => {
    logger.error(`Erro em ${component}:`, error);
  },

  /**
   * Log de evento em componente
   * @param {string} component - Nome do componente
   * @param {string} event - Evento ocorrido
   * @param {*} data - Dados do evento
   */
  event: (component, event, data = null) => {
    logger.userEvent(`${component}: ${event}`, data);
  },
};
