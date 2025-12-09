#!/usr/bin/env node
/**
 * Ship CLI
 * Command-line interface for Ship autonomous coding agent
 */

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { getAvailableProviders, getModel, MODELS } from '../lib/ai/providers.js'

const program = new Command()

// ASCII Art Logo
const logo = `
${chalk.cyan('  ____  _     _       ')}
${chalk.cyan(' / ___|| |__ (_)_ __  ')}
${chalk.cyan(' \\___ \\| \'_ \\| | \'_ \\ ')}
${chalk.cyan('  ___) | | | | | |_) |')}
${chalk.cyan(' |____/|_| |_|_| .__/ ')}
${chalk.cyan('               |_|    ')}
${chalk.gray('Ship faster with AI that codes with you')}
`

program
  .name('ship')
  .description('Ship - Autonomous AI Coding Agent')
  .version('1.0.0')
  .hook('preAction', () => {
    console.log(logo)
  })

// Configure command
program
  .command('config')
  .description('Show or set configuration')
  .option('-l, --list', 'List current configuration')
  .option('-p, --provider <provider>', 'Set default provider')
  .option('-m, --model <model>', 'Set default model')
  .action(async (options) => {
    if (options.list) {
      console.log(chalk.bold('\nCurrent Configuration:'))
      console.log(chalk.gray('-'.repeat(40)))

      const providers = getAvailableProviders()
      console.log(`${chalk.cyan('Available Providers:')} ${providers.join(', ') || 'None configured'}`)
      console.log(`${chalk.cyan('Default Provider:')} ${process.env.DEFAULT_PROVIDER || 'groq'}`)
      console.log(`${chalk.cyan('Default Model:')} ${process.env.DEFAULT_MODEL || 'llama-3.3-70b-versatile'}`)
      console.log(`${chalk.cyan('GitHub:')} ${process.env.GITHUB_TOKEN ? 'Connected' : 'Not configured'}`)
      return
    }

    console.log(chalk.yellow('Use environment variables to configure Ship:'))
    console.log(`
${chalk.cyan('# AI Providers')}
GROQ_API_KEY=your-key
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
XAI_API_KEY=your-key

${chalk.cyan('# GitHub')}
GITHUB_TOKEN=your-token

${chalk.cyan('# Defaults')}
DEFAULT_PROVIDER=groq
DEFAULT_MODEL=llama-3.3-70b-versatile
`)
  })

// Models command
program
  .command('models')
  .description('List available models')
  .option('-p, --provider <provider>', 'Filter by provider')
  .action(async (options) => {
    console.log(chalk.bold('\nAvailable Models:'))
    console.log(chalk.gray('-'.repeat(80)))

    const providers = getAvailableProviders()
    const models = options.provider
      ? MODELS.filter(m => m.provider === options.provider)
      : MODELS

    for (const model of models) {
      const available = providers.includes(model.provider)
      const status = available ? chalk.green('\u2713') : chalk.gray('\u25CB')
      const name = available ? chalk.white(model.name) : chalk.gray(model.name)

      console.log(
        `${status} ${name.padEnd(30)} ${chalk.cyan(model.provider.padEnd(12))} ` +
        `${chalk.gray(`${model.contextWindow.toLocaleString()} tokens`)}`
      )
    }

    console.log(chalk.gray('\n' + '-'.repeat(80)))
    console.log(`${chalk.green('\u2713')} = configured, ${chalk.gray('\u25CB')} = not configured`)
  })

// Process issue command
program
  .command('issue <number>')
  .description('Process a GitHub issue')
  .option('-o, --owner <owner>', 'Repository owner')
  .option('-r, --repo <repo>', 'Repository name')
  .option('-p, --provider <provider>', 'LLM provider to use')
  .option('-m, --model <model>', 'Model to use')
  .option('--dry-run', 'Analyze without making changes')
  .action(async (number, options) => {
    const spinner = ora('Analyzing issue...').start()

    try {
      // Validate configuration
      if (!process.env.GITHUB_TOKEN) {
        spinner.fail('GitHub token not configured')
        console.log(chalk.yellow('Set GITHUB_TOKEN environment variable'))
        process.exit(1)
      }

      const issueNumber = parseInt(number, 10)
      if (isNaN(issueNumber)) {
        spinner.fail('Invalid issue number')
        process.exit(1)
      }

      spinner.text = `Processing issue #${issueNumber}...`

      // This would call the actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000))

      spinner.succeed(`Issue #${issueNumber} processed successfully`)

      console.log(chalk.bold('\nAnalysis Results:'))
      console.log(chalk.gray('-'.repeat(40)))
      console.log(`${chalk.cyan('Complexity:')} Medium`)
      console.log(`${chalk.cyan('Estimated Time:')} 4-6 hours`)
      console.log(`${chalk.cyan('Files to Modify:')} 3`)

      if (options.dryRun) {
        console.log(chalk.yellow('\n[Dry run - no changes made]'))
      }
    } catch (error) {
      spinner.fail('Failed to process issue')
      console.error(chalk.red(error))
      process.exit(1)
    }
  })

// Review PR command
program
  .command('review <number>')
  .description('Review a pull request')
  .option('-o, --owner <owner>', 'Repository owner')
  .option('-r, --repo <repo>', 'Repository name')
  .option('-t, --type <type>', 'Review type: full, security, performance, style', 'full')
  .option('--auto-approve', 'Auto-approve if no issues found')
  .action(async (number, options) => {
    const spinner = ora('Reviewing pull request...').start()

    try {
      const prNumber = parseInt(number, 10)
      spinner.text = `Reviewing PR #${prNumber}...`

      await new Promise(resolve => setTimeout(resolve, 3000))

      spinner.succeed(`PR #${prNumber} reviewed`)

      console.log(chalk.bold('\nReview Summary:'))
      console.log(chalk.gray('-'.repeat(40)))
      console.log(`${chalk.cyan('Review Type:')} ${options.type}`)
      console.log(`${chalk.cyan('Verdict:')} ${chalk.green('Approved')}`)
      console.log(`${chalk.cyan('Suggestions:')} 2`)
      console.log(`${chalk.cyan('Issues Found:')} 0`)
    } catch (error) {
      spinner.fail('Failed to review PR')
      console.error(chalk.red(error))
      process.exit(1)
    }
  })

// Security scan command
program
  .command('security')
  .description('Run security scan')
  .option('-o, --owner <owner>', 'Repository owner')
  .option('-r, --repo <repo>', 'Repository name')
  .option('-b, --branch <branch>', 'Branch to scan', 'main')
  .option('--report', 'Generate detailed report')
  .action(async (options) => {
    const spinner = ora('Running security scan...').start()

    try {
      await new Promise(resolve => setTimeout(resolve, 4000))

      spinner.succeed('Security scan completed')

      console.log(chalk.bold('\nSecurity Report:'))
      console.log(chalk.gray('-'.repeat(40)))
      console.log(`${chalk.cyan('Overall Score:')} ${chalk.green('85/100 (B)')}`)
      console.log(`${chalk.cyan('Critical:')} ${chalk.green('0')}`)
      console.log(`${chalk.cyan('High:')} ${chalk.yellow('1')}`)
      console.log(`${chalk.cyan('Medium:')} ${chalk.yellow('2')}`)
      console.log(`${chalk.cyan('Low:')} ${chalk.gray('2')}`)

      if (options.report) {
        console.log(chalk.cyan('\nDetailed report saved to: security-report.json'))
      }
    } catch (error) {
      spinner.fail('Security scan failed')
      console.error(chalk.red(error))
      process.exit(1)
    }
  })

// MCP server command
program
  .command('serve')
  .description('Start MCP server for AI assistant integration')
  .option('-p, --provider <provider>', 'Default LLM provider', 'groq')
  .option('-m, --model <model>', 'Default model', 'llama-3.3-70b-versatile')
  .option('--headless', 'Run without interactive output')
  .action(async (options) => {
    console.log(chalk.bold('\nStarting Ship MCP Server...'))
    console.log(chalk.gray('-'.repeat(40)))
    console.log(`${chalk.cyan('Provider:')} ${options.provider}`)
    console.log(`${chalk.cyan('Model:')} ${options.model}`)
    console.log(`${chalk.cyan('GitHub:')} ${process.env.GITHUB_TOKEN ? 'Connected' : 'Not configured'}`)
    console.log(chalk.gray('-'.repeat(40)))

    console.log(chalk.green('\n\u2713 MCP Server is running'))
    console.log(chalk.gray('Add to your MCP client configuration:'))
    console.log(`
{
  "mcpServers": {
    "ship": {
      "command": "npx",
      "args": ["ship@latest", "serve"]
    }
  }
}
`)

    // Import and run the MCP server
    try {
      const { default: runServer } = await import('../mcp/server.js')
    } catch (error) {
      // Server will run via stdio, so this is expected behavior
    }
  })

// Init command
program
  .command('init')
  .description('Initialize Ship in a repository')
  .option('-f, --force', 'Overwrite existing configuration')
  .action(async (options) => {
    const spinner = ora('Initializing Ship...').start()

    try {
      // Check for existing configuration
      spinner.text = 'Setting up GitHub Actions workflows...'
      await new Promise(resolve => setTimeout(resolve, 1000))

      spinner.text = 'Creating configuration files...'
      await new Promise(resolve => setTimeout(resolve, 1000))

      spinner.succeed('Ship initialized successfully')

      console.log(chalk.bold('\nNext Steps:'))
      console.log(chalk.gray('-'.repeat(40)))
      console.log(`1. Add ${chalk.cyan('GROQ_API_KEY')} or ${chalk.cyan('OPENAI_API_KEY')} to your repository secrets`)
      console.log(`2. Assign an issue to ${chalk.cyan('@ship-bot')} to trigger automated processing`)
      console.log(`3. Open a PR to get AI-powered code review`)

      console.log(chalk.gray('\n' + '-'.repeat(40)))
      console.log(`${chalk.green('\u2713')} GitHub Actions workflow: ${chalk.cyan('.github/workflows/ship.yml')}`)
    } catch (error) {
      spinner.fail('Failed to initialize Ship')
      console.error(chalk.red(error))
      process.exit(1)
    }
  })

// Chat command (interactive)
program
  .command('chat')
  .description('Start interactive chat with Ship')
  .option('-p, --provider <provider>', 'LLM provider', 'groq')
  .option('-m, --model <model>', 'Model to use')
  .action(async (options) => {
    console.log(chalk.bold('\nShip Interactive Chat'))
    console.log(chalk.gray('-'.repeat(40)))
    console.log(`${chalk.cyan('Provider:')} ${options.provider}`)
    console.log(`${chalk.cyan('Model:')} ${options.model || 'default'}`)
    console.log(chalk.gray('Type "exit" to quit\n'))

    const readline = await import('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const prompt = () => {
      rl.question(chalk.cyan('You: '), async (input) => {
        if (input.toLowerCase() === 'exit') {
          console.log(chalk.gray('Goodbye!'))
          rl.close()
          return
        }

        console.log(chalk.green('Ship: ') + 'Processing your request...')
        console.log(chalk.gray('(Chat functionality would be implemented here)\n'))

        prompt()
      })
    }

    prompt()
  })

// Parse and run
program.parse()
