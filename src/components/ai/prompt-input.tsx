'use client'

import { useRef, useState, FormEvent, KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

interface PromptInputProps {
  onSubmit: (value: string) => void
  isLoading?: boolean
  placeholder?: string
  disabled?: boolean
}

export function PromptInput({
  onSubmit,
  isLoading = false,
  placeholder = 'Type your message…',
  disabled = false,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim() || isLoading || disabled) return
    onSubmit(value.trim())
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    // Auto-resize
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className={cn(
            'flex min-h-[44px] max-h-[200px] w-full rounded-2xl border border-input bg-background px-4 py-3 pr-12 text-sm',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-none touch-action-manipulation'
          )}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !value.trim() || disabled}
          className="absolute bottom-1.5 right-1.5 h-9 w-9 rounded-xl"
          aria-label="Send message"
        >
          {isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  )
}
