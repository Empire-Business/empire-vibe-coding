import { Download, Terminal, CheckCircle, BookOpen, AlertTriangle, Wrench, Rocket, ArrowRight, ExternalLink, HelpCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

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

export default function SkillsPage() {
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
          <p><strong>1. Instale a skill</strong> no seu Claude Code</p>
          <p><strong>2. Ao usar</strong>, o Claude baixa automaticamente a documentação do GitHub</p>
          <p><strong>3. A documentação fica salva</strong> na pasta <code className="bg-blue-100 px-1 rounded">vibe-coding/</code> do seu projeto</p>
          <p><strong>4. Nas próximas vezes</strong>, o Claude usa os arquivos locais (mais rápido)</p>
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
                <h3 className="font-semibold text-gray-900">Conexão com internet</h3>
                <p className="text-gray-600 text-sm">
                  Necessária para baixar a documentação do GitHub na primeira vez.
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
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">
              claude skill install https://github.com/Empire-Business/empire-vibe-coding
            </code>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Isso instala as 5 skills no seu Claude Code.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instalação Manual (alternativa)</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600 mb-1">1. Clone o repositório:</p>
              <code className="block bg-gray-100 p-2 rounded">git clone https://github.com/Empire-Business/empire-vibe-coding.git</code>
            </div>
            <div>
              <p className="text-gray-600 mb-1">2. Copie a pasta claude-skill para ~/.claude/skills/:</p>
              <code className="block bg-gray-100 p-2 rounded">cp -r empire-vibe-coding/claude-skill ~/.claude/skills/empire-vibe-coding</code>
            </div>
          </div>
        </div>
      </section>

      {/* First Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <RefreshCw className="h-6 w-6 mr-2 text-primary-600" />
          Primeira Utilização
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800 mb-4">
            <strong>Na primeira vez que você usar uma skill</strong>, o Claude vai automaticamente:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Criar a pasta <code className="bg-yellow-100 px-1 rounded">vibe-coding/</code> no seu projeto</li>
            <li>Baixar a documentação do GitHub via curl</li>
            <li>Salvar os arquivos localmente para uso futuro</li>
          </ol>
          <p className="text-yellow-700 mt-4 text-sm">
            Isso acontece automaticamente. Você só precisa ter conexão com internet.
          </p>
        </div>
      </section>

      {/* Available Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Disponíveis</h2>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Arquivos Criados</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-4">Após usar as skills, seu projeto terá:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
            <pre>{`seu-projeto/
└── vibe-coding/
    ├── README.md                 # Guia principal
    ├── GUIA-DO-INICIANTE.md      # Glossário de termos
    ├── BANDEIRAS-VERMELHAS.md    # Comandos perigosos
    ├── TROUBLESHOOTING.md        # Solução de erros
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
            <h3 className="font-semibold text-gray-900 mb-2">Precisa de internet sempre?</h3>
            <p className="text-gray-600 text-sm">
              Só na primeira vez. Depois que a documentação é baixada, funciona offline.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Posso usar em qualquer projeto?</h3>
            <p className="text-gray-600 text-sm">
              Sim! As skills funcionam em qualquer projeto. A documentação é criada na pasta do projeto atual.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Como atualizar a documentação?</h3>
            <p className="text-gray-600 text-sm">
              Delete a pasta <code className="bg-gray-100 px-1 rounded">vibe-coding/</code> e use uma skill novamente. O Claude vai baixar a versão mais recente.
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
