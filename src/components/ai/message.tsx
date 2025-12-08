'use client'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './code-block'

interface MessageProps {
  role: 'user' | 'assistant'
  content: string
  avatar?: string
  name?: string
  isLoading?: boolean
}

export function Message({ role, content, avatar, name, isLoading }: MessageProps) {
  return (
    <div
      className={cn(
        'flex gap-2 sm:gap-3',
        role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {role === 'assistant' && (
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary/10">
            <Icons.logo className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          'rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-[85%] sm:max-w-[80%]',
          role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  const isInline = !match
                  
                  if (isInline) {
                    return (
                      <code className="bg-muted-foreground/20 px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    )
                  }
                  
                  return (
                    <CodeBlock
                      language={match[1]}
                      code={String(children).replace(/\n$/, '')}
                    />
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
      
      {role === 'user' && (
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-primary/10">
            {name?.[0] ?? 'U'}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
