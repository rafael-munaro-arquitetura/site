# 🤖 Agentes de IA

Configuração e diretrizes para agentes de IA que auxiliam no desenvolvimento do projeto.

## 🞯 Visão Geral

Agentes de IA são utilizados para:
- Análise e otimização de código
- Geração de documentação
- Sugestões de melhorias
- Implementação de funcionalidades

## 🤖 Perfis de Agentes

### 💻 Desenvolvedor

**Responsabilidades:**
- Implementação de funcionalidades
- Refatoração de código
- Correção de bugs
- Otimizações de performance

**Permissões:**
- ✅ Leitura/escrita de código fonte
- ✅ Criação de componentes
- ✅ Modificação de estilos
- ❌ Deploy em produção

### 📚 Documentador

**Responsabilidades:**
- Documentação técnica
- Atualização de guides
- Manutenção do CHANGELOG
- Criação de exemplos

**Permissões:**
- ✅ Leitura de código
- ✅ Escrita em docs/
- ❌ Modificação de src/

### 🔍 Revisor

**Responsabilidades:**
- Análise de código
- Validação de padrões
- Auditoria de qualidade
- Sugestões de melhorias

**Permissões:**
- ✅ Leitura de tudo
- ✅ Geração de relatórios
- ❌ Modificação de arquivos

## 🛡️ Diretrizes Obrigatórias

### Princípios de Segurança

1. **Menor Privilégio**
   - Agentes têm apenas permissões necessárias
   - Revisão manual para mudanças críticas

2. **Auditoria**
   - Todas as mudanças são logáveis
   - Revisão periódica de permissões

3. **Validação**
   - Testes antes de commit
   - Lint e format automáticos
   - Code review obrigatório

### Regras de Desenvolvimento

**DEVE:**
- Seguir convenções do RULES.md
- Manter compatibilidade com navegadores
- Priorizar acessibilidade (WCAG 2.1 AA)
- Documentar mudanças no CHANGELOG.md
- Adicionar comentários em código complexo

**NÃO DEVE:**
- Commitar secrets ou tokens
- Usar `console.log` em produção
- Ignorar erros de lint
- Fazer deploy sem testes
- Modificar arquivos de config sem revisão

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Development
NODE_ENV=development

# Agent Mode
AGENT_MODE=assistant
AGENT_LOG=verbose
```

### Níveis de Acesso

| Nível | Descrição | Ações |
|-------|-----------|---------|
| **Leitura** | Apenas consulta | Revisor |
| **Escrita** | Modificação de arquivos | Documentador |
| **Completo** | Acesso total | Desenvolvedor |

## 📊 Métricas de Qualidade

### KPIs Monitorados

- **Code Quality**: ESLint score, complexidade
- **Performance**: Lighthouse scores, bundle size
- **Accessibility**: WCAG compliance
- **Tests**: Coverage, pass rate
- **Documentation**: Completude, atualidade

## 📝 Exemplos de Uso

### Solicitando Implementação

```markdown
**Contexto**: Página de contato precisa de validação
**Tarefa**: Implementar validação de formulário
**Requisitos**:
- Validar email format
- Validar telefone (opcional)
- Feedback visual em tempo real
- Acessibilidade WCAG AA
```

### Solicitando Documentação

```markdown
**Contexto**: Nova funcionalidade de lazy loading
**Tarefa**: Documentar uso e configuração
**Incluir**:
- Exemplo de código
- Parâmetros disponíveis
- Casos de uso
- Troubleshooting
```

### Solicitando Revisão

```markdown
**Contexto**: PR #123 pronto para review
**Focar em**:
- Performance impact
- Acessibilidade
- Código duplicado
- Testes unitários
```

---

**Última atualização:** Outubro 2025  
**Versão:** 2.0.0  
**Responsável:** Equipe de Desenvolvimento
