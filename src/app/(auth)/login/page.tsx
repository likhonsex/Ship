import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth, signIn } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Ship account',
}

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/chat')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6 px-4">
        <div className="space-y-2 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Icons.logo className="h-10 w-10" />
          </Link>
          <h1 className="text-2xl font-bold">Welcome to Ship</h1>
          <p className="text-muted-foreground">
            Sign in to start coding with AI
          </p>
        </div>

        <form
          action={async () => {
            'use server'
            await signIn('github', { redirectTo: '/chat' })
          }}
        >
          <Button type="submit" className="w-full" size="lg">
            <Icons.github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
