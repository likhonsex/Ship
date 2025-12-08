'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Icons } from '@/components/icons'
import { useAuth } from '@/components/auth-provider'

export function ChatSidebar() {
  const { user } = useAuth()

  return (
    <aside className="hidden w-64 border-r md:block">
      <div className="flex h-14 items-center border-b px-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Icons.plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-2">
          <p className="px-2 py-1 text-xs text-muted-foreground">Recent chats</p>
          <div className="mt-2 space-y-1">
            <Button variant="ghost" className="w-full justify-start text-left">
              <Icons.message className="mr-2 h-4 w-4" />
              <span className="truncate">New conversation</span>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
