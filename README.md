<div align="center">

<img src="https://img.shields.io/badge/Ship-AI%20Coding%20Agent-blueviolet?style=for-the-badge&logo=github" alt="Ship Logo"/>

# Ship

### **Ship faster with AI that codes with you**

[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Enabled-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/likhonsex/Ship/actions)
[![Contributors](https://img.shields.io/github/contributors/likhonsex/Ship?style=flat-square)](https://github.com/likhonsex/Ship/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/likhonsex/Ship?style=flat-square)](https://github.com/likhonsex/Ship/stargazers)
[![Issues](https://img.shields.io/github/issues/likhonsex/Ship?style=flat-square)](https://github.com/likhonsex/Ship/issues)
[![License](https://img.shields.io/github/license/likhonsex/Ship?style=flat-square)](https://github.com/likhonsex/Ship/blob/main/LICENSE)

[**Get Started**](#getting-started) · [**Documentation**](AGENTS.md) · [**Report Bug**](https://github.com/likhonsex/Ship/issues) · [**Request Feature**](https://github.com/likhonsex/Ship/issues)

</div>

---

## What is Ship?

**Ship** is an autonomous AI coding agent that works directly in your GitHub workflow. Assign issues to Ship and watch it autonomously write code, create pull requests, and respond to feedback — all in the background.

> *From edits to pull requests, the world's best coding agents work beside you so nothing slows you down.*

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Issue Assignment** | Assign issues directly to Ship |
| **Autonomous Coding** | AI writes code based on requirements |
| **Auto PR Creation** | Creates well-formatted pull requests |
| **Feedback Response** | Responds to code review comments |
| **Multi-Provider LLM** | OpenAI, Claude, Groq, Ollama support |

---

## Get Started with GitHub Actions

Build, test, and deploy your code. Make code reviews, branch management, and issue triaging work the way you want.

### Suggested Workflows

| Workflow | Description | Trigger |
|----------|-------------|---------|
| **Ship Agent** | Process assigned issues with AI | `issues.assigned` |
| **Code Review** | AI-powered code review | `pull_request` |
| **Auto Deploy** | Deploy on merge to main | `push` to `main` |
| **Test Runner** | Run tests on PR | `pull_request` |

### Quick Setup

```yaml
# .github/workflows/ship.yml
name: Ship Agent

on:
  issues:
    types: [assigned]

jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Ship Agent
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: npm run ship -- --issue ${{ github.event.issue.number }}
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        GitHub Events                          │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     Issue Processor                           │
│              Extract context & requirements                   │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     Code Generator                            │
│           Generate code using Vercel AI SDK                   │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                      PR Manager                               │
│         Create branches, PRs & handle reviews                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

<div align="center">

| | Technology | Purpose |
|:---:|:---|:---|
| ⚡ | **Vercel AI SDK** | Unified LLM interface |
| ⚛️ | **Next.js 14** | Frontend & API routes |
| 📘 | **TypeScript** | Type-safe development |
| 🐙 | **GitHub API** | Issue & PR management |
| 🗄️ | **Supabase** | Database (optional) |

</div>

---

## Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/likhonsex/Ship.git
cd Ship

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `GITHUB_TOKEN` | ✅ | GitHub access token |
| `OPENAI_API_KEY` | ✅* | OpenAI API key |
| `ANTHROPIC_API_KEY` | ➖ | Claude API key |
| `GROQ_API_KEY` | ➖ | Groq API key |

> *At least one LLM provider key required

---

## Roadmap

- [x] Core issue processor
- [x] AI code generation
- [x] GitHub Actions integration
- [ ] Multi-provider LLM support
- [ ] Advanced PR management
- [ ] Feedback loop automation
- [ ] VS Code extension

---

## Contributing

```bash
# Fork & clone
git clone https://github.com/YOUR_USERNAME/Ship.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes & commit
git commit -m "Add amazing feature"

# Push & create PR
git push origin feature/amazing-feature
```

See [AGENTS.md](AGENTS.md) for agent development guidelines.

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with AI for developers who ship**

[GitHub](https://github.com/likhonsex/Ship) · [Issues](https://github.com/likhonsex/Ship/issues) · [Discussions](https://github.com/likhonsex/Ship/discussions)

</div>
