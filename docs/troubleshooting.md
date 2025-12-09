# Ship Troubleshooting Guide

> Solutions to common issues and problems

---

## Quick Diagnostics

Run these commands to diagnose issues:

```bash
# Check configuration
npx ship config --list

# List available models
npx ship models

# Test connectivity
npx ship chat
```

---

## Common Issues

### 1. "No providers configured"

**Symptom:** Ship fails to start with "No providers configured" error.

**Cause:** No LLM API keys are set in environment variables.

**Solution:**

1. Set at least one API key:
```bash
# Option 1: Groq (recommended - fast & free tier)
export GROQ_API_KEY=your-groq-api-key

# Option 2: OpenAI
export OPENAI_API_KEY=your-openai-api-key

# Option 3: Anthropic
export ANTHROPIC_API_KEY=your-anthropic-api-key
```

2. Verify configuration:
```bash
npx ship config --list
```

---

### 2. "GitHub token not configured"

**Symptom:** Issue/PR commands fail with authentication error.

**Cause:** `GITHUB_TOKEN` environment variable is not set.

**Solution:**

1. Create a GitHub Personal Access Token:
   - Go to GitHub > Settings > Developer settings > Personal access tokens
   - Generate new token with `repo` and `issues` scopes

2. Set the token:
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

3. For GitHub Actions, add the token to repository secrets.

---

### 3. "Model not found"

**Symptom:** Error when trying to use a specific model.

**Cause:** The model is not available for the configured provider.

**Solution:**

1. List available models:
```bash
npx ship models
```

2. Use a model marked with checkmark (configured provider)

3. Or set up the required provider:
```bash
# For OpenAI models
export OPENAI_API_KEY=your-key

# For Claude models
export ANTHROPIC_API_KEY=your-key
```

---

### 4. "Rate limit exceeded"

**Symptom:** API calls fail with rate limit errors.

**Cause:** Too many requests to the LLM provider.

**Solution:**

1. **Groq:** Free tier has limits. Wait or upgrade.
2. **OpenAI:** Check your usage at platform.openai.com
3. **Use fallback:** Ship automatically tries other providers

Configure fallback behavior:
```typescript
import { withFallback, getModel } from 'ship/ai'

const result = await withFallback(async (model) => {
  return await generateText({ model, prompt: '...' })
}, ['llama-3.3-70b-versatile', 'gpt-4o-mini', 'claude-3-haiku'])
```

---

### 5. MCP Server Connection Issues

**Symptom:** AI assistant can't connect to Ship MCP server.

**Cause:** Server not running or misconfigured.

**Solution:**

1. Verify your MCP client configuration:
```json
{
  "mcpServers": {
    "ship": {
      "command": "npx",
      "args": ["ship@latest", "serve"]
    }
  }
}
```

2. Test the server manually:
```bash
npx ship serve
```

3. Check for port conflicts or firewall issues.

4. For VS Code Copilot, restart the extension after configuration changes.

---

### 6. "Timeout" errors

**Symptom:** Operations timeout before completing.

**Cause:** Large codebases, slow network, or complex analysis.

**Solution:**

1. Increase timeout in orchestrator config:
```typescript
import { createOrchestrator } from 'ship/agents'

const orchestrator = createOrchestrator({
  taskTimeout: 600000, // 10 minutes
})
```

2. Break large tasks into smaller chunks.

3. Use faster models for initial analysis:
```bash
export DEFAULT_MODEL=llama-3.1-8b-instant
```

---

### 7. GitHub Actions Workflow Fails

**Symptom:** Ship workflow fails in GitHub Actions.

**Cause:** Missing secrets or permission issues.

**Solution:**

1. Add required secrets to repository:
   - `GROQ_API_KEY` or `OPENAI_API_KEY`
   - Ensure `GITHUB_TOKEN` is automatically available

2. Check workflow permissions:
```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
```

3. Verify the workflow trigger:
```yaml
on:
  issues:
    types: [assigned]
```

---

### 8. "Permission denied" errors

**Symptom:** Ship can't write to repository or create PRs.

**Cause:** Insufficient GitHub token permissions.

**Solution:**

1. Ensure token has required scopes:
   - `repo` - Full repository access
   - `workflow` - For GitHub Actions
   - `write:packages` - If publishing packages

2. For organization repos, check organization policies.

3. For fine-grained tokens, enable:
   - Contents: Read and write
   - Issues: Read and write
   - Pull requests: Read and write

---

### 9. Incorrect Code Generation

**Symptom:** Generated code doesn't match project conventions.

**Cause:** Insufficient context provided to the model.

**Solution:**

1. Provide style guide in prompts:
```typescript
const result = await code_generate({
  requirements: 'Create a user service',
  language: 'typescript',
  style_guide: 'Use functional components, Zod for validation, no classes',
})
```

2. Include repository context:
```typescript
const plan = await issue_create_plan({
  issue_content: issueBody,
  repo_context: 'Next.js 14 app with App Router, Tailwind CSS, Drizzle ORM',
})
```

3. Use the `repo_analyze_tech_stack` tool first.

---

### 10. Security Scan False Positives

**Symptom:** Security scan flags non-issues.

**Cause:** Overly aggressive pattern matching.

**Solution:**

1. Adjust severity threshold:
```typescript
await security_scan_code({
  code: sourceCode,
  language: 'typescript',
  severity_threshold: 'high', // Only report high/critical
})
```

2. Review and mark as false positive in the report.

3. Add comments to exclude legitimate patterns:
```typescript
// ship-ignore: not a real secret, test data
const TEST_KEY = 'test-key-12345'
```

---

## Debug Mode

Enable verbose logging for troubleshooting:

```bash
# Set debug environment variable
DEBUG=ship:* npx ship serve

# Or for specific modules
DEBUG=ship:mcp,ship:ai npx ship serve
```

---

## Getting Help

If you're still experiencing issues:

1. **Check existing issues:** [GitHub Issues](https://github.com/likhonsex/Ship/issues)

2. **Create a new issue** with:
   - Ship version (`npx ship --version`)
   - Node.js version (`node --version`)
   - Error message and stack trace
   - Steps to reproduce

3. **Join discussions:** [GitHub Discussions](https://github.com/likhonsex/Ship/discussions)

---

## Performance Tips

### Optimize for Speed

1. **Use Groq** for fastest inference:
```bash
export DEFAULT_PROVIDER=groq
export DEFAULT_MODEL=llama-3.1-8b-instant
```

2. **Enable caching** (coming soon):
```typescript
const orchestrator = createOrchestrator({
  enableCache: true,
  cacheTTL: 3600, // 1 hour
})
```

3. **Parallelize independent tasks:**
```typescript
const [analysis, security] = await Promise.all([
  orchestrator.createTask('issue', { issueNumber: 42 }),
  orchestrator.createTask('security', { branch: 'main' }),
])
```

### Optimize for Quality

1. **Use Claude or GPT-4** for complex tasks:
```bash
export DEFAULT_PROVIDER=anthropic
export DEFAULT_MODEL=claude-sonnet-4-20250514
```

2. **Provide more context:**
```typescript
await code_generate({
  requirements: '...',
  language: 'typescript',
  framework: 'nextjs',
  style_guide: '...comprehensive style guide...',
})
```

3. **Review and iterate** on generated code.

---

<div align="center">

**Need more help?** [Open an issue](https://github.com/likhonsex/Ship/issues/new)

</div>
