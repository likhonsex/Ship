'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function WorkspaceDetailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [code, setCode] = useState(`# Welcome to Ship Workspace
# Write your code here and click Run to execute

def hello():
    print("Hello from E2B!")

hello()
`)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [language, setLanguage] = useState('python')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('Running...\n')

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute',
          code,
          language,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.output || 'Execution completed successfully.')
        if (result.error) {
          setOutput((prev) => prev + '\n\nStderr:\n' + result.error)
        }
      } else {
        setOutput('Error: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      setOutput('Error: Failed to execute code')
      toast.error('Failed to execute code')
    } finally {
      setIsRunning(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab key inserts spaces
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = textareaRef.current?.selectionStart || 0
      const end = textareaRef.current?.selectionEnd || 0
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      // Set cursor position after inserted spaces
      setTimeout(() => {
        textareaRef.current?.setSelectionRange(start + 4, start + 4)
      }, 0)
    }
    // Ctrl/Cmd + Enter runs code
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleRunCode()
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-12 items-center justify-between border-b bg-background px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/workspaces" className="touch-target flex items-center justify-center">
            <Icons.chevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Icons.folderOpen className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
              Workspace {params.id}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-8 rounded-md border bg-background px-2 text-xs sm:text-sm"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="bash">Bash</option>
          </select>
          <Button
            onClick={handleRunCode}
            disabled={isRunning}
            size="sm"
            className="h-8 touch-target"
          >
            {isRunning ? (
              <>
                <Icons.spinner className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">Running</span>
              </>
            ) : (
              <>
                <Icons.play className="mr-1.5 h-3.5 w-3.5" />
                <span className="hidden sm:inline">Run</span>
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Editor and Output */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Code Editor */}
        <div className="flex flex-1 flex-col border-b lg:border-b-0 lg:border-r">
          <div className="flex h-8 items-center justify-between border-b bg-muted/30 px-3">
            <span className="text-xs text-muted-foreground">Code Editor</span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Ctrl+Enter to run
            </span>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 resize-none bg-background p-3 sm:p-4 font-mono text-sm leading-relaxed outline-none"
            placeholder="Write your code here..."
          />
        </div>

        {/* Output Terminal */}
        <div className="flex h-1/3 flex-col lg:h-auto lg:w-1/2">
          <div className="flex h-8 items-center justify-between border-b bg-muted/30 px-3">
            <div className="flex items-center gap-2">
              <Icons.terminal className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Output</span>
            </div>
            {output && (
              <button
                onClick={() => setOutput('')}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <pre className="flex-1 overflow-auto bg-zinc-950 p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-400">
            {output || 'Output will appear here after running code...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
