// Database module - commented out until Neon is configured
// Uncomment and install packages when ready:
// npm install @neondatabase/serverless drizzle-orm

// import { neon } from '@neondatabase/serverless'
// import { drizzle } from 'drizzle-orm/neon-http'
// import * as schema from './schema'

// const connectionString = process.env.DATABASE_URL
// const sql = connectionString ? neon(connectionString) : null
// export const db = sql ? drizzle(sql, { schema }) : null

export const db = null
