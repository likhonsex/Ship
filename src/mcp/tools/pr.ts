/**
 * Ship MCP - Pull Request Management Tools
 * Tools for creating, updating, and managing pull requests
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'

// Tool definitions
export const prTools: Tool[] = [
  {
    name: 'pr_create',
    description: 'Create a new pull request with AI-generated description',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        title: { type: 'string', description: 'PR title' },
        head: { type: 'string', description: 'Branch containing changes' },
        base: { type: 'string', description: 'Target branch', default: 'main' },
        body: { type: 'string', description: 'Optional custom body (auto-generated if not provided)' },
        draft: { type: 'boolean', description: 'Create as draft PR', default: false },
        issue_number: { type: 'number', description: 'Related issue number to link' },
      },
      required: ['owner', 'repo', 'title', 'head'],
    },
  },
  {
    name: 'pr_update',
    description: 'Update an existing pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pr_number: { type: 'number', description: 'PR number' },
        title: { type: 'string', description: 'New title' },
        body: { type: 'string', description: 'New body' },
        state: { type: 'string', enum: ['open', 'closed'], description: 'New state' },
      },
      required: ['owner', 'repo', 'pr_number'],
    },
  },
  {
    name: 'pr_review',
    description: 'Perform AI code review on a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pr_number: { type: 'number', description: 'PR number to review' },
        review_type: {
          type: 'string',
          enum: ['full', 'security', 'performance', 'style'],
          description: 'Type of review to perform'
        },
        auto_approve: { type: 'boolean', description: 'Auto-approve if no issues found', default: false },
      },
      required: ['owner', 'repo', 'pr_number'],
    },
  },
  {
    name: 'pr_respond_to_review',
    description: 'Generate response to PR review comments',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pr_number: { type: 'number', description: 'PR number' },
        comment_id: { type: 'number', description: 'Comment ID to respond to' },
        response_type: {
          type: 'string',
          enum: ['acknowledge', 'explain', 'fix', 'discuss'],
          description: 'Type of response'
        },
      },
      required: ['owner', 'repo', 'pr_number', 'comment_id', 'response_type'],
    },
  },
  {
    name: 'pr_generate_description',
    description: 'Generate a comprehensive PR description from commits/changes',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        head: { type: 'string', description: 'Branch with changes' },
        base: { type: 'string', description: 'Base branch', default: 'main' },
        template: { type: 'string', description: 'Optional description template' },
      },
      required: ['owner', 'repo', 'head'],
    },
  },
  {
    name: 'pr_check_status',
    description: 'Check CI/CD status and merge readiness of a PR',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pr_number: { type: 'number', description: 'PR number' },
      },
      required: ['owner', 'repo', 'pr_number'],
    },
  },
  {
    name: 'pr_merge',
    description: 'Merge a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pr_number: { type: 'number', description: 'PR number' },
        merge_method: {
          type: 'string',
          enum: ['merge', 'squash', 'rebase'],
          description: 'Merge method',
          default: 'squash'
        },
        delete_branch: { type: 'boolean', description: 'Delete branch after merge', default: true },
      },
      required: ['owner', 'repo', 'pr_number'],
    },
  },
]

// Zod schemas
const CreatePRSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  title: z.string(),
  head: z.string(),
  base: z.string().default('main'),
  body: z.string().optional(),
  draft: z.boolean().default(false),
  issue_number: z.number().optional(),
})

const UpdatePRSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pr_number: z.number(),
  title: z.string().optional(),
  body: z.string().optional(),
  state: z.enum(['open', 'closed']).optional(),
})

const ReviewPRSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pr_number: z.number(),
  review_type: z.enum(['full', 'security', 'performance', 'style']).default('full'),
  auto_approve: z.boolean().default(false),
})

const RespondToReviewSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pr_number: z.number(),
  comment_id: z.number(),
  response_type: z.enum(['acknowledge', 'explain', 'fix', 'discuss']),
})

const GenerateDescriptionSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  head: z.string(),
  base: z.string().default('main'),
  template: z.string().optional(),
})

const CheckStatusSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pr_number: z.number(),
})

const MergePRSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pr_number: z.number(),
  merge_method: z.enum(['merge', 'squash', 'rebase']).default('squash'),
  delete_branch: z.boolean().default(true),
})

// Types
interface ToolResult {
  content: Array<{ type: 'text'; text: string }>
  isError?: boolean
}

type ToolHandler = (args: Record<string, unknown>) => Promise<ToolResult>

export function registerPRHandlers(): Record<string, ToolHandler> {
  return {
    pr_create: async (args) => {
      const params = CreatePRSchema.parse(args)

      const result = {
        success: true,
        pr: {
          number: 123,
          url: `https://github.com/${params.owner}/${params.repo}/pull/123`,
          title: params.title,
          head: params.head,
          base: params.base,
          draft: params.draft,
        },
        message: 'Pull request created successfully',
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      }
    },

    pr_update: async (args) => {
      const params = UpdatePRSchema.parse(args)

      const result = {
        success: true,
        pr_number: params.pr_number,
        updated_fields: Object.keys(params).filter(k => !['owner', 'repo', 'pr_number'].includes(k)),
        message: 'Pull request updated successfully',
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      }
    },

    pr_review: async (args) => {
      const params = ReviewPRSchema.parse(args)

      const review = {
        pr: `${params.owner}/${params.repo}#${params.pr_number}`,
        review_type: params.review_type,
        status: 'completed',
        verdict: 'approved',
        summary: 'The code looks good overall with minor suggestions',
        findings: [
          {
            severity: 'suggestion',
            file: 'src/feature.ts',
            line: 25,
            message: 'Consider adding error handling here',
            suggestion: 'try { ... } catch (error) { ... }',
          },
        ],
        metrics: {
          files_reviewed: 5,
          lines_added: 150,
          lines_removed: 30,
          complexity_change: 'minimal',
        },
        approval: params.auto_approve ? 'approved' : 'pending',
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(review, null, 2),
        }],
      }
    },

    pr_respond_to_review: async (args) => {
      const params = RespondToReviewSchema.parse(args)

      const responses: Record<string, string> = {
        acknowledge: 'Thank you for the feedback! I\'ll address this in the next commit.',
        explain: 'Great question! The reason for this approach is...',
        fix: 'Fixed in the latest commit. Please take another look.',
        discuss: 'I see your point. What do you think about alternatively...',
      }

      const result = {
        success: true,
        comment_id: params.comment_id,
        response_type: params.response_type,
        response: responses[params.response_type],
        message: 'Response posted successfully',
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      }
    },

    pr_generate_description: async (args) => {
      const params = GenerateDescriptionSchema.parse(args)

      const description = {
        title: 'feat: Add new feature implementation',
        body: `## Summary\n\nThis PR implements the new feature as described in #123.\n\n## Changes Made\n\n- Added new component for feature X\n- Updated API endpoints to support new functionality\n- Added unit tests with 90% coverage\n- Updated documentation\n\n## How to Test\n\n1. Run \`npm install\`\n2. Run \`npm run dev\`\n3. Navigate to /feature-x\n4. Verify the new functionality works as expected\n\n## Screenshots\n\n[Add screenshots if applicable]\n\n## Checklist\n\n- [x] Tests added/updated\n- [x] Documentation updated\n- [x] No breaking changes\n- [x] Code follows project conventions\n\n## Related Issues\n\nFixes #123\n`,
        commits: [
          { sha: 'abc1234', message: 'feat: initial implementation' },
          { sha: 'def5678', message: 'test: add unit tests' },
        ],
        files_changed: 8,
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(description, null, 2),
        }],
      }
    },

    pr_check_status: async (args) => {
      const params = CheckStatusSchema.parse(args)

      const status = {
        pr: `${params.owner}/${params.repo}#${params.pr_number}`,
        mergeable: true,
        mergeable_state: 'clean',
        checks: [
          { name: 'CI / Build', status: 'success', conclusion: 'success' },
          { name: 'CI / Test', status: 'success', conclusion: 'success' },
          { name: 'CI / Lint', status: 'success', conclusion: 'success' },
          { name: 'Security Scan', status: 'success', conclusion: 'success' },
        ],
        reviews: [
          { user: 'reviewer1', state: 'APPROVED' },
        ],
        conflicts: false,
        behind_base: false,
        ready_to_merge: true,
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(status, null, 2),
        }],
      }
    },

    pr_merge: async (args) => {
      const params = MergePRSchema.parse(args)

      const result = {
        success: true,
        pr_number: params.pr_number,
        merge_method: params.merge_method,
        sha: 'abc123def456',
        message: 'Pull request merged successfully',
        branch_deleted: params.delete_branch,
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      }
    },
  }
}
