'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/firebase'
import { toast } from 'sonner'

interface Workspace {
  id: string
  name: string
  description: string
  createdAt: Date
  lastActive: Date
  status: 'active' | 'stopped' | 'error'
}

// Mock workspaces for now - will be replaced with actual data
const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'React Dashboard',
    description: 'Building a dashboard with React and Tailwind',
    createdAt: new Date('2024-12-01'),
    lastActive: new Date(),
    status: 'active',
  },
  {
    id: '2',
    name: 'Python API',
    description: 'FastAPI backend with PostgreSQL',
    createdAt: new Date('2024-11-28'),
    lastActive: new Date('2024-12-07'),
    status: 'stopped',
  },
]

export default function WorkspacesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces)
  const [search, setSearch] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleCreateWorkspace = async () => {
    setIsCreating(true)
    try {
      // TODO: Create actual E2B sandbox
      const newWorkspace: Workspace = {
        id: Date.now().toString(),
        name: 'New Workspace',
        description: 'A new coding workspace',
        createdAt: new Date(),
        lastActive: new Date(),
        status: 'active',
      }
      setWorkspaces([newWorkspace, ...workspaces])
      toast.success('Workspace created successfully')
    } catch (error) {
      toast.error('Failed to create workspace')
    } finally {
      setIsCreating(false)
    }
  }

  const filteredWorkspaces = workspaces.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur px-4 safe-area-inset">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-semibold hidden sm:inline">Ship</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? undefined} />
                  <AvatarFallback>{user.displayName?.[0] ?? user.email?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{user.displayName ?? 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/chat">
                  <Icons.message className="mr-2 h-4 w-4" />
                  Chat
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Icons.settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <Icons.logout className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Workspaces</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your coding environments powered by E2B
              </p>
            </div>
            <Button onClick={handleCreateWorkspace} disabled={isCreating} className="touch-target">
              {isCreating ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.plus className="mr-2 h-4 w-4" />
              )}
              New Workspace
            </Button>
          </div>

          {/* Search */}
          <div className="mt-6">
            <Input
              placeholder="Search workspaces..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Workspaces Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkspaces.map((workspace) => (
              <Link
                key={workspace.id}
                href={`/workspaces/${workspace.id}`}
                className="group relative flex flex-col rounded-xl border bg-card p-4 sm:p-5 transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.folderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ${
                        workspace.status === 'active'
                          ? 'bg-green-500'
                          : workspace.status === 'stopped'
                          ? 'bg-gray-400'
                          : 'bg-red-500'
                      }`}
                    />
                    <span className="text-xs text-muted-foreground capitalize">
                      {workspace.status}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-semibold group-hover:text-primary transition-colors">
                  {workspace.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {workspace.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    Created {workspace.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}

            {/* Empty State */}
            {filteredWorkspaces.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Icons.folderOpen className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-semibold">No workspaces found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {search ? 'Try a different search term' : 'Create your first workspace to get started'}
                </p>
                {!search && (
                  <Button onClick={handleCreateWorkspace} className="mt-4" disabled={isCreating}>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Create Workspace
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
