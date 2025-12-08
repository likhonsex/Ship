import { Sandbox } from '@e2b/code-interpreter'

let sandbox: Sandbox | null = null

export async function getSandbox(): Promise<Sandbox> {
  if (!sandbox) {
    sandbox = await Sandbox.create({
      apiKey: process.env.E2B_API_KEY,
    })
  }
  return sandbox
}

export async function executeCode(code: string, language: string = 'python') {
  const sbx = await getSandbox()

  try {
    if (language === 'python') {
      const result = await sbx.runCode(code)
      return {
        success: true,
        output: result.logs.stdout.join('\n'),
        error: result.logs.stderr.join('\n'),
        results: result.results,
      }
    } else if (language === 'javascript' || language === 'typescript') {
      // For JS/TS, write to file and execute with node
      await sbx.files.write('/tmp/script.js', code)
      const result = await sbx.commands.run('node /tmp/script.js')
      return {
        success: result.exitCode === 0,
        output: result.stdout,
        error: result.stderr,
      }
    } else if (language === 'bash' || language === 'shell') {
      const result = await sbx.commands.run(code)
      return {
        success: result.exitCode === 0,
        output: result.stdout,
        error: result.stderr,
      }
    }

    return {
      success: false,
      error: `Unsupported language: ${language}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function closeSandbox() {
  if (sandbox) {
    await sandbox.kill()
    sandbox = null
  }
}

export async function writeFile(path: string, content: string) {
  const sbx = await getSandbox()
  await sbx.files.write(path, content)
  return { success: true }
}

export async function readFile(path: string) {
  const sbx = await getSandbox()
  const content = await sbx.files.read(path)
  return { success: true, content }
}

export async function listFiles(path: string = '/') {
  const sbx = await getSandbox()
  const files = await sbx.files.list(path)
  return { success: true, files }
}
