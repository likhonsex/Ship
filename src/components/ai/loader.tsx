'use client'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

interface LoaderProps {
  text?: string
  className?: string
}

export function Loader({ text = 'Thinking…', className }: LoaderProps) {
  return (
    <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
      <Icons.spinner className="h-4 w-4 animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  )
}
