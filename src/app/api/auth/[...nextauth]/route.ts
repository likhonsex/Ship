// NextAuth removed - using Firebase Auth
// This file is kept to prevent 404 errors during migration
// You can delete this file

export async function GET() {
  return new Response('Firebase Auth is used instead', { status: 200 })
}

export async function POST() {
  return new Response('Firebase Auth is used instead', { status: 200 })
}
