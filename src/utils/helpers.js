/**
 * Helper Functions
 * Funções auxiliares para tarefas comuns
 */

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
export const copyToClipboard = async(text) => {
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
      console.error('Erro ao copiar para clipboard:', fallbackError);
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
    currency: currency
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
    ...options
  };

  return new Intl.DateTimeFormat('pt-BR', defaultOptions).format(new Date(date));
};

/**
 * Capitaliza primeira letra de cada palavra
 * @param {string} str - String a ser formatada
 * @returns {string} String capitalizada
 */
export const capitalize = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Remove acentos de uma string
 * @param {string} str - String com acentos
 * @returns {string} String sem acentos
 */
export const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Converte string para slug
 * @param {string} str - String a ser convertida
 * @returns {string} Slug da string
 */
export const slugify = (str) => {
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
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida CPF
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} Verdadeiro se válido
 */
export const isValidCPF = (cpf) => {
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
export const formatPhone = (phone) => {
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
export const isElementInViewport = (element, threshold = 0.1) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const elementHeight = rect.height;

  return (visibleHeight / elementHeight) >= threshold;
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
    behavior: 'smooth'
  });
};

/**
 * Cria elemento HTML
 * @param {string} tag - Tag do elemento
 * @param {Object} attributes - Atributos do elemento
 * @param {string|Element} content - Conteúdo do elemento
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

  if (typeof content === 'string') {
    element.innerHTML = content;
  } else if (content instanceof Element) {
    element.appendChild(content);
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
export const getUrlParameter = (param) => {
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
export const removeUrlParameter = (param) => {
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
    console.error('Erro ao salvar no localStorage:', error);
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
    console.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove dados do localStorage
 * @param {string} key - Chave
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
  }
};
