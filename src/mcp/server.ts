#!/usr/bin/env node
/**
 * Ship MCP Server
 * Model Context Protocol server for AI assistant integration
 * Compatible with Claude Code, Cursor, VS Code Copilot, and more
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js'

import { issueTools, registerIssueHandlers } from './tools/issue.js'
import { codeTools, registerCodeHandlers } from './tools/code.js'
import { prTools, registerPRHandlers } from './tools/pr.js'
import { securityTools, registerSecurityHandlers } from './tools/security.js'
import { repoTools, registerRepoHandlers } from './tools/repository.js'

// Server configuration
interface ServerConfig {
  name: string
  version: string
  githubToken?: string
  defaultProvider?: string
  defaultModel?: string
}

const config: ServerConfig = {
  name: 'ship-mcp',
  version: '1.0.0',
  githubToken: process.env.GITHUB_TOKEN,
  defaultProvider: process.env.DEFAULT_PROVIDER || 'groq',
  defaultModel: process.env.DEFAULT_MODEL || 'llama-3.3-70b-versatile',
}

// Create MCP server instance
const server = new Server(
  {
    name: config.name,
    version: config.version,
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
)

// Aggregate all tools
const allTools: Tool[] = [
  ...issueTools,
  ...codeTools,
  ...prTools,
  ...securityTools,
  ...repoTools,
]

// Register tool listing handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: allTools }
})

// Register tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    // Route to appropriate handler based on tool name
    if (name.startsWith('issue_')) {
      return await handleIssueTool(name, args)
    } else if (name.startsWith('code_')) {
      return await handleCodeTool(name, args)
    } else if (name.startsWith('pr_')) {
      return await handlePRTool(name, args)
    } else if (name.startsWith('security_')) {
      return await handleSecurityTool(name, args)
    } else if (name.startsWith('repo_')) {
      return await handleRepoTool(name, args)
    }

    throw new Error(`Unknown tool: ${name}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    }
  }
})

// Resource handlers for repository context
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'ship://config',
        name: 'Ship Configuration',
        description: 'Current Ship agent configuration',
        mimeType: 'application/json',
      },
      {
        uri: 'ship://status',
        name: 'Ship Status',
        description: 'Current agent status and active tasks',
        mimeType: 'application/json',
      },
    ],
  }
})

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params

  if (uri === 'ship://config') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({
            provider: config.defaultProvider,
            model: config.defaultModel,
            githubConnected: !!config.githubToken,
          }, null, 2),
        },
      ],
    }
  }

  if (uri === 'ship://status') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({
            status: 'ready',
            activeJobs: 0,
            lastActivity: new Date().toISOString(),
          }, null, 2),
        },
      ],
    }
  }

  throw new Error(`Unknown resource: ${uri}`)
})

// Tool handler implementations
async function handleIssueTool(name: string, args: Record<string, unknown>) {
  const handlers = registerIssueHandlers()
  const handler = handlers[name]
  if (!handler) throw new Error(`Unknown issue tool: ${name}`)
  return await handler(args)
}

async function handleCodeTool(name: string, args: Record<string, unknown>) {
  const handlers = registerCodeHandlers()
  const handler = handlers[name]
  if (!handler) throw new Error(`Unknown code tool: ${name}`)
  return await handler(args)
}

async function handlePRTool(name: string, args: Record<string, unknown>) {
  const handlers = registerPRHandlers()
  const handler = handlers[name]
  if (!handler) throw new Error(`Unknown PR tool: ${name}`)
  return await handler(args)
}

async function handleSecurityTool(name: string, args: Record<string, unknown>) {
  const handlers = registerSecurityHandlers()
  const handler = handlers[name]
  if (!handler) throw new Error(`Unknown security tool: ${name}`)
  return await handler(args)
}

async function handleRepoTool(name: string, args: Record<string, unknown>) {
  const handlers = registerRepoHandlers()
  const handler = handlers[name]
  if (!handler) throw new Error(`Unknown repo tool: ${name}`)
  return await handler(args)
}

// Main entry point
async function main() {
  console.error('Starting Ship MCP Server...')
  console.error(`Provider: ${config.defaultProvider}`)
  console.error(`Model: ${config.defaultModel}`)
  console.error(`GitHub: ${config.githubToken ? 'Connected' : 'Not configured'}`)

  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error('Ship MCP Server is running')
}

main().catch((error) => {
  console.error('Failed to start Ship MCP Server:', error)
  process.exit(1)
})
