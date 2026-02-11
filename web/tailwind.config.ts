import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Empire Brand Colors
        empire: {
          black: '#000000',
          light: '#f2f2f2',
          sage: '#bec3bf',
          sand: '#d8d2c1',
          olive: '#6f755a',
          terracotta: '#8c4b32',
          gold: '#e4b820',
        },
        // Semantic aliases
        background: '#f2f2f2',
        foreground: '#000000',
        muted: '#6f755a',
        accent: '#e4b820',
        card: '#ffffff',
        border: '#d8d2c1',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['Archivo Black', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
