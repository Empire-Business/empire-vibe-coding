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
  { cmd: '*começar', name: 'Iniciar Projeto', description: 'Planeja o projeto do zero, preenche o PRD e cria o roadmap', example: '*começar\n\nQuero criar um app de tarefas', icon: Rocket, color: 'bg-[#e4b820] text-black' },
  { cmd: '*desenvolver', name: 'Modo Desenvolvimento', description: 'Ativa o protocolo de desenvolvimento diário', icon: Code, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*bug', name: 'Resolver Bug', description: 'Investiga e corrige problemas no código', example: '*bug\n\nO login não funciona', icon: Bug, color: 'bg-[#e4b820] text-black' },
  { cmd: '*erro', name: 'Resolver Erro', description: 'Ajuda a resolver erros e mensagens de erro do terminal', example: '*erro\n\nnpm ERR! code ERESOLVE', icon: AlertCircle, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*termo', name: 'Explicar Termo', description: 'Explica termos técnicos com analogias simples do dia a dia', example: '*termo\n\nO que é API?', icon: BookOpen, color: 'bg-[#e4b820] text-black' },
  { cmd: '*comando', name: 'Verificar Comando', description: 'Verifica se um comando é perigoso antes de executar', example: '*comando\n\nrm -rf node_modules', icon: Shield, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*lançar', name: 'Preparar Lançamento', description: 'Checklist completo antes de publicar o projeto', icon: Upload, color: 'bg-[#e4b820] text-black' },
]

const docCommands: Command[] = [
  { cmd: '*roadmap', name: 'Ver Roadmap', description: 'Mostra os próximos passos e progresso do projeto', icon: Map, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*decisão', name: 'Registrar Decisão', description: 'Adiciona uma decisão técnica (ADR) na documentação', example: '*decisão\n\nVamos usar PostgreSQL', icon: FileText, color: 'bg-[#e4b820] text-black' },
  { cmd: '*mudança', name: 'Registrar Mudança', description: 'Atualiza o changelog com a mudança feita', example: '*mudança\n\nAdicionei página de login', icon: RefreshCw, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*arquitetura', name: 'Atualizar Arquitetura', description: 'Atualiza a documentação de arquitetura', icon: Settings, color: 'bg-[#e4b820] text-black' },
  { cmd: '*status', name: 'Ver Status', description: 'Resumo de onde o projeto está e o que falta', icon: BarChart3, color: 'bg-[#8c4b32] text-white' },
]

const designCommands: Command[] = [
  { cmd: '*design', name: 'Design System', description: 'Configura cores, tipografia, tokens e Tailwind', example: '*design\n\nQuero criar o design system do app', icon: Palette, color: 'bg-[#e4b820] text-black' },
  { cmd: '*ux', name: 'UX Design', description: 'Aplica heurísticas de Nielsen, estados e acessibilidade', example: '*ux\n\nRevisar fluxo de checkout', icon: MousePointer, color: 'bg-[#8c4b32] text-white' },
]

const qualityCommands: Command[] = [
  { cmd: '*seguranca', name: 'Auditoria de Segurança', description: 'Checklist OWASP Top 10, RLS, npm audit', icon: Shield, color: 'bg-[#e4b820] text-black' },
  { cmd: '*qualidade', name: 'Checar Qualidade', description: 'Code smells, SOLID, métricas, cobertura', icon: Star, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*garantir', name: 'Garantidor de Qualidade', description: 'ÚNICO que pode aprovar mudanças', icon: CheckCircle, color: 'bg-[#e4b820] text-black' },
  { cmd: '*revisar', name: 'Code Review', description: 'Faz revisão completa do código', icon: Search, color: 'bg-[#8c4b32] text-white' },
]

const infraCommands: Command[] = [
  { cmd: '*banco', name: 'Saúde do Banco', description: 'Queries de diagnóstico, índices, VACUUM', example: '*banco\n\nO app está lento', icon: Database, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*supabase', name: 'Configurar Supabase', description: 'CLI setup, MCP config, RLS', icon: Layers, color: 'bg-[#e4b820] text-black' },
]

const automationCommands: Command[] = [
  { cmd: '*workflow', name: 'Criar Workflows', description: 'GitHub Actions, CI/CD, automações', example: '*workflow\n\nQuero CI para testes', icon: GitBranch, color: 'bg-[#e4b820] text-black' },
  { cmd: '*orquestrar', name: 'Orquestrar Comandos', description: 'Combina múltiplos comandos', example: '*orquestrar\n\nMeu app está lento', icon: Layers, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*tarefas', name: 'Gerenciar Tarefas', description: 'TaskCreate/Update/Get/List do Claude Code', icon: ListTodo, color: 'bg-[#e4b820] text-black' },
]

const planningCommands: Command[] = [
  { cmd: '*planejar', name: 'Planejamento Detalhado', description: 'WBS, estimativas, riscos, critérios', example: '*planejar\n\nSistema de pagamentos', icon: Calendar, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*especificar', name: 'Criar Spec', description: 'Cria especificação técnica de uma feature', example: '*especificar\n\nSistema de pagamento', icon: FileText, color: 'bg-[#e4b820] text-black' },
]

const specialistCommands: Command[] = [
  { cmd: '*nerd', name: 'Problemas Complexos', description: 'Debug profundo, profiling, otimização', example: '*nerd\n\nMemory leak no Node', icon: Brain, color: 'bg-[#8c4b32] text-white' },
  { cmd: '*agentes', name: 'Agent Teams', description: 'Cria equipe de agentes para tarefas complexas', example: '*agentes\n\nO app está lento', icon: Users, color: 'bg-[#e4b820] text-black' },
  { cmd: '*melhorar', name: 'Melhorar Código', description: 'Sugere refatorações e melhorias', icon: Sparkles, color: 'bg-[#8c4b32] text-white' },
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
      className="p-2 hover:bg-[#d8d2c1]/50 rounded transition-colors flex-shrink-0"
      title="Copiar"
    >
      {copied ? (
        <Check className="h-4 w-4 text-[#6f755a]" />
      ) : (
        <Copy className="h-4 w-4 text-[#6f755a]" />
      )}
    </button>
  )
}

function CommandCard({ command }: { command: Command }) {
  return (
    <div className="bg-white border border-[#d8d2c1] rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-[#6f755a]/30 transition-all">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 ${command.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <command.icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <code className="text-base sm:text-lg font-bold text-[#8c4b32] font-display">{command.cmd}</code>
          <h3 className="font-semibold text-black mt-0.5 mb-1 text-sm sm:text-base">{command.name}</h3>
          <p className="text-[#6f755a] text-xs sm:text-sm">{command.description}</p>
          {command.example && (
            <div className="mt-2 sm:mt-3 bg-[#bec3bf]/30 rounded-lg p-2 sm:p-3 border border-[#d8d2c1]/50">
              <div className="flex items-start justify-between gap-2">
                <code className="text-xs sm:text-sm text-[#6f755a] whitespace-pre-line flex-1">{command.example}</code>
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
      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#e4b820] text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm font-display">
        {number}
      </div>
      <div className="flex-1 pb-4 sm:pb-6">
        <h3 className="font-semibold text-black mb-2 text-sm sm:text-base">{title}</h3>
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
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#6f755a] group-hover:text-[#8c4b32]" />
        ) : (
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#6f755a] group-hover:text-[#8c4b32]" />
        )}
        <h3 className="text-lg sm:text-xl font-bold text-black group-hover:text-[#8c4b32] transition-colors font-display">{title}</h3>
        <span className="text-xs sm:text-sm text-[#6f755a]/60">({commands.length})</span>
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
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Header */}
      <header className="bg-white border-b border-[#d8d2c1] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Empire"
                width={36}
                height={36}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <div>
                <h1 className="font-bold text-black text-sm sm:text-base font-display">EMPIRE VIBE CODING</h1>
                <p className="text-xs sm:text-sm text-[#6f755a] hidden sm:block">{totalCommands} comandos para desenvolver com IA</p>
              </div>
            </div>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-[#6f755a] transition-colors text-xs sm:text-sm font-semibold font-display"
            >
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">GITHUB</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* ===== SEÇÃO 1: COMO INSTALAR ===== */}
        <section className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e4b820] rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black font-display">COMO INSTALAR</h2>
              <p className="text-[#6f755a] text-sm sm:text-base">Configure em menos de 1 minuto</p>
            </div>
          </div>

          {/* Instalação Rápida */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 border border-[#d8d2c1]">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-[#6f755a]" />
              <h3 className="text-base sm:text-lg font-semibold text-black font-display">INSTALAÇÃO RÁPIDA</h3>
            </div>
            <p className="text-[#6f755a] mb-3 sm:mb-4 text-xs sm:text-sm">
              Abra o terminal na pasta do seu projeto e execute:
            </p>
            <div className="bg-[#f2f2f2] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border border-[#d8d2c1]">
              <code className="text-[#6f755a] text-xs sm:text-sm overflow-x-auto flex-1 break-all">
                curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
              </code>
              <CopyButton text="curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash" />
            </div>
          </div>

          {/* Passo a Passo */}
          <div className="bg-white rounded-2xl border border-[#d8d2c1] p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-4 sm:mb-6 font-display">PASSO A PASSO</h3>

            <InstallStep number={1} title="Abra o terminal na pasta do seu projeto">
              <p className="text-[#6f755a] text-xs sm:text-sm mb-1 sm:mb-2">
                No VS Code: <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#bec3bf]/40 rounded text-[10px] sm:text-xs">Ctrl + `</kbd>
              </p>
              <p className="text-[#6f755a] text-xs sm:text-sm">
                Ou: <code className="bg-[#bec3bf]/40 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-sm">cd caminho/do/projeto</code>
              </p>
            </InstallStep>

            <InstallStep number={2} title="Execute o comando de instalação">
              <ul className="text-xs sm:text-sm text-[#6f755a] space-y-1">
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8c4b32] flex-shrink-0" />
                  <span>Cria pasta <code className="bg-[#bec3bf]/40 px-1 rounded text-[10px] sm:text-xs">vibe-coding/</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8c4b32] flex-shrink-0" />
                  <span>Cria pasta <code className="bg-[#bec3bf]/40 px-1 rounded text-[10px] sm:text-xs">docs/</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8c4b32] flex-shrink-0" />
                  <span>Cria <code className="bg-[#bec3bf]/40 px-1 rounded text-[10px] sm:text-xs">CLAUDE.md</code></span>
                </li>
              </ul>
            </InstallStep>

            <InstallStep number={3} title="Abra o Claude Code">
              <div className="bg-[#f2f2f2] rounded-lg p-2 sm:p-3 flex items-center justify-between border border-[#d8d2c1]">
                <code className="text-[#6f755a] text-sm">claude</code>
                <CopyButton text="claude" />
              </div>
            </InstallStep>

            <div className="flex gap-3 sm:gap-4 pl-10 sm:pl-12">
              <div className="flex-1 pb-0">
                <h3 className="font-semibold text-black mb-1 sm:mb-2 text-sm sm:text-base">Pronto!</h3>
                <p className="text-[#6f755a] text-xs sm:text-sm">
                  Digite <code className="bg-[#e4b820] text-black px-1.5 sm:px-2 py-0.5 rounded font-bold text-xs sm:text-sm">*começar</code> e descreva sua ideia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 2: COMANDOS ===== */}
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8c4b32] rounded-xl flex items-center justify-center flex-shrink-0">
              <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black font-display">COMANDOS ({totalCommands})</h2>
              <p className="text-[#6f755a] text-sm sm:text-base">Digite os comandos * no Claude Code</p>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-[#e4b820] rounded-2xl p-4 sm:p-6 text-black mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="text-lg sm:text-xl font-bold font-display">PARA COMEÇAR UM PROJETO</h3>
            </div>
            <p className="text-black/70 mb-2 sm:mb-3 text-xs sm:text-sm">
              Digite isso no Claude Code e descreva sua ideia:
            </p>
            <div className="bg-black/10 rounded-lg p-3 sm:p-4 font-mono text-lg sm:text-xl text-black font-bold">
              *começar
            </div>
          </div>

          {/* Seções de Comandos */}
          <CommandSection title="Comandos Principais" commands={mainCommands} />
          <CommandSection title="Documentação" commands={docCommands} />
          <CommandSection title="Design & UX" commands={designCommands} />
          <CommandSection title="Qualidade" commands={qualityCommands} defaultOpen={true} />
          <CommandSection title="Infra & Banco" commands={infraCommands} />
          <CommandSection title="Automação" commands={automationCommands} />
          <CommandSection title="Planejamento" commands={planningCommands} />
          <CommandSection title="Especialistas" commands={specialistCommands} />

          {/* Fluxo Recomendado */}
          <div className="mt-6 sm:mt-8 bg-white border border-[#d8d2c1] rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6 font-display">FLUXO RECOMENDADO</h3>
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
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#e4b820] text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mx-auto mb-1.5 sm:mb-2 font-display">
                    {i + 1}
                  </div>
                  <code className="text-[10px] sm:text-sm font-bold text-[#8c4b32] block font-display">{item.cmd}</code>
                  <span className="text-[10px] sm:text-xs text-[#6f755a]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orquestrador */}
          <div className="mt-6 sm:mt-8 bg-[#6f755a] rounded-2xl p-4 sm:p-6 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Layers className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="text-lg sm:text-xl font-bold font-display">NÃO SABE QUAL COMANDO USAR?</h3>
            </div>
            <p className="text-white/80 mb-2 sm:mb-3 text-xs sm:text-sm">
              O comando <code className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded">*orquestrar</code> sugere a sequência ideal.
            </p>
            <div className="bg-black/20 rounded-lg p-3 sm:p-4 font-mono text-white text-sm sm:text-base">
              *orquestrar Meu app está lento
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d8d2c1] bg-white mt-10 sm:mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[#6f755a] text-xs sm:text-sm text-center sm:text-left">
              EMPIRE VIBE CODING - {totalCommands} comandos para desenvolver software com IA
            </p>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[#6f755a] hover:text-[#8c4b32] text-xs sm:text-sm"
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
