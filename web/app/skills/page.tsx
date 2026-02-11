import { Download, Terminal, CheckCircle, Copy, BookOpen, AlertTriangle, Wrench, Rocket, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const skills = [
  {
    id: 'start-guide',
    title: 'Guia de Início',
    description: 'Inicia o guia completo de vibe coding para iniciantes.',
    longDescription: 'Esta skill ativa o guia completo de vibe coding. O Claude vai te guiar passo a passo, explicando cada conceito em português simples, usando analogias do dia a dia. Ele vai perguntar o que você quer fazer (criar projeto, resolver erro, etc.) e te orientar através da documentação apropriada.',
    icon: Rocket,
    color: 'bg-blue-100 text-blue-600',
    usage: 'Abra seu projeto no terminal e digite: "me ajuda a começar um projeto" ou "quero aprender vibe coding"',
    features: [
      'Guia passo a passo personalizado',
      'Explicações em português simples',
      'Verifica entendimento antes de prosseguir',
      'Consulta documentação automaticamente',
    ],
  },
  {
    id: 'ask-term',
    title: 'Explicar Termo',
    description: 'Explica um termo técnico com analogias do dia a dia.',
    longDescription: 'Pergunte qualquer termo técnico e o Claude vai explicar usando o glossário do projeto. Ele explica o que é, para que serve, e dá uma analogia do dia a dia para facilitar o entendimento.',
    icon: BookOpen,
    color: 'bg-green-100 text-green-600',
    usage: 'Pergunte: "o que é API?", "explique o que é commit", "o que significa deploy?"',
    features: [
      'Consultas ao glossário completo',
      'Analogias do dia a dia',
      'Exemplos práticos',
      'Linguagem simples e acessível',
    ],
  },
  {
    id: 'check-command',
    title: 'Verificar Comando',
    description: 'Verifica se um comando é perigoso antes de executar.',
    longDescription: 'Antes de executar qualquer comando que parece estranho, pergunte ao Claude. Ele consulta a lista de bandeiras vermelhas e te avisa se o comando é perigoso, explicando os riscos e oferecendo alternativas seguras.',
    icon: AlertTriangle,
    color: 'bg-orange-100 text-orange-600',
    usage: 'Pergunte: "posso rodar rm -rf /?", "esse comando é seguro?", "o que faz git reset --hard?"',
    features: [
      'Verifica comandos perigosos',
      'Explica os riscos em português',
      'Oferece alternativas seguras',
      'Nunca executa sem confirmação',
    ],
  },
  {
    id: 'troubleshoot',
    title: 'Resolver Erro',
    description: 'Ajuda a resolver erros comuns passo a passo.',
    longDescription: 'Quando der erro, cole a mensagem de erro para o Claude. Ele consulta o guia de troubleshooting e oferece soluções em português simples, explicando cada passo necessário.',
    icon: Wrench,
    color: 'bg-purple-100 text-purple-600',
    usage: 'Cole o erro e digite: "deu esse erro, me ajuda", "como resolvo isso?", " não sei o que fazer"',
    features: [
      'Identifica o tipo de erro',
      'Consulta guia de soluções',
      'Passos em português simples',
      'Soluções genéricas quando não está na lista',
    ],
  },
]

export default function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Instalar Claude Skills</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Siga os passos abaixo para instalar as skills no seu Claude Code e começar a usar.
        </p>
      </div>

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
                  Você precisa ter o Claude Code instalado no seu computador.
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
                  Você precisa de uma conta na Anthropic para usar o Claude Code.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Git (opcional)</h3>
                <p className="text-gray-600 text-sm">
                  Necessário se quiser clonar o repositório manualmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Download className="h-6 w-6 mr-2 text-primary-600" />
          Métodos de Instalação
        </h2>

        {/* Method 1: Quick Install */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
              Recomendado
            </span>
            <h3 className="text-lg font-semibold text-gray-900">Instalação Rápida</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Execute este comando no terminal para instalar automaticamente:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">
              claude skill install https://github.com/Empire-Business/empire-vibe-coding
            </code>
          </div>
        </div>

        {/* Method 2: Manual Install */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instalação Manual</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">1. Clone o repositório:</p>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                <code className="text-green-400">
                  git clone https://github.com/Empire-Business/empire-vibe-coding.git
                </code>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">2. Copie a pasta claude-skill para seu projeto:</p>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                <code className="text-green-400">
                  cp -r empire-vibe-coding/claude-skill ~/.claude/skills/empire-vibe-coding
                </code>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">3. Ou copie o skill.yaml para seu projeto:</p>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                <code className="text-green-400">
                  cp empire-vibe-coding/claude-skill/skill.yaml ./claude-skill/
                </code>
              </div>
            </div>
          </div>
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

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Como usar:</p>
                    <p className="text-gray-600 text-sm">{skill.usage}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">O que faz:</p>
                    <ul className="space-y-1">
                      {skill.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Terminal className="h-6 w-6 mr-2 text-gray-700" />
          Como Usar
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Abra seu projeto</h3>
                <p className="text-gray-600 text-sm">
                  Navegue até a pasta do seu projeto no terminal.
                </p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm mt-2">
                  <code className="text-gray-300">cd /caminho/do/seu/projeto</code>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Inicie o Claude Code</h3>
                <p className="text-gray-600 text-sm">
                  Digite <code className="bg-gray-100 px-2 py-0.5 rounded">claude</code> para iniciar.
                </p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm mt-2">
                  <code className="text-green-400">claude</code>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Converse em português</h3>
                <p className="text-gray-600 text-sm mb-2">
                  As skills são ativadas automaticamente quando você faz perguntas relacionadas. Exemplos:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• "me ajuda a começar um projeto"</p>
                  <p className="text-sm text-gray-700">• "o que é API?"</p>
                  <p className="text-sm text-gray-700">• "posso rodar esse comando: rm -rf node_modules?"</p>
                  <p className="text-sm text-gray-700">• "deu esse erro: [cole o erro aqui]"</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Aprenda enquanto constrói</h3>
                <p className="text-gray-600 text-sm">
                  O Claude vai te guiar, explicar termos e proteger contra comandos perigosos.
                  Com o tempo, você vai aprendendo os conceitos naturalmente.
                </p>
              </div>
            </div>
          </div>
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
            <h3 className="font-semibold text-gray-900 mb-2">As skills são gratuitas?</h3>
            <p className="text-gray-600 text-sm">
              Sim! As skills são open source e gratuitas. Você só precisa de uma conta na Anthropic para usar o Claude Code.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Preciso saber programar?</h3>
            <p className="text-gray-600 text-sm">
              Não! As skills são feitas para iniciantes. O Claude explica tudo em português simples e usa analogias do dia a dia.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Funciona em qualquer projeto?</h3>
            <p className="text-gray-600 text-sm">
              Sim! As skills funcionam em qualquer projeto. Elas usam a documentação como base de conhecimento para te ajudar.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Como atualizar as skills?</h3>
            <p className="text-gray-600 text-sm">
              Execute o comando de instalação novamente ou faça pull do repositório para atualizar.
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
              Instalar Agora
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
