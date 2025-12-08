import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatHeader } from '@/components/chat/chat-header'

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar user={session.user} />
      <div className="flex flex-1 flex-col">
        <ChatHeader user={session.user} />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
