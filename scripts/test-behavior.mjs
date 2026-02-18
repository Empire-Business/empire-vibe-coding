import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import {
  mkdtempSync,
  rmSync,
  readFileSync,
  createReadStream,
  statSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, normalize, resolve, sep } from 'node:path';
import http from 'node:http';

const REPO_ROOT = process.cwd();
const INSTALL_SH = join(REPO_ROOT, 'install.sh');
const CREATE_CLI = join(REPO_ROOT, 'packages', 'create-empire-vibe-coding', 'bin', 'create.js');
const DASHBOARD_DIR = 'empire-dashboard';
const DASHBOARD_SCRIPT = `npm --prefix ${DASHBOARD_DIR} run dashboard`;
const UPDATE_PROTOCOL_RELATIVE = join('vibe-coding', 'PROTOCOLOS', '23-ATUALIZAR.md');
const SYNC_PROTOCOL_RELATIVE = join('vibe-coding', 'PROTOCOLOS', '24-SINCRONIZAR.md');

const LEGACY_FLAG_CASES = [
  ['--platform', 'claude'],
  ['--platform=claude'],
  ['--merge'],
  ['--separate'],
  ['--no-claude'],
];

function runCommand(command, args, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? REPO_ROOT,
      env: { ...process.env, ...(options.env ?? {}) },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      rejectPromise(error);
    });

    if (options.stdin) {
      child.stdin.write(options.stdin);
    }
    child.stdin.end();

    child.on('close', (code) => {
      if (code === 0) {
        resolvePromise({ stdout, stderr });
      } else {
        rejectPromise(
          new Error(
            `Command failed (${command} ${args.join(' ')}):\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`
          )
        );
      }
    });
  });
}

async function startLocalFileServer(rootDir) {
  const server = http.createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const relativePath = requestPath.replace(/^\/+/, '');
    const absolutePath = normalize(join(rootDir, relativePath));
    const rootWithSep = `${resolve(rootDir)}${sep}`;

    if (absolutePath !== resolve(rootDir) && !absolutePath.startsWith(rootWithSep)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    try {
      const stats = statSync(absolutePath);
      if (!stats.isFile()) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
      res.statusCode = 200;
      createReadStream(absolutePath).pipe(res);
    } catch {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  await new Promise((resolvePromise, rejectPromise) => {
    server.listen(0, '127.0.0.1', () => resolvePromise());
    server.on('error', rejectPromise);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to start local file server');
  }

  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
  };
}

async function waitForUrl(url, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Keep waiting.
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

function assertAgentTeamsEnabled(settingsFile) {
  const json = JSON.parse(readFileSync(settingsFile, 'utf8'));
  assert.equal(json?.env?.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS, '1');
}

function assertDashboardRuntimeInstalled(projectDir) {
  const runtimePackage = join(projectDir, DASHBOARD_DIR, 'package.json');
  assert.equal(existsSync(runtimePackage), true, `${runtimePackage} should exist`);
}

function assertDashboardRuntimeNotInstalled(projectDir) {
  const runtimePackage = join(projectDir, DASHBOARD_DIR, 'package.json');
  assert.equal(existsSync(runtimePackage), false, `${runtimePackage} should not exist`);
}

function assertDashboardScriptInRootPackage(projectDir) {
  const packagePath = join(projectDir, 'package.json');
  assert.equal(existsSync(packagePath), true, 'root package.json should exist');

  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  assert.equal(packageJson?.scripts?.dashboard, DASHBOARD_SCRIPT);
}

function assertDashboardScriptNotAdded(projectDir) {
  const packagePath = join(projectDir, 'package.json');
  if (!existsSync(packagePath)) {
    return;
  }

  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  assert.equal(packageJson?.scripts?.dashboard, undefined);
}

function assertProtocolsInstalled(projectDir) {
  const updateProtocolPath = join(projectDir, UPDATE_PROTOCOL_RELATIVE);
  const syncProtocolPath = join(projectDir, SYNC_PROTOCOL_RELATIVE);

  assert.equal(existsSync(updateProtocolPath), true, `${updateProtocolPath} should exist`);
  assert.equal(existsSync(syncProtocolPath), true, `${syncProtocolPath} should exist`);

  assert.match(readFileSync(updateProtocolPath, 'utf8'), /23-ATUALIZAR\.md/);
  assert.match(readFileSync(syncProtocolPath, 'utf8'), /24-SINCRONIZAR\.md/);
}

function assertSingleModeFiles(projectDir) {
  const claudeFile = join(projectDir, 'CLAUDE.md');
  const agentsFile = join(projectDir, 'AGENTS.md');
  const claudeSettings = join(projectDir, '.claude', 'settings.local.json');
  const claudeInstructions = join(projectDir, 'vibe-coding', 'CLAUDE-INSTRUCTIONS.md');
  const codexInstructions = join(projectDir, 'vibe-coding', 'CODEX-INSTRUCTIONS.md');

  assert.equal(existsSync(claudeFile), true, 'CLAUDE.md should exist');
  assert.equal(existsSync(agentsFile), true, 'AGENTS.md should exist');
  assert.equal(existsSync(claudeSettings), true, '.claude/settings.local.json should exist');
  assert.equal(existsSync(claudeInstructions), true, 'vibe-coding/CLAUDE-INSTRUCTIONS.md should exist');
  assert.equal(existsSync(codexInstructions), true, 'vibe-coding/CODEX-INSTRUCTIONS.md should exist');

  const claudeBuffer = readFileSync(claudeFile);
  const agentsBuffer = readFileSync(agentsFile);
  const claudeInstructionsBuffer = readFileSync(claudeInstructions);
  const codexInstructionsBuffer = readFileSync(codexInstructions);

  assert.equal(claudeBuffer.equals(agentsBuffer), true, 'CLAUDE.md and AGENTS.md must be byte-identical');
  assert.equal(
    claudeInstructionsBuffer.equals(codexInstructionsBuffer),
    true,
    'CLAUDE-INSTRUCTIONS.md and CODEX-INSTRUCTIONS.md must be byte-identical'
  );
  assert.equal(
    claudeBuffer.equals(claudeInstructionsBuffer),
    true,
    'CLAUDE.md must match vibe-coding/CLAUDE-INSTRUCTIONS.md byte-by-byte'
  );
  assert.equal(
    agentsBuffer.equals(claudeInstructionsBuffer),
    true,
    'AGENTS.md must match vibe-coding/CLAUDE-INSTRUCTIONS.md byte-by-byte'
  );

  assertAgentTeamsEnabled(claudeSettings);
}

function assertCanonicalCommandsAndSyncRules() {
  const commandsPath = join(REPO_ROOT, 'vibe-coding', 'COMANDOS.md');
  const claudeInstructionsPath = join(REPO_ROOT, 'vibe-coding', 'CLAUDE-INSTRUCTIONS.md');
  const codexInstructionsPath = join(REPO_ROOT, 'vibe-coding', 'CODEX-INSTRUCTIONS.md');

  const commands = readFileSync(commandsPath, 'utf8');
  const claudeInstructions = readFileSync(claudeInstructionsPath, 'utf8');
  const codexInstructions = readFileSync(codexInstructionsPath, 'utf8');

  assert.match(commands, /\*setup/);
  assert.match(commands, /01-SETUP-TECNICO\.md/);
  assert.match(commands, /\*atualizar/);
  assert.match(commands, /\*sincronizar/);
  assert.match(commands, /24-SINCRONIZAR\.md/);
  assert.match(commands, /bloquear/i);

  assert.match(claudeInstructions, /\*atualizar/);
  assert.match(claudeInstructions, /\*sincronizar/);
  assert.match(claudeInstructions, /byte a byte/i);
  assert.match(claudeInstructions, /bloquear/i);

  assert.equal(
    Buffer.from(claudeInstructions, 'utf8').equals(Buffer.from(codexInstructions, 'utf8')),
    true,
    'CLAUDE-INSTRUCTIONS.md and CODEX-INSTRUCTIONS.md must be byte-identical'
  );
}

async function runExpectingFailure(command, args, options = {}) {
  try {
    await runCommand(command, args, options);
  } catch (error) {
    return String(error?.message ?? error);
  }
  throw new Error(`Expected command to fail: ${command} ${args.join(' ')}`);
}

async function assertLegacyFlagsFail(command, baseArgs, cwd, baseUrl) {
  for (const flagCase of LEGACY_FLAG_CASES) {
    const args = [...baseArgs, ...flagCase];
    const output = await runExpectingFailure(command, args, {
      cwd,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });
    assert.match(output, /flag legada/i);
  }
}

async function testDashboardReadOnly() {
  const port = 3131;
  const child = spawn('npm', ['run', 'dev', '--', '-p', `${port}`], {
    cwd: join(REPO_ROOT, 'web'),
    env: {
      ...process.env,
      DASHBOARD_MODE: 'true',
      DASHBOARD_READ_ONLY: 'false',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let output = '';
  child.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on('data', (chunk) => {
    output += chunk.toString();
  });

  try {
    await waitForUrl(`http://127.0.0.1:${port}/api/tasks`);

    const taskResponse = await fetch(`http://127.0.0.1:${port}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Read-only smoke',
        description: 'Must fail in dashboard mode',
        activeForm: 'Executando: Read-only smoke',
        agent: 'DEVELOPER',
      }),
    });

    const taskBody = await taskResponse.json();
    assert.equal(taskResponse.status, 403);
    assert.equal(taskBody?.success, false);
    assert.match(taskBody?.error ?? '', /read-only/i);

    const squadResponse = await fetch(`http://127.0.0.1:${port}/api/squads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Read-only squad',
        type: 'feature',
        taskTemplates: [
          {
            subject: 'Task',
            description: 'Task',
            activeForm: 'Executando: Task',
            agent: 'DEVELOPER',
          },
        ],
      }),
    });

    const squadBody = await squadResponse.json();
    assert.equal(squadResponse.status, 403);
    assert.equal(squadBody?.success, false);
    assert.match(squadBody?.error ?? '', /read-only/i);
  } finally {
    child.kill('SIGTERM');
    await new Promise((resolvePromise) => child.once('close', () => resolvePromise()));
  }

  if (!output.includes('ready')) {
    console.log('[test-behavior] dashboard output captured');
  }
}

async function testTutorialDataSync() {
  await runCommand('node', ['./scripts/generate-web-tutorial-data.mjs', '--check']);
}

async function testAgentsCheckStrictCanonicalAndSync() {
  const sandboxDir = mkdtempSync(join(tmpdir(), 'empire-agents-check-'));
  const checkScript = join(REPO_ROOT, 'scripts', 'check-agent-files-sync.mjs');
  const syncScript = join(REPO_ROOT, 'scripts', 'sync-agent-files.mjs');
  const canonicalDir = join(sandboxDir, 'vibe-coding');
  const claudeRoot = join(sandboxDir, 'CLAUDE.md');
  const agentsRoot = join(sandboxDir, 'AGENTS.md');
  const claudeCanonical = join(canonicalDir, 'CLAUDE-INSTRUCTIONS.md');
  const codexCanonical = join(canonicalDir, 'CODEX-INSTRUCTIONS.md');

  try {
    mkdirSync(canonicalDir, { recursive: true });

    const canonicalContent = 'canonical-instructions\n';
    writeFileSync(claudeCanonical, canonicalContent);
    writeFileSync(codexCanonical, canonicalContent);
    writeFileSync(claudeRoot, canonicalContent);
    writeFileSync(agentsRoot, canonicalContent);

    await runCommand('node', [checkScript], { cwd: sandboxDir });

    const driftContent = 'custom-instructions\n';
    writeFileSync(claudeRoot, driftContent);
    writeFileSync(agentsRoot, driftContent);

    const driftError = await runExpectingFailure('node', [checkScript], { cwd: sandboxDir });
    assert.match(driftError, /drift canônico/i);
    assert.match(driftError, /agents:sync/i);

    await runCommand('node', [syncScript], { cwd: sandboxDir });
    await runCommand('node', [checkScript], { cwd: sandboxDir });

    const syncedClaude = readFileSync(claudeRoot);
    const syncedAgents = readFileSync(agentsRoot);
    const syncedCanonical = readFileSync(claudeCanonical);
    assert.equal(syncedClaude.equals(syncedAgents), true);
    assert.equal(syncedClaude.equals(syncedCanonical), true);
  } finally {
    rmSync(sandboxDir, { recursive: true, force: true });
  }
}

async function testInstallScript(baseUrl) {
  const defaultDir = mkdtempSync(join(tmpdir(), 'empire-install-default-'));
  const docsOnlyDir = mkdtempSync(join(tmpdir(), 'empire-install-docs-only-'));
  const legacyFlagDir = mkdtempSync(join(tmpdir(), 'empire-install-legacy-'));
  const noConflictDir = mkdtempSync(join(tmpdir(), 'empire-install-web-conflict-'));

  try {
    await runCommand('bash', [INSTALL_SH], {
      cwd: defaultDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assertSingleModeFiles(defaultDir);
    assertProtocolsInstalled(defaultDir);
    assertDashboardRuntimeInstalled(defaultDir);
    assertDashboardScriptInRootPackage(defaultDir);

    await assertLegacyFlagsFail('bash', [INSTALL_SH], legacyFlagDir, baseUrl);

    mkdirSync(join(noConflictDir, 'web'), { recursive: true });
    const sentinelPath = join(noConflictDir, 'web', 'do-not-touch.txt');
    writeFileSync(sentinelPath, 'keep-web-folder-intact\n');

    await runCommand('bash', [INSTALL_SH], {
      cwd: noConflictDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assert.equal(readFileSync(sentinelPath, 'utf8'), 'keep-web-folder-intact\n');
    assertSingleModeFiles(noConflictDir);
    assertProtocolsInstalled(noConflictDir);
    assertDashboardRuntimeInstalled(noConflictDir);

    await runCommand('bash', [INSTALL_SH, '--docs-only'], {
      cwd: docsOnlyDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assertSingleModeFiles(docsOnlyDir);
    assertProtocolsInstalled(docsOnlyDir);
    assertDashboardRuntimeNotInstalled(docsOnlyDir);
    assertDashboardScriptNotAdded(docsOnlyDir);
  } finally {
    rmSync(defaultDir, { recursive: true, force: true });
    rmSync(docsOnlyDir, { recursive: true, force: true });
    rmSync(legacyFlagDir, { recursive: true, force: true });
    rmSync(noConflictDir, { recursive: true, force: true });
  }
}

async function testCreateCli(baseUrl) {
  const defaultDir = mkdtempSync(join(tmpdir(), 'empire-create-default-'));
  const docsOnlyDir = mkdtempSync(join(tmpdir(), 'empire-create-docs-only-'));
  const legacyFlagDir = mkdtempSync(join(tmpdir(), 'empire-create-legacy-'));
  const noConflictDir = mkdtempSync(join(tmpdir(), 'empire-create-web-conflict-'));

  try {
    await runCommand('node', [CREATE_CLI, '.'], {
      cwd: defaultDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assertSingleModeFiles(defaultDir);
    assertProtocolsInstalled(defaultDir);
    assertDashboardRuntimeInstalled(defaultDir);
    assertDashboardScriptInRootPackage(defaultDir);

    await assertLegacyFlagsFail('node', [CREATE_CLI, '.'], legacyFlagDir, baseUrl);

    mkdirSync(join(noConflictDir, 'web'), { recursive: true });
    const sentinelPath = join(noConflictDir, 'web', 'do-not-touch.txt');
    writeFileSync(sentinelPath, 'keep-web-folder-intact\n');

    await runCommand('node', [CREATE_CLI, '.'], {
      cwd: noConflictDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assert.equal(readFileSync(sentinelPath, 'utf8'), 'keep-web-folder-intact\n');
    assertSingleModeFiles(noConflictDir);
    assertProtocolsInstalled(noConflictDir);
    assertDashboardRuntimeInstalled(noConflictDir);

    await runCommand('node', [CREATE_CLI, '.', '--docs-only'], {
      cwd: docsOnlyDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assertSingleModeFiles(docsOnlyDir);
    assertProtocolsInstalled(docsOnlyDir);
    assertDashboardRuntimeNotInstalled(docsOnlyDir);
    assertDashboardScriptNotAdded(docsOnlyDir);
  } finally {
    rmSync(defaultDir, { recursive: true, force: true });
    rmSync(docsOnlyDir, { recursive: true, force: true });
    rmSync(legacyFlagDir, { recursive: true, force: true });
    rmSync(noConflictDir, { recursive: true, force: true });
  }
}

async function testInstallersParityAndSettings() {
  const { server, baseUrl } = await startLocalFileServer(REPO_ROOT);

  try {
    await testInstallScript(baseUrl);
    await testCreateCli(baseUrl);
  } finally {
    server.close();
  }
}

async function main() {
  assertCanonicalCommandsAndSyncRules();
  await testTutorialDataSync();
  await testAgentsCheckStrictCanonicalAndSync();
  await testDashboardReadOnly();
  await testInstallersParityAndSettings();
  console.log('Behavior checks passed');
}

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exit(1);
});
