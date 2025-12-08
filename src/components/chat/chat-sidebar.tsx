'use client'

import Link from 'next/link'
import { type User } from 'next-auth'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Icons } from '@/components/icons'

interface ChatSidebarProps {
  user: User
}

export function ChatSidebar({ user }: ChatSidebarProps) {
  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/30 md:flex">
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-semibold">Ship</span>
        </Link>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/chat">
            <Icons.plus className="mr-2 h-4 w-4" />
            New Chat
          </Link>
        </Button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Recent</p>
          {/* Chat history will be loaded here */}
          <p className="text-sm text-muted-foreground">No recent chats</p>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10" />
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
