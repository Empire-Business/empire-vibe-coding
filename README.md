# Vibe Coding Docs - Guia para Iniciantes

Documentação completa para desenvolvimento com IA (vibe coding) sem necessidade de conhecimento prévio de programação.

## O que é Vibe Coding?

Vibe coding é quando você usa uma IA (como Claude) para desenvolver software, sem precisar entender toda a complexidade técnica. Você descreve o que quer em linguagem simples, e a IA escreve o código para você.

## Como Começar

### Opção 1: Via Claude Code Skill (Recomendado)

Instale a skill no seu Claude Code:

```bash
# (Comando de instalação será definido)
```

### Opção 2: Acessar Versão Web

Acesse o site interativo: [https://empire-vibe-coding.vercel.app](https://empire-vibe-coding.vercel.app)

### Opção 3: Copiar Manualmente

1. Clone este repositório
2. Copie a pasta `docs/` para seu projeto
3. Siga o guia em `docs/README.md`

## Documentação Incluída

- **Guia do Iniciante:** Termos técnicos explicados de forma simples
- **Protocolos de Desenvolvimento:** Fluxo de trabalho diário
- **Segurança:** Como manter seu projeto seguro
- **Troubleshooting:** O que fazer quando der erro
- **Arquitetura:** Como organizar o código
- **Design:** Como construir interfaces bonitas

## Estrutura do Repositório

```
empire-vibe-coding/
├── docs/                          # Documentação completa
│   ├── README.md                    # Guia principal
│   ├── GUIA-DO-INICIANTE.md        # Glossário
│   ├── BANDEIRAS-VERMELHAS.md      # Comandos perigosos
│   ├── TROUBLESHOOTING.md           # Solução de erros
│   ├── PROTOCOLOS/                 # Guias de processo
│   ├── ARQUITETURA/                # Arquitetura
│   ├── DESIGN/                     # Design system
│   ├── SEGURANCA/                  # Segurança
│   └── QUALIDADE/                 # Qualidade de código
│
├── web/                           # App web Next.js
│   ├── app/                        # Páginas
│   ├── components/                  # Componentes React
│   ├── lib/                        # Utilitários
│   └── public/                     # Arquivos estáticos
│
└── claude-skill/                   # Claude Code Skill
    ├── skill.yaml                   # Definição do skill
    └── prompts/                    # Prompts do skill
```

## Desenvolvimento Local

### Rodar o App Web Localmente

```bash
npm install
npm run web:dev
```

### Scripts Disponíveis

```bash
npm run web:dev       # Rodar o app web em modo desenvolvimento
npm run web:build     # Build para produção
npm run web:start     # Rodar o build de produção
```

## Contribuindo

Este é um projeto open source. Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

MIT License - Uso livre para todos os fins.

---

Criado por **Empire Business** 🏗️
