## ⚠️ REGRA OBRIGATÓRIA PARA LLMs

**ATENÇÃO - REGRA ABSOLUTA E EXCLUSIVA**

Toda vez que uma LLM (como você) realizar **QUALQUER** alteração e/ou atualização no código, os documentos nesta pasta `docs/` devem ser **OBRIGATORIAMENTE** atualizados conforme as mudanças implementadas.

### 📋 Protocolo Obrigatório:

1. **Documentar mudanças no código** → Atualizar `docs/ARCHITECTURE.md` (ADRs)
2. **Atualizar funcionalidades** → Atualizar `docs/CHANGELOG.md` (versionamento)
3. **Modificar regras/padrões** → Atualizar `docs/RULES.md` (convenções)
4. **Alterar estrutura/setup** → Atualizar `docs/AGENTS.md` (configuração)
5. **Mudar visão geral** → Atualizar `docs/README.md` (apresentação)

### 🚨 Penalidades por Não Conformidade:
- Código não poderá ser considerado "completo" sem documentação atualizada
- Pull requests serão rejeitados sem documentação correspondente
- Qualidade do projeto será comprometida

---

Pasta `docs` com informação objetiva e propósito de cada um dos arquivos:

## 📚 1. README.md

**O que é**: Arquivo principal de apresentação do projeto, servindo como ponto de entrada para qualquer pessoa interessada no site de Rafael Munaro Arquitetura.

**Para que serve**: Fornecer visão geral completa do projeto, desde objetivos até roadmap, funcionando como documentação inicial para stakeholders, desenvolvedores e clientes.

**Quando usar**:

- Primeiro contato com o projeto
- Apresentar o trabalho para novos colaboradores
- Compartilhar informações do projeto com terceiros
- Revisar objetivos e escopo do projeto

**Conteúdo principal**:

- Descrição do projeto e objetivos
- Tecnologias utilizadas
- Características principais (design system, performance, acessibilidade)
- Instruções de instalação e uso
- Informações de contato e redes sociais
- Roadmap de desenvolvimento

**O que devo saber**: É o documento mais acessível, escrito em português brasileiro, focado em arquitetura contemporânea. Atualização frequente com métricas de performance.

## 🤖 2. AGENTS.md

**O que é**: Guia específico para agentes de IA (como voce) que trabalham no projeto, seguindo o padrão "AGENTS.md" usado por mais de 20.000 projetos open-source.

**Para que serve**: Padronizar como agentes de IA devem interagir com o código, garantindo consistência nas contribuições automatizadas e evitando conflitos.

**Quando usar**:

- Antes de qualquer modificação no código por IA
- Para entender padrões de desenvolvimento do projeto
- Quando configurar novos agentes ou ferramentas automatizadas
- Para garantir compliance com regras estabelecidas

**Conteúdo principal**:

- Setup commands completos (dev, build, lint, etc.)
- Code style obrigatório (HTML, CSS, JavaScript)
- Project structure detalhada
- Architecture guidelines (design system, performance, acessibilidade)
- Notas importantes sobre utilitários centralizados

**O que devo saber**: Documento técnico, obrigatório para qualquer automação. Contém regras críticas sobre imports centralizados (v2.1.0) e sistema topográfico de performance crítica e deve sempre ser atualizado pela LLM conforme alterações no codigo.

## 🏗️ 3. ARCHITECTURE.md

**O que é**: Documento de Architectural Decision Records (ADRs) seguindo padrão MADR, registrando decisões técnicas significativas do projeto.

**Para que serve**: Preservar conhecimento sobre decisões arquiteturais, justificar escolhas técnicas e guiar futuras evoluções do sistema.

**Quando usar**:

- Antes de tomar decisões arquiteturais importantes
- Para entender o "porquê" das escolhas técnicas atuais
- Quando propor mudanças que afetem a arquitetura
- Para onboarding de novos arquitetos/desenvolvedores seniores

**Conteúdo principal**:

- Visão geral da arquitetura (5 ADRs principais)
- Design system completo (tokens CSS, BEM, paleta de cores)
- Stack tecnológico detalhada
- Sistema de animação topográfica (Canvas 2D)
- Métricas de qualidade e performance

**O que devo saber**: Documento técnico avançado em português, com decisões documentadas desde outubro 2025. Foca em performance crítica (60fps garantido) e acessibilidade WCAG 2.1 AA e deve sempre ser atualizado pela LLM conforme alterações no codigo.

## 📋 4. CHANGELOG.md

**O que é**: Histórico completo de mudanças seguindo padrão Keep a Changelog e Semantic Versioning.

**Para que serve**: Rastrear evolução do projeto, comunicar mudanças para usuários/equipe e facilitar debugging de problemas introduzidos em versões específicas.

**Quando usar**:

- Para entender o que mudou entre versões
- Antes de atualizar dependências ou fazer deploy
- Quando investigar bugs ou comportamentos inesperados
- Para comunicar mudanças para stakeholders

**Conteúdo principal**:

- Histórico versionado (1.0.0, 2.0.0, 2.1.0)
- Mudanças categorizadas (feat, fix, refactor, etc.)
- Breaking changes documentados
- Métricas de melhoria mensuráveis
- Próximas funcionalidades planejadas

**O que devo saber**: Atualizado constantemente, mostra evolução desde outubro 2025. Destaque para v2.1.0 (eliminação de duplicações) e v2.0.0 (redesign completo). Inclui roadmap não implementado e deve sempre ser atualizado pela LLM conforme alterações no codigo.

## 📏 5. RULES.md

**O que é**: Guia abrangente de desenvolvimento contendo todas as regras, padrões e convenções obrigatórias do projeto.

**Para que serve**: Garantir consistência técnica, qualidade de código e compliance com padrões estabelecidos em todos os aspectos do desenvolvimento.

**Quando usar**:

- Antes de escrever qualquer código
- Durante code reviews
- Para resolver dúvidas sobre padrões
- Quando implementar novas funcionalidades
- Para onboarding de novos desenvolvedores

**Conteúdo principal**:

- Convenções completas (HTML, CSS, JavaScript, commits)
- Arquitetura de arquivos obrigatória
- Regras de performance, acessibilidade e segurança
- Anti-padrões proibidos
- Checklists de desenvolvimento e code review

**O que devo saber**: Documento mais extenso (~25 seções), obrigatório para todos os desenvolvedores. Contém regras "always applied" que são críticas para o projeto. Atualizado para outubro 2025, com foco especial na centralização de utilitários (v2.1.0) e deve sempre ser atualizado pela LLM conforme alterações no codigo.
