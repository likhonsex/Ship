# Changelog

All notable changes to Ship will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-12-09

### Major Release - Complete AI Coding Agent

This release transforms Ship into a fully-featured autonomous AI coding agent with MCP integration, multi-provider LLM support, and comprehensive tooling.

### Added

#### Multi-Provider LLM Support
- **Groq** - Fast inference with Llama 3.3 70B, Mixtral 8x7B
- **OpenAI** - GPT-4o, GPT-4o-mini, O1 Preview
- **Anthropic** - Claude Sonnet 4, Claude 3.5 Sonnet/Haiku
- **xAI** - Grok Beta
- **Ollama** - Local models support (Llama 3.2, CodeLlama, DeepSeek)
- Automatic fallback chain for reliability
- Smart model selection based on task requirements

#### MCP Server Integration
- Full Model Context Protocol (MCP) server implementation
- Compatible with Claude Code, Cursor, VS Code Copilot, Gemini CLI
- 26 tools across 5 categories:
  - Issue Management (5 tools)
  - Code Generation (7 tools)
  - PR Management (7 tools)
  - Security (5 tools)
  - Repository (8 tools)

#### CLI Interface
- `ship config` - View/set configuration
- `ship models` - List available models
- `ship issue <number>` - Process GitHub issues
- `ship review <number>` - AI code review
- `ship security` - Security scanning
- `ship serve` - Start MCP server
- `ship init` - Initialize Ship in repository
- `ship chat` - Interactive chat mode

#### Agent Orchestrator
- Multi-agent task orchestration
- Priority-based queue management
- Automatic retry with backoff
- Built-in agents:
  - Issue Processor Agent
  - Code Review Agent
  - Security Scanner Agent
  - Feedback Handler Agent

#### GitHub Actions Workflows
- Automated issue processing on assignment
- AI-powered code review on PRs
- Security vulnerability scanning
- PR feedback loop automation
- Auto-deploy on merge to main

#### Documentation
- Comprehensive tool reference (`docs/tool-reference.md`)
- Troubleshooting guide (`docs/troubleshooting.md`)
- Updated README with quick start

### Changed

- Upgraded to Vercel AI SDK 5.x
- Improved system prompts for better code generation
- Enhanced security scanning with OWASP coverage

### Security

- Added hardcoded secrets detection
- Dependency vulnerability scanning
- SQL injection, XSS, CSRF detection
- Security report generation

---

## [0.1.0] - 2024-11-01

### Added

- Initial project setup
- Basic chat interface
- Groq integration
- Firebase authentication
- E2B code execution

---

## Roadmap

### Upcoming Features

- [ ] VS Code extension
- [ ] JetBrains plugin
- [ ] Self-hosted deployment option
- [ ] Team collaboration features
- [ ] Custom agent creation
- [ ] Webhook integrations
- [ ] Usage analytics dashboard

---

<div align="center">

**Ship** - *AI that codes with you*

[GitHub](https://github.com/likhonsex/Ship) | [Issues](https://github.com/likhonsex/Ship/issues)

</div>
