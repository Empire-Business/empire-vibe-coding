import { Sparkles, BookOpen, AlertTriangle, Wrench, Rocket, ArrowRight, Download, Terminal, FileCode, Github } from 'lucide-react'
import Link from 'next/link'

const skills = [
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
            Claude Skills para Vibe Coding
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Desenvolva Software com IA
            <span className="text-primary-600 block">sem saber programar</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Instale as <strong className="text-primary-600">Claude Skills</strong> no seu Claude Code
            e tenha um assistente de programação que te guia passo a passo,
            explica termos técnicos e protege contra comandos perigosos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/skills"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Instalar Skills
            </Link>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg"
            >
              <Github className="mr-2 h-5 w-5" />
              Ver no GitHub
            </a>
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
            Copie e cole este comando no terminal para instalar as skills:
          </p>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">
              claude skill install https://github.com/Empire-Business/empire-vibe-coding
            </code>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Requer Claude Code CLI instalado.{' '}
            <a href="/skills" className="text-primary-400 hover:underline">
              Ver instruções completas →
            </a>
          </p>
        </div>
      </section>

      {/* What are Claude Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">O que são Claude Skills?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Claude Skills são <strong>prompts personalizados</strong> que dão superpoderes ao seu Claude Code.
            Elas ensinam o Claude a te ajudar de forma específica para desenvolvimento de software,
            usando a documentação deste projeto como base de conhecimento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCode className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prompts Inteligentes</h3>
            <p className="text-gray-600 text-sm">
              Cada skill é um prompt otimizado que guia o Claude a te ajudar de forma específica.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Base de Conhecimento</h3>
            <p className="text-gray-600 text-sm">
              Skills usam nossa documentação completa: glossário, bandeiras vermelhas, troubleshooting.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para Iniciantes</h3>
            <p className="text-gray-600 text-sm">
              Feitas para quem não sabe programar. Tudo explicado em português simples.
            </p>
          </div>
        </div>
      </section>

      {/* Available Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">4 Skills Disponíveis</h2>
          <p className="text-lg text-gray-600">
            Cada skill resolve um problema específico do dia a dia de quem está aprendendo a programar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center mb-4`}>
                <skill.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h3>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/skills"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Ver como usar cada skill
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instale Claude Code</h3>
                <p className="text-gray-600">
                  Baixe e instale o Claude Code CLI no seu computador. É gratuito e funciona em Mac, Windows e Linux.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instale as Skills</h3>
                <p className="text-gray-600">
                  Execute o comando de instalação. As skills serão baixadas do GitHub e configuradas automaticamente.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Use no seu projeto</h3>
                <p className="text-gray-600">
                  Abra seu projeto no terminal e digite <code className="bg-gray-100 px-2 py-1 rounded">claude</code>.
                  As skills estarão disponíveis automaticamente.
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
            <Link
              href="/skills"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Começar Instalação
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Docs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Documentação Adicional</h2>
          <p className="text-gray-600">
            As skills usam estas documentações como base de conhecimento.
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
