'use client'

import { Rocket, Code, Bug, AlertCircle, BookOpen, Shield, Upload, Map, FileText, RefreshCw, Settings, BarChart3, Users, Search, Sparkles, Copy, Check, Terminal, Github, Download, FolderOpen, ChevronDown, ChevronUp, Palette, MousePointer, Star, CheckCircle, Database, Layers, GitBranch, ListTodo, Calendar, Brain } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

// ===== COMANDOS =====
interface Command {
  cmd: string
  name: string
  description: string
  example?: string
  icon: React.ElementType
  color: string
}

const mainCommands: Command[] = [
  { cmd: '*começar', name: 'Iniciar Projeto', description: 'Planeja o projeto do zero, preenche o PRD e cria o roadmap', example: '*começar\n\nQuero criar um app de tarefas', icon: Rocket, color: 'bg-blue-100 text-blue-600' },
  { cmd: '*desenvolver', name: 'Modo Desenvolvimento', description: 'Ativa o protocolo de desenvolvimento diário', icon: Code, color: 'bg-green-100 text-green-600' },
  { cmd: '*bug', name: 'Resolver Bug', description: 'Investiga e corrige problemas no código', example: '*bug\n\nO login não funciona', icon: Bug, color: 'bg-red-100 text-red-600' },
  { cmd: '*erro', name: 'Resolver Erro', description: 'Ajuda a resolver erros e mensagens de erro do terminal', example: '*erro\n\nnpm ERR! code ERESOLVE', icon: AlertCircle, color: 'bg-orange-100 text-orange-600' },
  { cmd: '*termo', name: 'Explicar Termo', description: 'Explica termos técnicos com analogias simples do dia a dia', example: '*termo\n\nO que é API?', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
  { cmd: '*comando', name: 'Verificar Comando', description: 'Verifica se um comando é perigoso antes de executar', example: '*comando\n\nrm -rf node_modules', icon: Shield, color: 'bg-yellow-100 text-yellow-600' },
  { cmd: '*lançar', name: 'Preparar Lançamento', description: 'Checklist completo antes de publicar o projeto', icon: Upload, color: 'bg-indigo-100 text-indigo-600' },
]

const docCommands: Command[] = [
  { cmd: '*roadmap', name: 'Ver Roadmap', description: 'Mostra os próximos passos e progresso do projeto', icon: Map, color: 'bg-cyan-100 text-cyan-600' },
  { cmd: '*decisão', name: 'Registrar Decisão', description: 'Adiciona uma decisão técnica (ADR) na documentação', example: '*decisão\n\nVamos usar PostgreSQL', icon: FileText, color: 'bg-teal-100 text-teal-600' },
  { cmd: '*mudança', name: 'Registrar Mudança', description: 'Atualiza o changelog com a mudança feita', example: '*mudança\n\nAdicionei página de login', icon: RefreshCw, color: 'bg-lime-100 text-lime-600' },
  { cmd: '*arquitetura', name: 'Atualizar Arquitetura', description: 'Atualiza a documentação de arquitetura', icon: Settings, color: 'bg-gray-100 text-gray-600' },
  { cmd: '*status', name: 'Ver Status', description: 'Resumo de onde o projeto está e o que falta', icon: BarChart3, color: 'bg-pink-100 text-pink-600' },
]

const designCommands: Command[] = [
  { cmd: '*design', name: 'Design System', description: 'Configura cores, tipografia, tokens e Tailwind', example: '*design\n\nQuero criar o design system do app', icon: Palette, color: 'bg-fuchsia-100 text-fuchsia-600' },
  { cmd: '*ux', name: 'UX Design', description: 'Aplica heurísticas de Nielsen, estados e acessibilidade', example: '*ux\n\nRevisar fluxo de checkout', icon: MousePointer, color: 'bg-rose-100 text-rose-600' },
]

const qualityCommands: Command[] = [
  { cmd: '*seguranca', name: 'Auditoria de Segurança', description: 'Checklist OWASP Top 10, RLS, npm audit', icon: Shield, color: 'bg-red-100 text-red-600' },
  { cmd: '*qualidade', name: 'Checar Qualidade', description: 'Code smells, SOLID, métricas, cobertura', icon: Star, color: 'bg-amber-100 text-amber-600' },
  { cmd: '*garantir', name: 'Garantidor de Qualidade', description: 'ÚNICO que pode aprovar mudanças', icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600' },
  { cmd: '*revisar', name: 'Code Review', description: 'Faz revisão completa do código', icon: Search, color: 'bg-sky-100 text-sky-600' },
]

const infraCommands: Command[] = [
  { cmd: '*banco', name: 'Saúde do Banco', description: 'Queries de diagnóstico, índices, VACUUM', example: '*banco\n\nO app está lento', icon: Database, color: 'bg-violet-100 text-violet-600' },
  { cmd: '*supabase', name: 'Configurar Supabase', description: 'CLI setup, MCP config, RLS', icon: Layers, color: 'bg-green-100 text-green-600' },
]

const automationCommands: Command[] = [
  { cmd: '*workflow', name: 'Criar Workflows', description: 'GitHub Actions, CI/CD, automações', example: '*workflow\n\nQuero CI para testes', icon: GitBranch, color: 'bg-slate-100 text-slate-600' },
  { cmd: '*orquestrar', name: 'Orquestrar Comandos', description: 'Combina múltiplos comandos', example: '*orquestrar\n\nMeu app está lento', icon: Layers, color: 'bg-indigo-100 text-indigo-600' },
  { cmd: '*tarefas', name: 'Gerenciar Tarefas', description: 'TaskCreate/Update/Get/List do Claude Code', icon: ListTodo, color: 'bg-orange-100 text-orange-600' },
]

const planningCommands: Command[] = [
  { cmd: '*planejar', name: 'Planejamento Detalhado', description: 'WBS, estimativas, riscos, critérios', example: '*planejar\n\nSistema de pagamentos', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
  { cmd: '*especificar', name: 'Criar Spec', description: 'Cria especificação técnica de uma feature', example: '*especificar\n\nSistema de pagamento', icon: FileText, color: 'bg-slate-100 text-slate-600' },
]

const specialistCommands: Command[] = [
  { cmd: '*nerd', name: 'Problemas Complexos', description: 'Debug profundo, profiling, otimização', example: '*nerd\n\nMemory leak no Node', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { cmd: '*agentes', name: 'Agent Teams', description: 'Cria equipe de agentes para tarefas complexas', example: '*agentes\n\nO app está lento', icon: Users, color: 'bg-violet-100 text-violet-600' },
  { cmd: '*melhorar', name: 'Melhorar Código', description: 'Sugere refatorações e melhorias', icon: Sparkles, color: 'bg-rose-100 text-rose-600' },
]

// ===== COMPONENTES =====
function CopyButton({ text, dark = false }: { text: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 sm:p-2 rounded transition-colors flex-shrink-0 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
      title="Copiar"
    >
      {copied ? (
        <Check className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${dark ? 'text-green-400' : 'text-green-600'}`} />
      ) : (
        <Copy className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`} />
      )}
    </button>
  )
}

function CommandCard({ command }: { command: Command }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 ${command.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <command.icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <code className="text-base sm:text-lg font-bold text-blue-600">{command.cmd}</code>
          </div>
          <h3 className="font-semibold text-gray-900 mb-0.5 text-sm sm:text-base">{command.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">{command.description}</p>
          {command.example && (
            <div className="mt-2 sm:mt-3 bg-gray-50 rounded-lg p-2 sm:p-3 relative group">
              <div className="flex items-start justify-between gap-2">
                <code className="text-xs sm:text-sm text-gray-700 whitespace-pre-line flex-1">{command.example}</code>
                <CopyButton text={command.example?.split('\n')[0] || command.cmd} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InstallStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
        {number}
      </div>
      <div className="flex-1 pb-4 sm:pb-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function CommandSection({ title, commands, defaultOpen = true }: { title: string; commands: Command[]; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-6 sm:mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mb-3 sm:mb-4 group w-full text-left"
      >
        {isOpen ? (
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-blue-600" />
        ) : (
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-blue-600" />
        )}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <span className="text-xs sm:text-sm text-gray-400">({commands.length})</span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {commands.map((cmd) => (
            <CommandCard key={cmd.cmd} command={cmd} />
          ))}
        </div>
      )}
    </div>
  )
}

// ===== PÁGINA PRINCIPAL =====
export default function HomePage() {
  const totalCommands = mainCommands.length + docCommands.length + designCommands.length +
    qualityCommands.length + infraCommands.length + automationCommands.length +
    planningCommands.length + specialistCommands.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Empire"
                width={40}
                height={40}
                className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                style={{ objectFit: 'contain' }}
              />
              <div className="min-w-0">
                <h1 className="font-bold text-gray-900 text-sm sm:text-base truncate">Empire Vibe Coding</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">{totalCommands} comandos para desenvolver com IA</p>
              </div>
            </div>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* ===== SEÇÃO 1: COMO INSTALAR ===== */}
        <section className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Como Instalar</h2>
              <p className="text-gray-600 text-sm sm:text-base">Configure em menos de 1 minuto</p>
            </div>
          </div>

          {/* Instalação Rápida */}
          <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Instalação Rápida</h3>
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
              Abra o terminal na pasta do seu projeto e execute:
            </p>
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <code className="text-green-400 text-xs sm:text-sm overflow-x-auto flex-1">
                curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
              </code>
              <CopyButton text="curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash" dark />
            </div>
          </div>

          {/* Passo a Passo */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Passo a Passo</h3>

            <InstallStep number={1} title="Abra o terminal na pasta do seu projeto">
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                No VS Code: <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-[10px] sm:text-xs">Ctrl + `</kbd> ou menu Terminal
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Ou navegue: <code className="bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-sm">cd caminho/do/projeto</code>
              </p>
            </InstallStep>

            <InstallStep number={2} title="Execute o comando de instalação">
              <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                O script vai:
              </p>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                  <span>Criar pasta <code className="bg-gray-100 px-1 rounded text-[10px] sm:text-xs">vibe-coding/</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                  <span>Criar pasta <code className="bg-gray-100 px-1 rounded text-[10px] sm:text-xs">docs/</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                  <span>Criar <code className="bg-gray-100 px-1 rounded text-[10px] sm:text-xs">CLAUDE.md</code> na raiz</span>
                </li>
              </ul>
            </InstallStep>

            <InstallStep number={3} title="Abra o Claude Code na pasta">
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                Digite no terminal:
              </p>
              <div className="bg-gray-100 rounded-lg p-2 sm:p-3 flex items-center justify-between">
                <code className="text-gray-800 text-sm">claude</code>
                <CopyButton text="claude" />
              </div>
            </InstallStep>

            <div className="flex gap-3 sm:gap-4 pl-10 sm:pl-12">
              <div className="flex-1 pb-0">
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Pronto!</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Agora digite <code className="bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded font-bold text-xs sm:text-sm">*começar</code> e descreva sua ideia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 2: COMO USAR OS COMANDOS ===== */}
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Como Usar os Comandos</h2>
              <p className="text-gray-600 text-sm sm:text-base">Digite os comandos * no Claude Code</p>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="text-lg sm:text-xl font-bold">Para começar um projeto do zero</h3>
            </div>
            <p className="text-blue-100 mb-2 sm:mb-3 text-xs sm:text-sm">
              Digite isso no Claude Code e descreva sua ideia:
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4 font-mono text-lg sm:text-xl">
              *começar
            </div>
            <p className="text-blue-200 mt-2 sm:mt-3 text-xs sm:text-sm">
              O Claude vai te guiar pelo planejamento, criar o PRD e o roadmap.
            </p>
          </div>

          {/* GitHub Destaque */}
          <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="text-lg sm:text-xl font-bold">Contribua no GitHub</h3>
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
              Empire Vibe Coding é open source! Ajude a melhorar o projeto:
            </p>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base font-semibold"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              Ver no GitHub
            </a>
          </div>

          {/* Comandos Principais */}
          <CommandSection title="Comandos Principais" commands={mainCommands} />

          {/* Comandos de Documentação */}
          <CommandSection title="Comandos de Documentação" commands={docCommands} />

          {/* Comandos de Design & UX */}
          <CommandSection title="Design & UX" commands={designCommands} />

          {/* Comandos de Qualidade */}
          <CommandSection title="Qualidade" commands={qualityCommands} defaultOpen={true} />

          {/* Comandos de Infra & Banco */}
          <CommandSection title="Infra & Banco" commands={infraCommands} />

          {/* Comandos de Automação */}
          <CommandSection title="Automação" commands={automationCommands} />

          {/* Comandos de Planejamento */}
          <CommandSection title="Planejamento" commands={planningCommands} />

          {/* Comandos de Especialistas */}
          <CommandSection title="Especialistas" commands={specialistCommands} />

          {/* Fluxo Recomendado */}
          <div className="mt-6 sm:mt-8 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Fluxo Recomendado</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
              {[
                { cmd: '*começar', desc: 'Planejar' },
                { cmd: '*desenvolver', desc: 'Criar' },
                { cmd: '*seguranca', desc: 'Verificar' },
                { cmd: '*garantir', desc: 'Aprovar' },
                { cmd: '*mudança', desc: 'Documentar' },
                { cmd: '*lançar', desc: 'Publicar' },
              ].map((item, i) => (
                <div key={item.cmd} className="text-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mx-auto mb-1.5 sm:mb-2">
                    {i + 1}
                  </div>
                  <code className="text-[10px] sm:text-sm font-bold text-blue-600 block">{item.cmd}</code>
                  <span className="text-[10px] sm:text-xs text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5">
              <h4 className="font-semibold text-blue-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Comandos + Contexto</h4>
              <p className="text-blue-700 text-xs sm:text-sm mb-2">
                Adicione contexto após o comando:
              </p>
              <code className="block text-xs sm:text-sm bg-blue-100 p-2 sm:p-3 rounded text-blue-800">
                *bug O login parou de funcionar
              </code>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5">
              <h4 className="font-semibold text-amber-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Precisa de ajuda?</h4>
              <p className="text-amber-700 text-xs sm:text-sm mb-2">
                Digite para ver todos os comandos:
              </p>
              <code className="block text-sm sm:text-lg bg-amber-100 p-2 sm:p-3 rounded text-amber-800 font-bold">
                *ajuda
              </code>
            </div>
          </div>

          {/* Orquestrador */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Layers className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="text-lg sm:text-xl font-bold">Não sabe qual comando usar?</h3>
            </div>
            <p className="text-violet-100 mb-2 sm:mb-3 text-xs sm:text-sm">
              O comando <code className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded">*orquestrar</code> analisa seu problema e sugere a sequência ideal.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4 font-mono text-sm sm:text-base">
              *orquestrar Meu app está lento e não sei por quê
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-10 sm:mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Empire"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
                style={{ objectFit: 'contain' }}
              />
              <p className="text-gray-500 text-xs sm:text-sm">
                Empire Vibe Coding - {totalCommands} comandos para desenvolver software com IA
              </p>
            </div>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-900 text-xs sm:text-sm"
            >
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Ver no GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
