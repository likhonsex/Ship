# Ship Agents

> The world's best coding agents work beside you so nothing slows you down.

---

## Overview

Ship provides autonomous AI agents that handle the complete software development lifecycle — from issue analysis to pull request creation.

---

## Agent Types

### Issue Processor Agent

| Capability | Description |
|------------|-------------|
| **Webhook Listener** | Monitors GitHub for assigned issues |
| **Context Extraction** | Parses requirements from issue body |
| **Prompt Generation** | Creates optimized LLM prompts |
| **Priority Detection** | Identifies urgent vs. normal tasks |

```typescript
interface IssueProcessor {
  listen(): void;
  extractContext(issue: Issue): Context;
  generatePrompt(context: Context): string;
}
```

---

### Code Generator Agent

| Capability | Description |
|------------|-------------|
| **Multi-Provider** | OpenAI, Claude, Groq, Ollama |
| **Smart Retry** | Automatic error handling |
| **Context Aware** | Understands project structure |
| **Test Generation** | Creates unit tests alongside code |

```typescript
interface CodeGenerator {
  generate(prompt: string): Promise<Code>;
  validate(code: Code): ValidationResult;
  refine(code: Code, feedback: string): Promise<Code>;
}
```

---

### PR Manager Agent

| Capability | Description |
|------------|-------------|
| **Auto PR Creation** | Creates well-formatted PRs |
| **Branch Management** | Handles feature branches |
| **Conflict Resolution** | Detects and resolves conflicts |
| **Review Integration** | Responds to reviewer feedback |

```typescript
interface PRManager {
  createBranch(name: string): Promise<Branch>;
  createPR(code: Code, description: string): Promise<PR>;
  updatePR(pr: PR, changes: Code): Promise<PR>;
}
```

---

### Feedback Loop Agent

| Capability | Description |
|------------|-------------|
| **Comment Monitoring** | Watches for PR comments |
| **Feedback Analysis** | Understands reviewer intent |
| **Code Regeneration** | Updates code based on feedback |
| **Auto Response** | Replies to reviewers |

```typescript
interface FeedbackLoop {
  monitor(pr: PR): void;
  analyze(comment: Comment): Feedback;
  respond(feedback: Feedback): Promise<Response>;
}
```

---

## Agent Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Issue Assigned │────▶│  Code Generated │────▶│   PR Created    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   PR Merged     │◀────│  Code Updated   │◀────│ Feedback Received│
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Agent Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes* | OpenAI API key |
| `ANTHROPIC_API_KEY` | No | Claude API key |
| `GROQ_API_KEY` | No | Groq API key |
| `GITHUB_TOKEN` | Yes | GitHub access token |
| `WEBHOOK_SECRET` | Yes | GitHub webhook secret |

> **Note:** At least one LLM provider key is required.

---

## Supported LLM Providers

| Provider | Models | Speed | Free Tier |
|----------|--------|-------|-----------|
| **OpenAI** | GPT-4, GPT-3.5 | Medium | Limited |
| **Anthropic** | Claude 3 | Medium | Limited |
| **Groq** | Llama, Mixtral | Fast | Yes |
| **Ollama** | Various | Local | Yes |
| **Hugging Face** | Open models | Varies | Yes |

---

## Task Checklist

- [x] Issue Processor Agent
- [x] Code Generator Agent
- [ ] PR Manager Agent
- [ ] Feedback Loop Agent
- [ ] Multi-agent orchestration
- [ ] Performance monitoring
- [ ] Rate limiting

---

## Usage Example

```typescript
import { Ship } from 'ship';

const ship = new Ship({
  provider: 'openai',
  model: 'gpt-4',
  github: {
    token: process.env.GITHUB_TOKEN,
    repo: 'likhonsex/Ship',
  },
});

// Start listening for issues
ship.start();

// Manual trigger
await ship.processIssue(123);
```

---

## Contributing to Agents

1. **Fork** the repository
2. **Create** a feature branch for your agent
3. **Implement** the agent interface
4. **Test** with sample issues
5. **Submit** a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

<div align="center">

**Ship** — *Your code's favorite coding agents*

</div>
