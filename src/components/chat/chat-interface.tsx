'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'
import { useAuth } from '@/components/auth-provider'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'

export function ChatInterface() {
  const { user } = useAuth()
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, setInput, status, error, handleSubmit } = useChat({
    onError: (error) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = inputRef.current?.value || ''
    if (!input.trim()) return
    setInput(input)
    handleSubmit(e)
    if (inputRef.current) inputRef.current.value = ''
  }

  const getMessageContent = (message: typeof messages[0]) => {
    if (typeof message.content === 'string') {
      return message.content
    }
    return message.content
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('')
  }

  return (
    <div className="flex flex-1 flex-col">
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icons.logo className="h-12 w-12 text-primary" />
              <h2 className="mt-4 text-2xl font-semibold">Welcome to Ship</h2>
              <p className="mt-2 text-muted-foreground">
                Start a conversation with the AI assistant
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Icons.logo className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{getMessageContent(message)}</ReactMarkdown>
                </div>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL ?? undefined} />
                  <AvatarFallback>{user?.displayName?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Icons.logo className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-muted px-4 py-2">
                <div className="flex items-center gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="relative">
            <Textarea
              ref={inputRef}
              placeholder="Type your message..."
              className="min-h-[60px] w-full resize-none pr-12"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  onSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="absolute bottom-2 right-2"
            >
              <Icons.send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
