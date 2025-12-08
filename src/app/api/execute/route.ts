import { executeCode, writeFile, readFile, listFiles } from '@/lib/e2b/sandbox'

export const maxDuration = 60
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { action, code, language, path, content } = await req.json()

    switch (action) {
      case 'execute':
        if (!code) {
          return Response.json({ error: 'Code is required' }, { status: 400 })
        }
        const execResult = await executeCode(code, language)
        return Response.json(execResult)

      case 'write':
        if (!path || !content) {
          return Response.json({ error: 'Path and content are required' }, { status: 400 })
        }
        const writeResult = await writeFile(path, content)
        return Response.json(writeResult)

      case 'read':
        if (!path) {
          return Response.json({ error: 'Path is required' }, { status: 400 })
        }
        const readResult = await readFile(path)
        return Response.json(readResult)

      case 'list':
        const listResult = await listFiles(path || '/')
        return Response.json(listResult)

      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Execute API error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
