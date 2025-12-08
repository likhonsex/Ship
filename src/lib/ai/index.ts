import { createGroq } from '@ai-sdk/groq'

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export function getModel() {
  return groq('llama-3.3-70b-versatile')
}

export const models = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'groq' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', provider: 'groq' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'groq' },
] as const
