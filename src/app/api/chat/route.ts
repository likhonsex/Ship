import { streamText, type Message } from 'ai'
import { getModel } from '@/lib/ai'
import { systemPrompt } from '@/lib/ai/prompts'

export const maxDuration = 60
export const runtime = 'edge'

export async function POST(req: Request) {
  // Note: Firebase Auth is client-side only
  // For production, add Firebase Admin SDK for server-side token verification
  // const authHeader = req.headers.get('Authorization')
  // Verify Firebase ID token here

  try {
    const { messages, model = 'groq' }: { messages: Message[]; model?: 'xai' | 'openai' | 'groq' } = await req.json()

    const result = streamText({
      model: getModel(model),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
