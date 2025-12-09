#!/usr/bin/env node
/**
 * Ship CLI Entry Point
 */

import('../dist/cli/index.js').catch((error) => {
  console.error('Failed to start Ship CLI:', error.message)
  console.error('Make sure to run `npm run build` first.')
  process.exit(1)
})
