# Ship Tool Reference

> Complete reference for all Ship MCP tools

---

## Overview

Ship provides **26 tools** across 5 categories for autonomous coding assistance. These tools can be used via the MCP server integration with AI assistants like Claude Code, Cursor, or VS Code Copilot.

---

## Categories

| Category | Tools | Description |
|----------|-------|-------------|
| [Issue Management](#issue-management) | 5 | Analyze, plan, and respond to GitHub issues |
| [Code Generation](#code-generation) | 7 | Generate, review, refactor, and test code |
| [PR Management](#pr-management) | 7 | Create, review, and merge pull requests |
| [Security](#security) | 5 | Scan for vulnerabilities and secrets |
| [Repository](#repository) | 8 | Explore and manage repository files |

---

## Issue Management

### `issue_analyze`

Analyze a GitHub issue to understand requirements and create an implementation plan.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `issue_number` | number | Yes | Issue number to analyze |
| `include_comments` | boolean | No | Include issue comments (default: true) |

**Example:**
```json
{
  "owner": "likhonsex",
  "repo": "Ship",
  "issue_number": 42,
  "include_comments": true
}
```

---

### `issue_create_plan`

Create a detailed implementation plan from issue requirements.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issue_content` | string | Yes | Issue title and body content |
| `repo_context` | string | No | Repository context (file structure, tech stack) |
| `complexity_target` | string | No | Expected complexity: simple, moderate, complex |

---

### `issue_estimate`

Estimate complexity, effort, and risk for an issue.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issue_content` | string | Yes | Issue title and body content |
| `team_velocity` | number | No | Team velocity for estimation context |

**Returns:**
```json
{
  "complexity": {
    "size": "M",
    "points": 5,
    "tShirtSize": "Medium"
  },
  "effort": {
    "hours": 8,
    "confidence": "Medium",
    "range": { "min": 4, "max": 12 }
  },
  "risk": {
    "level": "Low",
    "factors": ["Well-defined scope"]
  }
}
```

---

### `issue_triage`

Triage and categorize an issue (bug, feature, enhancement, etc.).

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Issue title |
| `body` | string | Yes | Issue body content |
| `labels` | string[] | No | Existing labels |

---

### `issue_respond`

Generate a helpful response to an issue.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issue_content` | string | Yes | Issue title and body |
| `response_type` | string | Yes | Type: clarification, acknowledgment, solution, workaround, closing |
| `additional_context` | string | No | Additional context for the response |

---

## Code Generation

### `code_generate`

Generate code based on requirements and context.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requirements` | string | Yes | What the code should do |
| `language` | string | Yes | Programming language |
| `framework` | string | No | Framework context (react, nextjs, etc.) |
| `style_guide` | string | No | Code style preferences |
| `include_tests` | boolean | No | Include unit tests (default: true) |
| `include_docs` | boolean | No | Include documentation (default: true) |

---

### `code_review`

Review code for quality, security, and best practices.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to review |
| `file_path` | string | No | File path for context |
| `focus_areas` | string[] | No | Focus: security, performance, style |
| `severity_threshold` | string | No | Minimum severity: all, medium, high, critical |

---

### `code_refactor`

Suggest and apply refactoring improvements.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to refactor |
| `goals` | string[] | No | Goals: readability, performance, maintainability |
| `preserve_api` | boolean | No | Keep public API unchanged (default: true) |

---

### `code_explain`

Explain what code does in plain language.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to explain |
| `detail_level` | string | No | Level: brief, detailed, comprehensive |
| `audience` | string | No | Audience: beginner, intermediate, expert |

---

### `code_fix`

Fix bugs or errors in code.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code with bugs |
| `error_message` | string | Yes | Error message or bug description |
| `context` | string | No | Additional context |

---

### `code_generate_tests`

Generate unit tests for code.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to test |
| `framework` | string | No | Test framework (jest, vitest, pytest) |
| `coverage_target` | string | No | Coverage: basic, thorough, comprehensive |
| `include_edge_cases` | boolean | No | Include edge case tests (default: true) |
| `include_mocks` | boolean | No | Include mock examples (default: true) |

---

### `code_optimize`

Optimize code for performance.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to optimize |
| `optimization_targets` | string[] | No | Targets: speed, memory, bundle-size |
| `constraints` | string | No | Constraints to respect |

---

## PR Management

### `pr_create`

Create a new pull request with AI-generated description.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `title` | string | Yes | PR title |
| `head` | string | Yes | Branch containing changes |
| `base` | string | No | Target branch (default: main) |
| `body` | string | No | Custom body (auto-generated if not provided) |
| `draft` | boolean | No | Create as draft PR (default: false) |
| `issue_number` | number | No | Related issue number to link |

---

### `pr_update`

Update an existing pull request.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `pr_number` | number | Yes | PR number |
| `title` | string | No | New title |
| `body` | string | No | New body |
| `state` | string | No | New state: open, closed |

---

### `pr_review`

Perform AI code review on a pull request.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `pr_number` | number | Yes | PR number to review |
| `review_type` | string | No | Type: full, security, performance, style |
| `auto_approve` | boolean | No | Auto-approve if no issues (default: false) |

---

### `pr_respond_to_review`

Generate response to PR review comments.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `pr_number` | number | Yes | PR number |
| `comment_id` | number | Yes | Comment ID to respond to |
| `response_type` | string | Yes | Type: acknowledge, explain, fix, discuss |

---

### `pr_generate_description`

Generate a comprehensive PR description from commits/changes.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `head` | string | Yes | Branch with changes |
| `base` | string | No | Base branch (default: main) |
| `template` | string | No | Optional description template |

---

### `pr_check_status`

Check CI/CD status and merge readiness of a PR.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `pr_number` | number | Yes | PR number |

---

### `pr_merge`

Merge a pull request.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `pr_number` | number | Yes | PR number |
| `merge_method` | string | No | Method: merge, squash, rebase (default: squash) |
| `delete_branch` | boolean | No | Delete branch after merge (default: true) |

---

## Security

### `security_scan_code`

Scan code for security vulnerabilities.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to scan |
| `language` | string | Yes | Programming language |
| `scan_types` | string[] | No | Types: injection, xss, auth, crypto, secrets |
| `severity_threshold` | string | No | Minimum: info, low, medium, high, critical |

---

### `security_scan_dependencies`

Scan dependencies for known vulnerabilities.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `package_json` | string | Yes | package.json content |
| `lock_file` | string | No | package-lock.json or yarn.lock content |
| `include_dev` | boolean | No | Include dev dependencies (default: true) |

---

### `security_check_secrets`

Detect hardcoded secrets in code.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | Code to check |
| `file_path` | string | No | File path for context |
| `patterns` | string[] | No | Additional secret patterns to check |

---

### `security_generate_report`

Generate a comprehensive security report.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `branch` | string | No | Branch to scan (default: main) |
| `include_recommendations` | boolean | No | Include fix recommendations (default: true) |

---

### `security_fix_vulnerability`

Generate a fix for a security vulnerability.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `vulnerability_type` | string | Yes | Type: sql-injection, xss, etc. |
| `vulnerable_code` | string | Yes | The vulnerable code |
| `context` | string | No | Additional context |

---

## Repository

### `repo_get_structure`

Get repository file structure and overview.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `path` | string | No | Path to start from (default: root) |
| `depth` | number | No | How deep to traverse (default: 3) |
| `include_hidden` | boolean | No | Include hidden files (default: false) |

---

### `repo_read_file`

Read contents of a file from the repository.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `path` | string | Yes | File path |
| `ref` | string | No | Branch, tag, or commit SHA (default: main) |

---

### `repo_search_code`

Search for code patterns in repository.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `query` | string | Yes | Search query |
| `file_types` | string[] | No | File extensions to search (ts, js, py) |
| `path_filter` | string | No | Filter by path pattern |

---

### `repo_get_commits`

Get recent commits from repository.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `branch` | string | No | Branch name (default: main) |
| `limit` | number | No | Number of commits (default: 10) |
| `path` | string | No | Filter by file path |

---

### `repo_get_branches`

List repository branches.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `include_stale` | boolean | No | Include stale branches (default: false) |

---

### `repo_analyze_tech_stack`

Analyze repository technology stack and dependencies.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |

---

### `repo_create_branch`

Create a new branch.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `branch_name` | string | Yes | New branch name |
| `from_ref` | string | No | Base reference (default: main) |

---

### `repo_commit_files`

Commit changes to repository.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |
| `branch` | string | Yes | Branch to commit to |
| `message` | string | Yes | Commit message |
| `files` | array | Yes | Files to commit |

**File Object:**
```json
{
  "path": "src/feature.ts",
  "content": "// file content",
  "action": "create" | "update" | "delete"
}
```

---

## Configuration

Add Ship to your MCP client:

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

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub access token |
| `GROQ_API_KEY` | Recommended | Groq API key (fast inference) |
| `OPENAI_API_KEY` | Optional | OpenAI API key (GPT-4) |
| `ANTHROPIC_API_KEY` | Optional | Anthropic API key (Claude) |
| `DEFAULT_PROVIDER` | No | Default LLM provider (default: groq) |
| `DEFAULT_MODEL` | No | Default model (default: llama-3.3-70b-versatile) |

> **Note:** At least one LLM provider API key is required.

---

<div align="center">

**Ship** - *AI that codes with you*

</div>
