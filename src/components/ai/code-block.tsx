'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  language: string
  code: string
  showLineNumbers?: boolean
}

export function CodeBlock({ language, code, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className="relative group my-4 rounded-lg border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/80">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2 text-xs"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Icons.check className="h-3.5 w-3.5 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Icons.copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {showLineNumbers ? (
              <table className="border-collapse">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i}>
                      <td className="pr-4 text-right text-muted-foreground select-none w-8">
                        {i + 1}
                      </td>
                      <td className="whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
