# 🤖 AGENTS.md

Diretrizes para agentes de codificação de IA neste projeto de arquitetura web.

## 🎯 Visão Geral

Este é um **AGENTS.md** - um formato aberto e simples para orientar agentes de codificação de IA, usado por mais de 20.000 projetos open-source. Pense neste arquivo como um **README para agentes**: um local dedicado para fornecer contexto e instruções que ajudam agentes de IA a trabalhar efetivamente neste projeto.

### Sobre o Projeto

Site institucional para **Rafael Munaro Arquitetura** - um sistema web modular focado em performance, acessibilidade e arquitetura moderna. O projeto utiliza tecnologias como Vite, HTML5, CSS3 e JavaScript ES6+ com uma abordagem mobile-first e design system robusto.

## 🚨 REGRA CRÍTICA - ATUALIZAÇÃO OBRIGATÓRIA DE DOCUMENTAÇÃO

**ATENÇÃO - REGRA ABSOLUTA PARA TODAS AS LLMs**

Sempre que você (ou qualquer LLM) realizar **QUALQUER** alteração no código, esta documentação deve ser **OBRIGATORIAMENTE** atualizada:

### 📋 Protocolo Obrigatório de Atualização:

1. **Mudanças no código/setup** → Atualizar imediatamente este arquivo `AGENTS.md`
2. **Novos comandos/scripts** → Documentar em "Setup commands"
3. **Alterações na arquitetura** → Atualizar "Architecture guidelines"
4. **Mudanças em padrões** → Revisar "Code style" e "Development workflow"
5. **Novas dependências** → Atualizar informações sobre ferramentas

### ⚠️ Consequências da Não Conformidade:

- Código não será considerado "completo" sem documentação atualizada
- Qualidade do projeto será comprometida
- Setup de novos desenvolvedores será prejudicado
- Manutenibilidade futura será dificultada

**Esta é uma REGRA EXCLUSIVA e deve ser seguida SEM EXCEÇÕES.**

## 🚨 REGRAS ABSOLUTAS ADICIONAIS - ORGANIZAÇÃO OBRIGATÓRIA

### 1. 🏗️ PRIORIDADE ABSOLUTA: MELHORES PRÁTICAS ORGANIZACIONAIS

**QUALQUER trabalho com código deve ser orientado por excelência organizacional**

#### 📋 Requisitos Obrigatórios:

- **Organização impecável**: Código sempre estruturado de forma clara e lógica
- **Padronização forçada**: Seguir rigorosamente padrões estabelecidos para arquivos
- **Localização otimizada**: Arquivos SEMPRE criados no melhor local estratégico possível
- **Arquitetura consistente**: Manter organização lógica e preparada para escalabilidade
- **Decisões documentadas**: Explicar escolhas organizacionais quando impactarem estrutura

#### 🚫 VIOLAÇÕES CRÍTICAS PROIBIDAS:

- ❌ Criar arquivos em locais inadequados ou incorretos
- ❌ Permitir desorganização da estrutura existente
- ❌ Ignorar padrões organizacionais estabelecidos
- ❌ Manter ou criar código com estrutura deficiente

### 2. 📚 GESTÃO DOCUMENTAL RIGOROSA

**PROIBIÇÃO TOTAL de criação de novos arquivos informativos**

#### 📋 Protocolo Estrito:

- **Apenas atualização**: Trabalhar EXCLUSIVAMENTE com arquivos já existentes em `docs/`
- **Criação vetada**: Nenhuma nova documentação pode ser criada
- **Arquivos sagrados**: `README.md` (raiz) e `INFO.md` são INTANGÍVEIS - nunca alterados
- **Modificações controladas**: Apenas conteúdo dos arquivos existentes em `docs/`

#### 🚫 PROIBIDO SOB PENA DE INVALIDAÇÃO:

- ❌ Criar `TUTORIAL.md`, `MANUAL.md`, `GUIA.md` ou qualquer arquivo informativo
- ❌ Modificar `README.md` na pasta raiz do projeto
- ❌ Alterar `INFO.md` de qualquer forma ou conteúdo
- ❌ Estabelecer documentação paralela fora do diretório `docs/`

### 3. 🌐 ESTRUTURA HTML DEFINITIVA

**O arquivo `index.html` deve permanecer IMUTÁVEL na pasta pai (raiz)**

#### 📋 Localização Fixa e Obrigatória:

- **Raiz do projeto**: Sempre em `/index.html` - localização definitiva
- **Imobilidade**: Local nunca deve ser alterado ou movido
- **Consistência estrutural**: Manter padrão de acesso uniforme

#### 🚫 PROIBIDO - SANÇÕES IMEDIATAS:

- ❌ Mover para `src/index.html` ou qualquer subdiretório
- ❌ Criar versões duplicadas ou paralelas
- ❌ Alterar referências ou caminhos de acesso

---

**ESSAS SÃO REGRAS ABSOLUTAS PARA AGENTES DE IA - CUMPRIMENTO OBRIGATÓRIO E INQUESTIONÁVEL.**

## 🛠️ Setup commands

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (hot reload)
npm run dev

# Iniciar servidor e abrir browser automaticamente
npm run dev:open

# Expor na rede local
npm run dev:host
```

### Qualidade de Código

```bash
# Verificar linting
npm run lint

# Corrigir linting automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

### Build e Produção

```bash
# Build para produção
npm run build

# Preview do build local
npm run preview

# Build + preview
npm run serve

# Analisar bundle size
npm run analyze
```

### Limpeza

```bash
# Limpar build files
npm run clean

# Limpar tudo (incluindo node_modules)
npm run clean:all
```

## 🎨 Code style

### HTML

- Use **HTML5 semântico**: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- Inclua **ARIA labels** quando necessário: `aria-label`, `aria-labelledby`, `role`
- Use **IDs únicos** para headings principais
- Sempre inclua **atributos alt** em imagens
- Evite **divs desnecessários** - prefira elementos semânticos apropriados

### CSS

- Siga **metodologia BEM** para nomenclatura:
  ```css
  .component {
  }
  .component__element {
  }
  .component--modifier {
  }
  ```
- Use **CSS variables** (design tokens) para valores reutilizáveis
- **Mobile-first approach**: estilos base para mobile, media queries progressivas
- Agrupe propriedades logicamente: posicionamento → box model → tipografia → visual → animação
- Use **rem** para tamanhos de fonte, **px** para borders/shadows
- **NÃO use `!important`** (exceto em utilitários)
- Use **unidades relativas** (rem, %, vw/vh) para responsividade

### JavaScript

- Use **ES6+ moderno**: `const`/`let`, arrow functions, classes, async/await
- **Import centralizado** de utilitários: `debounce` e `throttle` de `../utils/helpers.js`
- Use **optional chaining** (`?.`) para acesso seguro
- Prefira **template literals** para strings
- Adicione **JSDoc** em funções públicas
- Use **try/catch** para error handling
- **NÃO use `var`** - sempre `const` ou `let`
- Use **destructuring** quando apropriado

#### Nomenclatura

```javascript
// camelCase para variáveis/funções
const userName = 'João';
function getUserData() {}

// PascalCase para classes
class UserComponent {}

// UPPER_SNAKE_CASE para constantes
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Prefixo underscore para métodos privados
class Example {
  _privateMethod() {}
  publicMethod() {}
}
```

## 🧪 Testing

```bash
# Executar testes (quando implementados)
npm run test

# Executar testes em modo watch
npm run test:watch
```

**Nota**: Atualmente o projeto não possui testes automatizados implementados (scripts `test` e `test:watch` retornam apenas mensagens). Foque em testes manuais e validação visual durante o desenvolvimento.

## 📁 Project structure

```
site_rafael-munaro-arquitetura/
├── docs/                      # 📚 Documentação
│   ├── README.md             # Visão geral
│   ├── AGENTS.md             # Este arquivo
│   ├── ARCHITECTURE.md       # Arquitetura detalhada
│   ├── CHANGELOG.md          # Histórico de mudanças
│   └── RULES.md              # Regras de desenvolvimento
│
├── src/                       # 💻 Código fonte
│   ├── index.html            # HTML principal (novo design)
│   ├── assets/               # 🎨 Assets estáticos
│   │   ├── fonts/           # Fontes customizadas
│   │   ├── icons/           # Ícones SVG
│   │   └── images/          # Imagens otimizadas
│   │
│   ├── js/                   # 📜 JavaScript
│   │   ├── main.js          # Sistema principal
│   │   ├── new-design.js    # ⭐ Sistema de design novo
│   │   └── topographic-background.js # ⭐ Animação de fundo
│   │
│   ├── styles/               # 🎨 CSS modular
│   │   ├── base.css         # Design tokens (CSS variables)
│   │   ├── new-components.css # Componentes
│   │   ├── new-sections.css   # Seções da página
│   │   ├── new-responsive.css # Responsividade
│   │   └── variables.css     # Variáveis adicionais
│   │
│   ├── components/           # 🧩 Componentes JS
│   │   ├── header.js        # Header com navegação
│   │   ├── navigation.js    # Sistema de navegação
│   │   └── footer.js        # Footer
│   │
│   └── utils/                # 🔧 Utilitários
│       └── helpers.js        # ⭐ Centralizados: debounce/throttle
│
├── public/                    # 📦 Assets públicos
└── dist/                      # 🏗️ Build output
```

## 🏗️ Architecture guidelines

### Design System

- **Paleta de cores arquitetônica**: moss (#545943), beige (#E8DACB), terracotta (#B66C48)
- **Tipografia**: Inter (sans-serif) + Playfair Display (serif)
- **Espaçamento**: Sistema de 8px (0.5rem increments)
- **Componentes modulares** com BEM
- **CSS variables** para design tokens

### Performance Priorities

- **Lazy loading** para imagens abaixo da dobra
- **IntersectionObserver** para animações
- **Debounce/throttle** centralizados em `utils/helpers.js`
- **Canvas optimization** para animação topográfica
- **Critical CSS** inline preparado para futuro

### Acessibilidade (WCAG 2.1 AA)

- **HTML semântico** com roles apropriados
- **Navegação por teclado** completa
- **ARIA labels** em elementos interativos
- **Contraste adequado** (4.5:1 mínimo)
- **Skip links** para navegação rápida
- **Focus management** em modais/forms

### Component Pattern

```javascript
/**
 * Component Class Pattern
 * Padrão consistente para todos os componentes
 */
class ComponentName {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    // Outros setups necessários
  }

  cacheElements() {
    // Cache de elementos DOM
    this.button = this.element.querySelector('.component__button');
  }

  bindEvents() {
    // Bind de eventos com throttle/debounce quando apropriado
    this.button?.addEventListener('click', () => this.handleClick());
  }

  handleClick() {
    // Lógica do componente
  }
}
```

## 🚀 Development workflow

### Fluxo de Trabalho

1. **Desenvolvimento**: `npm run dev` com hot reload
2. **Qualidade**: `npm run lint` + `npm run format`
3. **Build**: `npm run build` para produção
4. **Teste**: `npm run preview` local antes do deploy

### Commits (Conventional Commits)

```bash
# Formato: tipo(escopo): descrição
feat(header): add sticky navigation on scroll
fix(form): correct email validation regex
docs(readme): update installation instructions
style(css): format according to prettier rules
refactor(utils): simplify date formatting function
perf(images): implement lazy loading
```

### Breakpoints Responsivos

```css
/* Mobile-first base (< 768px) */
/* Tablet */
@media (min-width: 768px) {
}

/* Desktop */
@media (min-width: 1024px) {
}

/* Large Desktop */
@media (min-width: 1280px) {
}

/* Extra Large */
@media (min-width: 1536px) {
}
```

## ⚠️ Important notes

### Utilitários Centralizados (v2.1.0)

- **OBRIGATÓRIO**: Importar `debounce` e `throttle` de `../utils/helpers.js`
- **PROIBIDO**: Redefinir essas funções localmente
- **MOTIVO**: Redução de bundle size (~600 bytes gzip) e consistência

```javascript
// ✅ CORRETO
import { debounce, throttle } from '../utils/helpers.js';

// ❌ PROIBIDO
const debounce = (func, wait) => {
  /* código duplicado */
};
```

### Animação Topográfica

- Sistema Canvas complexo para background "vivo"
- **Performance crítica**: 60fps garantido, pausa em tabs ocultas
- **Acessibilidade**: Respeita `prefers-reduced-motion`
- Não modificar sem entender completamente o sistema

### SEO e Performance

- Imagens sempre com `alt` descritivo e `loading="lazy"`
- Meta tags otimizadas para arquitetura
- Core Web Vitals como prioridade (LCP < 2.5s, FID < 100ms, CLS < 0.1)

## 🔒 Security considerations

- **NÃO commita** secrets ou tokens
- Use **env vars** para configurações sensíveis
- **Sempre sanitize** inputs de usuário
- Implemente **CSP headers** em produção
- Use **HTTPS only** em produção

## 📊 Quality metrics

### Performance Targets

- **LCP**: < 2.5s (atual: ~1.8s)
- **FID**: < 100ms (atual: ~50ms)
- **CLS**: < 0.1 (atual: ~0.05)

### Code Quality

- **ESLint**: Zero warnings em CI
- **Prettier**: Formatação consistente
- **Acessibilidade**: WCAG 2.1 AA compliance

### Bundle Analysis

- Execute `npm run analyze` regularmente
- Monitore tamanho do bundle
- Otimize imports não utilizados

---

**Última atualização:** Outubro 2025  
**Versão:** 3.0.0  
**Formato:** AGENTS.md (padrão open-source)  
**Responsável:** Equipe de Desenvolvimento
