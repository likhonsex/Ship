'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SuggestionProps {
  text: string
  onClick: () => void
  className?: string
}

export function Suggestion({ text, onClick, className }: SuggestionProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        'h-auto py-2 px-3 text-left whitespace-normal rounded-xl',
        'hover:bg-primary/5 hover:border-primary/20',
        'touch-target',
        className
      )}
    >
      {text}
    </Button>
  )
}

interface SuggestionListProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

export function SuggestionList({ suggestions, onSelect, className }: SuggestionListProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {suggestions.map((suggestion, i) => (
        <Suggestion
          key={i}
          text={suggestion}
          onClick={() => onSelect(suggestion)}
        />
      ))}
    </div>
  )
}
