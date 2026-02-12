'use client'

import { MessageSquare, FileText, BookOpen, Zap, ArrowRight, GitBranch, FolderTree, Bot, Workflow, ChevronDown, ChevronUp, Terminal, Shield, CheckCircle, Rocket, Code, Sparkles, Layers, Globe, Brain, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

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
      className="p-1.5 rounded hover:bg-white/10 transition-colors"
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

function DiagramBox({ title, icon: Icon, children, color = 'blue' }: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan' | 'red'
}) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    pink: 'bg-pink-50 border-pink-200 text-pink-600',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  }

  return (
    <div className={`${colors[color]} border-2 rounded-xl p-4 sm:p-5`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5" />
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <div className="text-gray-700 text-sm">{children}</div>
    </div>
  )
}

function FlowStep({ number, title, description, icon: Icon }: {
  number: number
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        {number < 5 && <div className="w-0.5 h-8 bg-blue-200 my-2" />}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-5 w-5 text-blue-600" />
          <h4 className="font-bold text-gray-900">{title}</h4>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = true }: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-blue-600" />
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  )
}

// ===== PÁGINA PRINCIPAL =====
export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Empire"
                width={40}
                height={40}
                className="h-9 w-9 sm:h-10 sm:w-10"
                style={{ objectFit: 'contain' }}
              />
              <div>
                <h1 className="font-bold text-gray-900 text-sm sm:text-base">Como Funciona</h1>
                <p className="text-xs text-gray-500">Empire Vibe Coding</p>
              </div>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Ver Comandos
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ===== SEÇÃO 1: VISÃO GERAL ===== */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Como o Empire Vibe Coding Funciona
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Um sistema completo para desenvolver software com IA, mesmo sem saber programar.
            </p>
          </div>

          {/* Diagrama Principal */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">A Arquitetura Completa</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Usuário */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-6 w-6" />
                  <h4 className="font-bold">VOCÊ</h4>
                </div>
                <p className="text-blue-100 text-sm mb-3">
                  Digita comandos simples começando com <code className="bg-white/20 px-1.5 py-0.5 rounded">*</code>
                </p>
                <div className="bg-white/10 rounded-lg p-3 font-mono text-sm">
                  *começar<br/>
                  *bug<br/>
                  *desenvolver
                </div>
              </div>

              {/* IA */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="h-6 w-6" />
                  <h4 className="font-bold">CLAUDE (IA)</h4>
                </div>
                <p className="text-blue-100 text-sm mb-3">
                  Lê protocolos e executa o que foi pedido
                </p>
                <div className="bg-white/10 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span>Lê o protocolo</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span>Segue as regras</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span>Documenta tudo</span>
                  </div>
                </div>
              </div>

              {/* Resultado */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-6 w-6" />
                  <h4 className="font-bold">RESULTADO</h4>
                </div>
                <p className="text-blue-100 text-sm mb-3">
                  Código funcional + documentação completa
                </p>
                <div className="bg-white/10 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span>PRD.md</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span>ROADMAP.md</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>Código pronto</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Setas de conexão */}
            <div className="hidden md:flex items-center justify-center gap-4 mt-6 text-blue-200">
              <span className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                comando
              </span>
              <ArrowRight className="h-5 w-5" />
              <span className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                execução
              </span>
              <ArrowRight className="h-5 w-5" />
              <span className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                resultado
              </span>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 2: O CÉREBRO DO SISTEMA ===== */}
        <section className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            O Cérebro do Sistema: CLAUDE.md
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                O arquivo <code className="bg-gray-100 px-2 py-1 rounded">CLAUDE.md</code> é o &quot;manual de instruções&quot; que a IA lê toda vez que você inicia uma conversa. Ele contém:
              </p>

              <div className="space-y-3">
                <DiagramBox title="Lista de Comandos" icon={Terminal} color="blue">
                  Todos os 29 comandos e o que cada um faz
                </DiagramBox>
                <DiagramBox title="Regras de Documentação" icon={FileText} color="green">
                  Onde salvar cada tipo de informação
                </DiagramBox>
                <DiagramBox title="Regras de Comunicação" icon={MessageSquare} color="purple">
                  Como a IA deve falar (sem tecniquês!)
                </DiagramBox>
                <DiagramBox title="Referências" icon={BookOpen} color="orange">
                  Quais protocolos ler para cada situação
                </DiagramBox>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 text-sm overflow-x-auto">
              <div className="flex items-center gap-2 mb-3 text-gray-400">
                <FileText className="h-4 w-4" />
                <span>CLAUDE.md</span>
              </div>
              <pre className="text-gray-300 font-mono text-xs sm:text-sm whitespace-pre-wrap">
{`# CLAUDE.md - Orquestrador

═══════════════════════════════════════
## COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════

| Comando    | Ação              |
|------------|-------------------|
| *começar   | Iniciar projeto   |
| *bug       | Resolver problema |
| *desenvolver | Modo dev        |
...

═══════════════════════════════════════
## REGRA #1: DOCUMENTE TUDO
═══════════════════════════════════════

SEMPRE que fizer mudança:
1. Mudança → docs/MUDANCAS.md
2. Decisão → docs/DECISOES.md
3. Tarefa → docs/ROADMAP.md`}
              </pre>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 3: ESTRUTURA DE PASTAS ===== */}
        <section className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FolderTree className="h-6 w-6 text-blue-600" />
            Estrutura de Pastas
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagrama de pastas */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h4 className="font-bold text-gray-900 mb-4">Dois mundos separados:</h4>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderTree className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-blue-900">docs/</span>
                    <span className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded">SEU PROJETO</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-2">
                    Documentação do SEU projeto. A IA edita esses arquivos!
                  </p>
                  <div className="font-mono text-xs text-blue-600 bg-white/50 p-2 rounded">
                    PRD.md, ROADMAP.md, MUDANCAS.md, DECISOES.md
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-gray-600" />
                    <span className="font-bold text-gray-900">vibe-coding/</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">REFERÊNCIA</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Manual de referência. A IA CONSULTA, não edita.
                  </p>
                  <div className="font-mono text-xs text-gray-600 bg-white/50 p-2 rounded">
                    COMANDOS.md, PROTOCOLOS/, GLOSSARIO.md
                  </div>
                </div>
              </div>
            </div>

            {/* Visual da estrutura */}
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-300">
                <div className="text-green-400 mb-2">projeto/</div>
                <div className="ml-4 mb-1">
                  <span className="text-yellow-400">├──</span> <span className="text-blue-400">CLAUDE.md</span> <span className="text-gray-500">← Cérebro da IA</span>
                </div>
                <div className="ml-4 mb-1">
                  <span className="text-yellow-400">├──</span> <span className="text-green-400">docs/</span> <span className="text-gray-500">← Seu projeto</span>
                </div>
                <div className="ml-8 mb-1 text-gray-400">
                  ├── <span className="text-blue-400">PRD.md</span>
                </div>
                <div className="ml-8 mb-1 text-gray-400">
                  ├── <span className="text-blue-400">ROADMAP.md</span>
                </div>
                <div className="ml-8 mb-1 text-gray-400">
                  ├── <span className="text-blue-400">MUDANCAS.md</span>
                </div>
                <div className="ml-8 mb-1 text-gray-400">
                  └── <span className="text-blue-400">DECISOES.md</span>
                </div>
                <div className="ml-4">
                  <span className="text-yellow-400">└──</span> <span className="text-purple-400">vibe-coding/</span> <span className="text-gray-500">← Referência</span>
                </div>
                <div className="ml-8 mb-1 text-gray-400">
                  ├── <span className="text-purple-400">COMANDOS.md</span>
                </div>
                <div className="ml-8 mb-1 text-gray-400">
                  ├── <span className="text-purple-400">GLOSSARIO.md</span>
                </div>
                <div className="ml-8 text-gray-400">
                  └── <span className="text-purple-400">PROTOCOLOS/</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 4: FLUXO DE TRABALHO ===== */}
        <section className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Workflow className="h-6 w-6 text-blue-600" />
            Fluxo de Trabalho Recomendado
          </h3>

          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <FlowStep
                  number={1}
                  title="*começar"
                  description="Você descreve a ideia. A IA cria o PRD e o roadmap."
                  icon={Rocket}
                />
                <FlowStep
                  number={2}
                  title="*desenvolver"
                  description="A IA ativa o modo desenvolvimento e começa a codar."
                  icon={Code}
                />
                <FlowStep
                  number={3}
                  title="*mudança"
                  description="Cada mudança é registrada automaticamente."
                  icon={FileText}
                />
                <FlowStep
                  number={4}
                  title="*garantir"
                  description="Antes de publicar, a IA verifica qualidade."
                  icon={CheckCircle}
                />
                <FlowStep
                  number={5}
                  title="*lançar"
                  description="Checklist final antes de colocar no ar."
                  icon={Globe}
                />
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-4">O que acontece em cada passo:</h4>

                <div className="space-y-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-1">1. Planejamento</div>
                    <p className="text-gray-600">PRD.md é criado com objetivos, escopo e métricas de sucesso.</p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-1">2. Desenvolvimento</div>
                    <p className="text-gray-600">Código é escrito seguindo o protocolo de desenvolvimento.</p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-1">3. Documentação</div>
                    <p className="text-gray-600">MUDANCAS.md e ROADMAP.md são atualizados automaticamente.</p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-1">4. Qualidade</div>
                    <p className="text-gray-600">*garantir é o único comando que pode aprovar mudanças.</p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-1">5. Lançamento</div>
                    <p className="text-gray-600">Checklist completo: segurança, performance, SEO, etc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 5: PROTOCOLOS ===== */}
        <section className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            O que são Protocolos?
          </h3>

          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              Protocolos são <strong>guias detalhados</strong> que ensinam a IA como executar cada comando.
              Pense como uma receita de bolo: a IA segue passo a passo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DiagramBox title="00-INICIAR.md" icon={Rocket} color="blue">
                Como começar um projeto do zero: setup, estrutura, configurações
              </DiagramBox>
              <DiagramBox title="01-DESENVOLVER.md" icon={Code} color="green">
                Rotina diária de desenvolvimento: testar, codar, documentar
              </DiagramBox>
              <DiagramBox title="02-BUGS.md" icon={Shield} color="red">
                Metodologia para investigar e corrigir bugs
              </DiagramBox>
              <DiagramBox title="05-LANCAR.md" icon={Globe} color="purple">
                Checklist completo antes de publicar
              </DiagramBox>
              <DiagramBox title="06-SEGURANCA.md" icon={Shield} color="orange">
                Auditoria OWASP Top 10, RLS, npm audit
              </DiagramBox>
              <DiagramBox title="18-PRD.md" icon={FileText} color="cyan">
                Gerador de PRD com 20 seções completas
              </DiagramBox>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 text-sm overflow-x-auto">
            <div className="flex items-center gap-2 mb-3 text-gray-400">
              <FileText className="h-4 w-4" />
              <span>Exemplo: PROTOCOLOS/02-BUGS.md</span>
            </div>
            <pre className="text-gray-300 font-mono text-xs sm:text-sm whitespace-pre-wrap">
{`# Protocolo de Bugs (*bug)

## Passo 1: Coletar Informações
- O que estava fazendo quando deu erro?
- Qual mensagem apareceu?
- Consegue reproduzir?

## Passo 2: Investigar
- Ler o código relacionado
- Verificar logs de erro
- Testar hipóteses

## Passo 3: Corrigir
- Fazer a menor mudança possível
- Testar se resolveu
- Atualizar MUDANCAS.md

## Passo 4: Documentar
- O que era o bug
- O que causava
- Como foi corrigido`}
            </pre>
          </div>
        </section>

        {/* ===== SEÇÃO 6: REGRAS IMPORTANTES ===== */}
        <section className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Regras Importantes
          </h3>

          <div className="space-y-4">
            <CollapsibleSection title="Regra #1: Documente TUDO" icon={FileText}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-bold text-green-800 mb-2">Mudança implementada</h5>
                  <code className="text-green-700 bg-green-100 px-2 py-1 rounded text-sm">docs/MUDANCAS.md</code>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-bold text-blue-800 mb-2">Decisão técnica</h5>
                  <code className="text-blue-700 bg-blue-100 px-2 py-1 rounded text-sm">docs/DECISOES.md</code>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-bold text-purple-800 mb-2">Tarefa concluída</h5>
                  <code className="text-purple-700 bg-purple-100 px-2 py-1 rounded text-sm">docs/ROADMAP.md</code>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-bold text-orange-800 mb-2">Arquitetura mudou</h5>
                  <code className="text-orange-700 bg-orange-100 px-2 py-1 rounded text-sm">docs/ARQUITETURA.md</code>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Regra #2: *garantir é ESPECIAL" icon={CheckCircle} defaultOpen={true}>
              <div className="mt-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800">
                    <strong>*garantir</strong> é o <strong>ÚNICO</strong> comando que pode marcar checkboxes em MUDANCAS.md e aprovar mudanças para produção.
                  </p>
                </div>
                <p className="text-gray-600">
                  Isso garante que nenhuma mudança vai para produção sem uma verificação de qualidade explícita.
                </p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Regra #3: Sem tecniquês!" icon={MessageSquare}>
              <div className="mt-4">
                <p className="text-gray-600 mb-4">
                  A IA sempre explica as coisas de forma simples, usando analogias do dia a dia:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-red-400 text-xs mb-1">NUNCA</div>
                    <p className="text-red-700">&quot;deploy&quot;, &quot;commit&quot;, &quot;API&quot;</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-green-400 text-xs mb-1">SEMPRE</div>
                    <p className="text-green-700">&quot;publicar&quot;, &quot;salvar versão&quot;, &quot;sistema que conversa&quot;</p>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </section>

        {/* ===== SEÇÃO 7: COMO COMEÇAR ===== */}
        <section className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            Como Começar
          </h3>

          {/* Aviso importante */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 sm:p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-700 font-bold text-sm">!</span>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Importante: Instalação por Projeto</h4>
                <p className="text-amber-800 text-sm">
                  O Empire Vibe Coding se instala <strong>dentro de cada projeto</strong>, não no computador inteiro.
                  Você precisa repetir a instalação para cada projeto novo que criar.
                </p>
              </div>
            </div>
          </div>

          {/* Passo a passo detalhado */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
            <h4 className="font-bold text-gray-900 mb-6 text-lg">Passo a Passo Completo</h4>

            <div className="space-y-6">
              {/* Passo 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <h5 className="font-bold text-gray-900 mb-2">Crie uma pasta para seu projeto</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    Se ainda não tem uma pasta, crie uma. Pode ser qualquer nome.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                    <span className="text-gray-400">$</span>{' '}
                    <span className="text-green-400">mkdir</span>{' '}
                    <span className="text-blue-300">meu-app</span>
                    <span className="text-gray-500">{' & '}cd meu-app</span>
                  </div>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <h5 className="font-bold text-gray-900 mb-2">Execute o comando de instalação</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    Esse comando baixa todos os arquivos do Empire Vibe Coding para dentro da sua pasta.
                  </p>

                  {/* Opção 1: npx */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-medium">RECOMENDADO</span>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                      <div className="flex items-center gap-2">
                        <code className="text-blue-400 text-sm flex-1">
                          npx create-empire-vibe-coding
                        </code>
                        <CopyButton text="npx create-empire-vibe-coding" />
                      </div>
                    </div>
                  </div>

                  {/* Opção 2: curl */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded font-medium">ALTERNATIVO</span>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                      <div className="flex items-center gap-2">
                        <code className="text-green-400 text-sm flex-1">
                          curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
                        </code>
                        <CopyButton text="curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <h5 className="font-bold text-gray-900 mb-2">Abra o Claude Code</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    O Claude Code é o programa onde você vai conversar com a IA. Digite no terminal:
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                    <span className="text-gray-400">$</span>{' '}
                    <span className="text-blue-300">claude</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Se não funcionar, você precisa instalar o Claude Code primeiro.{' '}
                    <a href="https://docs.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Ver como instalar
                    </a>
                  </p>
                </div>
              </div>

              {/* Passo 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <h5 className="font-bold text-gray-900 mb-2">Digite *começar e sua ideia</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    Agora é só conversar com a IA! Comece com o comando <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-700">*começar</code>:
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm space-y-1">
                    <div>
                      <span className="text-blue-400">&gt;</span>{' '}
                      <span className="text-yellow-300">*começar</span>
                    </div>
                    <div className="text-gray-400">
                      <span>&gt;</span> Quero criar um app de tarefas para organizar meu dia a dia
                    </div>
                  </div>
                </div>
              </div>

              {/* Passo 5 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 mb-2">Pronto! A IA vai te guiar</h5>
                  <p className="text-gray-600 text-sm">
                    A IA vai fazer perguntas, planejar o projeto, criar a documentação e começar a desenvolver.
                    Você só precisa responder as perguntas e confirmar as ações!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* O que é criado */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <h4 className="font-bold text-blue-900 mb-3">O que a instalação cria na sua pasta:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3">
                <code className="text-blue-600">CLAUDE.md</code>
                <p className="text-gray-600 text-xs mt-1">Cérebro da IA</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <code className="text-blue-600">docs/</code>
                <p className="text-gray-600 text-xs mt-1">Sua documentação</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <code className="text-blue-600">vibe-coding/</code>
                <p className="text-gray-600 text-xs mt-1">Manuais de referência</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 8: RESUMO VISUAL ===== */}
        <section className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Layers className="h-6 w-6 text-blue-600" />
            Resumo Visual
          </h3>

          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">29</div>
                <div className="text-gray-600 text-sm">Comandos</div>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">18</div>
                <div className="text-gray-600 text-sm">Protocolos</div>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1">8</div>
                <div className="text-gray-600 text-sm">Categorias</div>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-1">1</div>
                <div className="text-gray-600 text-sm">Comando de Aprovação</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">8 Categorias de Comandos:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-blue-50 text-blue-700 rounded-lg p-3 text-center text-sm font-medium">
                  Principais (7)
                </div>
                <div className="bg-green-50 text-green-700 rounded-lg p-3 text-center text-sm font-medium">
                  Documentação (5)
                </div>
                <div className="bg-purple-50 text-purple-700 rounded-lg p-3 text-center text-sm font-medium">
                  Design & UX (2)
                </div>
                <div className="bg-red-50 text-red-700 rounded-lg p-3 text-center text-sm font-medium">
                  Qualidade (4)
                </div>
                <div className="bg-orange-50 text-orange-700 rounded-lg p-3 text-center text-sm font-medium">
                  Infra & Banco (2)
                </div>
                <div className="bg-cyan-50 text-cyan-700 rounded-lg p-3 text-center text-sm font-medium">
                  Automação (3)
                </div>
                <div className="bg-pink-50 text-pink-700 rounded-lg p-3 text-center text-sm font-medium">
                  Planejamento (3)
                </div>
                <div className="bg-amber-50 text-amber-700 rounded-lg p-3 text-center text-sm font-medium">
                  Especialistas (3)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg shadow-blue-500/25"
          >
            <Rocket className="h-5 w-5" />
            Começar Agora
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Empire"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
                style={{ objectFit: 'contain' }}
              />
              <p className="text-gray-500 text-sm">
                Empire Vibe Coding - Desenvolva software com IA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
