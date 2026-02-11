import { Download, Terminal, CheckCircle, BookOpen, AlertTriangle, Wrench, Rocket, ArrowRight, ExternalLink, HelpCircle, RefreshCw, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const skills = [
  {
    id: 'start-guide',
    title: 'Guia de Início',
    description: 'Inicia o guia completo de vibe coding para iniciantes.',
    longDescription: 'Esta skill ativa o guia completo. O Claude baixa a documentação do GitHub (se necessário) e te guia passo a passo através do projeto.',
    icon: Rocket,
    color: 'bg-blue-100 text-blue-600',
    usage: '"quero começar um projeto", "me ajuda a desenvolver", "iniciar vibe coding"',
  },
  {
    id: 'ask-term',
    title: 'Explicar Termo',
    description: 'Explica um termo técnico com analogias do dia a dia.',
    longDescription: 'Pergunte qualquer termo técnico. O Claude baixa o glossário do GitHub e explica com analogias.',
    icon: BookOpen,
    color: 'bg-green-100 text-green-600',
    usage: '"o que é API?", "explique commit", "o que significa deploy?"',
  },
  {
    id: 'check-command',
    title: 'Verificar Comando',
    description: 'Verifica se um comando é perigoso antes de executar.',
    longDescription: 'Antes de executar comandos suspeitos, pergunte ao Claude. Ele baixa a lista de bandeiras vermelhas e te avisa.',
    icon: AlertTriangle,
    color: 'bg-orange-100 text-orange-600',
    usage: '"posso rodar rm -rf?", "esse comando é seguro?", "verifica antes de executar"',
  },
  {
    id: 'troubleshoot',
    title: 'Resolver Erro',
    description: 'Ajuda a resolver erros comuns passo a passo.',
    longDescription: 'Cole o erro e o Claude baixa o guia de troubleshooting do GitHub para te ajudar.',
    icon: Wrench,
    color: 'bg-purple-100 text-purple-600',
    usage: '"deu esse erro: [cole aqui]", "como resolvo isso?", "me ajuda com esse erro"',
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-700 rounded transition-colors"
      title="Copiar"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-gray-400" />
      )}
    </button>
  )
}

export default function SkillsPage() {
  const installCommand = 'curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Instalar Claude Skills</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Skills que dão superpoderes ao seu Claude Code para desenvolvimento com IA.
        </p>
      </div>

      {/* Como Funciona */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Como Funciona</h2>
        <div className="space-y-3 text-blue-800">
          <p><strong>1. Instale</strong> executando o comando abaixo (baixa skill + documentação)</p>
          <p><strong>2. Reinicie</strong> o Claude Code se estiver aberto</p>
          <p><strong>3. Use</strong> digitando "quero começar um projeto" no Claude</p>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
          Pré-requisitos
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Claude Code CLI</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Você precisa ter o Claude Code instalado.
                </p>
                <a
                  href="https://claude.ai/code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:underline text-sm"
                >
                  Baixar Claude Code
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Conta Anthropic</h3>
                <p className="text-gray-600 text-sm">
                  Necessária para usar o Claude Code.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">curl (já vem no Mac/Linux)</h3>
                <p className="text-gray-600 text-sm">
                  Necessário para executar o instalador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Download className="h-6 w-6 mr-2 text-primary-600" />
          Instalação
        </h2>

        <div className="bg-gray-900 rounded-2xl p-8 text-white mb-6">
          <div className="flex items-center mb-4">
            <Terminal className="h-6 w-6 mr-3 text-green-400" />
            <h3 className="text-xl font-semibold">Comando de Instalação</h3>
          </div>
          <p className="text-gray-300 mb-6">
            Execute no terminal, na pasta do seu projeto:
          </p>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
            <code className="text-green-400 break-all">
              {installCommand}
            </code>
            <CopyButton text={installCommand} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Isso instala a skill + toda a documentação de suporte.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">O que o instalador faz:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Cria <code className="bg-gray-100 px-1 rounded">.claude/skills/empire-vibe-coding/</code> com a skill
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Cria <code className="bg-gray-100 px-1 rounded">vibe-coding/</code> com toda documentação
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Baixa 6 protocolos + guias + glossário
            </li>
          </ul>
        </div>
      </section>

      {/* Alternative Installation Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Alternativas de Instalação</h2>

        <div className="space-y-4">
          {/* Option 1: Download then run */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Opção 1: Baixar e executar</h3>
            <p className="text-gray-600 mb-4">Se o comando único não funcionar, baixe o script primeiro:</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Passo 1 - Baixar:</p>
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm relative">
                  <code className="text-green-400">curl -O https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh</code>
                  <CopyButton text="curl -O https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Passo 2 - Executar:</p>
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm relative">
                  <code className="text-green-400">bash install.sh</code>
                  <CopyButton text="bash install.sh" />
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Manual with git */}
          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-6 cursor-pointer text-lg font-semibold text-gray-900 hover:bg-gray-50">
              Opção 2: Instalação Manual com Git
            </summary>
            <div className="px-6 pb-6 space-y-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">1. Clone o repositório:</p>
                <code className="block bg-gray-100 p-2 rounded">git clone https://github.com/Empire-Business/empire-vibe-coding.git</code>
              </div>
              <div>
                <p className="text-gray-600 mb-1">2. Crie as pastas necessárias:</p>
                <code className="block bg-gray-100 p-2 rounded">mkdir -p .claude/skills/empire-vibe-coding vibe-coding/PROTOCOLOS</code>
              </div>
              <div>
                <p className="text-gray-600 mb-1">3. Copie a skill:</p>
                <code className="block bg-gray-100 p-2 rounded">cp empire-vibe-coding/claude-skill/SKILL.md .claude/skills/empire-vibe-coding/</code>
              </div>
              <div>
                <p className="text-gray-600 mb-1">4. Copie a documentação:</p>
                <code className="block bg-gray-100 p-2 rounded">cp -r empire-vibe-coding/docs/* vibe-coding/</code>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Available Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">O que você ganha</h2>
        <div className="space-y-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <skill.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 mb-4">{skill.longDescription}</p>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Como usar (exemplos):</p>
                    <p className="text-gray-600 text-sm font-mono">{skill.usage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Files Created */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Estrutura Criada</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-4">Após a instalação, seu projeto terá:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre>{`seu-projeto/
├── .claude/
│   └── skills/
│       └── empire-vibe-coding/
│           └── SKILL.md              ← A skill do Claude
│
└── vibe-coding/                      ← Documentação de referência
    ├── README.md
    ├── GUIA-DO-INICIANTE.md
    ├── BANDEIRAS-VERMELHAS.md
    ├── TROUBLESHOOTING.md
    └── PROTOCOLOS/
        ├── 00-PLANEJAMENTO-INICIAL.md
        ├── 01-DESENVOLVIMENTO.md
        ├── 02-CORRECAO-BUGS.md
        ├── 03-APRIMORAMENTO.md
        ├── 04-MANUTENCAO-PROJETOS-PRONTOS.md
        └── 05-CHECKLIST-LANCAMENTO.md`}</pre>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Você pode editar esses arquivos para customizar as instruções do Claude.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <HelpCircle className="h-6 w-6 mr-2 text-gray-700" />
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Funciona no Windows?</h3>
            <p className="text-gray-600 text-sm">
              Sim! Use WSL (Windows Subsystem for Linux) ou Git Bash. O comando curl funciona em ambos.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Posso usar em qualquer projeto?</h3>
            <p className="text-gray-600 text-sm">
              Sim! As skills funcionam em qualquer projeto. A documentação é criada na pasta do projeto atual.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Como atualizar?</h3>
            <p className="text-gray-600 text-sm">
              Execute o comando de instalação novamente. Ele vai sobrescrever os arquivos com as versões mais recentes.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">As skills são gratuitas?</h3>
            <p className="text-gray-600 text-sm">
              Sim! Open source e gratuitas. Você só precisa de uma conta na Anthropic para usar o Claude Code.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pronto para começar?</h2>
          <p className="text-gray-600 mb-6">
            Instale as skills e comece a desenvolver com IA hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="mr-2 h-5 w-5" />
              Ver no GitHub
            </a>
            <Link
              href="/glossary"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Ver Glossário
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
