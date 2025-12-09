/**
 * Ship AI - Main Entry Point
 * Unified AI interface with multi-provider support
 */

export * from './providers'
export * from './prompts'

import { getModel, getModelInfo, selectBestModel, withFallback, MODELS, type ModelInfo } from './providers'
import { systemPrompt, codeReviewPrompt, prDescriptionPrompt, issueAnalysisPrompt, securityScanPrompt } from './prompts'

// Re-export for convenience
export { getModel, getModelInfo, selectBestModel, withFallback, MODELS }
export type { ModelInfo }

// Default model getter (backward compatible)
export function getDefaultModel() {
  return getModel()
}

// Prompt templates
export const prompts = {
  system: systemPrompt,
  codeReview: codeReviewPrompt,
  prDescription: prDescriptionPrompt,
  issueAnalysis: issueAnalysisPrompt,
  securityScan: securityScanPrompt,
}

// Quick helper for chat completions
export async function chat(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  }
) {
  const { streamText } = await import('ai')
  const model = getModel(options?.model)

  return streamText({
    model,
    messages,
    temperature: options?.temperature ?? 0.7,
    maxTokens: options?.maxTokens ?? 4096,
  })
}

// Quick helper for single completions
export async function complete(
  prompt: string,
  options?: {
    model?: string
    system?: string
    temperature?: number
    maxTokens?: number
  }
) {
  const { generateText } = await import('ai')
  const model = getModel(options?.model)

  return generateText({
    model,
    prompt,
    system: options?.system ?? systemPrompt,
    temperature: options?.temperature ?? 0.7,
    maxTokens: options?.maxTokens ?? 4096,
  })
}

// Helper for structured output
export async function generateStructured<T>(
  prompt: string,
  schema: import('zod').ZodType<T>,
  options?: {
    model?: string
    system?: string
    temperature?: number
  }
): Promise<T> {
  const { generateObject } = await import('ai')
  const model = getModel(options?.model)

  const result = await generateObject({
    model,
    prompt,
    schema,
    system: options?.system ?? systemPrompt,
    temperature: options?.temperature ?? 0.3,
  })

  return result.object
}
