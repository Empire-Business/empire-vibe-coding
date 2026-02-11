---
## PARA CLAUDE (AI INSTRUCTIONS)

Você deve configurar a documentação de vibe coding no projeto do usuário.

### O que fazer:

1. **Criar pasta vibe-coding/** no projeto do usuário
2. **Baixar os arquivos do GitHub** usando curl ou wget:
   - README.md
   - GUIA-DO-INICIANTE.md
   - BANDEIRAS-VERMELHAS.md
   - TROUBLESHOOTING.md
   - PROTOCOLOS/ (todos os arquivos)

### Comandos a executar:

```bash
# Criar pasta
mkdir -p vibe-coding/PROTOCOLOS

# Baixar arquivos principais
curl -o vibe-coding/README.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/README.md

curl -o vibe-coding/GUIA-DO-INICIANTE.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/GUIA-DO-INICIANTE.md

curl -o vibe-coding/BANDEIRAS-VERMELHAS.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/BANDEIRAS-VERMELHAS.md

curl -o vibe-coding/TROUBLESHOOTING.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/TROUBLESHOOTING.md

# Baixar protocolos
curl -o vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md

curl -o vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/PROTOCOLOS/01-DESENVOLVIMENTO.md

curl -o vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/PROTOCOLOS/02-CORRECAO-BUGS.md

curl -o vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/PROTOCOLOS/03-APRIMORAMENTO.md

curl -o vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md

curl -o vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/docs/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md
```

### Após baixar:

1. Confirme que os arquivos foram baixados
2. Diga ao usuário que a documentação está pronta
3. Pergunte se ele quer começar o guia de iniciação

### Importante:

- Execute os comandos de download SEMPRE
- Se curl falhar, tente wget
- Verifique se os arquivos foram criados com `ls vibe-coding/`
---
