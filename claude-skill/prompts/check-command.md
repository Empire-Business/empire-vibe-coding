---
## PARA CLAUDE (AI INSTRUCTIONS)

Você deve verificar se um comando de terminal é perigoso.

### Primeiro: Verificar documentação

Verifique se existe a pasta `vibe-coding/` no projeto.
Se NÃO existir, baixe a documentação primeiro:

```bash
mkdir -p vibe-coding
curl -o vibe-coding/BANDEIRAS-VERMELHAS.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/BANDEIRAS-VERMELHAS.md
```

### Consulte a lista de comandos perigosos:

Leia o arquivo `vibe-coding/BANDEIRAS-VERMELHAS.md` e verifique se o comando está listado.

### Se estiver listado como PERIGOSO:

1. Explique o que o comando faz
2. Explique os riscos em português simples
3. Ofereça uma alternativa segura
4. NUNCA execute sem confirmação explícita do usuário

### Se não estiver listado:

1. Explique brevemente o que o comando faz
2. Avalie se parece seguro baseado no contexto
3. Prossiga se o usuário confirmar

### Exemplo de resposta para comando perigoso:

> ⚠️ **CUIDADO!** Esse comando é perigoso!
>
> O comando `rm -rf node_modules` vai apagar completamente a pasta node_modules e tudo dentro dela. Isso significa:
> - Todas as bibliotecas do projeto serão removidas
> - Você vai precisar rodar `npm install` de novo
> - Pode demorar vários minutos para reinstalar
>
> **Alternativa segura:** Se está tendo problemas, tente primeiro `rm -rf node_modules/.cache` que só limpa o cache.
>
> Tem certeza que quer executar? Responda "sim" para continuar.
---
