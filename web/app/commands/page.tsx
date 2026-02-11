'use client'

import { Rocket, Code, Bug, AlertCircle, BookOpen, Shield, Upload, Map, FileText, RefreshCw, Settings, BarChart3, Users, Search, Sparkles, HelpCircle, Copy, Check, Terminal } from 'lucide-react'
import { useState } from 'react'

interface Command {
  cmd: string
  name: string
  description: string
  example?: string
  icon: React.ElementType
  color: string
}

const mainCommands: Command[] = [
  { cmd: '*começar', name: 'Iniciar Projeto', description: 'Planeja o projeto do zero, preenche o PRD e cria o roadmap', example: '*começar\nQuero criar um app de tarefas', icon: Rocket, color: 'bg-blue-100 text-blue-600' },
  { cmd: '*desenvolver', name: 'Modo Desenvolvimento', description: 'Ativa o protocolo de desenvolvimento diário', icon: Code, color: 'bg-green-100 text-green-600' },
  { cmd: '*bug', name: 'Resolver Bug', description: 'Investiga e corrige problemas no código', example: '*bug\nO login não funciona', icon: Bug, color: 'bg-red-100 text-red-600' },
  { cmd: '*erro', name: 'Resolver Erro', description: 'Ajuda a resolver erros e mensagens de erro', example: '*erro\nnpm ERR! code ERESOLVE', icon: AlertCircle, color: 'bg-orange-100 text-orange-600' },
  { cmd: '*termo', name: 'Explicar Termo', description: 'Explica termos técnicos com analogias simples', example: '*termo\nO que é API?', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
  { cmd: '*comando', name: 'Verificar Comando', description: 'Verifica se um comando é perigoso antes de executar', example: '*comando\nrm -rf node_modules', icon: Shield, color: 'bg-yellow-100 text-yellow-600' },
  { cmd: '*lançar', name: 'Preparar Lançamento', description: 'Checklist completo antes de publicar o projeto', icon: Upload, color: 'bg-indigo-100 text-indigo-600' },
]

const docCommands: Command[] = [
  { cmd: '*roadmap', name: 'Ver Roadmap', description: 'Mostra os próximos passos e progresso do projeto', icon: Map, color: 'bg-cyan-100 text-cyan-600' },
  { cmd: '*decisão', name: 'Registrar Decisão', description: 'Adiciona uma decisão técnica (ADR) na documentação', example: '*decisão\nVamos usar PostgreSQL', icon: FileText, color: 'bg-teal-100 text-teal-600' },
  { cmd: '*mudança', name: 'Registrar Mudança', description: 'Atualiza o changelog com a mudança feita', example: '*mudança\nAdicionei página de login', icon: RefreshCw, color: 'bg-lime-100 text-lime-600' },
  { cmd: '*arquitetura', name: 'Atualizar Arquitetura', description: 'Atualiza a documentação de arquitetura', icon: Settings, color: 'bg-gray-100 text-gray-600' },
  { cmd: '*status', name: 'Ver Status', description: 'Resumo de onde o projeto está e o que falta', icon: BarChart3, color: 'bg-pink-100 text-pink-600' },
]

const advancedCommands: Command[] = [
  { cmd: '*agentes', name: 'Agent Teams', description: 'Cria equipe de agentes para tarefas complexas', example: '*agentes\nO app está lento', icon: Users, color: 'bg-violet-100 text-violet-600' },
  { cmd: '*revisar', name: 'Code Review', description: 'Faz revisão completa do código', icon: Search, color: 'bg-amber-100 text-amber-600' },
  { cmd: '*melhorar', name: 'Melhorar Código', description: 'Sugere refatorações e melhorias', icon: Sparkles, color: 'bg-rose-100 text-rose-600' },
  { cmd: '*especificar', name: 'Criar Spec', description: 'Cria especificação técnica de uma feature', example: '*especificar\nSistema de pagamento', icon: FileText, color: 'bg-slate-100 text-slate-600' },
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
      className="p-2 hover:bg-gray-200 rounded transition-colors"
      title="Copiar comando"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600" />
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
              <div className="flex items-center justify-between">
                <code className="text-sm text-gray-700 whitespace-pre-line">{command.example}</code>
                <CopyButton text={command.example?.split('\n')[0] || command.cmd} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CommandsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Comandos</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Digite esses comandos no Claude Code para ativar funções específicas.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Para começar um projeto do zero</h2>
        </div>
        <p className="text-primary-100 mb-4">
          Digite isso no Claude Code e descreva sua ideia:
        </p>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 font-mono text-lg">
          *começar
        </div>
        <p className="text-primary-200 mt-4 text-sm">
          O Claude vai te guiar pelo planejamento, criar o PRD e o roadmap.
        </p>
      </div>

      {/* Main Commands */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comandos Principais</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mainCommands.map((cmd) => (
            <CommandCard key={cmd.cmd} command={cmd} />
          ))}
        </div>
      </section>

      {/* Documentation Commands */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comandos de Documentação</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {docCommands.map((cmd) => (
            <CommandCard key={cmd.cmd} command={cmd} />
          ))}
        </div>
      </section>

      {/* Advanced Commands */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comandos Avançados</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {advancedCommands.map((cmd) => (
            <CommandCard key={cmd.cmd} command={cmd} />
          ))}
        </div>
      </section>

      {/* Help Command */}
      <section className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Precisa de ajuda?</h3>
          </div>
          <code className="text-xl font-bold text-gray-700">*ajuda</code>
          <p className="text-gray-600 mt-2">
            Mostra todos os comandos disponíveis diretamente no Claude Code.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Fluxo Recomendado</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <code className="font-bold text-primary-600">*começar</code>
                <p className="text-gray-600 text-sm">Planeja o projeto, cria PRD e Roadmap</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <code className="font-bold text-primary-600">*desenvolver</code>
                <p className="text-gray-600 text-sm">Desenvolve as features do projeto</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <code className="font-bold text-primary-600">*mudança</code>
                <p className="text-gray-600 text-sm">Documenta cada mudança no Changelog</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <code className="font-bold text-primary-600">*bug</code>
                <p className="text-gray-600 text-sm">Quando encontrar problemas</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">5</span>
              <div>
                <code className="font-bold text-primary-600">*lançar</code>
                <p className="text-gray-600 text-sm">Checklist antes de publicar</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Pro Tips */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dicas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-blue-900 mb-2">Comandos + Contexto</h3>
            <p className="text-blue-700 text-sm">
              Você pode adicionar contexto após o comando:
            </p>
            <code className="block mt-2 text-sm bg-blue-100 p-2 rounded text-blue-800">
              *bug O login parou de funcionar depois do último update
            </code>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-900 mb-2">Sempre Documente</h3>
            <p className="text-green-700 text-sm">
              Após cada mudança, use <code className="bg-green-100 px-1 rounded">*mudança</code> para manter o Changelog atualizado.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
