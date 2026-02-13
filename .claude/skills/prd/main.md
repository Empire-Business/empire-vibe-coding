---
trigger: "*prd"
aliases: ["*requisitos", "*requirements"]
---

# Skill: prd

## Propósito

Criar o documento de requisitos do projeto (PRD - Product Requirements Document).

Este é o **PRIMEIRO** documento que deve ser criado em qualquer projeto.

---

## Comportamento

Quando o usuário executar `*prd`, você deve:

### 1. Verificar se já existe PRD

Procure em:
- `docs/PRD.md`
- `docs/requisitos.md`
- `docs/prd.md`

Se existir:
```
PRD já existe em docs/PRD.md

Deseja:
1. Ver o PRD atual
2. Atualizar o PRD
3. Criar novo PRD (sobrescrever)
```

### 2. Fazer perguntas de entendimento (máx. 5)

Pergunte APENAS o que muda decisões:

```
Para criar um bom PRD, preciso entender algumas coisas:

1. O que você quer construir? (ideia principal)
2. Para quem é? (quem vai usar)
3. Qual problema resolve? (a dor principal)
4. Plataforma? (web, mobile, desktop)
5. Tem prazo ou restrições?

Responda o que puder, posso fazer suposições para o resto.
```

### 3. Se não houver resposta, usar suposições

```
Se você não souber responder alguma pergunta, não tem problema!
Vou criar o PRD com suposições razoáveis.
Você pode ajustar depois.
```

---

## Estrutura do PRD

Siga a estrutura do protocolo `vibe-coding/PROTOCOLOS/18-PRD.md`:

### Seções Obrigatórias

```markdown
# PRD: [Nome do Projeto]

| Campo | Valor |
|-------|-------|
| **One-liner** | [Uma frase descrevendo] |
| **Owner** | [Responsável] |
| **Status** | Draft |
| **Data** | [Data de hoje] |

---

## 1. Resumo para Leigos
[Explicação simples, sem jargão técnico]

## 2. Contexto e Problema
[Dor do usuário e impacto]

## 3. Objetivos e Sucesso
[O que queremos alcançar e como medir]

## 4. Usuários e Personas
[Quem vai usar]

## 5. Escopo e Priorização
[MUST/SHOULD/COULD/WON'T]

## 6. Fluxos de Usuário
[Happy path e alternativos]

## 7. Requisitos Funcionais
[O que o sistema deve fazer]

## 8. Requisitos Não-Funcionais
[Performance, segurança, etc]

## 9. UX Notes
[Considerações de interface]

## 10. Dados e Modelo
[Entidades principais]

## 11. Integrações e APIs
[APIs externas necessárias]

## 12. Analytics
[Eventos para tracking]

## 13. Segurança e Compliance
[Requisitos de segurança]

## 14. Plano de Lançamento
[Rollout e fases]

## 15. Riscos e Mitigações
[Riscos identificados]

## 16. Critérios de Aceitação
[Como testar]

## 17. Roadmap e Estimativas
[Fases e timing]

## 18. Matriz de Rastreabilidade
[Objetivo → KPI → FR → AC]

## 19. Suposições e Perguntas Abertas
[O que assumimos]

## 20. Próximos Passos
[Ações concretas]
```

---

## Detecção Automática de APIs

Durante a criação do PRD, identifique menções a serviços externos:

```
Palavras-chave → APIs prováveis:
- "pagamento", "cartão" → Stripe, Mercado Pago
- "login social", "Google login" → Auth0, Clerk
- "email", "newsletter" → SendGrid, Resend
- "IA", "GPT", "gerar texto" → OpenAI, Anthropic
- "mapa", "localização" → Google Maps
- "SMS", "WhatsApp" → Twilio
- "upload", "imagens" → AWS S3, Cloudflare R2
```

Se detectar APIs, criar seção:

```markdown
## APIs Detectadas

⚠️ Execute *api [nome] para cada API ANTES de desenvolver:

- [ ] *api stripe - Documentar Stripe
- [ ] *api openai - Documentar OpenAI
```

---

## Salvar o Documento

Sempre salve em: `docs/PRD.md`

Crie a pasta `docs/` se não existir.

---

## Após Criar o PRD

### 1. Mostrar resumo

```
✅ PRD criado com sucesso!

Arquivo: docs/PRD.md

Resumo:
- [X] seções preenchidas
- [X] APIs detectadas
- [X] Suposições feitas
```

### 2. Orientar próximo passo

```
Próximo passo:
Execute *arquitetura para definir como vamos construir tecnicamente.
```

### 3. Oferecer revisão

```
Quer que eu revise alguma seção do PRD?
Ou quer ir direto para *arquitetura?
```

---

## Valores Default

Use estes valores quando não tiver informação:

| Item | Default |
|------|---------|
| Plataforma | Web responsivo |
| Auth | Email + OAuth (Google) |
| Roles | Admin, Member, Viewer |
| API p95 | < 300ms |
| LCP p95 | < 2.5s |
| SLO | 99.5% |
| Acessibilidade | WCAG 2.1 AA |

---

## Referências

- Protocolo completo: `vibe-coding/PROTOCOLOS/18-PRD.md`
- Glossário: `vibe-coding/GLOSSARIO.md`
