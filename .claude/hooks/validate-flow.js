#!/usr/bin/env node

/**
 * Empire Vibe Coding - Flow Validator Hook
 *
 * Este script valida se o fluxo de desenvolvimento está sendo seguido corretamente.
 * Bloqueia operações de desenvolvimento se os documentos obrigatórios não existirem.
 *
 * Regras:
 * - Antes de desenvolver, PRD deve existir
 * - Antes de desenvolver, Arquitetura deve existir
 */

const fs = require('fs');
const path = require('path');

// Arquivos aceitos para cada documento
const PRD_FILES = [
  'docs/PRD.md',
  'docs/requisitos.md',
  'docs/prd.md'
];

const ARCHITECTURE_FILES = [
  'docs/ARQUITETURA.md',
  'docs/arquitetura.md',
  'docs/ARCHITECTURE.md'
];

// Palavras-chave que indicam desenvolvimento
const DEV_KEYWORDS = [
  'desenvolver',
  'develop',
  'implement',
  'implementar',
  'codar',
  'code',
  'criar componente',
  'create component',
  'feature',
  'funcionalidade'
];

// Palavras-chave que são permitidas sem documentos
const ALLOWED_KEYWORDS = [
  'prd',
  'requisito',
  'requirement',
  'arquitetura',
  'architecture',
  'planejar',
  'plan',
  'começar',
  'start',
  'tutorial',
  'ajuda',
  'help',
  'status',
  'roadmap',
  'decisão',
  'decision',
  'api'
];

/**
 * Verifica se algum arquivo da lista existe
 */
function checkFileExists(files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      return file;
    }
  }
  return null;
}

/**
 * Extrai o comando/intenção do input do usuário
 * Este é um simplificação - em produção seria mais robusto
 */
function extractIntent(input) {
  if (!input) return '';

  const lower = input.toLowerCase();

  // Verifica se é um comando permitido
  for (const keyword of ALLOWED_KEYWORDS) {
    if (lower.includes(keyword)) {
      return { type: 'allowed', keyword };
    }
  }

  // Verifica se é desenvolvimento
  for (const keyword of DEV_KEYWORDS) {
    if (lower.includes(keyword)) {
      return { type: 'development', keyword };
    }
  }

  return { type: 'unknown', keyword: null };
}

/**
 * Valida o fluxo de desenvolvimento
 */
function validateFlow(input) {
  const intent = extractIntent(input);

  // Se é um comando permitido, deixa passar
  if (intent.type === 'allowed') {
    return {
      valid: true,
      message: 'Comando permitido sem documentos obrigatórios'
    };
  }

  // Se não é desenvolvimento, deixa passar
  if (intent.type !== 'development') {
    return {
      valid: true,
      message: 'Não é uma operação de desenvolvimento'
    };
  }

  // É desenvolvimento - verifica documentos
  const errors = [];

  const prdExists = checkFileExists(PRD_FILES);
  const archExists = checkFileExists(ARCHITECTURE_FILES);

  if (!prdExists) {
    errors.push({
      type: 'prd',
      message: 'PRD não encontrado',
      files: PRD_FILES,
      suggestion: 'Execute *prd para criar o documento de requisitos'
    });
  }

  if (!archExists) {
    errors.push({
      type: 'architecture',
      message: 'Arquitetura não encontrada',
      files: ARCHITECTURE_FILES,
      suggestion: 'Execute *arquitetura para definir a arquitetura técnica'
    });
  }

  if (errors.length > 0) {
    return {
      valid: false,
      message: 'Documentos obrigatórios não encontrados',
      errors: errors,
      hint: `
╔══════════════════════════════════════════════════════════════╗
║ ⚠️  BLOQUEADO: Fluxo de desenvolvimento não seguido          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Antes de desenvolver, você precisa criar os documentos:      ║
║                                                              ║
${!prdExists ? '║ ❌ PRD (documento de requisitos)                             ║\n' : ''}${!archExists ? '║ ❌ Arquitetura técnica                                       ║\n' : ''}║                                                              ║
║ Ordem obrigatória:                                           ║
║ 1. *prd → Cria o PRD                                        ║
║ 2. *arquitetura → Define a arquitetura                      ║
║ 3. *desenvolver → Começa a desenvolver                      ║
║                                                              ║
║ Por que? Codar sem planejar gera retrabalho!                ║
╚══════════════════════════════════════════════════════════════╝
`
    };
  }

  return {
    valid: true,
    message: 'Documentos obrigatórios encontridos',
    prd: prdExists,
    architecture: archExists
  };
}

/**
 * Main
 */
function main() {
  // Pega o input do stdin (se houver)
  let input = '';

  if (process.stdin.isTTY) {
    // Se tem argumentos, usa eles
    input = process.argv.slice(2).join(' ');
  } else {
    // Lê do stdin
    input = fs.readFileSync(0, 'utf-8');
  }

  const result = validateFlow(input);

  if (!result.valid) {
    console.error(result.hint || result.message);
    process.exit(1);
  }

  // Tudo ok
  if (result.prd && result.architecture) {
    console.log('✅ Fluxo validado: PRD e Arquitetura encontrados');
  }

  process.exit(0);
}

// Exporta para uso como módulo
module.exports = {
  validateFlow,
  checkFileExists,
  extractIntent
};

// Executa se chamado diretamente
if (require.main === module) {
  main();
}
