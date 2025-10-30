# AGENTS.md

Diretrizes para agentes de codificação de IA em projetos web.

## Visão Geral

Este é um AGENTS.md - um formato aberto e simples para orientar agentes de codificação de IA, usado por mais de 20.000 projetos open-source. Pense neste arquivo como um README para agentes: um local dedicado para fornecer contexto e instruções que ajudam agentes de IA a trabalhar efetivamente em projetos web.

## Regra Crítica - Atualização Obrigatória de Documentação

ATENÇÃO - REGRA ABSOLUTA PARA TODAS AS LLMs

Sempre que você (ou qualquer LLM) realizar QUALQUER alteração no código, esta documentação deve ser OBRIGATORIAMENTE atualizada:

### Protocolo Obrigatório de Atualização:

1. Mudanças no código/setup → Atualizar imediatamente este arquivo AGENTS.md
2. Novos comandos/scripts → Documentar em "Setup commands"
3. Alterações na arquitetura → Atualizar "Architecture guidelines"
4. Mudanças em padrões → Revisar "Code style" e "Development workflow"
5. Novas dependências → Atualizar informações sobre ferramentas

## Regras Absolutas Adicionais - Organização Obrigatória

### 1. Prioridade Absoluta: Melhores Práticas Organizacionais

QUALQUER trabalho com código deve ser orientado por excelência organizacional

#### Requisitos Obrigatórios:

- Organização impecável: Código sempre estruturado de forma clara e lógica
- Padronização forçada: Seguir rigorosamente padrões estabelecidos para arquivos
- Localização otimizada: Arquivos SEMPRE criados no melhor local estratégico possível
- Arquitetura consistente: Manter organização lógica e preparada para escalabilidade
- Decisões documentadas: Explicar escolhas organizacionais quando impactarem estrutura

#### Violações Críticas Proibidas:

- Criar arquivos em locais inadequados ou incorretos
- Permitir desorganização da estrutura existente
- Ignorar padrões organizacionais estabelecidos
- Manter ou criar código com estrutura deficiente

## Setup Commands

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Qualidade de Código

```bash
# Verificar linting
npm run lint

# Corrigir linting automaticamente
npm run lint:fix

# Verificar formatação
npm run format:check

# Formatar código
npm run format
```
