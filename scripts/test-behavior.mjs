import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync, createReadStream, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, normalize, resolve, sep } from 'node:path';
import http from 'node:http';

const REPO_ROOT = process.cwd();
const INSTALL_SH = join(REPO_ROOT, 'install.sh');
const CREATE_CLI = join(REPO_ROOT, 'packages', 'create-empire-vibe-coding', 'bin', 'create.js');

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

async function testDashboardReadOnly() {
  const port = 3131;
  const child = spawn(
    'npm',
    ['run', 'dev', '--', '-p', `${port}`],
    {
      cwd: join(REPO_ROOT, 'web'),
      env: {
        ...process.env,
        DASHBOARD_MODE: 'true',
        DASHBOARD_READ_ONLY: 'false',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  );

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
    // Next.js output format can vary, so this is non-blocking safety info.
    console.log('[test-behavior] dashboard output captured');
  }
}

function assertAgentTeamsEnabled(settingsFile) {
  const json = JSON.parse(readFileSync(settingsFile, 'utf8'));
  assert.equal(json?.env?.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS, '1');
}

async function testInstallersSettings() {
  const { server, baseUrl } = await startLocalFileServer(REPO_ROOT);
  const installDir = mkdtempSync(join(tmpdir(), 'empire-install-'));
  const createDir = mkdtempSync(join(tmpdir(), 'empire-create-'));

  try {
    await runCommand('bash', [INSTALL_SH, '--no-claude'], {
      cwd: installDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
    });

    assertAgentTeamsEnabled(join(installDir, '.claude', 'settings.local.json'));

    await runCommand('node', [CREATE_CLI, '.'], {
      cwd: createDir,
      env: {
        EMPIRE_VIBE_CODING_GITHUB_RAW: baseUrl,
      },
      stdin: '\n',
    });

    assertAgentTeamsEnabled(join(createDir, '.claude', 'settings.local.json'));
  } finally {
    server.close();
    rmSync(installDir, { recursive: true, force: true });
    rmSync(createDir, { recursive: true, force: true });
  }
}

async function main() {
  await testDashboardReadOnly();
  await testInstallersSettings();
  console.log('Behavior checks passed');
}

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exit(1);
});
