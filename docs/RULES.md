# 📏 Guia Completo de Desenvolvimento

> **Rafael Munaro Arquitetura** - Sistema web moderno focado em performance, acessibilidade e excelência técnica.

## 📋 Sumário Navegacional

| Seção                                                 | Descrição                |
| ----------------------------------------------------- | ------------------------ |
| [**🎯 Convenções de Código**](#-convenções-de-código) | HTML, CSS, JavaScript    |
| [**🏗️ Arquitetura**](#️-arquitetura)                  | Estrutura e organização  |
| [**📱 Responsividade**](#-responsividade)             | Mobile-first design      |
| [**♿ Acessibilidade**](#-acessibilidade)             | WCAG 2.1 AA compliance   |
| [**🚀 Performance**](#-performance)                   | Otimizações críticas     |
| [**🔧 Utilitários**](#-utilitários)                   | Funções centralizadas    |
| [**🧪 Testes**](#-testes)                             | Estratégias de qualidade |
| [**📝 Commits**](#-commits)                           | Conventional commits     |
| [**🔒 Segurança**](#-segurança)                       | Boas práticas            |
| [**📊 Métricas**](#-métricas)                         | KPIs e objetivos         |
| [**🚫 Anti-padrões**](#-anti-padrões)                 | O que evitar             |

## 🚨 REGRA SUPREMA PARA LLMs - DOCUMENTAÇÃO OBRIGATÓRIA

**REGRA ABSOLUTA, EXCLUSIVA E IRREVOGÁVEL**

Toda vez que uma LLM realizar **QUALQUER** alteração no código, regras, padrões ou estrutura do projeto, este documento `RULES.md` deve ser **OBRIGATORIAMENTE** atualizado para refletir as mudanças implementadas.

### 📋 Quando Atualizar RULES.md:

#### 1. **Mudanças em Padrões de Código:**

- Novos padrões HTML/CSS/JavaScript
- Alterações em convenções de nomenclatura
- Modificações em estrutura de arquivos

#### 2. **Atualizações em Regras:**

- Novos requisitos de performance
- Mudanças em políticas de acessibilidade
- Alterações em convenções de commit
- Atualizações em métricas/KPIs

#### 3. **Novas Tecnologias/Ferramentas:**

- Adição de novas dependências
- Mudanças em ferramentas de build
- Novos scripts ou comandos

#### 4. **Refatorações Arquiteturais:**

- Mudanças em design patterns
- Alterações na estrutura de componentes
- Modificações em utilitários centralizados

### 📝 Protocolo Obrigatório de Atualização:

1. **Identificar Seção Afetada** → Localizar seção relevante no documento
2. **Documentar Mudança** → Adicionar/modificar regras com contexto
3. **Atualizar Exemplos** → Manter exemplos de código atualizados
4. **Revisar Consistência** → Garantir que todas as regras ainda façam sentido
5. **Atualizar Metadados** → Modificar versão e data no final do documento

### 🚫 VIOLAÇÕES CRÍTICAS PROIBIDAS:

- ❌ Implementar código sem atualizar regras correspondentes
- ❌ Modificar padrões sem documentar mudança
- ❌ Adicionar ferramentas sem atualizar seções relevantes
- ❌ Alterar arquitetura sem revisar regras afetadas
- ❌ Criar novos padrões sem documentar em RULES.md

### ⚠️ Consequências da Não Conformidade:

- **Qualidade Comprometida**: Regras desatualizadas levam a inconsistências
- **Manutenibilidade Perdida**: Novos desenvolvedores não terão regras atualizadas
- **Padrões Quebrados**: Código futuro seguirá regras obsoletas
- **Revisões Difíceis**: Code reviews sem referência atualizada
- **Projeto Instável**: Inconsistências técnicas acumuladas

**ESTA É A REGRA MAIS CRÍTICA DO PROJETO. SUA VIOLAÇÃO INVALIDA QUALQUER CONTRIBUIÇÃO.**

## 🚨 REGRAS ABSOLUTAS ADICIONAIS - ORGANIZAÇÃO REGULAMENTAR

### 1. 📏 ORGANIZAÇÃO REGULAMENTAR - SUPREMA OBRIGATORIEDADE

**QUALQUER intervenção no código deve seguir regulamentação organizacional superior**

#### 📋 Regulamentações Obrigatórias:

- **Organização regulamentada**: Código sempre estruturado seguindo regulamentação clara
- **Padronização regulamentada**: Seguir padrões estabelecidos conforme regulamentação
- **Localização regulamentada**: Arquivos sempre criados nos locais regulamentarmente ideais
- **Consistência regulamentada**: Manter organização lógica conforme regulamentação
- **Documentação regulamentada**: Registrar decisões organizacionais que impactem regulamentação

#### 🚫 VIOLAÇÕES REGULAMENTARES PROIBIDAS:

- ❌ Criar arquivos em locais regulamentarmente inadequados
- ❌ Desorganizar estrutura regulamentar existente
- ❌ Ignorar padrões organizacionais regulamentados
- ❌ Manter código com estrutura regulamentar deficiente

### 2. 📚 GOVERNANÇA DOCUMENTAL REGULAMENTADA

**PROIBIÇÃO REGULAMENTAR absoluta de criação de documentação adicional**

#### 📋 Governança Regulamentada:

- **Atualização regulamentada**: Trabalhar exclusivamente com documentação regulamentada em `docs/`
- **Criação regulamentar vetada**: Nenhuma nova documentação pode ser criada
- **Documentos regulamentares sagrados**: `README.md` (raiz) e `INFO.md` são regulamentarmente imutáveis
- **Modificações regulamentadas**: Apenas conteúdo dos arquivos regulamentados existentes

#### 🚫 PROIBIDO REGULAMENTARMENTE:

- ❌ Criar `REGRAS.md`, `MANUAL.md`, `GUIA.md` ou qualquer documentação regulamentar nova
- ❌ Alterar `README.md` na raiz regulamentar do projeto
- ❌ Modificar `INFO.md` regulamentarmente
- ❌ Estabelecer documentação regulamentar paralela fora de `docs/`

### 3. 🌐 ESTRUTURA HTML REGULAMENTADA DEFINITIVA

**O arquivo `index.html` deve manter posição regulamentada na raiz**

#### 📋 Localização Regulamentada Fixa:

- **Posição regulamentada**: Sempre na raiz (`/index.html`) - localização regulamentada definitiva
- **Imutabilidade regulamentada**: Posição nunca deve ser alterada regulamentarmente
- **Consistência regulamentada**: Manter padrão regulamentado de acesso consistente

#### 🚫 PROIBIDO REGULAMENTARMENTE:

- ❌ Mover regulamentarmente para `src/index.html` ou subdiretórios
- ❌ Criar versões regulamentares paralelas do index.html
- ❌ Alterar referências regulamentadas ou caminhos

---

**ESSAS SÃO REGRAS REGULAMENTARES ABSOLUTAS - VIOLAÇÃO COMPROMETE A CONFORMIDADE REGULAMENTAR TOTAL.**

---

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
.header {
}

/* Elemento */
.header__logo {
}
.header__menu {
}
.header__menu-item {
}

/* Modificador */
.header--sticky {
}
.header__menu-link--active {
}
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
var component = function () {
  var element = document.querySelector('.component');
  element.onclick = function () {
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
<button type="button" aria-label="Fechar modal" aria-pressed="false">
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
  loading="lazy"
/>
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
const handleInput = debounce(e => {
  search(e.target.value);
}, 300);

// ✅ Throttle para scroll
const handleScroll = throttle(() => {
  updateHeader();
}, 100);

// ✅ IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
```

## 🔧 v2.1.0 - Centralização de Utilitários

### Regras de Importação

- **DEVE** importar `debounce` e `throttle` de `../utils/helpers.js`
- **NÃO DEVE** redefinir essas funções em arquivos locais
- **DEVE** usar imports modulares ao invés de definições globais

### ✅ Forma Correta

```javascript
// src/js/main.js
import { debounce, throttle, scrollToElement } from '../utils/helpers.js';

// Uso
const handleScroll = throttle(() => {
  updateHeader();
}, 100);
```

### ❌ Formas Proibidas

```javascript
// ❌ Não definir localmente
const debounce = (func, wait) => {
  // código duplicado...
};

// ❌ Não usar definições globais
// debounce = (func, wait) => { ... };
```

### Impacto da Refatoração

- **Bundle Size**: Redução de ~600 bytes (gzip)
- **Manutenibilidade**: Centralização evita inconsistências
- **Performance**: Eliminação de código duplicado
- **Qualidade**: Zero duplicações de funções críticas

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

### 🛡️ Regras Fundamentais

- **NÃO DEVE** commitar secrets, tokens ou chaves privadas
- **DEVE** sanitizar todos os inputs de usuário
- **DEVE** usar HTTPS em produção obrigatoriamente
- **DEVE** implementar Content Security Policy (CSP) headers
- **DEVE** validar dados no backend (client-side ≠ seguro)
- **DEVE** usar prepared statements para queries SQL
- **DEVE** implementar rate limiting em APIs
- **DEVE** criptografar dados sensíveis em trânsito e repouso

### 🔐 Exemplos Seguros

```javascript
// ✅ Sanitização completa de input
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove tags HTML
    .replace(/javascript:/gi, '') // Remove protocolos JS
    .slice(0, 200); // Limita tamanho
}

// ✅ Uso seguro de variáveis de ambiente
const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  apiUrl: import.meta.env.VITE_API_URL,
  environment: import.meta.env.VITE_ENV,
};

// ✅ Validação server-side
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}
```

### 🚨 Checklist de Segurança

- [ ] **Secrets**: Não há chaves/tokens no código
- [ ] **HTTPS**: Site usa HTTPS em produção
- [ ] **CSP**: Headers de segurança implementados
- [ ] **XSS**: Inputs sanitizados contra XSS
- [ ] **CSRF**: Proteção contra CSRF tokens
- [ ] **Rate Limiting**: APIs protegidas contra abuso
- [ ] **Dependencies**: Sem vulnerabilidades conhecidas

## 📊 Métricas e KPIs

### 🎯 Objetivos de Performance

| Métrica                            | Meta    | Atual | Status       |
| ---------------------------------- | ------- | ----- | ------------ |
| **LCP** (Largest Contentful Paint) | < 2.5s  | ~1.8s | ✅ Excelente |
| **FID** (First Input Delay)        | < 100ms | ~50ms | ✅ Excelente |
| **CLS** (Cumulative Layout Shift)  | < 0.1   | ~0.05 | ✅ Excelente |
| **FCP** (First Contentful Paint)   | < 1.5s  | ~1.2s | ✅ Bom       |
| **TTI** (Time to Interactive)      | < 3.0s  | ~2.1s | ✅ Bom       |

### 📈 Qualidade de Código

| Aspecto            | Meta                   | Status          |
| ------------------ | ---------------------- | --------------- |
| **ESLint**         | Zero warnings          | 🔄 Em progresso |
| **Prettier**       | Formatação consistente | ✅ Implementado |
| **Bundle Size**    | < 200KB gzip           | ✅ Mantido      |
| **Acessibilidade** | WCAG 2.1 AA            | ✅ Compliance   |
| **Performance**    | 90+ Lighthouse         | ✅ Mantido      |

### 🧪 Cobertura de Testes

```bash
# Meta: 80% cobertura
# Atual: Implementar quando houver testes automatizados

✅ Testes manuais obrigatórios
✅ Validação visual obrigatória
✅ Testes de acessibilidade obrigatórios
✅ Testes cross-browser obrigatórios
```

## 📦 Versionamento

### Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH

Exemplo: 2.1.3
│ │ └─ PATCH: Correções de bug, hotfixes
│ └─── MINOR: Novas funcionalidades (retrocompatíveis)
└───── MAJOR: Mudanças que quebram compatibilidade
```

### 📋 Quando Incrementar

| Versão            | Quando usar            | Exemplos                              |
| ----------------- | ---------------------- | ------------------------------------- |
| **MAJOR** (2.0.0) | Mudanças incompatíveis | Remoção de APIs, refatoração completa |
| **MINOR** (1.1.0) | Novas funcionalidades  | Adição de componentes, novas features |
| **PATCH** (1.0.1) | Correções              | Bug fixes, pequenas melhorias         |

## 🛠️ Ferramentas e CI/CD

### 🔧 Stack de Desenvolvimento

```bash
# Core Tools
✅ Vite 4.5+          # Build tool
✅ ESLint             # Linting
✅ Prettier           # Code formatting
✅ Stylelint          # CSS linting
✅ Husky              # Git hooks

# Performance & Quality
✅ Lighthouse CI      # Performance testing
✅ Bundle Analyzer    # Bundle size analysis
✅ Axe-core           # Accessibility testing

# Version Control
✅ Git Flow           # Branching strategy
✅ Conventional Commits # Commit messages
✅ Semantic Release   # Automated versioning
```

### 🚀 Pipeline CI/CD

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run build
      - run: npm run lighthouse

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=moderate
      - run: npm run security:check
```

### 📋 Scripts NPM Essenciais

```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite build && vite preview",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "vite build --mode analyze",
    "lighthouse": "lhci autorun",
    "security": "npm audit && npx audit-ci --moderate",
    "test": "echo 'Tests manuais obrigatórios'",
    "clean": "rm -rf dist node_modules/.vite",
    "clean:all": "rm -rf dist node_modules package-lock.json"
  }
}
```

## 🔄 Code Review

### 📝 Checklist Completo do Revisor

#### ✅ Código

- [ ] Segue convenções HTML/CSS/JS estabelecidas
- [ ] Usa metodologia BEM corretamente
- [ ] Imports organizados (externos → internos → estilos)
- [ ] Sem console.logs ou TODOs não tratados
- [ ] Funções têm JSDoc quando necessário

#### 🧪 Qualidade

- [ ] Testes passam (manuais obrigatórios)
- [ ] ESLint sem warnings/erros
- [ ] Prettier aplicado
- [ ] Bundle size não aumentou significativamente

#### 🚀 Performance

- [ ] Performance não degradou (Lighthouse CI)
- [ ] Imagens otimizadas e lazy loaded
- [ ] Sem loops pesados no main thread
- [ ] Cache de elementos implementado

#### ♿ Acessibilidade

- [ ] Acessibilidade mantida (WCAG 2.1 AA)
- [ ] Navegação por teclado funcional
- [ ] Contraste adequado mantido
- [ ] ARIA labels apropriados

#### 🔒 Segurança

- [ ] Sem exposição de secrets/tokens
- [ ] Inputs sanitizados
- [ ] Validação adequada implementada

### 🔍 O Que o Revisor Deve Buscar

| Categoria               | Problemas Comuns                              |
| ----------------------- | --------------------------------------------- |
| **🏗️ Arquitetura**      | Código duplicado, over-engineering            |
| **🚀 Performance**      | Loops pesados, seletores lentos, memory leaks |
| **🔒 Segurança**        | XSS vulnerabilities, exposed secrets          |
| **♿ Acessibilidade**   | Missing alt texts, poor contrast              |
| **🧹 Manutenibilidade** | Magic numbers, long functions, poor naming    |

## 🚫 Anti-Padrões

### ⚠️ Padrões Proibidos

```javascript
// ❌ ❌ ❌ MAGIC NUMBERS - NUNCA!
if (width > 768) {
}

// ✅ ✅ ✅ CONSTANTES NOMEADAS - SEMPRE!
const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
};
if (width > BREAKPOINTS.MOBILE) {
}
```

```javascript
// ❌ ❌ ❌ CALLBACK HELL - PROIBIDO!
getData(data => {
  processData(data, result => {
    saveResult(result, saved => {
      // Código ilegível...
    });
  });
});

// ✅ ✅ ✅ ASYNC/AWAIT - OBRIGATÓRIO!
async function handleData() {
  const data = await getData();
  const result = await processData(data);
  const saved = await saveResult(result);
  return saved;
}
```

```javascript
// ❌ ❌ ❌ SELETORES REPETIDOS - INEFICIENTE!
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    /* ... */
  });
});

// ✅ ✅ ✅ CACHE DE ELEMENTOS - OBRIGATÓRIO!
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    /* ... */
  });
});
```

### 🚨 Sinais de Alerta no Code Review

- 🔴 **Magic Numbers**: Qualquer número hardcoded sem constante
- 🔴 **Long Functions**: Funções com mais de 50 linhas
- 🔴 **Deep Nesting**: Mais de 3 níveis de indentação
- 🔴 **God Objects**: Classes/funções fazendo tudo
- 🔴 **Console.logs**: Qualquer `console.log` em produção

## 🎯 Implementação Prática

### 📋 Checklist Diário do Desenvolvedor

#### Antes de Commitar

- [ ] ESLint passou sem warnings
- [ ] Prettier formatou o código
- [ ] Testes funcionais realizados
- [ ] Acessibilidade validada
- [ ] Performance não degradou

#### Durante Desenvolvimento

- [ ] Usar BEM para CSS classes
- [ ] Importar utilitários de `../utils/helpers.js`
- [ ] Comitar com conventional commits
- [ ] Testar em dispositivos móveis
- [ ] Validar contraste de cores

#### Code Review Checklist

- [ ] Arquitetura segue padrões estabelecidos
- [ ] Performance mantida ou melhorada
- [ ] Acessibilidade não comprometida
- [ ] Segurança não vulnerada
- [ ] Documentação atualizada

## 🔧 Troubleshooting

### Problemas Comuns e Soluções

| Problema             | Sintoma                 | Solução                          |
| -------------------- | ----------------------- | -------------------------------- |
| **Build falha**      | Erro no `npm run build` | Verificar imports e sintaxe      |
| **Performance ruim** | LCP > 2.5s              | Otimizar imagens, lazy loading   |
| **Acessibilidade**   | Lighthouse < 90         | Adicionar ARIA labels, alt texts |
| **Bundle grande**    | > 200KB gzip            | Remover dependências não usadas  |
| **ESLint errors**    | Build falha             | `npm run lint:fix`               |

## 🎉 Conclusão

Este guia representa o compromisso da **Rafael Munaro Arquitetura** com a **excelência técnica**. Seguindo essas regras, garantimos:

- 🚀 **Performance excepcional** (LCP < 2.5s)
- ♿ **Acessibilidade completa** (WCAG 2.1 AA)
- 🔒 **Segurança robusta** (OWASP compliant)
- 🧹 **Código manutenível** (padrões consistentes)
- 📈 **Escalabilidade** (arquitetura sólida)

### 📞 Contato e Suporte

- **📧 Email**: dev@rafaelmunaro.com
- **💬 Discord**: [Link do servidor]
- **📚 Docs**: [Links para documentação completa]

---

## 🔒 Sistema de Regras Inteligente

### 🤖 Regras Automáticas (Cursor IA)

As regras críticas são aplicadas **automaticamente** pelo sistema de IA:

| Arquivo                  | Propósito                | Aplicação |
| ------------------------ | ------------------------ | --------- |
| `core-standards.mdc`     | HTML/CSS/JS obrigatórios | Sempre    |
| `architecture-rules.mdc` | Design system            | Sempre    |
| `topographic-system.mdc` | Animação crítica         | Sempre    |
| `commit-conventions.mdc` | Commits padronizados     | Sempre    |

**Essas regras garantem consistência automática em todas as interações com IA.**

### 📖 Documentação Complementar

- **[`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)** - Arquitetura detalhada
- **[`docs/AGENTS.md`](./AGENTS.md)** - Guia para agentes de IA
- **[`docs/CHANGELOG.md`](./CHANGELOG.md)** - Histórico de mudanças
- **[`docs/README.md`](./README.md)** - Visão geral do projeto

---

## 📊 Informações do Documento

| Campo                     | Valor                         |
| ------------------------- | ----------------------------- |
| **📅 Última atualização** | Outubro 2025                  |
| **🏷️ Versão**             | 4.0.0                         |
| **🎯 Formato**            | Guia Completo + Regras Always |
| **👥 Responsável**        | Equipe de Desenvolvimento     |
| **🔗 Relacionados**       | ARCHITECTURE.md, AGENTS.md    |
| **📏 Páginas**            | ~25 seções organizadas        |
| **🎨 Design System**      | Moss, Beige, Terracotta       |

---

_"A excelência não é um acidente. É resultado de hábitos intencionais e padrões disciplinados."_

**Rafael Munaro Arquitetura** - Construindo o futuro, uma linha de código por vez. 🏗️✨
