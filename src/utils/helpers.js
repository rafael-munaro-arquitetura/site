/**
 * Helper Functions
 * Funções auxiliares para tarefas comuns
 */

import { logger } from './logger.js';

/**
 * Gera ID único
 * @param {string} prefix - Prefixo opcional para o ID
 * @returns {string} ID único
 */
export const generateId = (prefix = 'id') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Copia texto para clipboard
 * @param {string} text - Texto a ser copiado
 * @returns {Promise<boolean>} Sucesso da operação
 */
export const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback para browsers antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textArea);
      logger.error('Erro ao copiar para clipboard:', fallbackError);
      return false;
    }
  }
};

/**
 * Formata número como moeda brasileira
 * @param {number} value - Valor a ser formatado
 * @param {string} currency - Moeda (padrão: BRL)
 * @returns {string} Valor formatado
 */
export const formatCurrency = (value, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Formata data no padrão brasileiro
 * @param {Date|string} date - Data a ser formatada
 * @param {Object} options - Opções de formatação
 * @returns {string} Data formatada
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('pt-BR', defaultOptions).format(new Date(date));
};

/**
 * Capitaliza primeira letra de cada palavra
 * @param {string} str - String a ser formatada
 * @returns {string} String capitalizada
 */
export const capitalize = str => {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Remove acentos de uma string
 * @param {string} str - String com acentos
 * @returns {string} String sem acentos
 */
export const removeAccents = str => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Converte string para slug
 * @param {string} str - String a ser convertida
 * @returns {string} Slug da string
 */
export const slugify = str => {
  return removeAccents(str)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Valida email
 * @param {string} email - Email a ser validado
 * @returns {boolean} Verdadeiro se válido
 */
export const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida CPF
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} Verdadeiro se válido
 */
export const isValidCPF = cpf => {
  const cleaned = cpf.replace(/\D/g, '');

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  return remainder === parseInt(cleaned[10]);
};

/**
 * Formata telefone brasileiro
 * @param {string} phone - Telefone a ser formatado
 * @returns {string} Telefone formatado
 */
export const formatPhone = phone => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  return phone;
};

/**
 * Debounce para funções
 * @param {Function} func - Função a ser debounced
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
export const debounce = (func, wait) => {
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
 * Throttle para funções
 * @param {Function} func - Função a ser throttled
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função throttled
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Verifica se elemento está visível na viewport
 * @param {Element} element - Elemento a ser verificado
 * @param {number} threshold - Threshold de visibilidade (0-1)
 * @returns {boolean} Verdadeiro se visível
 */
export const isElementInViewport = (element, threshold = 0.1) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const elementHeight = rect.height;

  return visibleHeight / elementHeight >= threshold;
};

/**
 * Anima scroll suave para elemento
 * NOTA: Usa scroll-behavior: smooth do CSS para melhor performance
 * @param {Element|string} element - Elemento ou seletor
 * @param {number} offset - Offset adicional em pixels
 */
export const scrollToElement = (element, offset = 0) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;

  if (!el) return;

  const elementPosition = el.offsetTop;
  const offsetPosition = elementPosition - offset;

  // Usa scroll nativo que respeita scroll-behavior: smooth do CSS
  window.scrollTo({
    top: offsetPosition,
    // behavior é redundante se CSS já tem scroll-behavior: smooth, mas mantém compatibilidade
    behavior: 'smooth',
  });
};

/**
 * Sanitiza HTML removendo tags e caracteres perigosos
 * @param {string} html - HTML a ser sanitizado
 * @returns {string} HTML sanitizado
 */
export const sanitizeHtml = html => {
  if (typeof html !== 'string') return '';

  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Cria elemento HTML de forma segura (previne XSS)
 * @param {string} tag - Tag do elemento
 * @param {Object} attributes - Atributos do elemento
 * @param {string|Element|Array<Element>} content - Conteúdo do elemento
 * @returns {Element} Elemento criado
 */
export const createElement = (tag, attributes = {}, content = '') => {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach(attr => {
    if (attr === 'className') {
      element.className = attributes[attr];
    } else if (attr === 'style' && typeof attributes[attr] === 'object') {
      Object.assign(element.style, attributes[attr]);
    } else {
      element.setAttribute(attr, attributes[attr]);
    }
  });

  // SEGURANÇA: Usar textContent ao invés de innerHTML para strings
  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content instanceof Element) {
    element.appendChild(content);
  } else if (Array.isArray(content)) {
    // Suporte para array de elementos
    content.forEach(child => {
      if (child instanceof Element) {
        element.appendChild(child);
      }
    });
  }

  return element;
};

/**
 * Cria elemento HTML com HTML interno (use apenas para HTML confiável!)
 * @param {string} tag - Tag do elemento
 * @param {Object} attributes - Atributos do elemento
 * @param {string} html - HTML interno (ATENÇÃO: deve ser HTML confiável)
 * @returns {Element} Elemento criado
 * @deprecated Use createElement com textContent sempre que possível
 */
export const createElementWithHTML = (tag, attributes = {}, html = '') => {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach(attr => {
    if (attr === 'className') {
      element.className = attributes[attr];
    } else if (attr === 'style' && typeof attributes[attr] === 'object') {
      Object.assign(element.style, attributes[attr]);
    } else {
      element.setAttribute(attr, attributes[attr]);
    }
  });

  if (typeof html === 'string') {
    // AVISO: Isso pode ser inseguro se html vier de usuário!
    element.innerHTML = html;
  }

  return element;
};

/**
 * Adiciona classe a elemento
 * @param {Element|string} element - Elemento ou seletor
 * @param {string} className - Classe a ser adicionada
 */
export const addClass = (element, className) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (el) el.classList.add(className);
};

/**
 * Remove classe de elemento
 * @param {Element|string} element - Elemento ou seletor
 * @param {string} className - Classe a ser removida
 */
export const removeClass = (element, className) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (el) el.classList.remove(className);
};

/**
 * Toggle classe em elemento
 * @param {Element|string} element - Elemento ou seletor
 * @param {string} className - Classe a ser toggled
 */
export const toggleClass = (element, className) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (el) el.classList.toggle(className);
};

/**
 * Verifica se dispositivo é mobile
 * @returns {boolean} Verdadeiro se mobile
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * Verifica se dispositivo suporta touch
 * @returns {boolean} Verdadeiro se suporta touch
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Obtém parâmetros da URL
 * @param {string} param - Nome do parâmetro
 * @returns {string|null} Valor do parâmetro ou null
 */
export const getUrlParameter = param => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

/**
 * Define parâmetro na URL
 * @param {string} param - Nome do parâmetro
 * @param {string} value - Valor do parâmetro
 */
export const setUrlParameter = (param, value) => {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.replaceState({}, '', url);
};

/**
 * Remove parâmetro da URL
 * @param {string} param - Nome do parâmetro
 */
export const removeUrlParameter = param => {
  const url = new URL(window.location);
  url.searchParams.delete(param);
  window.history.replaceState({}, '', url);
};

/**
 * Detecta se está no modo dark
 * @returns {boolean} Verdadeiro se dark mode
 */
export const isDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Salva dados no localStorage
 * @param {string} key - Chave
 * @param {*} value - Valor a ser salvo
 */
export const saveToStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    logger.error('Erro ao salvar no localStorage:', error);
  }
};

/**
 * Carrega dados do localStorage
 * @param {string} key - Chave
 * @param {*} defaultValue - Valor padrão
 * @returns {*} Valor salvo ou valor padrão
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    logger.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove dados do localStorage
 * @param {string} key - Chave
 */
export const removeFromStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    logger.error('Erro ao remover do localStorage:', error);
  }
};

/**
 * Limpa todo localStorage
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    logger.error('Erro ao limpar localStorage:', error);
  }
};

/**
 * Salva item no sessionStorage
 * @param {string} key - Chave
 * @param {*} value - Valor a ser salvo
 */
export const saveToSessionStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(key, serialized);
  } catch (error) {
    logger.error('Erro ao salvar no sessionStorage:', error);
  }
};

/**
 * Carrega item do sessionStorage
 * @param {string} key - Chave
 * @param {*} defaultValue - Valor padrão
 * @returns {*} Valor recuperado ou valor padrão
 */
export const loadFromSessionStorage = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    logger.error('Erro ao recuperar do sessionStorage:', error);
    return defaultValue;
  }
};

/**
 * Valida telefone brasileiro
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} Verdadeiro se válido
 */
export const isValidPhone = phone => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
};

/**
 * Valida CNPJ
 * @param {string} cnpj - CNPJ a ser validado
 * @returns {boolean} Verdadeiro se válido
 */
export const isValidCNPJ = cnpj => {
  const cleaned = cnpj.replace(/\D/g, '');

  if (cleaned.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false; // CNPJ com todos dígitos iguais

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i]) * weights1[i];
  }
  let remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== parseInt(cleaned[12])) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned[i]) * weights2[i];
  }
  remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;

  return remainder === parseInt(cleaned[13]);
};

/**
 * Valida se string não está vazia
 * @param {string} value - Valor a ser validado
 * @returns {boolean} Verdadeiro se não vazio
 */
export const isRequired = value => {
  return value && value.trim().length > 0;
};

/**
 * Valida comprimento mínimo
 * @param {string} value - Valor a ser validado
 * @param {number} minLength - Comprimento mínimo
 * @returns {boolean} Verdadeiro se válido
 */
export const minLength = (value, minLength) => {
  return value && value.length >= minLength;
};

/**
 * Valida comprimento máximo
 * @param {string} value - Valor a ser validado
 * @param {number} maxLength - Comprimento máximo
 * @returns {boolean} Verdadeiro se válido
 */
export const maxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

/**
 * Formata CNPJ
 * @param {string} cnpj - CNPJ a ser formatado
 * @returns {string} CNPJ formatado
 */
export const formatCNPJ = cnpj => {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$2.$3.$4/$1-$5');
};

/**
 * Formata número com separadores
 * @param {number} num - Número a ser formatado
 * @returns {string} Número formatado
 */
export const formatNumber = num => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

/**
 * Verifica se elemento tem classe
 * @param {Element|string} element - Elemento ou seletor
 * @param {string} className - Classe a ser verificada
 * @returns {boolean} Verdadeiro se tem a classe
 */
export const hasClass = (element, className) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  return el ? el.classList.contains(className) : false;
};

/**
 * Adiciona event listener com delegate
 * @param {Element|string} parent - Elemento pai ou seletor
 * @param {string} selector - Seletor dos elementos filhos
 * @param {string} event - Tipo do evento
 * @param {Function} handler - Função handler
 */
export const delegateEvent = (parent, selector, event, handler) => {
  const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;

  if (!parentEl) return;

  parentEl.addEventListener(event, e => {
    const target = e.target.closest(selector);
    if (target) {
      handler.call(target, e);
    }
  });
};

/**
 * Faz requisição GET
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @returns {Promise} Promise com resposta
 */
export const httpGet = async (url, options = {}) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }).then(response => response.json());
};

/**
 * Faz requisição POST
 * @param {string} url - URL da requisição
 * @param {Object} data - Dados a serem enviados
 * @param {Object} options - Opções da requisição
 * @returns {Promise} Promise com resposta
 */
export const httpPost = async (url, data, options = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  }).then(response => response.json());
};

/**
 * Faz upload de arquivo
 * @param {string} url - URL da requisição
 * @param {FormData} formData - Dados do formulário
 * @param {Object} options - Opções da requisição
 * @returns {Promise} Promise com resposta
 */
export const httpUpload = async (url, formData, options = {}) => {
  return fetch(url, {
    method: 'POST',
    body: formData,
    ...options,
  }).then(response => response.json());
};

/**
 * Gera número aleatório entre min e max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Número aleatório
 */
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Clampa valor entre min e max
 * @param {number} value - Valor a ser clamped
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Valor clamped
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Converte graus para radianos
 * @param {number} degrees - Graus
 * @returns {number} Radianos
 */
export const degreesToRadians = degrees => {
  return degrees * (Math.PI / 180);
};

/**
 * Converte radianos para graus
 * @param {number} radians - Radianos
 * @returns {number} Graus
 */
export const radiansToDegrees = radians => {
  return radians * (180 / Math.PI);
};

/**
 * Delay com Promise
 * @param {number} ms - Milissegundos
 * @returns {Promise} Promise resolvida após delay
 */
export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Formata tempo relativo (ex: "há 2 horas")
 * @param {Date} date - Data a ser formatada
 * @returns {string} Tempo relativo
 */
export const timeAgo = date => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'ano', seconds: 31536000 },
    { label: 'mês', seconds: 2592000 },
    { label: 'dia', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
    { label: 'segundo', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `há ${count} ${interval.label}${count > 1 ? 's' : ''}`;
    }
  }

  return 'agora mesmo';
};
