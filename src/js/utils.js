/**
 * Utilities JavaScript
 * Funções utilitárias compartilhadas pela aplicação
 */

// ===========================================
// VALIDAÇÃO
// ===========================================

/**
 * Validações comuns de formulários
 */
export const validators = {
  /**
   * Valida email
   * @param {string} email - Email a ser validado
   * @returns {boolean} Verdadeiro se válido
   */
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Valida telefone brasileiro
   * @param {string} phone - Telefone a ser validado
   * @returns {boolean} Verdadeiro se válido
   */
  phone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  },

  /**
   * Valida CPF
   * @param {string} cpf - CPF a ser validado
   * @returns {boolean} Verdadeiro se válido
   */
  cpf: (cpf) => {
    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11) return false;
    if (/^(\d)\1+$/.test(cleaned)) return false; // CPF com todos dígitos iguais

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
  },

  /**
   * Valida CNPJ
   * @param {string} cnpj - CNPJ a ser validado
   * @returns {boolean} Verdadeiro se válido
   */
  cnpj: (cnpj) => {
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
  },

  /**
   * Valida se string não está vazia
   * @param {string} value - Valor a ser validado
   * @returns {boolean} Verdadeiro se não vazio
   */
  required: (value) => {
    return value && value.trim().length > 0;
  },

  /**
   * Valida comprimento mínimo
   * @param {string} value - Valor a ser validado
   * @param {number} minLength - Comprimento mínimo
   * @returns {boolean} Verdadeiro se válido
   */
  minLength: (value, minLength) => {
    return value && value.length >= minLength;
  },

  /**
   * Valida comprimento máximo
   * @param {string} value - Valor a ser validado
   * @param {number} maxLength - Comprimento máximo
   * @returns {boolean} Verdadeiro se válido
   */
  maxLength: (value, maxLength) => {
    return value && value.length <= maxLength;
  }
};

// ===========================================
// FORMATAÇÃO
// ===========================================

/**
 * Funções de formatação
 */
export const formatters = {
  /**
   * Formata moeda brasileira
   * @param {number} value - Valor a ser formatado
   * @returns {string} Valor formatado
   */
  currency: (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  /**
   * Formata data brasileira
   * @param {Date|string} date - Data a ser formatada
   * @returns {string} Data formatada
   */
  date: (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  },

  /**
   * Formata telefone brasileiro
   * @param {string} phone - Telefone a ser formatado
   * @returns {string} Telefone formatado
   */
  phone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  },

  /**
   * Formata CPF
   * @param {string} cpf - CPF a ser formatado
   * @returns {string} CPF formatado
   */
  cpf: (cpf) => {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  /**
   * Formata CNPJ
   * @param {string} cnpj - CNPJ a ser formatado
   * @returns {string} CNPJ formatado
   */
  cnpj: (cnpj) => {
    const cleaned = cnpj.replace(/\D/g, '');
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$2.$3.$4/$1-$5');
  },

  /**
   * Formata número com separadores
   * @param {number} num - Número a ser formatado
   * @returns {string} Número formatado
   */
  number: (num) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  },

  /**
   * Capitaliza primeira letra de cada palavra
   * @param {string} str - String a ser formatada
   * @returns {string} String formatada
   */
  capitalize: (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  /**
   * Converte para slug
   * @param {string} str - String a ser convertida
   * @returns {string} Slug
   */
  slugify: (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

// ===========================================
// DOM UTILITIES
// ===========================================

/**
 * Utilitários para manipulação do DOM
 */
export const dom = {
  /**
   * Cria elemento HTML
   * @param {string} tag - Tag do elemento
   * @param {Object} attributes - Atributos do elemento
   * @param {string|Element} content - Conteúdo do elemento
   * @returns {Element} Elemento criado
   */
  create: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);

    // Set attributes
    Object.keys(attributes).forEach(attr => {
      if (attr === 'className') {
        element.className = attributes[attr];
      } else if (attr === 'style' && typeof attributes[attr] === 'object') {
        Object.assign(element.style, attributes[attr]);
      } else {
        element.setAttribute(attr, attributes[attr]);
      }
    });

    // Set content
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof Element) {
      element.appendChild(content);
    }

    return element;
  },

  /**
   * Adiciona classe a elemento
   * @param {Element|string} element - Elemento ou seletor
   * @param {string} className - Classe a ser adicionada
   */
  addClass: (element, className) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.classList.add(className);
  },

  /**
   * Remove classe de elemento
   * @param {Element|string} element - Elemento ou seletor
   * @param {string} className - Classe a ser removida
   */
  removeClass: (element, className) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.classList.remove(className);
  },

  /**
   * Toggle classe em elemento
   * @param {Element|string} element - Elemento ou seletor
   * @param {string} className - Classe a ser toggled
   */
  toggleClass: (element, className) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.classList.toggle(className);
  },

  /**
   * Verifica se elemento tem classe
   * @param {Element|string} element - Elemento ou seletor
   * @param {string} className - Classe a ser verificada
   * @returns {boolean} Verdadeiro se tem a classe
   */
  hasClass: (element, className) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.classList.contains(className) : false;
  },

  /**
   * Adiciona event listener com delegate
   * @param {Element|string} parent - Elemento pai ou seletor
   * @param {string} selector - Seletor dos elementos filhos
   * @param {string} event - Tipo do evento
   * @param {Function} handler - Função handler
   */
  delegate: (parent, selector, event, handler) => {
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;

    if (!parentEl) return;

    parentEl.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target) {
        handler.call(target, e);
      }
    });
  }
};

// ===========================================
// STORAGE UTILITIES
// ===========================================

/**
 * Utilitários para localStorage e sessionStorage
 */
export const storage = {
  /**
   * Salva item no localStorage
   * @param {string} key - Chave
   * @param {*} value - Valor a ser salvo
   */
  set: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  },

  /**
   * Recupera item do localStorage
   * @param {string} key - Chave
   * @param {*} defaultValue - Valor padrão
   * @returns {*} Valor recuperado ou valor padrão
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erro ao recuperar do localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item do localStorage
   * @param {string} key - Chave
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }
  },

  /**
   * Limpa todo localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  },

  /**
   * Salva item no sessionStorage
   * @param {string} key - Chave
   * @param {*} value - Valor a ser salvo
   */
  setSession: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Erro ao salvar no sessionStorage:', error);
    }
  },

  /**
   * Recupera item do sessionStorage
   * @param {string} key - Chave
   * @param {*} defaultValue - Valor padrão
   * @returns {*} Valor recuperado ou valor padrão
   */
  getSession: (key, defaultValue = null) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erro ao recuperar do sessionStorage:', error);
      return defaultValue;
    }
  }
};

// ===========================================
// HTTP UTILITIES
// ===========================================

/**
 * Utilitários para requisições HTTP
 */
export const http = {
  /**
   * Faz requisição GET
   * @param {string} url - URL da requisição
   * @param {Object} options - Opções da requisição
   * @returns {Promise} Promise com resposta
   */
  get: async (url, options = {}) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }).then(response => response.json());
  },

  /**
   * Faz requisição POST
   * @param {string} url - URL da requisição
   * @param {Object} data - Dados a serem enviados
   * @param {Object} options - Opções da requisição
   * @returns {Promise} Promise com resposta
   */
  post: async (url, data, options = {}) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    }).then(response => response.json());
  },

  /**
   * Faz upload de arquivo
   * @param {string} url - URL da requisição
   * @param {FormData} formData - Dados do formulário
   * @param {Object} options - Opções da requisição
   * @returns {Promise} Promise com resposta
   */
  upload: async (url, formData, options = {}) => {
    return fetch(url, {
      method: 'POST',
      body: formData,
      ...options
    }).then(response => response.json());
  }
};

// ===========================================
// MATH UTILITIES
// ===========================================

/**
 * Utilitários matemáticos
 */
export const math = {
  /**
   * Gera número aleatório entre min e max
   * @param {number} min - Valor mínimo
   * @param {number} max - Valor máximo
   * @returns {number} Número aleatório
   */
  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Clampa valor entre min e max
   * @param {number} value - Valor a ser clamped
   * @param {number} min - Valor mínimo
   * @param {number} max - Valor máximo
   * @returns {number} Valor clamped
   */
  clamp: (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  },

  /**
   * Converte graus para radianos
   * @param {number} degrees - Graus
   * @returns {number} Radianos
   */
  degToRad: (degrees) => {
    return degrees * (Math.PI / 180);
  },

  /**
   * Converte radianos para graus
   * @param {number} radians - Radianos
   * @returns {number} Graus
   */
  radToDeg: (radians) => {
    return radians * (180 / Math.PI);
  }
};

// ===========================================
// TIME UTILITIES
// ===========================================

/**
 * Utilitários de tempo e data
 */
export const time = {
  /**
   * Delay com Promise
   * @param {number} ms - Milissegundos
   * @returns {Promise} Promise resolvida após delay
   */
  delay: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Formata tempo relativo (ex: "há 2 horas")
   * @param {Date} date - Data a ser formatada
   * @returns {string} Tempo relativo
   */
  timeAgo: (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: 'ano', seconds: 31536000 },
      { label: 'mês', seconds: 2592000 },
      { label: 'dia', seconds: 86400 },
      { label: 'hora', seconds: 3600 },
      { label: 'minuto', seconds: 60 },
      { label: 'segundo', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `há ${count} ${interval.label}${count > 1 ? 's' : ''}`;
      }
    }

    return 'agora mesmo';
  },

  /**
   * Debounce para funções
   * @param {Function} func - Função a ser debounced
   * @param {number} wait - Tempo de espera
   * @returns {Function} Função debounced
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle para funções
   * @param {Function} func - Função a ser throttled
   * @param {number} limit - Limite de tempo
   * @returns {Function} Função throttled
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
