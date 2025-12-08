import { streamText, type CoreMessage } from 'ai'
import { getModel } from '@/lib/ai'
import { systemPrompt } from '@/lib/ai/prompts'

export const maxDuration = 60
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json()

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
