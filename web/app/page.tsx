import { Sparkles, BookOpen, AlertTriangle, Wrench, Rocket, ArrowRight, Terminal, FileCode, Github } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    id: 'start-guide',
    title: 'Guia de Início',
    description: 'Inicia o guia completo de vibe coding para iniciantes. Claude te guia passo a passo.',
    icon: Rocket,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'ask-term',
    title: 'Explicar Termo',
    description: 'Explica um termo técnico específico do glossário com analogias do dia a dia.',
    icon: BookOpen,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'check-command',
    title: 'Verificar Comando',
    description: 'Verifica se um comando é perigoso antes de executar. Proteção contra erros fatais.',
    icon: AlertTriangle,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'troubleshoot',
    title: 'Resolver Erro',
    description: 'Ajuda a resolver erros comuns com soluções passo a passo em português simples.',
    icon: Wrench,
    color: 'bg-purple-100 text-purple-600',
  },
]

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Empire Vibe Coding
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Desenvolva Software com IA
            <span className="text-primary-600 block">sem saber programar</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Instale o <strong className="text-primary-600">Empire Vibe Coding</strong> no seu projeto
            e tenha um assistente de programação que te guia passo a passo,
            explica termos técnicos e protege contra comandos perigosos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-lg"
            >
              <Github className="mr-2 h-5 w-5" />
              Ver no GitHub
            </a>
            <Link
              href="/protocols"
              className="inline-flex items-center px-8 py-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg"
            >
              <FileCode className="mr-2 h-5 w-5" />
              Ver Protocolos
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Install */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <div className="flex items-center mb-4">
            <Terminal className="h-6 w-6 mr-3 text-green-400" />
            <h2 className="text-xl font-semibold">Instalação Rápida</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Copie e cole este comando no terminal dentro da pasta do seu projeto:
          </p>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">
              curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
            </code>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Isso cria a estrutura de documentação e CLAUDE.md no seu projeto.
          </p>
        </div>
      </section>

      {/* What is Vibe Coding */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">O que é Vibe Coding?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vibe Coding é uma metodologia de desenvolvimento com IA para iniciantes.
            O <strong>CLAUDE.md</strong> funciona como um orquestrador que guia o Claude
            a te ajudar de forma específica para desenvolvimento de software,
            usando linguagem simples e documentação organizada.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCode className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CLAUDE.md Orquestrador</h3>
            <p className="text-gray-600 text-sm">
              Um arquivo que instrui o Claude como te ajudar com comandos *começar, *bug, *desenvolver e mais.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentação Completa</h3>
            <p className="text-gray-600 text-sm">
              Glossário, bandeiras vermelhas, troubleshooting e protocolos de desenvolvimento.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para Iniciantes</h3>
            <p className="text-gray-600 text-sm">
              Feito para quem não sabe programar. Tudo explicado em português simples com analogias.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comandos Disponíveis</h2>
          <p className="text-lg text-gray-600">
            Use os comandos * no Claude Code para ativar cada funcionalidade.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/commands"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Ver todos os comandos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Como Funciona</h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instale no seu projeto</h3>
                <p className="text-gray-600">
                  Execute o comando curl na pasta do seu projeto. Isso cria vibe-coding/, docs/ e CLAUDE.md.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Abra o Claude Code</h3>
                <p className="text-gray-600">
                  Execute <code className="bg-gray-100 px-2 py-1 rounded">claude</code> no terminal do seu projeto.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Use os comandos *</h3>
                <p className="text-gray-600">
                  Digite <code className="bg-gray-100 px-2 py-1 rounded">*começar</code> para iniciar um projeto,
                  <code className="bg-gray-100 px-2 py-1 rounded">*bug</code> para resolver erros.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Desenvolva com IA</h3>
                <p className="text-gray-600">
                  Converse com o Claude em português. Ele vai te guiar, explicar termos e proteger contra erros.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              Ver no GitHub
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Additional Docs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Documentação</h2>
          <p className="text-gray-600">
            Toda a documentação usada pelo CLAUDE.md para te ajudar.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/glossary"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
            Glossário de Termos
          </Link>
          <Link
            href="/flags"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
            Bandeiras Vermelhas
          </Link>
          <Link
            href="/troubleshooting"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Wrench className="mr-2 h-5 w-5 text-gray-500" />
            Troubleshooting
          </Link>
          <Link
            href="/protocols"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileCode className="mr-2 h-5 w-5 text-gray-500" />
            Protocolos
          </Link>
        </div>
      </section>
    </div>
  )
}
