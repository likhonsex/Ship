/**
 * Ship Agent Orchestrator
 * Manages multiple agents and coordinates their execution
 */

import { EventEmitter } from 'events'
import { getModel, withFallback } from '../lib/ai/providers.js'
import { z } from 'zod'

// Task types
export type TaskType = 'issue' | 'review' | 'security' | 'deploy' | 'feedback'
export type TaskStatus = 'pending' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

// Task schema
export const TaskSchema = z.object({
  id: z.string(),
  type: z.enum(['issue', 'review', 'security', 'deploy', 'feedback']),
  status: z.enum(['pending', 'queued', 'running', 'completed', 'failed', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  input: z.record(z.unknown()),
  output: z.record(z.unknown()).optional(),
  error: z.string().optional(),
  createdAt: z.string(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  retries: z.number().default(0),
  maxRetries: z.number().default(3),
  metadata: z.record(z.unknown()).optional(),
})

export type Task = z.infer<typeof TaskSchema>

// Agent interface
export interface Agent {
  name: string
  type: TaskType
  description: string
  execute(input: Record<string, unknown>): Promise<Record<string, unknown>>
}

// Orchestrator configuration
export interface OrchestratorConfig {
  maxConcurrentTasks: number
  defaultPriority: TaskPriority
  retryDelay: number
  taskTimeout: number
}

const DEFAULT_CONFIG: OrchestratorConfig = {
  maxConcurrentTasks: 5,
  defaultPriority: 'medium',
  retryDelay: 1000,
  taskTimeout: 300000, // 5 minutes
}

// Orchestrator events
export interface OrchestratorEvents {
  'task:created': (task: Task) => void
  'task:started': (task: Task) => void
  'task:completed': (task: Task) => void
  'task:failed': (task: Task, error: Error) => void
  'task:retrying': (task: Task, attempt: number) => void
  'agent:registered': (agent: Agent) => void
  'queue:empty': () => void
}

/**
 * Agent Orchestrator - Coordinates multiple AI agents
 */
export class AgentOrchestrator extends EventEmitter {
  private agents: Map<TaskType, Agent> = new Map()
  private taskQueue: Task[] = []
  private runningTasks: Map<string, Task> = new Map()
  private completedTasks: Map<string, Task> = new Map()
  private config: OrchestratorConfig

  constructor(config: Partial<OrchestratorConfig> = {}) {
    super()
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * Register an agent for a specific task type
   */
  registerAgent(agent: Agent): void {
    this.agents.set(agent.type, agent)
    this.emit('agent:registered', agent)
  }

  /**
   * Create and queue a new task
   */
  createTask(
    type: TaskType,
    input: Record<string, unknown>,
    options: Partial<Pick<Task, 'priority' | 'maxRetries' | 'metadata'>> = {}
  ): Task {
    const task: Task = {
      id: this.generateTaskId(),
      type,
      status: 'pending',
      priority: options.priority || this.config.defaultPriority,
      input,
      createdAt: new Date().toISOString(),
      retries: 0,
      maxRetries: options.maxRetries ?? 3,
      metadata: options.metadata,
    }

    this.taskQueue.push(task)
    this.sortQueue()
    this.emit('task:created', task)

    // Process queue
    this.processQueue()

    return task
  }

  /**
   * Process the task queue
   */
  private async processQueue(): Promise<void> {
    while (
      this.taskQueue.length > 0 &&
      this.runningTasks.size < this.config.maxConcurrentTasks
    ) {
      const task = this.taskQueue.shift()
      if (task) {
        this.executeTask(task)
      }
    }

    if (this.taskQueue.length === 0 && this.runningTasks.size === 0) {
      this.emit('queue:empty')
    }
  }

  /**
   * Execute a single task
   */
  private async executeTask(task: Task): Promise<void> {
    const agent = this.agents.get(task.type)
    if (!agent) {
      task.status = 'failed'
      task.error = `No agent registered for task type: ${task.type}`
      this.completedTasks.set(task.id, task)
      this.emit('task:failed', task, new Error(task.error))
      return
    }

    task.status = 'running'
    task.startedAt = new Date().toISOString()
    this.runningTasks.set(task.id, task)
    this.emit('task:started', task)

    try {
      // Execute with timeout
      const result = await Promise.race([
        agent.execute(task.input),
        this.timeout(this.config.taskTimeout),
      ])

      task.output = result as Record<string, unknown>
      task.status = 'completed'
      task.completedAt = new Date().toISOString()
      this.emit('task:completed', task)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      if (task.retries < task.maxRetries) {
        task.retries++
        task.status = 'queued'
        this.emit('task:retrying', task, task.retries)

        // Re-queue with delay
        setTimeout(() => {
          this.taskQueue.push(task)
          this.sortQueue()
          this.processQueue()
        }, this.config.retryDelay * task.retries)
      } else {
        task.status = 'failed'
        task.error = errorMessage
        task.completedAt = new Date().toISOString()
        this.emit('task:failed', task, error as Error)
      }
    } finally {
      this.runningTasks.delete(task.id)
      this.completedTasks.set(task.id, task)
      this.processQueue()
    }
  }

  /**
   * Get task by ID
   */
  getTask(taskId: string): Task | undefined {
    return (
      this.runningTasks.get(taskId) ||
      this.completedTasks.get(taskId) ||
      this.taskQueue.find(t => t.id === taskId)
    )
  }

  /**
   * Get all tasks of a specific status
   */
  getTasksByStatus(status: TaskStatus): Task[] {
    const tasks: Task[] = []

    if (status === 'running') {
      return Array.from(this.runningTasks.values())
    }

    if (status === 'pending' || status === 'queued') {
      return this.taskQueue.filter(t => t.status === status)
    }

    return Array.from(this.completedTasks.values()).filter(t => t.status === status)
  }

  /**
   * Cancel a pending or queued task
   */
  cancelTask(taskId: string): boolean {
    const index = this.taskQueue.findIndex(t => t.id === taskId)
    if (index !== -1) {
      const task = this.taskQueue.splice(index, 1)[0]
      task.status = 'cancelled'
      task.completedAt = new Date().toISOString()
      this.completedTasks.set(task.id, task)
      return true
    }
    return false
  }

  /**
   * Get orchestrator status
   */
  getStatus(): {
    running: number
    queued: number
    completed: number
    failed: number
    agents: string[]
  } {
    return {
      running: this.runningTasks.size,
      queued: this.taskQueue.length,
      completed: Array.from(this.completedTasks.values()).filter(t => t.status === 'completed').length,
      failed: Array.from(this.completedTasks.values()).filter(t => t.status === 'failed').length,
      agents: Array.from(this.agents.keys()),
    }
  }

  /**
   * Sort queue by priority
   */
  private sortQueue(): void {
    const priorityOrder: Record<TaskPriority, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    }

    this.taskQueue.sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }

  /**
   * Generate unique task ID
   */
  private generateTaskId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Timeout promise
   */
  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Task timeout')), ms)
    })
  }
}

// Built-in agents

/**
 * Issue Processor Agent
 */
export class IssueProcessorAgent implements Agent {
  name = 'Issue Processor'
  type: TaskType = 'issue'
  description = 'Analyzes GitHub issues and creates implementation plans'

  async execute(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const { issueNumber, owner, repo, issueBody } = input as {
      issueNumber: number
      owner: string
      repo: string
      issueBody: string
    }

    // Use AI to analyze the issue
    const model = getModel()
    const { generateText } = await import('ai')
    const { issueAnalysisPrompt } = await import('../lib/ai/prompts.js')

    const result = await generateText({
      model,
      system: issueAnalysisPrompt,
      prompt: `Analyze this GitHub issue:\n\nIssue #${issueNumber}\n${issueBody}`,
    })

    return {
      issueNumber,
      analysis: result.text,
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Code Review Agent
 */
export class CodeReviewAgent implements Agent {
  name = 'Code Reviewer'
  type: TaskType = 'review'
  description = 'Performs AI-powered code review on pull requests'

  async execute(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const { prNumber, owner, repo, diff } = input as {
      prNumber: number
      owner: string
      repo: string
      diff: string
    }

    const model = getModel()
    const { generateText } = await import('ai')
    const { codeReviewPrompt } = await import('../lib/ai/prompts.js')

    const result = await generateText({
      model,
      system: codeReviewPrompt,
      prompt: `Review this pull request:\n\nPR #${prNumber}\n\n${diff}`,
    })

    return {
      prNumber,
      review: result.text,
      verdict: 'approved', // Would be parsed from result
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Security Scanner Agent
 */
export class SecurityScannerAgent implements Agent {
  name = 'Security Scanner'
  type: TaskType = 'security'
  description = 'Scans code for security vulnerabilities'

  async execute(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const { code, filePath } = input as {
      code: string
      filePath: string
    }

    const model = getModel()
    const { generateText } = await import('ai')
    const { securityScanPrompt } = await import('../lib/ai/prompts.js')

    const result = await generateText({
      model,
      system: securityScanPrompt,
      prompt: `Scan this code for security vulnerabilities:\n\nFile: ${filePath}\n\n${code}`,
    })

    return {
      filePath,
      findings: result.text,
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Feedback Handler Agent
 */
export class FeedbackHandlerAgent implements Agent {
  name = 'Feedback Handler'
  type: TaskType = 'feedback'
  description = 'Responds to PR review comments and feedback'

  async execute(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const { comment, prNumber, context } = input as {
      comment: string
      prNumber: number
      context: string
    }

    const model = getModel()
    const { generateText } = await import('ai')

    const result = await generateText({
      model,
      prompt: `Generate a helpful response to this code review comment:\n\nPR #${prNumber}\nComment: ${comment}\nContext: ${context}`,
    })

    return {
      prNumber,
      response: result.text,
      timestamp: new Date().toISOString(),
    }
  }
}

// Factory function to create a fully configured orchestrator
export function createOrchestrator(config?: Partial<OrchestratorConfig>): AgentOrchestrator {
  const orchestrator = new AgentOrchestrator(config)

  // Register built-in agents
  orchestrator.registerAgent(new IssueProcessorAgent())
  orchestrator.registerAgent(new CodeReviewAgent())
  orchestrator.registerAgent(new SecurityScannerAgent())
  orchestrator.registerAgent(new FeedbackHandlerAgent())

  return orchestrator
}

// Export singleton instance for convenience
export const defaultOrchestrator = createOrchestrator()
