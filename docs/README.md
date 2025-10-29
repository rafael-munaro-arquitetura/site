# 📚 Documentação - Site Rafael Munaro Arquitetura

> Site institucional profissional com design minimalista focado em conversão e UX otimizado.

## 📋 Sobre o Projeto

**Rafael Munaro Arquitetura** - Arquiteto especializado em projetos residenciais, comerciais e design de interiores.

### 🎯 Objetivo do Site
- Apresentar portfólio profissional
- Gerar leads qualificados
- Demonstrar expertise e diferencial
- Facilitar contato direto

### 👤 Profissional
- **Nome:** Rafael Soares Munaro
- **Especialidade:** Arquitetura Contemporânea
- **Atuação:** Capivari, Santa Bárbara d'Oeste, Americana, Piracicaba (DDD 19)

## 📞 Informações de Contato

- **WhatsApp:** (19) 99690-8104
- **Email:** contato@rafaelmunaroarquitetura.com
- **Endereço:** Rua Padre Fabiano, 1072, Centro - Capivari/SP
- **Instagram:** [@rafaelmunaro.arq](https://www.instagram.com/rafaelmunaro.arq/)
- **LinkedIn:** [Rafael Soares Munaro](https://br.linkedin.com/in/rafael-soares-munaro)
- **Facebook:** [Rafael Munaro](https://www.facebook.com/rafael.munaro.2025)

## 🎨 Identidade Visual

### Paleta de Cores
```css
--color-moss: #545943          /* Verde principal */
--color-moss-light: #9BA187    /* Verde claro */
--color-beige: #E8DACB         /* Neutro */
--color-terracotta: #B66C48    /* Destaque */
--color-terracotta-dark: #8C421E /* Acento */

## 🎯 Público-Alvo

### 👥 Desenvolvedores

- Como configurar o ambiente de desenvolvimento
- Convenções de código e padrões
- Como contribuir para o projeto
- Debugging e troubleshooting

### 👔 Arquitetos de Software

- Decisões técnicas e justificativas
- Estrutura do sistema
- Estratégias de escalabilidade
- Padrões de qualidade

### 👨‍💼 Stakeholders

- Visão geral do projeto
- Funcionalidades implementadas
- Roadmap e próximas features
- Métricas de performance

## 📋 Convenções da Documentação

### Estrutura dos Documentos

````
# Título Principal

## Seção Principal
### Subseção
#### Sub-subseção

Código inline: `comando`

Bloco de código:
```language
código aqui
````

> 💡 **Dica:** Informações importantes
> ⚠️ **Atenção:** Cuidados necessários
> ❌ **Não faça:** Erros comuns

````

### Terminologia
- **DEVE/DEVE NÃO**: Requisitos obrigatórios
- **DEVE/PODERIA**: Recomendações fortes
- **PODE**: Opções disponíveis
- **NÃO DEVE**: Antí-padrões

```

### Filosofia
- Elegância minimalista
- Hierarquia visual clara
- Foco em conversão

## 🚀 Tecnologias

- **HTML5** - Semântico e acessível
- **CSS3** - Design modular e responsivo
- **JavaScript ES6+** - Interatividade moderna
- **Vite** - Build tool rápido
- **Playfair Display + Inter** - Tipografia profissional

## 🏁 Quick Start

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview build
npm run preview
```

### Pré-requisitos
- Node.js >= 16.0.0
- npm >= 8.0.0

## 📁 Estrutura do Projeto

```
site_rafael-munaro-arquitetura/
├── docs/               # Documentação
│   ├── README.md      # Este arquivo
│   ├── AGENTS.md      # Agentes de IA
│   ├── CHANGELOG.md   # Histórico de mudanças
│   ├── RULES.md       # Regras e convenções
│   └── ARCHITECTURE.md # Arquitetura técnica
├── src/
│   ├── index.html     # Página principal (antigo)
│   ├── index-new.html # ⭐ Novo design otimizado
│   ├── assets/        # Imagens, fontes, ícones
│   ├── js/
│   │   ├── main.js    # JavaScript antigo
│   │   └── new-design.js # ⭐ Novo sistema
│   └── styles/
│       ├── base.css   # ⭐ Design tokens
│       ├── new-components.css # ⭐ Componentes
│       ├── new-sections.css   # ⭐ Seções
│       └── new-responsive.css # ⭐ Responsivo
└── package.json
```

## ✨ Novo Design (Outubro 2025)

### Arquivos Principais
- **HTML:** `src/index-new.html`
- **CSS:** `src/styles/base.css` + módulos `new-*`
- **JS:** `src/js/new-design.js` + `topographic-background.js`

### Funcionalidades
- 🗺️ **Animação Topográfica**: Background com curvas de nível que se desenham gradualmente
- ⚡ **Performance**: 60fps com Canvas 2D otimizado
- ♿ **Acessibilidade**: WCAG 2.1 AA + respeito a `prefers-reduced-motion`

### Princípios
1. **Lei de Hick** - Menos escolhas = decisões rápidas
2. **F-Pattern** - Layout natural de leitura
3. **Espaço em Branco** - 70% respiração visual
4. **CTA Único** - Uma ação por seção
5. **Storytelling** - Narrativa progressiva

## 📊 Performance

### Core Web Vitals (Metas)
- **LCP** < 2.5s
- **FID** < 100ms  
- **CLS** < 0.1
- **Lighthouse** > 95/100

### Otimizações
- Lazy loading de imagens
- CSS modular otimizado
- JavaScript com debounce/throttle
- IntersectionObserver para animações

## ♿ Acessibilidade

- ✅ WCAG 2.1 AA compliant
- ✅ Navegação por teclado
- ✅ Screen reader friendly
- ✅ Contraste 4.5:1+
- ✅ ARIA labels completos

## 📚 Documentação Adicional

- **[AGENTS.md](./AGENTS.md)** - Configuração de agentes de IA
- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de mudanças
- **[RULES.md](./RULES.md)** - Regras de desenvolvimento
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura técnica

## 📝 Próximos Passos

- [ ] Substituir imagens placeholder por reais
- [ ] Conectar formulário com backend
- [ ] Implementar Google Analytics
- [ ] Adicionar mais projetos ao portfólio
- [ ] A/B testing de CTAs

---

© 2025 Rafael Munaro Arquitetura. Todos os direitos reservados.

**Desenvolvido com foco em conversão e experiência excepcional** ✨
