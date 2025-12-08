import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ship - AI Coding Agent',
    template: '%s | Ship',
  },
  description: 'Autonomous AI coding agent that handles GitHub issues, generates code, and creates pull requests.',
  keywords: ['AI', 'coding', 'agent', 'GitHub', 'automation'],
  authors: [{ name: 'Ship' }],
  creator: 'Ship',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ship - AI Coding Agent',
    description: 'Autonomous AI coding agent',
    siteName: 'Ship',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ship - AI Coding Agent',
    description: 'Autonomous AI coding agent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
