import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm safe-area-inset">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 touch-target">
            <Icons.logo className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="text-lg sm:text-xl font-bold">Ship</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/chat" 
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors touch-target items-center justify-center"
            >
              Chat
            </Link>
            <Link 
              href="/docs" 
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors touch-target items-center justify-center"
            >
              Docs
            </Link>
            <Button asChild size="sm" className="touch-target">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main id="main-content" className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight">
              Ship faster with{' '}
              <span className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
                AI that codes
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Autonomous AI coding agent that handles GitHub issues, generates code,
              creates pull requests, and responds to feedback automatically.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto touch-target">
                <Link href="/chat">
                  <Icons.sparkles className="mr-2 h-5 w-5" />
                  Start Coding
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto touch-target">
                <Link href="https://github.com/likhonsex/Ship" target="_blank" rel="noopener noreferrer">
                  <Icons.github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/50 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Icons.cpu className="h-6 w-6" />}
                title="Autonomous Coding"
                description="Assign issues and watch Ship write code, create PRs, and respond to feedback."
              />
              <FeatureCard
                icon={<Icons.shield className="h-6 w-6" />}
                title="Secure by Default"
                description="Find and fix vulnerabilities in real time. Deploy with confidence."
              />
              <FeatureCard
                icon={<Icons.zap className="h-6 w-6" />}
                title="One-Click Deploy"
                description="From idea to deployed application using natural language."
              />
              <FeatureCard
                icon={<Icons.refresh className="h-6 w-6" />}
                title="Feedback Loop"
                description="Ship responds to code review comments and updates PRs automatically."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8 safe-area-inset">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <p>Built with Ship</p>
          <div className="flex gap-6">
            <Link href="https://github.com/likhonsex/Ship" className="hover:text-foreground transition-colors touch-target inline-flex items-center justify-center">
              GitHub
            </Link>
            <Link href="/docs" className="hover:text-foreground transition-colors touch-target inline-flex items-center justify-center">
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-base sm:text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
