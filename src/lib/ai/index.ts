import { createXai } from '@ai-sdk/xai'
import { createOpenAI } from '@ai-sdk/openai'
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai'

// AI Provider configurations
export const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
})

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Default model - xAI Grok
export function getModel(provider: 'xai' | 'openai' = 'xai') {
  switch (provider) {
    case 'xai':
      return xai('grok-beta')
    case 'openai':
      return openai('gpt-4-turbo')
    default:
      return xai('grok-beta')
  }
}

// Model with custom middleware (for logging, rate limiting, etc.)
export function customModel(provider: 'xai' | 'openai' = 'xai') {
  return wrapLanguageModel({
    model: getModel(provider),
    middleware: {
      // Add custom middleware here
    },
  })
}

// Available models
export const models = [
  {
    id: 'grok-beta',
    name: 'Grok',
    provider: 'xai',
    description: 'xAI Grok - Fast and capable',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'OpenAI GPT-4 Turbo - Most capable',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'OpenAI GPT-4o - Fast and multimodal',
  },
] as const

export type ModelId = typeof models[number]['id']
