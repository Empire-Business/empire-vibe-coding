import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Empire Vibe Coding',
  description: 'Desenvolva software com IA sem saber programar. Instale o Empire Vibe Coding no seu projeto.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
