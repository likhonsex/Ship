/**
 * Ship - Autonomous AI Coding Agent
 * Main entry point for programmatic usage
 */

// AI & LLM
export * from './lib/ai/index.js'
export type { ModelInfo, ProviderConfig } from './lib/ai/providers.js'

// Agents
export {
  AgentOrchestrator,
  createOrchestrator,
  defaultOrchestrator,
  IssueProcessorAgent,
  CodeReviewAgent,
  SecurityScannerAgent,
  FeedbackHandlerAgent,
  type Agent,
  type Task,
  type TaskType,
  type TaskStatus,
  type TaskPriority,
} from './agents/orchestrator.js'

// Version
export const VERSION = '1.0.0'

// Quick start helper
export async function createShipAgent(options?: {
  provider?: string
  model?: string
  githubToken?: string
}) {
  const { createOrchestrator } = await import('./agents/orchestrator.js')

  // Set environment variables if provided
  if (options?.githubToken) {
    process.env.GITHUB_TOKEN = options.githubToken
  }
  if (options?.provider) {
    process.env.DEFAULT_PROVIDER = options.provider
  }
  if (options?.model) {
    process.env.DEFAULT_MODEL = options.model
  }

  return createOrchestrator()
}

// Default export for convenience
export default {
  VERSION,
  createShipAgent,
}
