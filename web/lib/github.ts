/**
 * Links e utilidades para integração com GitHub
 */

const GITHUB_REPO = 'https://github.com/Empire-Business/empire-vibe-coding'
const GITHUB_RAW = 'https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main'
const WEB_URL = 'https://empire-vibe-coding.vercel.app'

/**
 * URL base do repositório GitHub
 */
export function getRepoUrl(): string {
  return GITHUB_REPO
}

/**
 * URL raw para um arquivo do repositório
 */
export function getFileRawUrl(path: string): string {
  return `${GITHUB_RAW}/${path}`
}

/**
 * URL web do projeto
 */
export function getWebUrl(): string {
  return WEB_URL
}

/**
 * URL para um arquivo no editor do GitHub
 */
export function getFileEditorUrl(path: string): string {
  return `${GITHUB_REPO}/blob/main/${path}`
}

/**
 * URL para criar um issue
 */
export function getNewIssueUrl(): string {
  return `${GITHUB_REPO}/issues/new`
}

/**
 * Lista de links úteis
 */
export const GITHUB_LINKS = {
  repo: GITHUB_REPO,
  docs: `${GITHUB_REPO}/tree/main/docs`,
  web: `${GITHUB_REPO}/tree/main/web`,
  skill: `${GITHUB_REPO}/tree/main/claude-skill`,
  issues: `${GITHUB_REPO}/issues`,
  releases: `${GITHUB_REPO}/releases`,
  wiki: `${GITHUB_REPO}/wiki`,
}

/**
 * Gera um link de compartilhamento para uma seção específica
 */
export function getShareLink(section: string, hash?: string): string {
  let url = `${WEB_URL}/${section}`
  if (hash) {
    url += `#${hash}`
  }
  return url
}

/**
 * Formata o link para a versão web do GitHub
 */
export function formatGitHubReadmeUrl(path: string): string {
  return `${GITHUB_REPO}/blob/main/${path}`
}

/**
 * Lista de documentações de seções com seus links GitHub
 */
export const SECTION_LINKS = {
  glossary: {
    path: 'docs/GUIA-DO-INICIANTE.md',
    title: 'Guia do Iniciante',
    description: 'Glossário de termos técnicos',
  },
  flags: {
    path: 'docs/BANDEIRAS-VERMELHAS.md',
    title: 'Bandeiras Vermelhas',
    description: 'Comandos perigosos',
  },
  troubleshooting: {
    path: 'docs/TROUBLESHOOTING.md',
    title: 'Troubleshooting',
    description: 'Solução de erros',
  },
  protocols: {
    path: 'docs/PROTOCOLOS',
    title: 'Protocolos',
    description: 'Guias de processo',
  },
  architecture: {
    path: 'docs/ARQUITETURA',
    title: 'Arquitetura',
    description: 'Organização de código',
  },
  design: {
    path: 'docs/DESIGN',
    title: 'Design System',
    description: 'Componentes e tokens',
  },
  security: {
    path: 'docs/SEGURANCA',
    title: 'Segurança',
    description: 'Boas práticas de segurança',
  },
  quality: {
    path: 'docs/QUALIDADE',
    title: 'Qualidade',
    description: 'Padrões de código',
  },
}

/**
 * Gera o badge de versão para o README
 */
export function getVersionBadge(version: string): string {
  return `![Version](https://img.shields.io/badge/version-${version}-blue.svg)`
}

/**
 * Gera o badge de licença para o README
 */
export function getLicenseBadge(): string {
  return `![License](https://img.shields.io/badge/license-MIT-green.svg)`
}

/**
 * Gera o badge do Vercel para o README
 */
export function getVercelBadge(): string {
  return `![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black.svg)`
}
