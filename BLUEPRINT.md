# Ship - AI Coding Agent Blueprint

## Architecture Overview

Ship is an autonomous coding agent that handles issue assignments, code generation, pull request creation, and feedback integration. This blueprint outlines the integration with AI SDK, Vercel, and free provider services.

---

## Tech Stack

### AI/LLM Providers (Free Tier)
- **OpenAI API** - GPT-4/3.5-turbo for code generation
- **Anthropic Claude** - Alternative LLM provider
- **Groq** - Fast open-source model inference
- **Ollama** - Local LLM deployment option
- **Hugging Face Inference API** - Open-source model access

### Framework & SDK
- **Vercel AI SDK** - Unified interface for LLM interactions
- **Next.js** - Frontend and API routes
- **TypeScript** - Type-safe development

### Infrastructure
- **Vercel** - Deployment platform (free tier)
- **GitHub API** - Issue and PR management
- **PostgreSQL/Supabase** - Database (free tier available)

---

## Core Components

### 1. Issue Processor
- Listens for assigned issues via GitHub webhooks
- Extracts context and requirements
- Generates AI prompts for code generation

### 2. Code Generator
- Uses Vercel AI SDK to call LLM providers
- Generates code based on issue requirements
- Implements error handling and retries

### 3. PR Manager
- Creates pull requests automatically
- Handles code review feedback
- Updates PRs based on comments

### 4. Feedback Loop
- Monitors PR comments
- Processes reviewer feedback
- Regenerates code when needed

---

## Integration with Vercel AI SDK

```typescript
import { generateText } from 'ai';

async function generateCode(issueContext: string) {
  const { text } = await generateText({
    model: 'gpt-3.5-turbo', // or other free provider
    prompt: `Generate code for: ${issueContext}`,
    temperature: 0.7,
  });
  return text;
}
```
