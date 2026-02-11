'use client'

import { Rocket, Code, Bug, AlertCircle, BookOpen, Shield, Upload, Map, FileText, RefreshCw, Settings, BarChart3, Users, Search, Sparkles, HelpCircle, Copy, Check, Terminal, Github, Download, FolderOpen, ChevronDown, ChevronUp, Palette, MousePointer, Star, CheckCircle, Database, Layers, GitBranch, ListTodo, Calendar, Brain } from 'lucide-react'
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
  { cmd: '*começar', name: 'Iniciar Projeto', description: 'Planeja o projeto do zero, preenche o PRD e cria o roadmap', example: '*começar\n\nQuero criar um app de tarefas', icon: Rocket, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*desenvolver', name: 'Modo Desenvolvimento', description: 'Ativa o protocolo de desenvolvimento diário', icon: Code, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*bug', name: 'Resolver Bug', description: 'Investiga e corrige problemas no código', example: '*bug\n\nO login não funciona', icon: Bug, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*erro', name: 'Resolver Erro', description: 'Ajuda a resolver erros e mensagens de erro do terminal', example: '*erro\n\nnpm ERR! code ERESOLVE', icon: AlertCircle, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*termo', name: 'Explicar Termo', description: 'Explica termos técnicos com analogias simples do dia a dia', example: '*termo\n\nO que é API?', icon: BookOpen, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*comando', name: 'Verificar Comando', description: 'Verifica se um comando é perigoso antes de executar', example: '*comando\n\nrm -rf node_modules', icon: Shield, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*lançar', name: 'Preparar Lançamento', description: 'Checklist completo antes de publicar o projeto', icon: Upload, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
]

const docCommands: Command[] = [
  { cmd: '*roadmap', name: 'Ver Roadmap', description: 'Mostra os próximos passos e progresso do projeto', icon: Map, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*decisão', name: 'Registrar Decisão', description: 'Adiciona uma decisão técnica (ADR) na documentação', example: '*decisão\n\nVamos usar PostgreSQL', icon: FileText, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*mudança', name: 'Registrar Mudança', description: 'Atualiza o changelog com a mudança feita', example: '*mudança\n\nAdicionei página de login', icon: RefreshCw, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*arquitetura', name: 'Atualizar Arquitetura', description: 'Atualiza a documentação de arquitetura', icon: Settings, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*status', name: 'Ver Status', description: 'Resumo de onde o projeto está e o que falta', icon: BarChart3, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
]

const designCommands: Command[] = [
  { cmd: '*design', name: 'Design System', description: 'Configura cores, tipografia, tokens e Tailwind', example: '*design\n\nQuero criar o design system do app', icon: Palette, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*ux', name: 'UX Design', description: 'Aplica heurísticas de Nielsen, estados e acessibilidade', example: '*ux\n\nRevisar fluxo de checkout', icon: MousePointer, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
]

const qualityCommands: Command[] = [
  { cmd: '*seguranca', name: 'Auditoria de Segurança', description: 'Checklist OWASP Top 10, RLS, npm audit', icon: Shield, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*qualidade', name: 'Checar Qualidade', description: 'Code smells, SOLID, métricas, cobertura', icon: Star, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*garantir', name: 'Garantidor de Qualidade', description: 'ÚNICO que pode aprovar mudanças', icon: CheckCircle, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*revisar', name: 'Code Review', description: 'Faz revisão completa do código', icon: Search, color: 'bg-[#bec3bf] text-black' },
]

const infraCommands: Command[] = [
  { cmd: '*banco', name: 'Saúde do Banco', description: 'Queries de diagnóstico, índices, VACUUM', example: '*banco\n\nO app está lento', icon: Database, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*supabase', name: 'Configurar Supabase', description: 'CLI setup, MCP config, RLS', icon: Layers, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
]

const automationCommands: Command[] = [
  { cmd: '*workflow', name: 'Criar Workflows', description: 'GitHub Actions, CI/CD, automações', example: '*workflow\n\nQuero CI para testes', icon: GitBranch, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*orquestrar', name: 'Orquestrar Comandos', description: 'Combina múltiplos comandos', example: '*orquestrar\n\nMeu app está lento', icon: Layers, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*tarefas', name: 'Gerenciar Tarefas', description: 'TaskCreate/Update/Get/List do Claude Code', icon: ListTodo, color: 'bg-[#bec3bf] text-black' },
]

const planningCommands: Command[] = [
  { cmd: '*planejar', name: 'Planejamento Detalhado', description: 'WBS, estimativas, riscos, critérios', example: '*planejar\n\nSistema de pagamentos', icon: Calendar, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*especificar', name: 'Criar Spec', description: 'Cria especificação técnica de uma feature', example: '*especificar\n\nSistema de pagamento', icon: FileText, color: 'bg-[#bec3bf] text-black' },
]

const specialistCommands: Command[] = [
  { cmd: '*nerd', name: 'Problemas Complexos', description: 'Debug profundo, profiling, otimização', example: '*nerd\n\nMemory leak no Node', icon: Brain, color: 'bg-[#bec3bf] text-black' },
  { cmd: '*agentes', name: 'Agent Teams', description: 'Cria equipe de agentes para tarefas complexas', example: '*agentes\n\nO app está lento', icon: Users, color: 'bg-[#1e2a38] text-[#f2f2f2]' },
  { cmd: '*melhorar', name: 'Melhorar Código', description: 'Sugere refatorações e melhorias', icon: Sparkles, color: 'bg-[#bec3bf] text-black' },
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
      className="p-2 hover:bg-[#1e2a38] rounded transition-colors flex-shrink-0"
      title="Copiar"
    >
      {copied ? (
        <Check className="h-4 w-4 text-[#bec3bf]" />
      ) : (
        <Copy className="h-4 w-4 text-[#bec3bf]" />
      )}
    </button>
  )
}

function CommandCard({ command }: { command: Command }) {
  return (
    <div className="bg-[#1e2a38] border border-[#bec3bf]/20 rounded-lg p-5 hover:border-[#bec3bf]/40 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${command.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <command.icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <code className="text-lg font-bold text-[#f2f2f2] font-display">{command.cmd}</code>
          </div>
          <h3 className="font-semibold text-[#f2f2f2] mb-1">{command.name}</h3>
          <p className="text-[#bec3bf] text-sm">{command.description}</p>
          {command.example && (
            <div className="mt-3 bg-black/50 rounded-lg p-3 relative group border border-[#bec3bf]/10">
              <div className="flex items-start justify-between gap-2">
                <code className="text-sm text-[#bec3bf] whitespace-pre-line flex-1">{command.example}</code>
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
      <div className="flex-shrink-0 w-8 h-8 bg-[#bec3bf] text-black rounded-full flex items-center justify-center font-bold text-sm font-display">
        {number}
      </div>
      <div className="flex-1 pb-6">
        <h3 className="font-semibold text-[#f2f2f2] mb-2">{title}</h3>
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
          <ChevronUp className="h-5 w-5 text-[#bec3bf] group-hover:text-[#f2f2f2]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#bec3bf] group-hover:text-[#f2f2f2]" />
        )}
        <h3 className="text-xl font-bold text-[#f2f2f2] group-hover:text-[#bec3bf] transition-colors font-display">{title}</h3>
        <span className="text-sm text-[#bec3bf]/60">({commands.length})</span>
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
  const totalCommands = mainCommands.length + docCommands.length + designCommands.length +
    qualityCommands.length + infraCommands.length + automationCommands.length +
    planningCommands.length + specialistCommands.length

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-[#bec3bf]/20 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-dark.png"
                alt="Empire"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <h1 className="font-bold text-[#f2f2f2] font-display">EMPIRE VIBE CODING</h1>
                <p className="text-sm text-[#bec3bf]">{totalCommands} comandos para desenvolver com IA</p>
              </div>
            </div>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2f2f2] text-black rounded-lg hover:bg-[#bec3bf] transition-colors text-sm font-semibold font-display"
            >
              <Github className="h-4 w-4" />
              GITHUB
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ===== SEÇÃO 1: COMO INSTALAR ===== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#bec3bf] rounded-xl flex items-center justify-center">
              <Download className="h-6 w-6 text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#f2f2f2] font-display">COMO INSTALAR</h2>
              <p className="text-[#bec3bf]">Configure o Empire Vibe Coding no seu projeto em menos de 1 minuto</p>
            </div>
          </div>

          {/* Instalação Rápida */}
          <div className="bg-[#1e2a38] rounded-2xl p-6 mb-8 border border-[#bec3bf]/20">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-[#bec3bf]" />
              <h3 className="text-lg font-semibold text-[#f2f2f2] font-display">INSTALAÇÃO RÁPIDA</h3>
            </div>
            <p className="text-[#bec3bf] mb-4 text-sm">
              Abra o terminal na pasta do seu projeto e execute:
            </p>
            <div className="bg-black rounded-lg p-4 flex items-center justify-between gap-4 border border-[#bec3bf]/10">
              <code className="text-[#bec3bf] text-sm sm:text-base overflow-x-auto">
                curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
              </code>
              <CopyButton text="curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash" />
            </div>
          </div>

          {/* Passo a Passo */}
          <div className="bg-[#1e2a38] rounded-2xl border border-[#bec3bf]/20 p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#f2f2f2] mb-6 font-display">PASSO A PASSO</h3>

            <InstallStep number={1} title="Abra o terminal na pasta do seu projeto">
              <p className="text-[#bec3bf] text-sm mb-2">
                No VS Code: <kbd className="px-2 py-1 bg-black rounded text-xs border border-[#bec3bf]/30">Ctrl + `</kbd> ou menu Terminal → New Terminal
              </p>
              <p className="text-[#bec3bf] text-sm">
                Ou navegue até a pasta: <code className="bg-black px-2 py-1 rounded text-sm border border-[#bec3bf]/30">cd caminho/do/seu/projeto</code>
              </p>
            </InstallStep>

            <InstallStep number={2} title="Execute o comando de instalação">
              <p className="text-[#bec3bf] text-sm mb-3">
                Cole e execute o comando acima. O script vai:
              </p>
              <ul className="text-sm text-[#bec3bf] space-y-1">
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-[#bec3bf]" />
                  Criar pasta <code className="bg-black px-1 rounded border border-[#bec3bf]/30">vibe-coding/</code> com documentação
                </li>
                <li className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-[#bec3bf]" />
                  Criar pasta <code className="bg-black px-1 rounded border border-[#bec3bf]/30">docs/</code> para seu projeto
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#bec3bf]" />
                  Criar <code className="bg-black px-1 rounded border border-[#bec3bf]/30">CLAUDE.md</code> na raiz
                </li>
              </ul>
            </InstallStep>

            <InstallStep number={3} title="Abra o Claude Code na pasta">
              <p className="text-[#bec3bf] text-sm mb-2">
                Digite no terminal:
              </p>
              <div className="bg-black rounded-lg p-3 flex items-center justify-between border border-[#bec3bf]/10">
                <code className="text-[#bec3bf]">claude</code>
                <CopyButton text="claude" />
              </div>
            </InstallStep>

            <div className="flex gap-4 pl-12">
              <div className="flex-1 pb-0">
                <h3 className="font-semibold text-[#f2f2f2] mb-2">Pronto!</h3>
                <p className="text-[#bec3bf] text-sm">
                  Agora digite <code className="bg-[#bec3bf] text-black px-2 py-1 rounded font-bold">*começar</code> e descreva sua ideia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 2: COMO USAR OS COMANDOS ===== */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#bec3bf] rounded-xl flex items-center justify-center">
              <Terminal className="h-6 w-6 text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#f2f2f2] font-display">COMANDOS ({totalCommands})</h2>
              <p className="text-[#bec3bf]">Digite os comandos * no Claude Code para ativar cada função</p>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-[#bec3bf] rounded-2xl p-6 text-black mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="h-6 w-6" />
              <h3 className="text-xl font-bold font-display">PARA COMEÇAR UM PROJETO DO ZERO</h3>
            </div>
            <p className="text-black/70 mb-3 text-sm">
              Digite isso no Claude Code e descreva sua ideia:
            </p>
            <div className="bg-black/20 backdrop-blur rounded-lg p-4 font-mono text-xl text-black font-bold">
              *começar
            </div>
            <p className="text-black/60 mt-3 text-sm">
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
          <div className="mt-8 bg-[#1e2a38] border border-[#bec3bf]/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#f2f2f2] mb-6 font-display">FLUXO RECOMENDADO</h3>
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
                  <div className="w-8 h-8 bg-[#bec3bf] text-black rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2 font-display">
                    {i + 1}
                  </div>
                  <code className="text-sm font-bold text-[#bec3bf] block font-display">{item.cmd}</code>
                  <span className="text-xs text-[#bec3bf]/60">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="bg-[#1e2a38] border border-[#bec3bf]/20 rounded-xl p-5">
              <h4 className="font-semibold text-[#f2f2f2] mb-2 font-display">COMANDOS + CONTEXTO</h4>
              <p className="text-[#bec3bf] text-sm mb-2">
                Adicione contexto após o comando:
              </p>
              <code className="block text-sm bg-black/50 p-3 rounded text-[#bec3bf] border border-[#bec3bf]/10">
                *bug O login parou de funcionar depois do último update
              </code>
            </div>
            <div className="bg-[#1e2a38] border border-[#bec3bf]/20 rounded-xl p-5">
              <h4 className="font-semibold text-[#f2f2f2] mb-2 font-display">PRECISA DE AJUDA?</h4>
              <p className="text-[#bec3bf] text-sm mb-2">
                Digite para ver todos os comandos:
              </p>
              <code className="block text-sm bg-black/50 p-3 rounded text-[#bec3bf] text-xl font-bold border border-[#bec3bf]/10 font-display">
                *ajuda
              </code>
            </div>
          </div>

          {/* Orquestrador */}
          <div className="mt-8 bg-[#bec3bf] rounded-2xl p-6 text-black">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-6 w-6" />
              <h3 className="text-xl font-bold font-display">NÃO SABE QUAL COMANDO USAR?</h3>
            </div>
            <p className="text-black/70 mb-3 text-sm">
              O comando <code className="bg-black/20 px-2 py-1 rounded">*orquestrar</code> analisa seu problema e sugere a sequência ideal de comandos.
            </p>
            <div className="bg-black/20 backdrop-blur rounded-lg p-4 font-mono text-black">
              *orquestrar Meu app está lento e não sei por quê
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#bec3bf]/20 bg-black mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#bec3bf] text-sm">
              EMPIRE VIBE CODING - {totalCommands} comandos para desenvolver software com IA
            </p>
            <a
              href="https://github.com/Empire-Business/empire-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#bec3bf] hover:text-[#f2f2f2] text-sm"
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
