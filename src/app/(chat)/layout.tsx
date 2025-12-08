'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatHeader } from '@/components/chat/chat-header'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
