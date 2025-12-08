import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8" />
            <span className="text-xl font-bold">Ship</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground">
              Chat
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Docs
            </Link>
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Ship faster with{' '}
              <span className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
                AI that codes with you
              </span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Autonomous AI coding agent that handles GitHub issues, generates code,
              creates pull requests, and responds to feedback automatically.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/chat">
                  <Icons.sparkles className="mr-2 h-5 w-5" />
                  Start Coding
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/likhonsex/Ship" target="_blank">
                  <Icons.github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <p>Built with Ship</p>
          <div className="flex gap-4">
            <Link href="https://github.com/likhonsex/Ship" className="hover:text-foreground">
              GitHub
            </Link>
            <Link href="/docs" className="hover:text-foreground">
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
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
