'use client'

import { Rocket, Code, Bug, AlertCircle, BookOpen, Shield, Upload, Map, FileText, RefreshCw, Settings, BarChart3, Users, Search, Sparkles, HelpCircle, Copy, Check, Terminal, Github, Download, FolderOpen, ChevronDown, ChevronUp, Palette, MousePointer, Star, CheckCircle, Database, Layers, GitBranch, ListTodo, Calendar, Brain } from 'lucide-react'
import { useState } from 'react'

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
      className="p-2 hover:bg-gray-700 rounded transition-colors flex-shrink-0"
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

function CommandCard({ command }: { command: Command }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${command.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <command.icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <code className="text-lg font-bold text-primary-600">{command.cmd}</code>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{command.name}</h3>
          <p className="text-gray-600 text-sm">{command.description}</p>
          {command.example && (
            <div className="mt-3 bg-gray-50 rounded-lg p-3 relative group">
              <div className="flex items-start justify-between gap-2">
                <code className="text-sm text-gray-700 whitespace-pre-line flex-1">{command.example}</code>
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
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="flex-1 pb-6">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function CommandSection({ title, commands, defaultOpen = true }: { title: string; commands: Command[]; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mb-4 group"
      >
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-primary-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-primary-600" />
        )}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
        <span className="text-sm text-gray-400">({commands.length})</span>
      </button>
      {isOpen && (
        <div className="grid md:grid-cols-2 gap-4">
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
  const [showAdvancedInstall, setShowAdvancedInstall] = useState(false)

  const totalCommands = mainCommands.length + docCommands.length + designCommands.length +
    qualityCommands.length + infraCommands.length + automationCommands.length +
    planningCommands.length + specialistCommands.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Empire Vibe Coding</h1>
                <p className="text-sm text-gray-500">{totalCommands} comandos para desenvolver com IA</p>
              </div>
            </div>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ===== SEÇÃO 1: COMO INSTALAR ===== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Como Instalar</h2>
              <p className="text-gray-600">Configure o Empire Vibe Coding no seu projeto em menos de 1 minuto</p>
            </div>
          </div>

          {/* Instalação Rápida */}
          <div className="bg-gray-900 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Instalação Rápida</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Abra o terminal na pasta do seu projeto e execute:
            </p>
            <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between gap-4">
              <code className="text-green-400 text-sm sm:text-base overflow-x-auto">
                curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
              </code>
              <CopyButton text="curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash" />
            </div>
          </div>

          {/* Passo a Passo */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Passo a Passo</h3>

            <InstallStep number={1} title="Abra o terminal na pasta do seu projeto">
              <p className="text-gray-600 text-sm mb-2">
                No VS Code: <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + `</kbd> ou menu Terminal → New Terminal
              </p>
              <p className="text-gray-600 text-sm">
                Ou navegue até a pasta: <code className="bg-gray-100 px-2 py-1 rounded text-sm">cd caminho/do/seu/projeto</code>
              </p>
            </InstallStep>

            <InstallStep number={2} title="Execute o comando de instalação">
              <p className="text-gray-600 text-sm mb-3">
                Cole e execute o comando acima. O script vai:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary-500" />
                  Criar pasta <code className="bg-gray-100 px-1 rounded">vibe-coding/</code> com documentação
                </li>
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary-500" />
                  Criar pasta <code className="bg-gray-100 px-1 rounded">docs/</code> para seu projeto
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-500" />
                  Criar <code className="bg-gray-100 px-1 rounded">CLAUDE.md</code> na raiz
                </li>
              </ul>
            </InstallStep>

            <InstallStep number={3} title="Abra o Claude Code na pasta">
              <p className="text-gray-600 text-sm mb-2">
                Digite no terminal:
              </p>
              <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
                <code className="text-gray-800">claude</code>
                <CopyButton text="claude" />
              </div>
            </InstallStep>

            <div className="flex gap-4 pl-12">
              <div className="flex-1 pb-0">
                <h3 className="font-semibold text-gray-900 mb-2">Pronto!</h3>
                <p className="text-gray-600 text-sm">
                  Agora digite <code className="bg-primary-100 text-primary-700 px-2 py-1 rounded font-bold">*começar</code> e descreva sua ideia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 2: COMO USAR OS COMANDOS ===== */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Terminal className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Comandos ({totalCommands})</h2>
              <p className="text-gray-600">Digite os comandos * no Claude Code para ativar cada função</p>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="h-6 w-6" />
              <h3 className="text-xl font-bold">Para começar um projeto do zero</h3>
            </div>
            <p className="text-primary-100 mb-3 text-sm">
              Digite isso no Claude Code e descreva sua ideia:
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 font-mono text-xl">
              *começar
            </div>
            <p className="text-primary-200 mt-3 text-sm">
              O Claude vai te guiar pelo planejamento, criar o PRD e o roadmap.
            </p>
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
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Fluxo Recomendado</h3>
            <div className="grid sm:grid-cols-6 gap-4">
              {[
                { cmd: '*começar', desc: 'Planejar' },
                { cmd: '*desenvolver', desc: 'Criar' },
                { cmd: '*seguranca', desc: 'Verificar' },
                { cmd: '*garantir', desc: 'Aprovar' },
                { cmd: '*mudança', desc: 'Documentar' },
                { cmd: '*lançar', desc: 'Publicar' },
              ].map((item, i) => (
                <div key={item.cmd} className="text-center">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                    {i + 1}
                  </div>
                  <code className="text-sm font-bold text-primary-600 block">{item.cmd}</code>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-2">Comandos + Contexto</h4>
              <p className="text-blue-700 text-sm mb-2">
                Adicione contexto após o comando:
              </p>
              <code className="block text-sm bg-blue-100 p-3 rounded text-blue-800">
                *bug O login parou de funcionar depois do último update
              </code>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h4 className="font-semibold text-amber-900 mb-2">Precisa de ajuda?</h4>
              <p className="text-amber-700 text-sm mb-2">
                Digite para ver todos os comandos:
              </p>
              <code className="block text-sm bg-amber-100 p-3 rounded text-amber-800 text-xl font-bold">
                *ajuda
              </code>
            </div>
          </div>

          {/* Orquestrador */}
          <div className="mt-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-6 w-6" />
              <h3 className="text-xl font-bold">Não sabe qual comando usar?</h3>
            </div>
            <p className="text-violet-100 mb-3 text-sm">
              O comando <code className="bg-white/20 px-2 py-1 rounded">*orquestrar</code> analisa seu problema e sugere a sequência ideal de comandos.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 font-mono">
              *orquestrar Meu app está lento e não sei por quê
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Empire Vibe Coding - {totalCommands} comandos para desenvolver software com IA
            </p>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <Github className="h-4 w-4" />
              Ver no GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
