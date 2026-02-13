---
trigger: "*api"
aliases: ["*apis"]
---

# Skill: api

## Propósito

Documentar APIs externas ANTES de integrar com o projeto.

**IMPORTANTE:** Sempre execute `*api [nome]` antes de desenvolver qualquer integração.

---

## Comportamento

Quando o usuário executar `*api`, você deve:

### 1. Perguntar qual API

```
Documentação de APIs Externas

Qual API você quer documentar?

Exemplos comuns:
- stripe (pagamentos)
- openai (IA)
- sendgrid (email)
- twilio (SMS)
- google-maps (mapas)
- auth0 (autenticação)

Digite o nome da API: *
```

### 2. Pesquisar a API

Use WebSearch para encontrar:
- Documentação oficial
- SDKs disponíveis
- Exemplos de uso
- Limites e pricing

### 3. Criar documentação

Salve em: `docs/APIS-DOCS/[nome-api].md`

---

## Estrutura da Documentação

```markdown
# API: [Nome da API]

| Campo | Valor |
|-------|-------|
| **Categoria** | [Pagamento/Email/IA/etc] |
| **Status** | [Pendente/Em análise/Integrada] |
| **Data** | [Data de hoje] |

---

## 1. Visão Geral

### O que é
[Breve descrição do que a API faz]

### Quando usar
[Casos de uso no projeto]

### Alternativas
| Alternativa | Prós | Contras |
|-------------|------|---------|
| [Opção] | [+] | [-] |

---

## 2. Setup

### Conta
1. Acesse [URL]
2. Crie conta
3. Configure [passos]

### Variáveis de Ambiente
```bash
# .env
[NOME]_API_KEY=sua-chave-aqui
[NOME]_SECRET=seu-secret-aqui
```

### Instalação
```bash
npm install [pacote]
```

---

## 3. Autenticação

### Método
[Como autenticar]

### Exemplo
```javascript
import { Client } from '[sdk]'

const client = new Client({
  apiKey: process.env.[NOME]_API_KEY,
})
```

---

## 4. Endpoints Principais

### [Endpoint 1]
```javascript
// Descrição
const result = await client.endpoint1({
  param1: 'valor',
})

// Response
{
  "id": "123",
  "status": "success"
}
```

### [Endpoint 2]
[Outro endpoint importante]

---

## 5. Webhooks

### Eventos disponíveis
| Evento | Quando dispara |
|--------|----------------|
| [evento] | [condição] |

### Endpoint para receber
```typescript
// app/api/webhooks/[nome]/route.ts
export async function POST(request: Request) {
  const payload = await request.json()

  // Processar webhook

  return Response.json({ received: true })
}
```

---

## 6. Rate Limits

| Plano | Requisções/min | Requisções/mês |
|-------|----------------|----------------|
| Free | X | Y |
| Pro | X | Y |

### Tratamento
```javascript
// Implementar retry com backoff
async function apiCall(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (error.status === 429) {
        await sleep(1000 * Math.pow(2, i))
        continue
      }
      throw error
    }
  }
}
```

---

## 7. Custos

| Recurso | Custo |
|---------|-------|
| [Item] | $X/unidade |

### Estimativa mensal
- [Cenário 1]: $X/mês
- [Cenário 2]: $Y/mês

---

## 8. Erros Comuns

| Código | Significado | Solução |
|--------|-------------|---------|
| 400 | Bad Request | Verificar payload |
| 401 | Unauthorized | Verificar API key |
| 429 | Rate Limited | Aguardar e retry |

---

## 9. Exemplos de Uso

### Caso 1: [Descrição]
```javascript
// Código completo de exemplo
```

### Caso 2: [Descrição]
```javascript
// Outro exemplo
```

---

## 10. SDKs e Bibliotecas

### Oficial
- Node.js: [npm package]
- Python: [pip package]

### Comunidade
- [Bibliotecas úteis]

---

## 11. Checklist de Integração

- [ ] Conta criada
- [ ] API keys configuradas no .env
- [ ] SDK instalado
- [ ] Cliente configurado
- [ ] Testes básicos passando
- [ ] Webhooks configurados (se necessário)
- [ ] Tratamento de erros implementado
- [ ] Retry/backoff implementado
- [ ] Custos estimados
- [ ] Documentado em PRD

---

## 12. Referências

- Documentação oficial: [URL]
- Status page: [URL]
- Changelog: [URL]
```

---

## Após Documentar

```
✅ API documentada!

Arquivo: docs/APIS-DOCS/[nome].md

Resumo:
- [X] Setup documentado
- [X] Endpoints principais mapeados
- [X] Rate limits verificados
- [X] Custos estimados
- [X] Checklist de integração

Próximo passo:
Adicione as variáveis de ambiente ao .env e
integre no código quando estiver pronto.
```

---

## Detecção Automática

Durante `*prd`, detectar APIs automaticamente:

```
Palavras-chave → APIs prováveis:
- "pagamento" → Stripe, Mercado Pago
- "email" → SendGrid, Resend
- "IA" → OpenAI, Anthropic
- "mapa" → Google Maps
- "SMS" → Twilio
```

---

## Referências

- Protocolo: `vibe-coding/PROTOCOLOS/19-API.md`
- PRD: `vibe-coding/PROTOCOLOS/18-PRD.md`
