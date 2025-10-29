# 🌟 Rafael Munaro Arquitetura

> Site institucional profissional para **Rafael Munaro Arquitetura** - arquitetura contemporânea com foco em projetos residenciais, comerciais e design de interiores. Design minimalista otimizado para conversão e experiência excepcional.

## 📋 Sobre o Projeto

**Rafael Soares Munaro** é arquiteto e designer de interiores do interior paulista. O site apresenta seu portfólio profissional e facilita o contato direto com clientes em Capivari, Santa Bárbara d'Oeste, Americana e Piracicaba (DDD 19).

## 🚨 REGRA OBRIGATÓRIA PARA LLMs - ATUALIZAÇÃO DE DOCUMENTAÇÃO

**REGRA ABSOLUTA E EXCLUSIVA - SEMPRE APLICADA**

Toda vez que uma LLM realizar **QUALQUER** alteração que afete a visão geral, funcionalidades, tecnologias ou apresentação do projeto, este documento `README.md` deve ser **OBRIGATORIAMENTE** atualizado.

### 📋 Quando Atualizar README.md:

#### 1. **Mudanças no Escopo do Projeto:**
- Novos objetivos ou funcionalidades principais
- Alterações na proposta de valor
- Modificações no público-alvo

#### 2. **Atualizações Tecnológicas:**
- Adição ou remoção de tecnologias
- Mudanças significativas na stack
- Atualizações de versões importantes

#### 3. **Novas Funcionalidades:**
- Features implementadas que mudem a apresentação
- Melhorias significativas em performance/acessibilidade
- Novos recursos que afetem stakeholders

#### 4. **Mudanças em Métricas:**
- Atualizações em Core Web Vitals
- Novos benchmarks de performance
- Alterações em Lighthouse scores

#### 5. **Informações de Contato/Apresentação:**
- Novos canais de contato
- Mudanças no branding
- Atualizações no roadmap

### 📝 Protocolo Obrigatório:

1. **Revisar Seções Afetadas** → Verificar todas as seções do documento
2. **Atualizar Métricas** → Manter dados de performance atuais
3. **Revisar Tecnologias** → Confirmar versões e ferramentas
4. **Atualizar Roadmap** → Refletir mudanças no planejamento
5. **Validar Links** → Garantir que todos os links funcionem

### 🚫 PROIBIDO:
- Publicar mudanças sem atualizar README
- Alterar funcionalidades sem refletir no documento
- Modificar tecnologias sem atualizar seção correspondente
- Deixar métricas desatualizadas

**VIOLAÇÃO COMPROMETE A APRESENTAÇÃO PROFISSIONAL DO PROJETO.**

### 🎯 Objetivos

- **Apresentar portfólio profissional** com projetos realizados
- **Gerar leads qualificados** através de design focado em conversão
- **Demonstrar expertise** em arquitetura contemporânea
- **Facilitar contato direto** via WhatsApp e formulários

## ✨ Características Principais

### 🎨 Design System

- **Paleta arquitetônica**: Verde moss, bege neutro e terracotta
- **Tipografia profissional**: Playfair Display + Inter
- **Layout responsivo** com foco mobile-first
- **Animação topográfica** como elemento diferenciador

### ⚡ Performance & Qualidade

- **Core Web Vitals** otimizados (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Lighthouse Score** > 95/100
- **Bundle otimizado** com redução de ~600 bytes (gzip)
- **Zero linter errors** - código limpo e consistente

### ♿ Acessibilidade

- **WCAG 2.1 AA** compliant
- **Navegação por teclado** completa
- **Screen readers** totalmente compatíveis
- **Contraste adequado** (4.5:1+) em todos os elementos

## 🚀 Tecnologias Utilizadas

| Tecnologia          | Propósito                        | Versão |
| ------------------- | -------------------------------- | ------ |
| **HTML5**           | Estrutura semântica e acessível  | -      |
| **CSS3**            | Design modular e responsivo      | -      |
| **JavaScript ES6+** | Interatividade moderna           | -      |
| **Vite**            | Build tool rápido e otimizado    | -      |
| **Canvas 2D**       | Animação topográfica customizada | -      |

## 🏁 Quick Start

### Pré-requisitos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### Instalação e Execução

```bash
# 1. Clonar o repositório
git clone <repository-url>
cd site_rafael-munaro-arquitetura

# 2. Instalar dependências
npm install

# 3. Executar em modo desenvolvimento
npm run dev

# 4. Abrir no navegador
# http://localhost:5173 (porta padrão do Vite)
```

### Comandos Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build local
npm run preview

# Verificar qualidade do código
npm run lint

# Formatar código automaticamente
npm run format
```

## 📁 Estrutura do Projeto

```
site_rafael-munaro-arquitetura/
├── 📚 docs/                      # Documentação completa
│   ├── 📄 README.md             # Este arquivo (visão geral)
│   ├── 🤖 AGENTS.md             # Guia para agentes de IA
│   ├── 📋 CHANGELOG.md          # Histórico de mudanças
│   ├── 📏 RULES.md              # Regras de desenvolvimento
│   └── 🏗️ ARCHITECTURE.md       # Arquitetura técnica
│
├── 💻 src/                       # Código fonte
│   ├── 🌐 index.html            # Versão antiga
│   ├── ✨ index-new.html        # ⭐ Novo design otimizado
│   │
│   ├── 🎨 assets/               # Recursos estáticos
│   │   ├── 🔤 fonts/           # Fontes customizadas
│   │   ├── 🎯 icons/           # Ícones SVG
│   │   └── 🖼️ images/          # Imagens otimizadas
│   │
│   ├── 📜 js/                   # JavaScript modular
│   │   ├── ⚙️ main.js           # Sistema principal ativo
│   │   ├── ✨ new-design.js     # Novo sistema de design
│   │   ├── 🗺️ topographic-background.js # Animação de fundo
│   │   └── 🔧 utils.js          # Utilitários
│   │
│   └── 🎨 styles/               # CSS modular
│       ├── 🎯 base.css          # Design tokens (CSS variables)
│       ├── 🧩 new-components.css # Componentes
│       ├── 📄 new-sections.css   # Seções da página
│       └── 📱 new-responsive.css # Responsividade
│
├── 📦 public/                   # Assets públicos
├── ⚙️ package.json              # Dependências e scripts
├── ⚡ vite.config.js            # Configuração do Vite
└── 🔧 Configurações diversas    # ESLint, Prettier, etc.
```

## 🗺️ Funcionalidades em Destaque

### ✨ Novo Design (Outubro 2025)

- **Animação Topográfica**: Background vivo com curvas de nível
- **Performance Otimizada**: 60fps garantidos com Canvas 2D
- **Princípios de UX**: Lei de Hick, F-Pattern, espaço em branco estratégico

### 🎯 Foco em Conversão

- **CTA Único por Seção**: Decisões mais rápidas
- **Storytelling Progressivo**: Narrativa que guia o usuário
- **Formulário Otimizado**: Captura leads qualificados

## 🤝 Como Contribuir

### 👥 Para Desenvolvedores

1. Leia o **[AGENTS.md](./AGENTS.md)** para configuração de ambiente
2. Siga as **[RULES.md](./RULES.md)** de desenvolvimento
3. Consulte a **[ARCHITECTURE.md](./ARCHITECTURE.md)** para decisões técnicas
4. Verifique o **[CHANGELOG.md](./CHANGELOG.md)** para histórico

### 🐛 Reportar Issues

- Use o template padrão do GitHub
- Descreva o problema com screenshots quando possível
- Sugira soluções quando identificadas

### 💡 Sugestões de Melhorias

- Abra uma **issue** descrevendo a proposta
- Discuta a viabilidade técnica
- Implemente seguindo os padrões estabelecidos

## 📞 Contato & Redes Sociais

### 📱 Informações de Contato

- **📞 WhatsApp**: (19) 99690-8104
- **📧 Email**: contato@rafaelmunaroarquitetura.com
- **🏢 Endereço**: Rua Padre Fabiano, 1072, Centro - Capivari/SP

### 🌐 Redes Sociais

- **📸 Instagram**: [@rafaelmunaro.arq](https://www.instagram.com/rafaelmunaro.arq/)
- **💼 LinkedIn**: [Rafael Soares Munaro](https://br.linkedin.com/in/rafael-soares-munaro)
- **📘 Facebook**: [Rafael Munaro](https://www.facebook.com/rafael.munaro.2025)

## 📚 Documentação Adicional

| Documento                                   | Conteúdo                 | Público                |
| ------------------------------------------- | ------------------------ | ---------------------- |
| **[🤖 AGENTS.md](./AGENTS.md)**             | Setup para agentes de IA | Desenvolvedores        |
| **[📋 CHANGELOG.md](./CHANGELOG.md)**       | Histórico completo       | Todos                  |
| **[📏 RULES.md](./RULES.md)**               | Regras de código         | Desenvolvedores        |
| **[🏗️ ARCHITECTURE.md](./ARCHITECTURE.md)** | Arquitetura técnica      | Arquitetos de Software |

## 🛣️ Roadmap

### 🔥 Próximas Prioridades

- [ ] **Imagens reais** substituindo placeholders
- [ ] **Backend** para formulário de contato
- [ ] **Google Analytics 4** configurado
- [ ] **Favicon completo** (todos os tamanhos)

### 💡 Melhorias Planejadas

- [ ] **Blog** com CMS integrado
- [ ] **Depoimentos** de clientes
- [ ] **Modo escuro** opcional
- [ ] **PWA** (Progressive Web App)

---

## 📄 Licença

© 2025 **Rafael Munaro Arquitetura**.

**Desenvolvido com ❤️ e foco em arquitetura excepcional** 🏛️
