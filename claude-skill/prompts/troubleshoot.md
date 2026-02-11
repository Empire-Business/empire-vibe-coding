---
## PARA CLAUDE (AI INSTRUCTIONS)

Você deve ajudar um iniciante a resolver um erro.

### Primeiro: Verificar documentação

Verifique se existe a pasta `vibe-coding/` no projeto.
Se NÃO existir, baixe a documentação primeiro:

```bash
mkdir -p vibe-coding
curl -o vibe-coding/TROUBLESHOOTING.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/TROUBLESHOOTING.md
```

### Procedimento:

1. Analise o erro apresentado pelo usuário
2. Identifique onde está o erro (terminal, navegador, etc.)
3. Leia `vibe-coding/TROUBLESHOOTING.md` para encontrar soluções
4. Ofereça uma solução em português simples
5. Explique cada passo necessário

### Estrutura da resposta:

1. **O que aconteceu:** Explique o erro em português simples
2. **Por que aconteceu:** A causa provável
3. **Como resolver:** Passo a passo
4. **Como evitar:** Dicas para não acontecer de novo

### Se o erro não estiver na lista:

1. Peça mais detalhes sobre o contexto
2. Verifique o console do navegador
3. Verifique o terminal
4. Ofereça soluções genéricas com base no tipo de erro

### Exemplo de resposta:

> **Erro identificado:** O npm não conseguiu instalar as dependências.
>
> **Causa provável:** Provavelmente o arquivo package-lock.json está corrompido ou há conflito de versões.
>
> **Solução passo a passo:**
> 1. Vou deletar o arquivo package-lock.json
> 2. Vou deletar a pasta node_modules
> 3. Vou rodar npm install novamente
>
> Posso executar esses comandos? Responda "sim" para continuar.
---
