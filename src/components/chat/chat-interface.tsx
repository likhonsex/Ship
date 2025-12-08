'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  { icon: 'code', text: 'Debug React' },
  { icon: 'terminal', text: 'Python script' },
  { icon: 'sparkles', text: 'Explain code' },
  { icon: 'zap', text: 'REST API' },
]

export function ChatInterface() {
  const { user } = useAuth()
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

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
      textareaRef.current?.focus()
    }
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`
  }

  const getSuggestionText = (text: string) => {
    const suggestions: Record<string, string> = {
      'Debug React': 'Help me debug a React component that is not re-rendering',
      'Python script': 'Write a Python function to parse JSON data',
      'Explain code': 'Explain how async/await works in JavaScript',
      'REST API': 'Create a REST API endpoint with Express.js',
    }
    return suggestions[text] || text
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-3xl px-3 py-4 sm:px-4 md:px-6">
          {messages.length === 0 ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center py-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/20 to-primary/10 rounded-full" />
                <Icons.logo className="relative h-16 w-16 sm:h-20 sm:w-20 text-primary" />
              </div>
              <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome to Ship
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md px-4">
                Your AI coding assistant. Ask me to write, debug, or explain code.
              </p>

              {/* Suggestion Grid - Mobile Optimized */}
              <div className="mt-8 w-full max-w-md px-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => handleSubmit(getSuggestionText(suggestion.text))}
                      className="group flex items-center gap-2 sm:gap-3 rounded-xl border border-border/50 bg-card p-3 sm:p-4 text-left transition-all hover:border-primary/50 hover:bg-accent active:scale-[0.98] touch-target"
                    >
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                        {suggestion.icon === 'code' && <Icons.code className="h-4 w-4 sm:h-5 sm:w-5" />}
                        {suggestion.icon === 'terminal' && <Icons.terminal className="h-4 w-4 sm:h-5 sm:w-5" />}
                        {suggestion.icon === 'sparkles' && <Icons.sparkles className="h-4 w-4 sm:h-5 sm:w-5" />}
                        {suggestion.icon === 'zap' && <Icons.zap className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 ring-2 ring-background">
                      <AvatarFallback className="bg-primary/10">
                        <Icons.logo className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-[85%] sm:max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 border border-border/50'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      <ReactMarkdown
                        components={{
                          code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            const isInline = !match
                            return isInline ? (
                              <code className="rounded bg-muted px-1.5 py-0.5 text-xs sm:text-sm font-mono" {...props}>
                                {children}
                              </code>
                            ) : (
                              <div className="relative my-3 overflow-hidden rounded-lg border">
                                <div className="flex items-center justify-between bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                                  <span>{match[1]}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(String(children))
                                      toast.success('Copied to clipboard')
                                    }}
                                    className="flex items-center gap-1 hover:text-foreground touch-target"
                                  >
                                    <Icons.copy className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Copy</span>
                                  </button>
                                </div>
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                  customStyle={{
                                    margin: 0,
                                    borderRadius: 0,
                                    fontSize: '0.8rem',
                                  }}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              </div>
                            )
                          },
                        }}
                      >
                        {message.content || '...'}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 ring-2 ring-background">
                      <AvatarImage src={user?.photoURL ?? undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user?.displayName?.[0] ?? 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-2 sm:gap-3">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 ring-2 ring-background">
                    <AvatarFallback className="bg-primary/10">
                      <Icons.logo className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-muted/50 border border-border/50 px-4 py-3">
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary/60" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input - Fixed bottom with safe area */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-3xl px-3 py-3 sm:px-4 sm:py-4 safe-area-inset">
          <form onSubmit={onFormSubmit}>
            <div className="relative flex items-end gap-2 rounded-2xl border bg-card shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background transition-shadow">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                placeholder="Ask me anything about code..."
                rows={1}
                className="flex-1 resize-none bg-transparent px-3 py-3 sm:px-4 text-sm sm:text-base outline-none placeholder:text-muted-foreground min-h-[48px] max-h-[200px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
              />
              <div className="flex items-center gap-1 p-1.5 sm:p-2">
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="h-10 w-10 sm:h-9 sm:w-9 rounded-xl touch-target shrink-0"
                >
                  {isLoading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] sm:text-xs text-muted-foreground">
              <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line • </span>
              Powered by Llama 3.3
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
