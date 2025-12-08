'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/firebase'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center gap-4 px-4">
          <Link href="/chat" className="flex items-center gap-2">
            <Icons.chevronLeft className="h-5 w-5" />
            <span className="text-sm">Back to Chat</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>

        {/* Profile Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Icons.user className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium">{user.displayName || 'User'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-xs">{user.uid.slice(0, 12)}...</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Email Verified</span>
                <span>{user.emailVerified ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Provider</span>
                <span>{user.providerData[0]?.providerId || 'email'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* MCP Servers Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">MCP Servers</h2>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Connect Model Context Protocol servers to extend AI capabilities with files, APIs, and databases.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-green-500/10 flex items-center justify-center">
                    <Icons.check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Groq AI</p>
                    <p className="text-xs text-muted-foreground">llama-3.3-70b-versatile</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-blue-500/10 flex items-center justify-center">
                    <Icons.github className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">GitHub</p>
                    <p className="text-xs text-muted-foreground">Repository access</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-purple-500/10 flex items-center justify-center">
                    <Icons.cpu className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">E2B Sandbox</p>
                    <p className="text-xs text-muted-foreground">Code execution</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">Connected</span>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h2>
          <div className="rounded-lg border border-destructive/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sign out</p>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <Button variant="destructive" onClick={handleSignOut}>
                <Icons.logout className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
