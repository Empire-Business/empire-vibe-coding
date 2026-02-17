import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const canonicalPath = path.join(repoRoot, 'vibe-coding', 'CLAUDE-INSTRUCTIONS.md');
const codexCanonicalPath = path.join(repoRoot, 'vibe-coding', 'CODEX-INSTRUCTIONS.md');
const claudePath = path.join(repoRoot, 'CLAUDE.md');
const agentsPath = path.join(repoRoot, 'AGENTS.md');

function ensureFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo obrigatório ausente: ${label} (${filePath})`);
  }
}

function backupIfExists(filePath, backupDir, backupName) {
  if (!fs.existsSync(filePath)) return false;
  fs.copyFileSync(filePath, path.join(backupDir, backupName));
  return true;
}

function main() {
  ensureFile(canonicalPath, 'vibe-coding/CLAUDE-INSTRUCTIONS.md');

  const canonicalContent = fs.readFileSync(canonicalPath);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(repoRoot, '.empire-sync', 'backups', timestamp);

  fs.mkdirSync(backupDir, { recursive: true });

  const backedUpClaude = backupIfExists(claudePath, backupDir, 'CLAUDE.md.before-sync');
  const backedUpAgents = backupIfExists(agentsPath, backupDir, 'AGENTS.md.before-sync');

  fs.writeFileSync(codexCanonicalPath, canonicalContent);
  fs.writeFileSync(claudePath, canonicalContent);
  fs.writeFileSync(agentsPath, canonicalContent);

  const finalClaude = fs.readFileSync(claudePath);
  const finalAgents = fs.readFileSync(agentsPath);

  if (!finalClaude.equals(finalAgents)) {
    throw new Error('Falha de sincronização: CLAUDE.md e AGENTS.md ficaram diferentes.');
  }

  console.log('Sincronização concluída.');
  console.log(`Backup: ${backupDir}`);
  console.log(`Backup CLAUDE.md: ${backedUpClaude ? 'sim' : 'não (arquivo inexistente antes do sync)'}`);
  console.log(`Backup AGENTS.md: ${backedUpAgents ? 'sim' : 'não (arquivo inexistente antes do sync)'}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
