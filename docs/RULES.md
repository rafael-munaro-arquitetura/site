# 📏 Regras de Desenvolvimento

## 🎯 Convenções de Código

### HTML

#### Estrutura
```html
<!-- ✅ Correto -->
<section class="hero" id="home" aria-labelledby="hero-title">
  <h1 id="hero-title">Título</h1>
</section>

<!-- ❌ Incorreto -->
<div class="section">
  <h1>Título</h1>
</div>
```

#### Regras
- **DEVE** usar HTML5 semântico (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- **DEVE** incluir ARIA labels quando necessário
- **DEVE** usar IDs únicos para headings principais
- **NÃO DEVE** usar divs quando existe elemento semântico apropriado
- **DEVE** incluir atributos `alt` em todas as imagens

### CSS

#### Nomenclatura BEM
```css
/* Bloco */
.header {}

/* Elemento */
.header__logo {}
.header__menu {}
.header__menu-item {}

/* Modificador */
.header--sticky {}
.header__menu-link--active {}
```

#### Regras
- **DEVE** usar metodologia BEM para nomenclatura
- **DEVE** usar variáveis CSS para valores reutilizáveis
- **DEVE** seguir mobile-first (estilos base para mobile)
- **NÃO DEVE** usar `!important` (exceto para utilitários)
- **DEVE** agrupar propriedades logicamente
- **DEVE** usar rem para tamanhos de fonte
- **DEVE** usar px para borders e sombras

#### Ordem de Propriedades
```css
.component {
  /* Posicionamento */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  
  /* Box Model */
  display: flex;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  
  /* Tipografia */
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-primary);
  
  /* Visual */
  background-color: white;
  border: 1px solid;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);
  
  /* Animação */
  transition: all 0.3s ease;
}
```

### JavaScript

#### Estilo de Código
```javascript
// ✅ Correto - ES6+ moderno
class Component {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.init();
  }
  
  init() {
    this.cacheElements();
    this.bindEvents();
  }
  
  cacheElements() {
    this.element = document.querySelector('.component');
  }
  
  bindEvents() {
    this.element?.addEventListener('click', () => this.handleClick());
  }
  
  handleClick() {
    // Lógica aqui
  }
}

// ❌ Incorreto - var, function declarations antigas
var component = function() {
  var element = document.querySelector('.component');
  element.onclick = function() {
    // Lógica aqui
  };
};
```

#### Regras
- **DEVE** usar ES6+ (const/let, arrow functions, classes)
- **DEVE** usar optional chaining (`?.`) para acesso seguro
- **NÃO DEVE** usar `var` (use `const` ou `let`)
- **DEVE** usar destructuring quando apropriado
- **DEVE** usar template literals para strings
- **DEVE** adicionar JSDoc para funções públicas
- **DEVE** usar async/await para operações assíncronas
- **DEVE** usar try/catch para error handling

#### Nomenclatura
```javascript
// Variáveis e funções: camelCase
const userName = 'João';
function getUserData() {}

// Classes: PascalCase
class UserComponent {}

// Constantes: UPPER_SNAKE_CASE
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Privadas: prefixo underscore
class Example {
  _privateMethod() {}
  publicMethod() {}
}
```

## 🏗️ Arquitetura de Arquivos

### Estrutura de Componentes
```
components/
├── header/
│   ├── header.js       # Lógica
│   ├── header.css      # Estilos
│   └── header.test.js  # Testes
└── button/
    ├── button.js
    ├── button.css
    └── button.test.js
```

### Imports
```javascript
// ✅ Ordem correta
// 1. Bibliotecas externas
import axios from 'axios';

// 2. Módulos internos
import { api } from './utils/api.js';
import { formatDate } from './utils/date.js';

// 3. Componentes
import Header from './components/header.js';

// 4. Estilos
import './styles/main.css';
```

## 📱 Responsividade

### Breakpoints Padronizados
```css
/* Mobile-first base */
.element {
  width: 100%;
}

/* Tablet: 768px */
@media (min-width: 768px) {
  .element {
    width: 50%;
  }
}

/* Desktop: 1024px */
@media (min-width: 1024px) {
  .element {
    width: 33.333%;
  }
}

/* Large: 1280px */
@media (min-width: 1280px) {
  .element {
    width: 25%;
  }
}
```

### Regras
- **DEVE** seguir mobile-first
- **DEVE** testar em dispositivos reais quando possível
- **DEVE** usar unidades relativas (rem, %, vw/vh)
- **DEVE** garantir touch targets mínimos de 44x44px

## ♿ Acessibilidade

### Checklist Obrigatório
- [ ] Contraste mínimo 4.5:1 para texto
- [ ] Navegação por teclado funcional
- [ ] ARIA labels em elementos interativos
- [ ] Alt text descritivo em imagens
- [ ] Skip links para navegação rápida
- [ ] Foco visível em elementos
- [ ] Headings em ordem hierárquica
- [ ] Formulários com labels associados

### Exemplos
```html
<!-- Botão acessível -->
<button 
  type="button"
  aria-label="Fechar modal"
  aria-pressed="false">
  <span aria-hidden="true">×</span>
</button>

<!-- Navegação acessível -->
<nav aria-label="Menu principal">
  <ul role="list">
    <li><a href="#home">Início</a></li>
  </ul>
</nav>

<!-- Imagem acessível -->
<img 
  src="projeto.jpg" 
  alt="Casa moderna com fachada de vidro e jardim vertical"
  loading="lazy">
```

## 🚀 Performance

### Regras
- **DEVE** lazy load imagens abaixo da dobra
- **DEVE** usar IntersectionObserver para animações
- **DEVE** debounce/throttle eventos de scroll/resize
- **DEVE** minimizar reflows/repaints
- **NÃO DEVE** usar loops pesados no main thread
- **DEVE** usar Web Workers para processamento pesado

### Otimizações
```javascript
// ✅ Debounce para input
const handleInput = debounce((e) => {
  search(e.target.value);
}, 300);

// ✅ Throttle para scroll
const handleScroll = throttle(() => {
  updateHeader();
}, 100);

// ✅ IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
```

## 🧪 Testes

### Nomenclatura
```javascript
// ✅ Descritivo
describe('UserForm', () => {
  it('should validate email format', () => {});
  it('should show error for invalid phone', () => {});
  it('should submit form with valid data', () => {});
});

// ❌ Genérico
describe('Form', () => {
  it('works', () => {});
});
```

### Regras
- **DEVE** testar comportamentos, não implementação
- **DEVE** usar nomes descritivos
- **DEVE** isolar testes (sem dependências entre eles)
- **DEVE** mockar chamadas externas
- **DEVE** testar edge cases

## 📝 Commits

### Formato Conventional Commits
```bash
# Estrutura
<tipo>(<escopo>): <descrição>

<corpo opcional>

<footer opcional>
```

### Tipos
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (sem mudança de lógica)
- **refactor**: Refatoração
- **perf**: Performance
- **test**: Testes
- **chore**: Manutenção

### Exemplos
```bash
feat(header): add sticky navigation on scroll
fix(form): correct email validation regex
docs(readme): update installation instructions
style(css): format according to prettier rules
refactor(utils): simplify date formatting function
perf(images): implement lazy loading
test(contact): add form validation tests
chore(deps): update vite to v4.5.0
```

## 🔒 Segurança

### Regras
- **NÃO DEVE** commitar secrets/tokens
- **DEVE** sanitizar inputs de usuário
- **DEVE** usar HTTPS em produção
- **DEVE** implementar CSP headers
- **DEVE** validar dados no backend
- **NÃO DEVE** confiar em validação client-side apenas

### Exemplo Seguro
```javascript
// ✅ Sanitização de input
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 200);
}

// ✅ Uso de env vars
const apiKey = import.meta.env.VITE_API_KEY;
```

## 📦 Versionamento

### Semantic Versioning (SemVer)
```
MAJOR.MINOR.PATCH

1.2.3
│ │ └─ PATCH: Bug fixes
│ └─── MINOR: New features (backward compatible)
└───── MAJOR: Breaking changes
```

### Quando Incrementar
- **MAJOR**: API changes, breaking changes
- **MINOR**: New features, deprecations
- **PATCH**: Bug fixes, documentation

## 🔄 Code Review

### Checklist do Revisor
- [ ] Código segue convenções estabelecidas
- [ ] Testes passam
- [ ] Performance não degradou
- [ ] Acessibilidade mantida
- [ ] Documentação atualizada
- [ ] Sem console.logs
- [ ] Sem TODOs não tratados

### O Que Buscar
- Código duplicado
- Over-engineering
- Performance issues
- Security vulnerabilities
- Missing error handling
- Inconsistências de estilo

## 🚫 Anti-Padrões

### O Que Evitar
```javascript
// ❌ Magic numbers
if (width > 768) {}

// ✅ Constantes nomeadas
const TABLET_BREAKPOINT = 768;
if (width > TABLET_BREAKPOINT) {}

// ❌ Callback hell
getData((data) => {
  processData(data, (result) => {
    saveResult(result, (saved) => {
      // ...
    });
  });
});

// ✅ Async/await
async function handleData() {
  const data = await getData();
  const result = await processData(data);
  const saved = await saveResult(result);
}

// ❌ Seletores lentos
document.querySelectorAll('.item').forEach(/* ... */);

// ✅ Cache de elementos
const items = document.querySelectorAll('.item');
items.forEach(/* ... */);
```

---

**Última atualização:** Outubro 2025  
**Versão:** 1.0.0  
**Responsável:** Equipe de Desenvolvimento
