import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const paths = {
  claudeRoot: path.join(repoRoot, 'CLAUDE.md'),
  agentsRoot: path.join(repoRoot, 'AGENTS.md'),
  claudeCanonical: path.join(repoRoot, 'vibe-coding', 'CLAUDE-INSTRUCTIONS.md'),
  codexCanonical: path.join(repoRoot, 'vibe-coding', 'CODEX-INSTRUCTIONS.md'),
};

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readOrFail(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`Arquivo obrigatório ausente: ${label} (${filePath})`);
  }
  return fs.readFileSync(filePath);
}

function main() {
  const claudeRoot = readOrFail(paths.claudeRoot, 'CLAUDE.md');
  const agentsRoot = readOrFail(paths.agentsRoot, 'AGENTS.md');

  if (!claudeRoot.equals(agentsRoot)) {
    fail('Drift detectado: CLAUDE.md e AGENTS.md não estão idênticos byte a byte. Rode: npm run agents:sync');
  }

  const claudeCanonical = readOrFail(paths.claudeCanonical, 'vibe-coding/CLAUDE-INSTRUCTIONS.md');
  const codexCanonical = readOrFail(paths.codexCanonical, 'vibe-coding/CODEX-INSTRUCTIONS.md');

  if (!claudeCanonical.equals(codexCanonical)) {
    fail('Drift detectado: CLAUDE-INSTRUCTIONS.md e CODEX-INSTRUCTIONS.md não estão idênticos byte a byte. Rode: npm run agents:sync');
  }

  if (!claudeRoot.equals(claudeCanonical)) {
    fail('Drift canônico detectado: CLAUDE.md diverge de vibe-coding/CLAUDE-INSTRUCTIONS.md. Rode: npm run agents:sync');
  }

  if (!agentsRoot.equals(claudeCanonical)) {
    fail('Drift canônico detectado: AGENTS.md diverge de vibe-coding/CLAUDE-INSTRUCTIONS.md. Rode: npm run agents:sync');
  }

  console.log('Agent files em sincronia.');
}

main();
