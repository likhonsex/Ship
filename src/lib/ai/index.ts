import { createXai } from '@ai-sdk/xai'
import { createOpenAI } from '@ai-sdk/openai'
import { createGroq } from '@ai-sdk/groq'

// AI Provider configurations
export const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
})

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

// Get model by provider
export function getModel(provider: 'xai' | 'openai' | 'groq' = 'groq') {
  switch (provider) {
    case 'xai':
      return xai('grok-beta')
    case 'openai':
      return openai('gpt-4-turbo')
    case 'groq':
      return groq('llama-3.3-70b-versatile')
    default:
      return groq('llama-3.3-70b-versatile')
  }
}

// Available models
export const models = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    provider: 'groq',
    description: 'Groq - Ultra fast inference',
  },
  {
    id: 'grok-beta',
    name: 'Grok',
    provider: 'xai',
    description: 'xAI Grok - Real-time knowledge',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'OpenAI - Most capable',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'OpenAI - Fast multimodal',
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    provider: 'groq',
    description: 'Groq - Fastest responses',
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    provider: 'groq',
    description: 'Groq - Great for code',
  },
] as const

export type ModelId = typeof models[number]['id']
