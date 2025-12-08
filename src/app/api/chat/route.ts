import { streamText, type Message } from 'ai'
import { getModel } from '@/lib/ai'
import { systemPrompt } from '@/lib/ai/prompts'
import { auth } from '@/lib/auth'

export const maxDuration = 60

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages, model = 'xai' }: { messages: Message[]; model?: 'xai' | 'openai' } = await req.json()

  const result = streamText({
    model: getModel(model),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
