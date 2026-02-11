#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_RAW = 'https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main';

// Arquivos para baixar
const FILES = {
  skill: {
    path: '.claude/skills/empire-vibe-coding/SKILL.md',
    url: `${GITHUB_RAW}/claude-skill/SKILL.md`
  },
  docs: [
    { path: 'vibe-coding/README.md', url: `${GITHUB_RAW}/docs/README.md` },
    { path: 'vibe-coding/GUIA-DO-INICIANTE.md', url: `${GITHUB_RAW}/docs/GUIA-DO-INICIANTE.md` },
    { path: 'vibe-coding/BANDEIRAS-VERMELHAS.md', url: `${GITHUB_RAW}/docs/BANDEIRAS-VERMELHAS.md` },
    { path: 'vibe-coding/TROUBLESHOOTING.md', url: `${GITHUB_RAW}/docs/TROUBLESHOOTING.md` },
    { path: 'vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md', url: `${GITHUB_RAW}/docs/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md` },
    { path: 'vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md', url: `${GITHUB_RAW}/docs/PROTOCOLOS/01-DESENVOLVIMENTO.md` },
    { path: 'vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md', url: `${GITHUB_RAW}/docs/PROTOCOLOS/02-CORRECAO-BUGS.md` },
    { path: 'vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md', url: `${GITHUB_RAW}/docs/PROTOCOLOS/03-APRIMORAMENTO.md` },
    { path: 'vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md', url: `${GITHUB_RAW}/docs/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md` },
    { path: 'vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md', url: `${GITHUB_RAW}/docs/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md` }
  ]
};

// Cores para terminal
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Seguir redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function install() {
  log('\n═══════════════════════════════════════════════════════════', 'blue');
  log('  EMPIRE VIBE CODING - Instalador', 'bold');
  log('═══════════════════════════════════════════════════════════\n', 'blue');

  const cwd = process.cwd();

  // Criar estrutura de pastas
  log('📁 Criando estrutura de pastas...', 'blue');

  // 1. Instalar Skill
  log('\n🔧 Instalando Claude Skill...', 'yellow');
  try {
    const skillDir = path.join(cwd, '.claude', 'skills', 'empire-vibe-coding');
    const skillPath = path.join(cwd, FILES.skill.path);

    await downloadFile(FILES.skill.url, skillPath);
    log(`   ✓ Skill instalada em: ${FILES.skill.path}`, 'green');
  } catch (err) {
    log(`   ✗ Erro ao instalar skill: ${err.message}`, 'red');
  }

  // 2. Baixar documentação
  log('\n📚 Baixando documentação...', 'yellow');

  let successCount = 0;
  let errorCount = 0;

  for (const file of FILES.docs) {
    try {
      const destPath = path.join(cwd, file.path);
      await downloadFile(file.url, destPath);
      log(`   ✓ ${file.path}`, 'green');
      successCount++;
    } catch (err) {
      log(`   ✗ ${file.path}: ${err.message}`, 'red');
      errorCount++;
    }
  }

  // Resumo
  log('\n═══════════════════════════════════════════════════════════', 'blue');
  log('  INSTALAÇÃO CONCLUÍDA!', 'bold');
  log('═══════════════════════════════════════════════════════════', 'blue');
  log(`\n  ✓ ${successCount} arquivos baixados com sucesso`, 'green');
  if (errorCount > 0) {
    log(`  ✗ ${errorCount} arquivos com erro`, 'red');
  }

  log('\n📋 Próximos passos:', 'blue');
  log('   1. Reinicie o Claude Code se estiver aberto');
  log('   2. Digite: "quero começar um projeto"');
  log('   3. O Claude vai te guiar passo a passo!\n');

  log('📖 Documentação disponível em: vibe-coding/', 'yellow');
  log('🔧 Skill instalada em: .claude/skills/empire-vibe-coding/\n');
}

// Executar instalação
install().catch(err => {
  log(`\n✗ Erro na instalação: ${err.message}`, 'red');
  process.exit(1);
});
