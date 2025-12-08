'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ConversationProps {
  children: ReactNode
  className?: string
}

export function Conversation({ children, className }: ConversationProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn('flex-1', className)}
    >
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6 p-3 sm:p-4">
        {children}
      </div>
    </ScrollArea>
  )
}
