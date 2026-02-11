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
          navy: '#1e2a38',
        },
        // Aliases for semantic use
        background: '#000000',
        foreground: '#f2f2f2',
        muted: '#bec3bf',
        accent: '#1e2a38',
        primary: {
          50: '#f2f2f2',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#bec3bf',
          400: '#a8ada9',
          500: '#1e2a38',
          600: '#1a2532',
          700: '#151f2a',
          800: '#111924',
          900: '#0d1420',
        },
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
