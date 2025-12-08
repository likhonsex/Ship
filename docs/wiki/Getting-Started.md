# Getting Started with Ship

## Prerequisites

- Node.js 18+
- npm 9+
- GitHub account
- API key from an LLM provider (OpenAI, Anthropic, Groq, etc.)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/likhonsex/Ship.git
cd Ship
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
```

### 4. Start Development Server

```bash
npm run dev
```

## Using Ship

### Assign an Issue

1. Create an issue describing what you want to build
2. Assign the issue to Ship
3. Ship will automatically:
   - Analyze the requirements
   - Generate code
   - Create a pull request

### Review & Merge

1. Review the generated PR
2. Leave feedback if needed (Ship will respond)
3. Merge when satisfied

## Next Steps

- Read the [Agent Documentation](Agents)
- Configure [GitHub Actions](Configuration)
- Join the [Discussion](https://github.com/likhonsex/Ship/discussions)
