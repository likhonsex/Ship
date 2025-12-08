<div align="center">

# Ship

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

**Ship faster with AI that codes with you**

[View Demo](https://github.com/likhonsex/Ship) · [Report Bug](https://github.com/likhonsex/Ship/issues) · [Request Feature](https://github.com/likhonsex/Ship/issues)

</div>

---

## About The Project

Assign issues directly to Ship and let it autonomously write code, create pull requests, and respond to feedback in the background.

### Why Ship?

- **Your code's favorite coding agents** — From clearing your backlog to reviewing code, let Ship handle the busywork so you can focus on what's next.
- **AI for every step of your workflow** — Ship works with you and for you to bring big ideas to life and push technology forward.
- **Agent Mode** — Complete complex tasks quickly by using agent mode to analyze your code, propose edits, run tests, and validate results.

### Built With

| Technology | Purpose |
|------------|---------|
| **Vercel AI SDK** | Unified LLM interface |
| **Next.js** | Frontend & API routes |
| **TypeScript** | Type-safe development |
| **GitHub API** | Issue & PR management |

---

## Accelerate from Idea to First Commit

> Turn ambitious projects into a functional codebase with AI that understands your intent.

### Build Full-Stack Apps from Natural Language

Go from idea to deployed application using natural language with built-in AI, database, and authentication.

```typescript
import { generateText } from 'ai';

async function generateCode(issueContext: string) {
  const { text } = await generateText({
    model: 'gpt-3.5-turbo',
    prompt: `Generate code for: ${issueContext}`,
    temperature: 0.7,
  });
  return text;
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub account

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/likhonsex/Ship.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment variables
   ```bash
   cp .env.example .env
   ```
4. Start the development server
   ```bash
   npm run dev
   ```

---

## Roadmap

- [x] Core issue processor
- [x] AI code generation
- [ ] Multi-provider LLM support
- [ ] Advanced PR management
- [ ] Feedback loop automation
- [ ] Multi-language support

See the [open issues](https://github.com/likhonsex/Ship/issues) for a full list of proposed features.

---

## Contributing

Contributions make the open source community an amazing place to learn, inspire, and create.

### Quick Tips for Beginners

| Step | Action |
|------|--------|
| 1 | Fork the Project |
| 2 | Create your Feature Branch (`git checkout -b feature/AmazingFeature`) |
| 3 | Commit your Changes (`git commit -m 'Add AmazingFeature'`) |
| 4 | Push to the Branch (`git push origin feature/AmazingFeature`) |
| 5 | Open a Pull Request |

> **Note:** Always create a new branch, write clear commit messages, and test locally before submitting.

---

## Open Source Guides

| Guide | Description |
|-------|-------------|
| **Security Best Practices** | MFA, code scanning, dependency management |
| **Maintaining Balance** | Self-care tips for maintainers |
| **How to Contribute** | Guide for first-timers and veterans |
| **Starting a Project** | Launch your own open source project |
| **Finding Users** | Grow your project's user base |
| **Building Communities** | Encourage contribution and evangelism |
| **Best Practices** | Document processes, leverage community |
| **Leadership & Governance** | Formal rules for decision making |
| **Getting Paid** | Financial support for your work |
| **Code of Conduct** | Healthy community behavior |
| **Open Source Metrics** | Measure and track success |
| **Legal Side** | Licenses and legal considerations |

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Likhon Sheikh** — [@likhonsex](https://github.com/likhonsex)

Project Link: [https://github.com/likhonsex/Ship](https://github.com/likhonsex/Ship)

---

## Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Next.js](https://nextjs.org/)
- [Shields.io](https://shields.io/)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/likhonsex/Ship.svg?style=for-the-badge
[contributors-url]: https://github.com/likhonsex/Ship/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/likhonsex/Ship.svg?style=for-the-badge
[forks-url]: https://github.com/likhonsex/Ship/network/members
[stars-shield]: https://img.shields.io/github/stars/likhonsex/Ship.svg?style=for-the-badge
[stars-url]: https://github.com/likhonsex/Ship/stargazers
[issues-shield]: https://img.shields.io/github/issues/likhonsex/Ship.svg?style=for-the-badge
[issues-url]: https://github.com/likhonsex/Ship/issues
[license-shield]: https://img.shields.io/github/license/likhonsex/Ship.svg?style=for-the-badge
[license-url]: https://github.com/likhonsex/Ship/blob/main/LICENSE
