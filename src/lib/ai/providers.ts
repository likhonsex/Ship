/**
 * Multi-Provider LLM Support for Ship
 * Supports OpenAI, Anthropic, Groq, and Ollama with automatic fallback
 */

import { createGroq } from '@ai-sdk/groq'

// Provider configurations
export interface ProviderConfig {
  apiKey?: string
  baseURL?: string
  model?: string
}

export interface ModelInfo {
  id: string
  name: string
  provider: 'openai' | 'anthropic' | 'groq' | 'ollama' | 'xai'
  contextWindow: number
  maxOutput: number
  supportsTools: boolean
  supportsVision: boolean
}

// Available models by provider
export const MODELS: ModelInfo[] = [
  // Groq Models (Fast inference)
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'groq', contextWindow: 128000, maxOutput: 32768, supportsTools: true, supportsVision: false },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', provider: 'groq', contextWindow: 128000, maxOutput: 8192, supportsTools: true, supportsVision: false },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'groq', contextWindow: 32768, maxOutput: 32768, supportsTools: true, supportsVision: false },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', provider: 'groq', contextWindow: 8192, maxOutput: 8192, supportsTools: true, supportsVision: false },

  // OpenAI Models
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', contextWindow: 128000, maxOutput: 16384, supportsTools: true, supportsVision: true },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', contextWindow: 128000, maxOutput: 16384, supportsTools: true, supportsVision: true },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', contextWindow: 128000, maxOutput: 4096, supportsTools: true, supportsVision: true },
  { id: 'o1-preview', name: 'O1 Preview', provider: 'openai', contextWindow: 128000, maxOutput: 32768, supportsTools: false, supportsVision: false },

  // Anthropic Models
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'anthropic', contextWindow: 200000, maxOutput: 8192, supportsTools: true, supportsVision: true },
  { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'anthropic', contextWindow: 200000, maxOutput: 8192, supportsTools: true, supportsVision: true },
  { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', provider: 'anthropic', contextWindow: 200000, maxOutput: 8192, supportsTools: true, supportsVision: true },

  // xAI Models
  { id: 'grok-beta', name: 'Grok Beta', provider: 'xai', contextWindow: 131072, maxOutput: 4096, supportsTools: true, supportsVision: false },

  // Ollama Models (Local)
  { id: 'llama3.2', name: 'Llama 3.2 (Local)', provider: 'ollama', contextWindow: 128000, maxOutput: 4096, supportsTools: true, supportsVision: false },
  { id: 'codellama', name: 'Code Llama (Local)', provider: 'ollama', contextWindow: 16384, maxOutput: 4096, supportsTools: false, supportsVision: false },
  { id: 'deepseek-coder-v2', name: 'DeepSeek Coder V2 (Local)', provider: 'ollama', contextWindow: 128000, maxOutput: 4096, supportsTools: true, supportsVision: false },
]

// Provider factory functions
export function createProviders() {
  const providers: Record<string, () => ReturnType<typeof createGroq> | null> = {}

  // Groq provider
  if (process.env.GROQ_API_KEY) {
    providers.groq = () => createGroq({ apiKey: process.env.GROQ_API_KEY })
  }

  // OpenAI provider (dynamic import to avoid issues if not installed)
  if (process.env.OPENAI_API_KEY) {
    providers.openai = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { createOpenAI } = require('@ai-sdk/openai')
        return createOpenAI({ apiKey: process.env.OPENAI_API_KEY })
      } catch {
        console.warn('OpenAI SDK not installed. Run: npm install @ai-sdk/openai')
        return null
      }
    }
  }

  // Anthropic provider
  if (process.env.ANTHROPIC_API_KEY) {
    providers.anthropic = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { createAnthropic } = require('@ai-sdk/anthropic')
        return createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      } catch {
        console.warn('Anthropic SDK not installed. Run: npm install @ai-sdk/anthropic')
        return null
      }
    }
  }

  // xAI provider
  if (process.env.XAI_API_KEY) {
    providers.xai = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { createXai } = require('@ai-sdk/xai')
        return createXai({ apiKey: process.env.XAI_API_KEY })
      } catch {
        console.warn('xAI SDK not installed. Run: npm install @ai-sdk/xai')
        return null
      }
    }
  }

  // Ollama provider (local)
  if (process.env.OLLAMA_BASE_URL || process.env.ENABLE_OLLAMA === 'true') {
    providers.ollama = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { createOllama } = require('ollama-ai-provider')
        return createOllama({ baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/api' })
      } catch {
        console.warn('Ollama provider not installed. Run: npm install ollama-ai-provider')
        return null
      }
    }
  }

  return providers
}

// Get available providers
export function getAvailableProviders(): string[] {
  const available: string[] = []
  if (process.env.GROQ_API_KEY) available.push('groq')
  if (process.env.OPENAI_API_KEY) available.push('openai')
  if (process.env.ANTHROPIC_API_KEY) available.push('anthropic')
  if (process.env.XAI_API_KEY) available.push('xai')
  if (process.env.OLLAMA_BASE_URL || process.env.ENABLE_OLLAMA === 'true') available.push('ollama')
  return available
}

// Get provider instance
export function getProvider(providerName: string) {
  const providers = createProviders()
  const providerFactory = providers[providerName]

  if (!providerFactory) {
    const available = getAvailableProviders()
    throw new Error(
      `Provider "${providerName}" not configured. Available providers: ${available.join(', ') || 'none'}`
    )
  }

  const provider = providerFactory()
  if (!provider) {
    throw new Error(`Failed to initialize provider "${providerName}"`)
  }

  return provider
}

// Get model with automatic provider detection
export function getModel(modelId?: string) {
  const targetModel = modelId || process.env.DEFAULT_MODEL || 'llama-3.3-70b-versatile'
  const modelInfo = MODELS.find(m => m.id === targetModel)

  if (!modelInfo) {
    throw new Error(`Unknown model: ${targetModel}. Available models: ${MODELS.map(m => m.id).join(', ')}`)
  }

  const provider = getProvider(modelInfo.provider)
  return provider(modelInfo.id)
}

// Get model info
export function getModelInfo(modelId: string): ModelInfo | undefined {
  return MODELS.find(m => m.id === modelId)
}

// Get models by provider
export function getModelsByProvider(providerName: string): ModelInfo[] {
  return MODELS.filter(m => m.provider === providerName)
}

// Smart model selection based on task requirements
export function selectBestModel(options: {
  requiresVision?: boolean
  requiresTools?: boolean
  preferSpeed?: boolean
  preferQuality?: boolean
  maxContextWindow?: number
}): ModelInfo | null {
  const available = getAvailableProviders()

  let candidates = MODELS.filter(m => available.includes(m.provider))

  if (options.requiresVision) {
    candidates = candidates.filter(m => m.supportsVision)
  }

  if (options.requiresTools) {
    candidates = candidates.filter(m => m.supportsTools)
  }

  if (options.maxContextWindow) {
    candidates = candidates.filter(m => m.contextWindow >= options.maxContextWindow)
  }

  if (candidates.length === 0) return null

  // Sort by preference
  if (options.preferSpeed) {
    // Prefer Groq for speed
    candidates.sort((a, b) => {
      if (a.provider === 'groq' && b.provider !== 'groq') return -1
      if (b.provider === 'groq' && a.provider !== 'groq') return 1
      return 0
    })
  } else if (options.preferQuality) {
    // Prefer Claude or GPT-4 for quality
    candidates.sort((a, b) => {
      const qualityOrder = ['anthropic', 'openai', 'xai', 'groq', 'ollama']
      return qualityOrder.indexOf(a.provider) - qualityOrder.indexOf(b.provider)
    })
  }

  return candidates[0]
}

// Fallback chain for reliability
export async function withFallback<T>(
  fn: (model: ReturnType<typeof getModel>) => Promise<T>,
  modelIds?: string[]
): Promise<T> {
  const available = getAvailableProviders()
  const modelsToTry = modelIds || MODELS
    .filter(m => available.includes(m.provider))
    .map(m => m.id)

  let lastError: Error | null = null

  for (const modelId of modelsToTry) {
    try {
      const model = getModel(modelId)
      return await fn(model)
    } catch (error) {
      lastError = error as Error
      console.warn(`Model ${modelId} failed, trying next...`, error)
    }
  }

  throw lastError || new Error('All models failed')
}
