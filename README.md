# Empire Vibe Coding - Guia para Iniciantes

Documentação completa para desenvolvimento com IA (vibe coding) sem necessidade de conhecimento prévio de programação.

## O que é Vibe Coding?

Vibe coding é quando você usa uma IA (como Claude) para desenvolver software, sem precisar entender toda a complexidade técnica. Você descreve o que quer em linguagem simples, e a IA escreve o código para você.

## Instalação Rápida

Execute este comando na pasta do seu projeto:

```bash
curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
```

Isso cria:
- `CLAUDE.md` - Orquestrador com comandos `*`
- `vibe-coding/` - Documentação de referência
- `docs/` - Templates para documentar seu projeto

## Como Usar

1. Abra o terminal na pasta do seu projeto
2. Execute `claude` para iniciar o Claude Code
3. Digite `*começar` para iniciar um novo projeto
4. Use comandos como `*bug`, `*desenvolver`, `*termo` conforme precisar

## Versão Web

Acesse o site interativo: [https://empire-vibe-coding.vercel.app](https://empire-vibe-coding.vercel.app)

## Estrutura do Repositório

```
empire-vibe-coding/
├── vibe-coding/                   # Documentação de referência
│   ├── COMANDOS.md                # Lista de comandos *
│   ├── COMUNICACAO.md             # Regras de comunicação
│   ├── GLOSSARIO.md               # Termos técnicos explicados
│   ├── BANDEIRAS-VERMELHAS.md     # Comandos perigosos
│   ├── TROUBLESHOOTING.md         # Solução de erros
│   └── PROTOCOLOS/                # Guias de processo
│       ├── 00-INICIAR.md
│       ├── 01-DESENVOLVER.md
│       ├── 02-BUGS.md
│       ├── 03-MELHORAR.md
│       ├── 04-MANUTENCAO.md
│       └── 05-LANCAR.md
│
├── docs/                          # Documentação avançada
│   ├── ARQUITETURA/               # Arquitetura de software
│   ├── DESIGN/                    # Design system
│   ├── SEGURANCA/                 # Segurança
│   └── QUALIDADE/                 # Qualidade de código
│
├── web/                           # App web Next.js
│   ├── app/                       # Páginas
│   ├── components/                # Componentes React
│   └── lib/                       # Utilitários
│
└── install.sh                     # Script de instalação
```

## Desenvolvimento Local

### Rodar o App Web Localmente

```bash
cd web
npm install
npm run dev
```

O app estará disponível em http://localhost:3000

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

Criado por **Empire Business**
