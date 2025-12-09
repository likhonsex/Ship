/**
 * Ship MCP - Repository Tools
 * Tools for repository exploration and file operations
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'

// Tool definitions
export const repoTools: Tool[] = [
  {
    name: 'repo_get_structure',
    description: 'Get repository file structure and overview',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        path: { type: 'string', description: 'Path to start from', default: '' },
        depth: { type: 'number', description: 'How deep to traverse', default: 3 },
        include_hidden: { type: 'boolean', description: 'Include hidden files', default: false },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'repo_read_file',
    description: 'Read contents of a file from the repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        path: { type: 'string', description: 'File path' },
        ref: { type: 'string', description: 'Branch, tag, or commit SHA', default: 'main' },
      },
      required: ['owner', 'repo', 'path'],
    },
  },
  {
    name: 'repo_search_code',
    description: 'Search for code patterns in repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        query: { type: 'string', description: 'Search query' },
        file_types: {
          type: 'array',
          items: { type: 'string' },
          description: 'File extensions to search (e.g., ts, js, py)'
        },
        path_filter: { type: 'string', description: 'Filter by path pattern' },
      },
      required: ['owner', 'repo', 'query'],
    },
  },
  {
    name: 'repo_get_commits',
    description: 'Get recent commits from repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        branch: { type: 'string', description: 'Branch name', default: 'main' },
        limit: { type: 'number', description: 'Number of commits to fetch', default: 10 },
        path: { type: 'string', description: 'Filter by file path' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'repo_get_branches',
    description: 'List repository branches',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        include_stale: { type: 'boolean', description: 'Include stale branches', default: false },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'repo_analyze_tech_stack',
    description: 'Analyze repository technology stack and dependencies',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'repo_create_branch',
    description: 'Create a new branch',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        branch_name: { type: 'string', description: 'New branch name' },
        from_ref: { type: 'string', description: 'Base reference', default: 'main' },
      },
      required: ['owner', 'repo', 'branch_name'],
    },
  },
  {
    name: 'repo_commit_files',
    description: 'Commit changes to repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        branch: { type: 'string', description: 'Branch to commit to' },
        message: { type: 'string', description: 'Commit message' },
        files: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: { type: 'string' },
              content: { type: 'string' },
              action: { type: 'string', enum: ['create', 'update', 'delete'] },
            },
          },
          description: 'Files to commit',
        },
      },
      required: ['owner', 'repo', 'branch', 'message', 'files'],
    },
  },
]

// Zod schemas
const GetStructureSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  path: z.string().default(''),
  depth: z.number().default(3),
  include_hidden: z.boolean().default(false),
})

const ReadFileSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  path: z.string(),
  ref: z.string().default('main'),
})

const SearchCodeSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  query: z.string(),
  file_types: z.array(z.string()).optional(),
  path_filter: z.string().optional(),
})

const GetCommitsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  branch: z.string().default('main'),
  limit: z.number().default(10),
  path: z.string().optional(),
})

const GetBranchesSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  include_stale: z.boolean().default(false),
})

const AnalyzeTechStackSchema = z.object({
  owner: z.string(),
  repo: z.string(),
})

const CreateBranchSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  branch_name: z.string(),
  from_ref: z.string().default('main'),
})

const CommitFilesSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  branch: z.string(),
  message: z.string(),
  files: z.array(z.object({
    path: z.string(),
    content: z.string(),
    action: z.enum(['create', 'update', 'delete']),
  })),
})

// Types
interface ToolResult {
  content: Array<{ type: 'text'; text: string }>
  isError?: boolean
}

type ToolHandler = (args: Record<string, unknown>) => Promise<ToolResult>

export function registerRepoHandlers(): Record<string, ToolHandler> {
  return {
    repo_get_structure: async (args) => {
      const params = GetStructureSchema.parse(args)

      const structure = {
        repository: `${params.owner}/${params.repo}`,
        path: params.path || '/',
        tree: [
          { path: 'src/', type: 'directory', children: ['app/', 'components/', 'lib/'] },
          { path: 'src/app/', type: 'directory', children: ['page.tsx', 'layout.tsx'] },
          { path: 'src/components/', type: 'directory', children: ['ui/', 'chat/'] },
          { path: 'src/lib/', type: 'directory', children: ['ai/', 'db/', 'utils.ts'] },
          { path: 'public/', type: 'directory', children: ['favicon.ico'] },
          { path: 'package.json', type: 'file', size: 1500 },
          { path: 'README.md', type: 'file', size: 8000 },
          { path: 'tsconfig.json', type: 'file', size: 600 },
        ],
        stats: {
          total_files: 45,
          total_directories: 12,
          languages: { TypeScript: 80, CSS: 15, JSON: 5 },
        },
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(structure, null, 2),
        }],
      }
    },

    repo_read_file: async (args) => {
      const params = ReadFileSchema.parse(args)

      const result = {
        path: params.path,
        ref: params.ref,
        encoding: 'utf-8',
        size: 1500,
        content: `// File content from ${params.path}\n// This would contain actual file content`,
        sha: 'abc123def456',
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      }
    },

    repo_search_code: async (args) => {
      const params = SearchCodeSchema.parse(args)

      const results = {
        query: params.query,
        total_matches: 5,
        matches: [
          {
            file: 'src/lib/ai/index.ts',
            line: 15,
            content: 'export function getModel() {',
            context: ['import { createGroq } from...', 'export function getModel() {', '  return groq(...)'],
          },
          {
            file: 'src/app/api/chat/route.ts',
            line: 25,
            content: 'const model = getModel()',
            context: ['import { getModel } from...', 'const model = getModel()', 'return streamText(...)'],
          },
        ],
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(results, null, 2),
        }],
      }
    },

    repo_get_commits: async (args) => {
      const params = GetCommitsSchema.parse(args)

      const commits = {
        branch: params.branch,
        commits: [
          {
            sha: 'abc123',
            message: 'feat: add new feature',
            author: 'developer',
            date: '2024-01-15T10:30:00Z',
            files_changed: 5,
          },
          {
            sha: 'def456',
            message: 'fix: resolve bug in component',
            author: 'developer',
            date: '2024-01-14T15:45:00Z',
            files_changed: 2,
          },
        ],
        total: params.limit,
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(commits, null, 2),
        }],
      }
    },

    repo_get_branches: async (args) => {
      const params = GetBranchesSchema.parse(args)

      const branches = {
        default_branch: 'main',
        branches: [
          { name: 'main', protected: true, last_commit: '2024-01-15', ahead: 0, behind: 0 },
          { name: 'develop', protected: false, last_commit: '2024-01-14', ahead: 5, behind: 0 },
          { name: 'feature/new-ui', protected: false, last_commit: '2024-01-13', ahead: 3, behind: 2 },
        ],
        total: 3,
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(branches, null, 2),
        }],
      }
    },

    repo_analyze_tech_stack: async (args) => {
      const params = AnalyzeTechStackSchema.parse(args)

      const analysis = {
        repository: `${params.owner}/${params.repo}`,
        stack: {
          frontend: {
            framework: 'Next.js 14',
            ui_library: 'React 18',
            styling: 'Tailwind CSS',
            components: 'Radix UI',
          },
          backend: {
            runtime: 'Node.js',
            api: 'Next.js API Routes',
            database: 'PostgreSQL (via Drizzle)',
          },
          ai: {
            sdk: 'Vercel AI SDK',
            providers: ['Groq', 'OpenAI'],
          },
          infrastructure: {
            hosting: 'Vercel',
            auth: 'Firebase',
            analytics: 'Vercel Analytics',
          },
        },
        dependencies: {
          production: 25,
          development: 15,
        },
        recommendations: [
          'Consider adding error monitoring (e.g., Sentry)',
          'Add end-to-end testing with Playwright',
        ],
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(analysis, null, 2),
        }],
      }
    },

    repo_create_branch: async (args) => {
      const params = CreateBranchSchema.parse(args)

      const result = {
        success: true,
        branch: params.branch_name,
        from_ref: params.from_ref,
        sha: 'abc123def456',
        url: `https://github.com/${params.owner}/${params.repo}/tree/${params.branch_name}`,
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      }
    },

    repo_commit_files: async (args) => {
      const params = CommitFilesSchema.parse(args)

      const result = {
        success: true,
        commit: {
          sha: 'new123commit',
          message: params.message,
          branch: params.branch,
          files_affected: params.files.length,
        },
        files: params.files.map(f => ({
          path: f.path,
          action: f.action,
          status: 'success',
        })),
        url: `https://github.com/${params.owner}/${params.repo}/commit/new123commit`,
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
