import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { ChatInterface } from '@/components/chat/chat-interface'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat with Ship AI',
}

export default async function ChatPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatInterface user={session.user} />
    </div>
  )
}
