'use client'

import { FileText, Rocket, CheckCircle, AlertTriangle, Wrench, Package, Shield } from 'lucide-react'
import { Card } from '@/components/Card'
import Link from 'next/link'

const PROTOCOLS = [
  {
    id: 'planning',
    href: '/protocols/planning',
    icon: Rocket,
    title: 'Planejamento Inicial',
    description: 'Como começar um projeto do zero, definindo escopo, tecnologias e arquitetura.',
    sections: ['Definição do projeto', 'Escolha de stack', 'Arquitetura básica'],
  },
  {
    id: 'development',
    href: '/protocols/development',
    icon: CheckCircle,
    title: 'Desenvolvimento',
    description: 'Fluxo de trabalho diário para construir features de forma eficiente.',
    sections: ['Check-in', 'Feature development', 'Testing', 'Commit'],
  },
  {
    id: 'bugs',
    href: '/protocols/bugs',
    icon: Wrench,
    title: 'Correção de Bugs',
    description: 'Processo para identificar, entender e corrigir bugs de forma sistemática.',
    sections: ['Identificação', 'Root cause', 'Fix', 'Testing'],
  },
  {
    id: 'improvement',
    href: '/protocols/improvement',
    icon: Package,
    title: 'Aprimoramento',
    description: 'Como melhorar features existentes sem quebrar o que já funciona.',
    sections: ['Análise', 'Planejamento', 'Refatoração', 'Validação'],
  },
  {
    id: 'maintenance',
    href: '/protocols/maintenance',
    icon: Shield,
    title: 'Manutenção',
    description: 'Cuidar de projetos prontos: updates, monitoramento e melhorias contínuas.',
    sections: ['Dependências', 'Monitoramento', 'Atualizações'],
  },
  {
    id: 'launch',
    href: '/protocols/launch',
    icon: AlertTriangle,
    title: 'Checklist de Lançamento',
    description: 'Lista de verificação completa antes de colocar o projeto em produção.',
    sections: ['Preparação', 'Deploy', 'Monitoramento', 'Suporte'],
  },
]

export default function ProtocolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-primary-100 rounded-lg">
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Protocolos de Desenvolvimento</h1>
            <p className="text-gray-600 mt-1">Guias passo a passo para cada fase do projeto</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">O que são Protocolos?</h2>
        <p className="text-blue-800 leading-relaxed">
          Protocolos são guias estruturados que você segue durante o desenvolvimento. Eles garantem que você
          não esqueça passos importantes, mantém qualidade consistente, e facilita colaboração.
        </p>
      </div>

      {/* Protocol Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROTOCOLS.map(protocol => (
          <div
            key={protocol.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <protocol.icon className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{protocol.title}</h3>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{protocol.description}</p>

              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Conteúdo</h4>
                <ul className="space-y-1">
                  {protocol.sections.map((section, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2" />
                      {section}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={protocol.href}
                className={`inline-flex items-center text-sm font-medium ${
                  protocol.href === '#'
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary-600 hover:text-primary-700'
                }`}
              >
                {protocol.href === '#' ? 'Em breve' : 'Ver protocolo →'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Por onde começar?</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <p className="text-gray-700">
              Se você está <strong>começando um projeto</strong>: siga o{' '}
              <Link href="/protocols/planning" className="text-primary-600 hover:underline">
                Planejamento Inicial
              </Link>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <p className="text-gray-700">
              Se você está <strong>desenvolvendo features</strong>: siga o protocolo de{' '}
              <Link href="/protocols/development" className="text-primary-600 hover:underline">
                Desenvolvimento
              </Link>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <p className="text-gray-700">
              Se encontrou um <strong>bug</strong>: use o{' '}
              <Link href="/troubleshooting" className="text-primary-600 hover:underline">
                Troubleshooting
              </Link>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              4
            </div>
            <p className="text-gray-700">
              Se está <strong>lançando o projeto</strong>: use o{' '}
              <span className="text-primary-600">Checklist de Lançamento</span> (em breve)
            </p>
          </div>
        </div>
      </div>

      {/* Related Docs */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Documentação Relacionada</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            href="/glossary"
            iconEmoji="📖"
            title="Glossário"
            description="Entenda os termos técnicos usados nos protocolos."
          />
          <Card
            href="/flags"
            iconEmoji="🚩"
            title="Bandeiras Vermelhas"
            description="Comandos perigosos a evitar durante o desenvolvimento."
          />
          <Card
            href="/troubleshooting"
            iconEmoji="🔧"
            title="Troubleshooting"
            description="Solução de erros comuns durante o desenvolvimento."
          />
        </div>
      </div>
    </div>
  )
}
