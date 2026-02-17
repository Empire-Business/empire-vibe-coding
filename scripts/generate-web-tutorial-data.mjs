import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const commandsPath = path.join(repoRoot, 'vibe-coding', 'COMANDOS.md');
const protocolsDir = path.join(repoRoot, 'vibe-coding', 'PROTOCOLOS');
const outputPath = path.join(repoRoot, 'web', 'data', 'tutorial.generated.json');

const categoryMatchers = [
  ['Comandos Principais', 'Principais'],
  ['Comandos de Documentação', 'Documentação'],
  ['Comandos de Design & UX', 'Design & UX'],
  ['Comandos de Qualidade', 'Qualidade'],
  ['Comandos de Infra & Banco', 'Infra & Banco'],
  ['Comandos de Automação', 'Automação'],
  ['Comandos de Dashboard', 'Dashboard'],
  ['Comandos de Planejamento', 'Planejamento'],
  ['Comandos de Integração', 'Integração'],
  ['Comandos de Especialistas', 'Especialistas'],
  ['Comando de Ajuda', 'Ajuda'],
];

function resolveCategoryFromHeading(line) {
  const heading = line.replace(/^##\s+/, '').trim();
  const match = categoryMatchers.find(([prefix]) => heading.startsWith(prefix));
  return match ? match[1] : null;
}

function parseCommandRow(line) {
  if (!line.startsWith('|')) return null;

  const columns = line
    .split('|')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (columns.length < 2) return null;
  if (columns[0].startsWith('---') || columns[0] === 'Comando') return null;
  if (!columns[0].startsWith('`*') || !columns[0].endsWith('`')) return null;

  const command = columns[0].replaceAll('`', '');
  const title = columns[1] || '';
  const description = columns[2] || columns[1] || '';

  return { command, title, description };
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildTutorialData() {
  const markdown = fs.readFileSync(commandsPath, 'utf8');
  const lines = markdown.split('\n');

  const seenCommands = new Set();
  const categories = [];
  const categoryMap = new Map();
  let currentCategory = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentCategory = resolveCategoryFromHeading(line);
      continue;
    }

    if (!currentCategory) continue;

    const parsed = parseCommandRow(line);
    if (!parsed) continue;

    if (seenCommands.has(parsed.command)) {
      continue;
    }

    seenCommands.add(parsed.command);

    if (!categoryMap.has(currentCategory)) {
      const category = {
        key: slugify(currentCategory),
        name: currentCategory,
        commands: [],
      };
      categoryMap.set(currentCategory, category);
      categories.push(category);
    }

    categoryMap.get(currentCategory).commands.push(parsed);
  }

  const protocols = fs
    .readdirSync(protocolsDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => ({
      file,
      id: file.replace(/\.md$/, ''),
    }));

  const commands = categories.flatMap((category) =>
    category.commands.map((command) => ({
      ...command,
      category: category.name,
    }))
  );

  return {
    source: {
      commands: 'vibe-coding/COMANDOS.md',
      protocolsDir: 'vibe-coding/PROTOCOLOS',
    },
    metrics: {
      totalCommands: commands.length,
      totalProtocols: protocols.length,
      totalCategories: categories.length,
    },
    categories: categories.map((category) => ({
      key: category.key,
      name: category.name,
      count: category.commands.length,
      commands: category.commands,
    })),
    commands,
    protocols,
  };
}

function main() {
  const checkMode = process.argv.includes('--check');
  const data = buildTutorialData();
  const content = `${JSON.stringify(data, null, 2)}\n`;

  if (checkMode) {
    if (!fs.existsSync(outputPath)) {
      console.error(`Missing generated file: ${path.relative(repoRoot, outputPath)}`);
      process.exit(1);
    }

    const current = fs.readFileSync(outputPath, 'utf8');
    if (current !== content) {
      console.error('Tutorial data is out of sync. Run: node ./scripts/generate-web-tutorial-data.mjs');
      process.exit(1);
    }

    console.log('Tutorial data is in sync.');
    return;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);
  console.log(`Generated ${path.relative(repoRoot, outputPath)}`);
}

main();
