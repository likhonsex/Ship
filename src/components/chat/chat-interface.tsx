'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Icons } from '@/components/icons'
import { Message, Conversation, PromptInput, SuggestionList } from '@/components/ai'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Help me debug a React component',
  'Write a Python script to process CSV files',
  'Explain how async/await works',
  'Create a REST API with Express',
]

export function ChatInterface() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (input: string) => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      }
      setMessages((prev) => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: m.content + text }
              : m
          )
        )
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <Conversation>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
            <Icons.logo className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            <h2 className="mt-4 text-xl sm:text-2xl font-semibold">Welcome to Ship</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-md">
              Start a conversation with the AI assistant. Ask anything about coding, debugging, or building projects.
            </p>
            <div className="mt-8 w-full max-w-lg">
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              <SuggestionList
                suggestions={SUGGESTIONS}
                onSelect={handleSubmit}
                className="justify-center"
              />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                role={message.role}
                content={message.content}
                avatar={message.role === 'user' ? user?.photoURL ?? undefined : undefined}
                name={message.role === 'user' ? user?.displayName ?? undefined : 'Ship'}
              />
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <Message role="assistant" content="" isLoading />
            )}
          </>
        )}
      </Conversation>

      <div className="border-t p-3 sm:p-4 safe-area-inset">
        <div className="mx-auto max-w-3xl">
          <PromptInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Type your message…"
          />
          <p className="mt-2 text-xs text-center text-muted-foreground hidden sm:block">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}
